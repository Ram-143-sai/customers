package com.lalith.customer.repository;

import com.lalith.customer.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends MongoRepository<Order,String> {
    Order findByOrderNo(String orderNo);
    List<Order> findByCustomerPhoneNo(String phoneNo);

    List<Order> findByCustomerId(String customerId);
}
