package ru.mera.lib.service;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import ru.mera.lib.entity.User;
import ru.mera.lib.repository.UserRepository;

import java.util.Optional;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserServiceTest {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

//    @Test
//    public void saveUser() throws Exception {
//        String name = "SomeUser";
//        String password = "password";
//        boolean enable = true;
//
//        User user = new User();
//        user.setName(name);
//        user.setPassword(password);
//        user.setEnable(enable);
//
//        userService.saveUser(user);
//
//        User savedUser = userRepository.findByUsernameAndPassword(name, password);
//        assertEquals(name, savedUser.getName());
//        assertEquals(password, savedUser.getPassword());
//        assertEquals(enable, savedUser.isEnable());
//
//        userService.removeUser(savedUser.getId());
//    }

    @Test
    public void findById() throws Exception{
        Optional<User> user = userRepository.findById(28);
        System.out.println(user);
    }
}