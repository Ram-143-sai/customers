package com.lalith.customer.service;

import com.lalith.customer.model.Customer;
import java.util.List;
import java.util.Optional;

public interface CustomerService {
    List<Customer> getAllCustomers();
    List<Customer> getAllCustomerByStatus(String status);
    Optional<Customer> getCustomerByEmailId(String emailId);
    Customer createCustomer(Customer customer);
    Customer updateCustomer(String customerId, Customer updatedCustomer);
    String deleteCustomer(String customerId);

    Optional<Customer> getCustomerByCustomerId(String customerId);
}
