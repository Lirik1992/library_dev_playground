package ru.mera.lib.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.mera.lib.entity.Book;
import ru.mera.lib.entity.Pupil;
import ru.mera.lib.model.BookPagination;
import ru.mera.lib.model.PupilPagination;
import ru.mera.lib.service.BookService;
import ru.mera.lib.service.PupilService;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v.1.0/pupils")
public class PupilController {

    @Autowired
    private PupilService pupilService;

    @Autowired
    private BookService bookService;

    @PostMapping
    public ResponseEntity savePupil(@RequestBody Pupil pupil, HttpServletResponse response) throws IOException {

        try {
            pupilService.savePupil(pupil);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e){
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, e.getMessage());
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping
    public ResponseEntity updatePupil(@RequestBody Pupil pupil, HttpServletResponse response) throws IOException {
        try {
            pupilService.updatePupil(pupil);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e){
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, e.getMessage());
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    public PupilPagination findPupils(@RequestParam(required = false) String name,
                                      @RequestParam(required = false) Integer classNumber,
                                      @RequestParam(required = false) String className,
                                      @RequestParam(required = false) Integer page){

        if (name == null) name = "";
        if (classNumber == null) classNumber = 0;

        List<Pupil> pupils = pupilService.findPupils("%" + name + "%", classNumber, className);

        return pupilService.pagination(pupils, page);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deletePupil(@PathVariable int id, HttpServletResponse response) throws IOException {
        try {
            pupilService.deletePupil(id);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, e.getMessage());
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    //      возвращает все книги выданные ученику
    @GetMapping("/{pupilId}")
    public BookPagination getPupilBooks(@PathVariable int pupilId,
                                        @RequestParam(required = false) Integer page){
        List<Book> books = pupilService.getPupilBooks(pupilId);
        return bookService.pagination(books, page);
    }
}