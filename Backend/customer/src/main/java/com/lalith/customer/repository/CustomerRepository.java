package com.lalith.customer.repository;

import com.lalith.customer.model.Customer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerRepository extends MongoRepository<Customer, String> {
    Optional<Customer> findByCustomerId(String customerId);
    Optional<Customer> findByPhoneNo(String phoneNo);
    Optional<Customer> findByEmailId(String emailId);
    List<Customer> findByStatus(String status);
}
