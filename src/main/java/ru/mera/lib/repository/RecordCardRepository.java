package ru.mera.lib.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.mera.lib.entity.RecordCard;

import java.util.List;

@Repository
public interface RecordCardRepository extends JpaRepository<RecordCard, Integer>{
    List<RecordCard> findByPupilIdAndReturnDate(int pupilId, String returnDate);
    List<RecordCard> findByBookIdAndReturnDate(int bookId, String returnDate);
    RecordCard findByBookIdAndPupilIdAndReturnDate(int bookId, int pupilId, String returnDate);
    RecordCard findByBookIdAndPupilIdAndReceiveDate(int bookId, int pupilId, String receiveDate);
}
