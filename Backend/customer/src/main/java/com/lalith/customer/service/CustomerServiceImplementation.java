package com.lalith.customer.service;

import com.lalith.customer.model.Customer;
import com.lalith.customer.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CustomerServiceImplementation implements CustomerService {

    private final CustomerRepository customerRepository;

    @Autowired
    public CustomerServiceImplementation(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    @Override
    public List<Customer> getAllCustomerByStatus(String status) {
        return customerRepository.findByStatus(status);
    }

    @Override
    public Optional<Customer> getCustomerByEmailId(String emailId) {
        return customerRepository.findByEmailId(emailId);
    }

    @Override
    public Customer createCustomer(Customer customer) {
        String customerId = customer.getCustomerId();
        if (customerRepository.findByCustomerId(customer.getCustomerId()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Customer with the same id already exists");
        }

        if (customerRepository.findByPhoneNo(customer.getPhoneNo()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Customer with the same phone number already exists");
        }

        if (customerRepository.findByEmailId(customer.getEmailId()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Customer with the same email address already exists");
        }
        if (customerId == null) {
            customerId = generateCustomerId();
            customer.setCustomerId(customerId);
        }
        return customerRepository.save(customer);
    }

    private String generateCustomerId() {
        UUID uuid = UUID.randomUUID();
        return "C" + uuid.toString().replace("-", "").substring(0, 3);
    }

    @Override
    public Optional<Customer> getCustomerByCustomerId(String customerId) {
        Optional<Optional<Customer>> customer = Optional.ofNullable(customerRepository.findByCustomerId(customerId));
        if (customer.isPresent()) {
            return customer.get();
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Customer with customerID : " + customerId + " not found.");
        }
    }

    @Override
    public Customer updateCustomer(String customerId, Customer updatedCustomer) {
        Optional<Customer> optionalExistingCustomer = customerRepository.findByCustomerId(customerId);

        if (optionalExistingCustomer.isPresent()) {
            Customer existingCustomer = optionalExistingCustomer.get();

            if (updatedCustomer.getCustomerId() != null && !customerId.equals(updatedCustomer.getCustomerId())) {
                throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "Modification of customerId is not allowed.");
            }

            if (updatedCustomer.getCustomerKey() != null && !existingCustomer.getCustomerKey().equals(updatedCustomer.getCustomerKey())) {
                throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "Modification of customerKey is not allowed.");
            }

            if (updatedCustomer.getFirstName() != null) {
                existingCustomer.setFirstName(updatedCustomer.getFirstName());
            }
            if (updatedCustomer.getLastName() != null) {
                existingCustomer.setLastName(updatedCustomer.getLastName());
            }
            if (updatedCustomer.getAddressLine1() != null) {
                existingCustomer.setAddressLine1(updatedCustomer.getAddressLine1());
            }
            if (updatedCustomer.getAddressLine2() != null) {
                existingCustomer.setAddressLine2(updatedCustomer.getAddressLine2());
            }
            if (updatedCustomer.getCity() != null) {
                existingCustomer.setCity(updatedCustomer.getCity());
            }
            if (updatedCustomer.getState() != null) {
                existingCustomer.setState(updatedCustomer.getState());
            }
            if (updatedCustomer.getZipCode() != null) {
                existingCustomer.setZipCode(updatedCustomer.getZipCode());
            }
            if (updatedCustomer.getCountry() != null) {
                existingCustomer.setCountry(updatedCustomer.getCountry());
            }
            if (updatedCustomer.getPhoneNo() != null) {
                existingCustomer.setPhoneNo(updatedCustomer.getPhoneNo());
            }
            if (updatedCustomer.getEmailId() != null) {
                existingCustomer.setEmailId(updatedCustomer.getEmailId());
            }
            if (updatedCustomer.getStatus() != null) {
                existingCustomer.setStatus(updatedCustomer.getStatus());
            }
            return customerRepository.save(existingCustomer);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Customer with id " + customerId + " cannot be found");
        }
    }

    @Override
    public String deleteCustomer(String customerId) {
        Optional<Customer> optionalCustomer = customerRepository.findByCustomerId(customerId);

        if (optionalCustomer.isPresent()) {
            Customer customer = optionalCustomer.get();
            if ("Inactive".equalsIgnoreCase(customer.getStatus())) {
                customerRepository.deleteById(customer.getCustomerKey());
                return "Customer with id " + customerId + " has been deleted successfully!";
            } else {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Customer is not in Inactive status, Hence it cannot be deleted!");
            }
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Customer with Id " + customerId + " cannot be found");
        }
    }
}
