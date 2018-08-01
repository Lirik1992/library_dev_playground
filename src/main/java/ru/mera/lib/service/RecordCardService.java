package ru.mera.lib.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import ru.mera.lib.entity.Book;
import ru.mera.lib.entity.RecordCard;
import ru.mera.lib.repository.BookRepository;
import ru.mera.lib.repository.RecordCardRepository;

import javax.validation.constraints.NotNull;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecordCardService {

    @Autowired
    private RecordCardRepository recordCardRepository;

    @Autowired
    private PupilService pupilService;

    @Autowired
    private BookService bookService;

    public void giveBook(int bookId, int pupilId) {
        Book book = bookService.getOneBook(bookId);

        Assert.isTrue(book != null, "Book isn't exist!");
        Assert.isTrue(book.getCount() > 0, "Book is not in the library!");
        Assert.isTrue(pupilService.getOnePupil(pupilId) != null, "Pupil isn't exist!");
        Assert.isTrue(recordCardRepository.findByBookIdAndPupilIdAndReturnDate(bookId, pupilId, null) == null,
                "This book has already been given to the pupil!");
        Assert.isTrue(book.isEnable(), "This book is not available for receive!");

        RecordCard recordCard = new RecordCard();
        SimpleDateFormat dateFormat = new SimpleDateFormat();

        recordCard.setBookId(bookId);
        recordCard.setPupilId(pupilId);
        recordCard.setReceiveDate(dateFormat.format(new Date()));
        recordCardRepository.save(recordCard);

        book.setCount(book.getCount() - 1);
        bookService.updateBook(book);
    }

    public void returnBook(int bookId, int pupilId){
        RecordCard recordCard = recordCardRepository.findByBookIdAndPupilIdAndReturnDate(bookId, pupilId, null);

        Assert.isTrue(recordCard != null, "This book was not given to this pupil!");

            SimpleDateFormat dateFormat = new SimpleDateFormat();
            recordCard.setReturnDate(dateFormat.format(new Date()));
            recordCardRepository.save(recordCard);

            Book book = bookService.getOneBook(bookId);
            book.setCount(book.getCount() + 1);
            bookService.updateBook(book);
    }
}
