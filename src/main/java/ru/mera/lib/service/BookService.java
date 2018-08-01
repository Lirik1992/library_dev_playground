package ru.mera.lib.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import ru.mera.lib.entity.Pupil;
import ru.mera.lib.entity.RecordCard;
import ru.mera.lib.model.BookPagination;
import ru.mera.lib.repository.BookRepository;
import ru.mera.lib.entity.Book;
import ru.mera.lib.repository.RecordCardRepository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookService {
    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private RecordCardRepository recordCardRepository;

    @Autowired
    private PupilService pupilService;

    private boolean bookNotExistForSave(Book book) {
        Book bookFromDB = bookRepository.findByTitleIgnoreCaseAndAuthorIgnoreCaseAndPublishYearAndClassNumber(book.getTitle(),
                book.getAuthor(), book.getPublishYear(), book.getClassNumber());
        return bookFromDB == null;
    }

    private boolean bookNotExistForUpdate(Book book) {
        Book bookFromDB = bookRepository.findByTitleIgnoreCaseAndAuthorIgnoreCaseAndPublishYearAndClassNumber(book.getTitle(),
                book.getAuthor(), book.getPublishYear(), book.getClassNumber());

        return bookFromDB == null || bookFromDB.getId() == book.getId();
    }



    public void saveBook(Book book) {
        Assert.isTrue(bookNotExistForSave(book), "This book is already exist!");
        Assert.notNull(book, "Book can't be null!");
        Assert.hasText(book.getAuthor(), "Author is empty!");
        Assert.hasText(book.getTitle(), "Title is empty!");
        Assert.isTrue(book.getPublishYear() >= 0, "Invalid year of publication!");
        Assert.isTrue(book.getCount() > 0, "Count of books can't be less zero!");
        Assert.isTrue(book.getClassNumber() >= 0, "Class number can't be less zero!");
        bookRepository.save(book);
    }

    public void updateBook(Book book) {
        Assert.isTrue(bookNotExistForUpdate(book), "This book is already exist!");
        Assert.notNull(book, "Book can't be null!");
        Assert.hasText(book.getAuthor(), "Author is empty!");
        Assert.hasText(book.getTitle(), "Title is empty!");
        Assert.isTrue(book.getPublishYear() >= 0, "Invalid year of publication!");
        Assert.isTrue(book.getCount() >= 0, "Count of books can't be less zero!");
        Assert.isTrue(book.getClassNumber() >= 0, "Class number can't be less zero!");
        bookRepository.save(book);
    }


    Book getOneBook(int id) {
        return bookRepository.findById(id).orElse(null);
    }

    public void deleteBook(int id) {
        Optional<Book> opBook = bookRepository.findById(id);

        if (opBook.isPresent()) {
            Book book = opBook.get();
            List<RecordCard> recordCards = recordCardRepository.findByBookIdAndReturnDate(book.getId(), null);
            Assert.isTrue(recordCards.isEmpty(), "This book is not returned!");
            bookRepository.delete(book);
        } else throw new IllegalArgumentException("This book is not present in library!");
    }

    public List<Book> findBooks(String title, String author, Integer classNumber, Integer publishYear) {
        if (classNumber != 0 && publishYear != 0) {
            return bookRepository.findByTitleIgnoreCaseLikeAndAuthorIgnoreCaseLikeAndClassNumberAndPublishYear(title, author, classNumber, publishYear);
        }
        if (classNumber != 0) {
            return bookRepository.findByTitleIgnoreCaseLikeAndAuthorIgnoreCaseLikeAndClassNumber(title, author, classNumber);
        }
        if (publishYear != 0) {
            return bookRepository.findByTitleIgnoreCaseLikeAndAuthorIgnoreCaseLikeAndPublishYear(title, author, publishYear);
        }
        return bookRepository.findByTitleIgnoreCaseLikeAndAuthorIgnoreCaseLike(title, author);
    }

    //книги доступные для выдачи
    public List<Book> availableBooksForReceive(String title, String author, Integer classNumber, Integer publishYear, int pupilId){
        List<Book> books = findBooks(title, author, classNumber, publishYear);
        books = books.stream().filter(book -> recordCardRepository.
                findByBookIdAndPupilIdAndReturnDate(book.getId(), pupilId, null) == null &&
                book.getCount() > 0 &&
                book.isEnable()).collect(Collectors.toList());
        return books;
    }

    public BookPagination pagination(List<Book> books, Integer page){
        books.sort((b1, b2) -> b1.getTitle().compareToIgnoreCase(b2.getTitle())); //сортируем книги

        int listSize = books.size();
        int pageCount;
        int lastIndex;
        if (page == null) page = 1;

        if (listSize%10 == 0){
            pageCount = listSize/10;
        } else pageCount = listSize/10 + 1;

        if (page > pageCount) return new BookPagination(Collections.emptyList(), 1, listSize);

        if (!books.isEmpty() && listSize > 10) {
            int firstIndex = (page - 1) * 10;

            if (listSize >= (page - 1) * 10 + 10) {
                lastIndex = (page - 1) * 10 + 10;
            } else lastIndex = (page - 1) * 10 + listSize % 10;
            return new BookPagination(books.subList(firstIndex, lastIndex), pageCount, listSize);
        } else return new BookPagination(books, pageCount, listSize);
    }
}
