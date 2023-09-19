package com.lalith.customer.controller;

import com.lalith.customer.exception.CustomErrorResponse;
import com.lalith.customer.model.Customer;
import com.lalith.customer.service.CustomerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/customers")
@Validated
public class CustomerController {
    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> createCustomer(@Valid @RequestBody Customer customer) {
        try {
            Customer createdCustomer = customerService.createCustomer(customer);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdCustomer);
        } catch (ResponseStatusException e) {
            CustomErrorResponse errorResponse = new CustomErrorResponse(e.getReason());
            return ResponseEntity.status(e.getStatusCode()).body(errorResponse);
        }
    }

    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> getAllCustomers() {
        try {
            List<Customer> customers = customerService.getAllCustomers();
            return ResponseEntity.ok(customers);
        } catch (ResponseStatusException e) {
            CustomErrorResponse errorResponse = new CustomErrorResponse(e.getReason());
            return ResponseEntity.status(e.getStatusCode()).body(errorResponse);
        }
    }

    @GetMapping("/{customerId}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> getCustomerByCustomerId(@PathVariable String customerId) {
        try {
            Optional<Customer> customer = customerService.getCustomerByCustomerId(customerId);
            return ResponseEntity.ok(customer);
        } catch (ResponseStatusException e) {
            CustomErrorResponse errorResponse = new CustomErrorResponse(e.getReason());
            return ResponseEntity.status(e.getStatusCode()).body(errorResponse);
        }
    }

    @GetMapping("/email")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> getCustomerByEmailId(@RequestParam String emailId) {
        try {
            Optional<Customer> customer = customerService.getCustomerByEmailId(emailId);
            if (customer.isPresent()) {
                return ResponseEntity.ok(customer.get());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (ResponseStatusException e) {
            CustomErrorResponse errorResponse = new CustomErrorResponse(e.getReason());
            return ResponseEntity.status(e.getStatusCode()).body(errorResponse);
        }
    }

    @GetMapping("/status")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> getCustomerByStatus(@RequestParam String status) {
        try {
            List<Customer> customers = customerService.getAllCustomerByStatus(status);
            if (!customers.isEmpty()) {
                return ResponseEntity.ok(customers);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (ResponseStatusException e) {
            CustomErrorResponse errorResponse = new CustomErrorResponse(e.getReason());
            return ResponseEntity.status(e.getStatusCode()).body(errorResponse);
        }
    }

    @PutMapping("/{customerId}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> updateCustomer(
            @PathVariable String customerId,
            @RequestBody Customer updatedCustomer) {
        try {
            Customer updated = customerService.updateCustomer(customerId, updatedCustomer);
            return ResponseEntity.ok(updated);
        } catch (ResponseStatusException e) {
            CustomErrorResponse errorResponse = new CustomErrorResponse(e.getReason());
            return ResponseEntity.status(e.getStatusCode()).body(errorResponse);
        }
    }

    @DeleteMapping("/{customerId}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> deleteCustomer(@PathVariable String customerId) {
        try {
            String response = customerService.deleteCustomer(customerId);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (ResponseStatusException e) {
            CustomErrorResponse errorResponse = new CustomErrorResponse(e.getReason());
            return ResponseEntity.status(e.getStatusCode()).body(errorResponse);
        }
    }
}