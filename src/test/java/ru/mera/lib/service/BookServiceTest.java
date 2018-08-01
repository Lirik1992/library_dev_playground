package ru.mera.lib.service;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import ru.mera.lib.entity.Book;
import ru.mera.lib.repository.BookRepository;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class BookServiceTest {
    @Autowired
    private BookService bookService;

    @Autowired
    private BookRepository bookRepository;

    @Test
    public void saveBook() throws Exception {
        String title = "Some Book1";
        String author = "Some Author1";
        int count = 10;
        int publishYear = 1998;
        int classNumber = 8;
        boolean enable = true;

        Book book = new Book();
        book.setTitle(title);
        book.setAuthor(author);
        book.setCount(count);
        book.setPublishYear(publishYear);
        book.setClassNumber(classNumber);
        book.setEnable(enable);
        bookService.saveBook(book);

        Book savedBook = bookRepository.findByTitleIgnoreCaseAndAuthorIgnoreCaseAndPublishYearAndClassNumber(title, author, publishYear, classNumber);

        assertEquals(author, savedBook.getAuthor());
        assertEquals(title, savedBook.getTitle());
        assertEquals(publishYear, savedBook.getPublishYear());
        assertEquals(count, savedBook.getCount());
        assertEquals(classNumber, savedBook.getClassNumber());
        assertEquals(enable, savedBook.isEnable());

        bookRepository.delete(book);
    }

//    @Test
//    public void updateBook() throws Exception {
//        String title = "Updated Book";
//        String author = "Updated Author";
//        int count = 15;
//        int publishYear = 2008;
//        int classNumber = 11;
//        boolean enable = false;
//
//        Book book = bookRepository.getOne(2);
//        book.setTitle(title);
//        book.setAuthor(author);
//        book.setCount(count);
//        book.setPublishYear(publishYear);
//        book.setClassNumber(classNumber);
//        book.setEnable(enable);
//        bookService.updateBook(book);
//
//        Book updatedBook = bookRepository.getOne(2);
//
//        assertEquals(book.getId(), updatedBook.getId());
//        assertEquals(book.getTitle(), updatedBook.getTitle());
//        assertEquals(book.getAuthor(), updatedBook.getAuthor());
//        assertEquals(book.getClassNumber(), updatedBook.getClassNumber());
//        assertEquals(book.getCount(), updatedBook.getCount());
//        assertEquals(book.getPublishYear(), updatedBook.getPublishYear());
//    }

//    @Test
//    public void activateBook() throws Exception {
//        bookService.activateBook(2);
//        Book book = bookRepository.getOne(2);
//        assertEquals(true, book.isEnable());
//    }
//
//    @Test
//    public void deactivateBook() throws Exception {
//        bookService.deactivateBook(2);
//        Book book = bookService.getOneBook(2);
//        assertEquals(false, book.isEnable());
//    }
}