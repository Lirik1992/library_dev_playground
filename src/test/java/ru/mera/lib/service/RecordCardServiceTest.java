package ru.mera.lib.service;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import ru.mera.lib.entity.Book;
import ru.mera.lib.entity.Pupil;
import ru.mera.lib.entity.RecordCard;
import ru.mera.lib.repository.BookRepository;
import ru.mera.lib.repository.PupilRepository;
import ru.mera.lib.repository.RecordCardRepository;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class RecordCardServiceTest {

    @Autowired
    private RecordCardRepository recordCardRepository;

    @Autowired
    private RecordCardService recordCardService;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private PupilRepository pupilRepository;

    @Test
    public void giveBook() throws Exception {
        Book book = bookRepository.getOne(2);
        Pupil pupil = pupilRepository.getOne(3);

        recordCardService.giveBook(book.getId(), pupil.getId());

        RecordCard recordCard = recordCardRepository.findByBookIdAndPupilIdAndReturnDate(book.getId(),
                pupil.getId(), null);

        assertNotNull(recordCard);
        assertEquals(book.getId(), recordCard.getBookId());
        assertEquals(pupil.getId(), recordCard.getPupilId());
        assertNotNull(recordCard.getReceiveDate());
    }

    @Test
    public void returnBook() throws Exception {
        RecordCard recordCard = recordCardRepository.findByBookIdAndPupilIdAndReturnDate(2, 3, null);
        String receiveDate = recordCard.getReceiveDate();
        recordCardService.returnBook(2, 3);
        RecordCard recordCard1 = recordCardRepository.findByBookIdAndPupilIdAndReceiveDate(2, 3, receiveDate);

        assertNotNull(recordCard1);
        assertNotNull(recordCard1.getReturnDate());

    }

}