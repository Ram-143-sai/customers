package com.lalith.customer.controller;

import com.lalith.customer.dto.AuthRequest;
import com.lalith.customer.model.AuthenticationResponse;
import com.lalith.customer.model.UserInfo;
import com.lalith.customer.service.JwtService;
import com.lalith.customer.service.UserAdditionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {
    @Autowired
    private UserAdditionService userAdditionService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private AuthenticationManager authenticationManager;
  @PostMapping("/add")
    public AuthenticationResponse addNewUser(@RequestBody UserInfo userInfo){
      return userAdditionService.addUser(userInfo);
  }

    @PostMapping("/authenticate")
    public AuthenticationResponse authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getName(), authRequest.getPassword()));
        if (authentication.isAuthenticated()) {
            return new AuthenticationResponse(jwtService.generateToken(authRequest.getName()),authRequest.getName());
        } else {
            throw new UsernameNotFoundException("invalid user request !");
        }
    }
}
