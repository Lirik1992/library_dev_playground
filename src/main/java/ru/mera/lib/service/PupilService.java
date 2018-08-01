package ru.mera.lib.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import ru.mera.lib.entity.Book;
import ru.mera.lib.entity.Pupil;
import ru.mera.lib.entity.RecordCard;
import ru.mera.lib.model.BookPagination;
import ru.mera.lib.model.PupilPagination;
import ru.mera.lib.repository.PupilRepository;
import ru.mera.lib.repository.RecordCardRepository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class PupilService {

    @Autowired
    private PupilRepository pupilRepository;

    @Autowired
    private RecordCardRepository recordCardRepository;

    @Autowired
    private BookService bookService;

    private boolean pupilNotExistForSave(Pupil pupil){
        Pupil pupilFromDB = pupilRepository.findByNameIgnoreCaseAndClassNumberAndClassNameIgnoreCase(pupil.getName(),
                pupil.getClassNumber(), pupil.getClassName());
        return pupilFromDB == null;
    }

    private boolean pupilNotExistForUpdate(Pupil pupil){
        Pupil pupilFromDB = pupilRepository.findByNameIgnoreCaseAndClassNumberAndClassNameIgnoreCase(pupil.getName(),
                pupil.getClassNumber(), pupil.getClassName());

        return pupilFromDB == null || pupilFromDB.getId() == pupil.getId();
    }

    public void savePupil(Pupil pupil){
                Assert.isTrue(pupilNotExistForSave(pupil), "This pupil is already exist!");
                Assert.notNull(pupil, "Pupil can't be null!");
                Assert.hasText(pupil.getName(), "Name of pupil is empty!");
                Assert.isTrue(pupil.getClassNumber() >= 0, "Invalid class number!");
                pupilRepository.save(pupil);
    }

    public void updatePupil(Pupil pupil){
        Assert.isTrue(pupilNotExistForUpdate(pupil), "This pupil is already exist!");
        Assert.notNull(pupil, "Pupil can't be null!");
        Assert.hasText(pupil.getName(), "Name of pupil is empty!");
        Assert.isTrue(pupil.getClassNumber() >= 0, "Invalid class number!");
        pupilRepository.save(pupil);
    }

    public Pupil getOnePupil(int id) {
        return pupilRepository.findById(id).orElse(null);
    }


    public List<Book> getPupilBooks(int pupilId) {
        List<Book> books = new ArrayList<>();
        List<RecordCard> recordCards = recordCardRepository.findByPupilIdAndReturnDate(pupilId, null);
        for (RecordCard recordCard : recordCards){
            books.add(bookService.getOneBook(recordCard.getBookId()));
        }
        return books ;
    }

    public int getPupilCount() {
        return pupilRepository.findByEnable(true).size();
    }


    public List<Pupil> findPupils(String name, Integer classNumber, String className){
        if (className == null && classNumber == 0){
            return pupilRepository.findByNameIgnoreCaseLike(name);
        }

        if (className == null){
            return pupilRepository.findByNameIgnoreCaseLikeAndClassNumber(name, classNumber);
        }

        if (classNumber == 0){
            return pupilRepository.findByNameIgnoreCaseLikeAndClassNameIgnoreCase(name, className);
        }

        return pupilRepository.findByNameIgnoreCaseLikeAndClassNameIgnoreCaseAndClassNumber(name, className, classNumber);
    }

    public PupilPagination pagination(List<Pupil> pupils, Integer page){

        pupils.sort((p1, p2) -> p1.getName().compareToIgnoreCase(p2.getName()));//   сортировка по-имени

        int listSize = pupils.size();
        int pageCount;
        int lastIndex;
        if (page == null) page = 1;

        if (listSize%10 == 0){
            pageCount = listSize/10;
        } else pageCount = listSize/10 + 1;

        if (page > pageCount) return new PupilPagination(Collections.emptyList(), 1, listSize);

        if (!pupils.isEmpty() && listSize > 10) {
            int firstIndex = (page - 1) * 10;

            if (listSize >= (page - 1) * 10 + 10) {
                lastIndex = (page - 1) * 10 + 10;
            } else lastIndex = (page - 1) * 10 + listSize % 10;
            return new PupilPagination(pupils.subList(firstIndex, lastIndex), pageCount, listSize);

        } else return new PupilPagination(pupils, pageCount, listSize);
    }

    public void deletePupil(int id) {
        Optional<Pupil> opPupil = pupilRepository.findById(id);

        if (opPupil.isPresent()){
            Pupil pupil = opPupil.get();
            List<RecordCard> recordCards = recordCardRepository.findByPupilIdAndReturnDate(pupil.getId(), null);
            Assert.isTrue(recordCards.isEmpty(), "This pupil did not return the book!");
            pupilRepository.delete(pupil);
        } else throw new IllegalArgumentException("This pupil is not exist!");
    }
}