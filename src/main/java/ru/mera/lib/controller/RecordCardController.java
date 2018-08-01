package ru.mera.lib.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.mera.lib.service.RecordCardService;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
@RequestMapping("/api/v.1.0/recordCard")
public class RecordCardController {

    @Autowired
    private RecordCardService recordCardService;

    @PostMapping("/{bookId}/{pupilId}")
    public ResponseEntity giveBook(@PathVariable int bookId, @PathVariable int pupilId, HttpServletResponse response) throws IOException {
        try {
            recordCardService.giveBook(bookId, pupilId);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e){
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, e.getMessage());
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{bookId}/{pupilId}")
    public ResponseEntity returnBook(@PathVariable int bookId, @PathVariable int pupilId, HttpServletResponse response) throws IOException {
        try {
            recordCardService.returnBook(bookId, pupilId);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e){
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, e.getMessage());
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }
}