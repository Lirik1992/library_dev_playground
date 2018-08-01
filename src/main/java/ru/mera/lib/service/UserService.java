package ru.mera.lib.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import ru.mera.lib.entity.User;
import ru.mera.lib.repository.UserRepository;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;


@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostConstruct
    public void init(){
        User user = userRepository.findByUsername("trigger");
        if(user == null){
            User admin = new User();
            admin.setUsername("trigger");
            admin.setPassword(bCryptPasswordEncoder.encode("1111"));
            List<String> roles = new ArrayList<>();
            roles.add("ADMIN");
            roles.add("USER");
            admin.setRoles(roles);
            userRepository.save(admin);
        }
    }

    public void create(User user) {
        Assert.isTrue(userRepository.findByUsername(user.getUsername()) == null, "username already exist");
        Assert.notNull(user, "user is null");
        Assert.hasText(user.getUsername(), "username is empty");
        Assert.hasText(user.getPassword(), "password is empty");
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }
}