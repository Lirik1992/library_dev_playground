package ru.mera.lib.controller;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.mera.lib.entity.User;
import ru.mera.lib.model.RolesModel;
import ru.mera.lib.repository.UserRepository;
import ru.mera.lib.service.UserService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

import static ru.mera.lib.config.SecurityConstants.*;

@RestController
@RequestMapping("/api/v.1.0/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity createUser(@RequestBody User user, HttpServletResponse response) throws IOException {

        try {
            List<String> roles = user.getRoles();
            roles.add("USER");
            user.setRoles(roles);
            userService.create(user);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, e.getMessage());
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity deleteUser(@PathVariable int userId, HttpServletResponse response) throws IOException {

        try {
            userRepository.findById(userId).ifPresent(user -> userRepository.delete(user));
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e){
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "user not found");
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping
    public ResponseEntity updateUser(@RequestBody User user, HttpServletResponse response) throws IOException {

        try{
            userRepository.findById(user.getId()).ifPresent(user1 -> userRepository.delete(user1));
            userRepository.save(user);
            return new ResponseEntity(HttpStatus.OK);
        }  catch (Exception e){
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Can't update user");
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public List<User> allUsers(HttpServletResponse response) throws IOException {
        try{
            return userRepository.findAll();
        } catch (Exception e){
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Can't find all users");
            return null;
        }
    }

    @GetMapping("/authorization")
    public RolesModel authorization(HttpServletRequest request, HttpServletResponse response) throws IOException {

        String authHeader = request.getHeader(HEADER_STRING);

        if (authHeader == null || !authHeader.startsWith(TOKEN_PREFIX)){
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid Authorization header.");
            return null;
        } else {
            try {
                String token = authHeader.substring(TOKEN_PREFIX.length());
                Claims claims = Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody();
                List<String> roles = (List<String>) claims.get(AUTHORITIES_KEY);
                return new RolesModel(roles);
            } catch (JwtException e){
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid token.");
                return null;
            }
        }
    }
}