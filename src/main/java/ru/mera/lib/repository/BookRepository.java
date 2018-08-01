package ru.mera.lib.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.mera.lib.entity.Book;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {

    Book findByTitleIgnoreCaseAndAuthorIgnoreCaseAndPublishYearAndClassNumber(String title, String author, int publishYear, int classNumber);

    List<Book> findByEnable(boolean enable);

    List<Book> findByTitleIgnoreCaseLikeAndAuthorIgnoreCaseLike(String title, String author);

    List<Book> findByTitleIgnoreCaseLikeAndAuthorIgnoreCaseLikeAndClassNumber(String title, String author, Integer classNumber);

    List<Book> findByTitleIgnoreCaseLikeAndAuthorIgnoreCaseLikeAndClassNumberAndPublishYear(String title, String author, Integer classNumber, Integer publishYear);

    List<Book> findByTitleIgnoreCaseLikeAndAuthorIgnoreCaseLikeAndPublishYear(String title, String author, Integer publishYear);

}