package ru.mera.lib.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.mera.lib.entity.Book;
import ru.mera.lib.model.BookPagination;
import ru.mera.lib.repository.BookRepository;
import ru.mera.lib.service.BookService;
import ru.mera.lib.service.RecordCardService;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v.1.0/books")
public class BookController {

    @Autowired
    private BookService bookService;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private RecordCardService recordCardService;

    @PostMapping
    public ResponseEntity saveBook(@RequestBody Book book, HttpServletResponse response) throws IOException {
        try {
            bookService.saveBook(book);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, e.getMessage());
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping
    public ResponseEntity updateBook(@RequestBody Book book, HttpServletResponse response) throws IOException {
        try {
            bookService.updateBook(book);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e){
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, e.getMessage());
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    public BookPagination findBooks(@RequestParam(name = "title", required = false) String title,
                                    @RequestParam(name = "author", required = false) String author,
                                    @RequestParam(name = "classNumber", required = false) Integer classNumber,
                                    @RequestParam(name = "publishYear", required = false) Integer publishYear,
                                    @RequestParam(name = "page", required = false) Integer page){

        if (title == null) title = "";
        if (author == null) author = "";
        if (classNumber == null) classNumber = 0;
        if (publishYear == null) publishYear = 0;

        List<Book> books = bookService.findBooks("%" + title + "%", "%" + author + "%", classNumber, publishYear);

        return bookService.pagination(books, page);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteBook(@PathVariable int id, HttpServletResponse response) throws IOException {
        try {
            bookService.deleteBook(id);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e){
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, e.getMessage());
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{pupilId}")
    public BookPagination availableBooksForReceive(@PathVariable int pupilId,
                                                   @RequestParam(name = "title", required = false) String title , //publishYear
                                                   @RequestParam(name = "author", required = false) String author,
                                                   @RequestParam(name = "classNumber", required = false) Integer classNumber,
                                                   @RequestParam(name = "publishYear", required = false) Integer publishYear,
                                                   @RequestParam(name = "page", required = false) Integer page){
        if (title == null) title = "";
        if (author == null) author = "";
        if (classNumber == null) classNumber = 0;
        if (publishYear == null) publishYear = 0;

        List<Book> books = bookService.availableBooksForReceive("%" + title + "%", "%" + author + "%", classNumber, publishYear, pupilId);
        return bookService.pagination(books, page);
    }
}