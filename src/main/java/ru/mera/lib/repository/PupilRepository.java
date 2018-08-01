package ru.mera.lib.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.mera.lib.entity.Pupil;

import java.util.List;

@Repository
public interface PupilRepository extends JpaRepository<Pupil, Integer>{
    List<Pupil> findByEnable(boolean enable);

    Pupil findByNameIgnoreCaseAndClassNumberAndClassNameIgnoreCase(String name, int classNumber, String classname);

    List<Pupil> findByNameIgnoreCaseLikeAndClassNumber(String name, Integer classNumber);

    List<Pupil> findByNameIgnoreCaseLikeAndClassNameIgnoreCase(String name, String className);

    List<Pupil> findByNameIgnoreCaseLike(String name);

    List<Pupil> findByNameIgnoreCaseLikeAndClassNameIgnoreCaseAndClassNumber(String name, String className, Integer classNumber);
}