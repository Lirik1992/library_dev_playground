package ru.mera.lib.service;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import ru.mera.lib.entity.Pupil;
import ru.mera.lib.repository.PupilRepository;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class PupilServiceTest {

    @Autowired
    private PupilRepository pupilRepository;

    @Autowired
    private PupilService pupilService;

    @Test
    public void savePupil() throws Exception {

        String name = "Some pupil";
        String className = "B";
        int classNumber = 10;
        boolean enable = true;
        Pupil pupil = new Pupil();
        pupil.setName(name);
        pupil.setClassNumber(classNumber);
        pupil.setClassName(className);
        pupil.setEnable(enable);
        pupilService.savePupil(pupil);

        Pupil savedPupil = pupilRepository.findByNameIgnoreCaseAndClassNumberAndClassNameIgnoreCase(name, classNumber, className);

        assertEquals(name, savedPupil.getName());
        assertEquals(classNumber, savedPupil.getClassNumber());
        assertEquals(className, savedPupil.getClassName());
        assertEquals(enable, savedPupil.isEnable());
    }

//    @Test
//    public void updatePupil() throws Exception {
//        String name = "Updated pupil";
//        String className = "C";
//        int classNumber = 8;
//        boolean enable = true;
//        Pupil pupil = pupilService.getOnePupil(21);
//        pupil.setName(name);
//        pupil.setClassNumber(classNumber);
//        pupil.setClassName(className);
//        pupil.setEnable(enable);
//        pupilService.updatePupil(pupil);
//
//        Pupil updatedPupil = pupilRepository.getOne(21);
//
//        assertEquals(name, updatedPupil.getName());
//        assertEquals(classNumber, updatedPupil.getClassNumber());
//        assertEquals(className, updatedPupil.getClassName());
//        assertEquals(enable, updatedPupil.isEnable());
//    }

//    @Test
//    public void activatePupil() throws Exception {
//        pupilService.activatePupil(21);
//        Pupil pupil = pupilService.getOnePupil(21);
//        assertEquals(true, pupil.isEnable());
//    }
//
//    @Test
//    public void deactivatePupil() throws Exception {
//        pupilService.deactivatePupil(21);
//        Pupil pupil = pupilService.getOnePupil(21);
//        assertEquals(false, pupil.isEnable());
//    }

}