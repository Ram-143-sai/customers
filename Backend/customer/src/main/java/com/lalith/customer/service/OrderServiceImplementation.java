package com.lalith.customer.service;

import com.lalith.customer.model.Order;
import com.lalith.customer.model.Reward;
import com.lalith.customer.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class OrderServiceImplementation implements OrderService {
    private final OrderRepository orderRepository;
    private final RewardService rewardService;

    @Autowired
    public OrderServiceImplementation(OrderRepository orderRepository, RewardService rewardService) {
        this.orderRepository = orderRepository;
        this.rewardService = rewardService;
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Order createOrderWithoutRedeem(Order order) {
        String orderNo = order.getOrderNo();

        Order existingOrder = orderRepository.findByOrderNo(orderNo);
        if (existingOrder != null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "An order with the same orderNo already exists.");
        }

        if (orderNo == null) {
            orderNo = generateOrderNo();
            order.setOrderNo(orderNo);
        }

        Reward reward = rewardService.createReward(order.getCustomerId(), order.getOrderTotal(), order.getOrderNo());

        order.setReward(reward);
        order.setOrderDate(LocalDateTime.now());
        order.setLastModifiedTS(LocalDateTime.now());

        if (order.getOrderStatus() == null) {
            order.setOrderStatus("Created");
        }

        return orderRepository.save(order);
    }

    @Override
    public Order createOrderWithRedeem(Order order) {

        double rewardCoins = rewardService.getRewardBalanceOfCustomer(order.getCustomerId());
        double totalAmount = order.getOrderTotal();
        double grandTotal;

        if(rewardCoins>=1000){
            grandTotal = totalAmount-rewardCoins;
        }else {
            grandTotal = totalAmount;
        }

        order.setOrderTotal(grandTotal);
        order.setReward(rewardService.createRewardWithRedeem(order.getCustomerId(),grandTotal, order.getOrderNo(), totalAmount-grandTotal));
        String orderNo = order.getOrderNo();

        Order existingOrder = orderRepository.findByOrderNo(orderNo);
        if (existingOrder != null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "An order with the same orderNo already exists.");
        }

        order.setOrderDate(LocalDateTime.now());
        order.setLastModifiedTS(LocalDateTime.now());
        if (order.getOrderStatus() == null) {
            order.setOrderStatus("Created");
        }
        return orderRepository.save(order);
    }

    public String generateOrderNo() {
        UUID uuid = UUID.randomUUID();
        return "O" + uuid.toString().replace("-", "").substring(0, 3);
    }

    @Override
    public Order updateOrder(String orderNo, Order updatedOrder) {
        Optional<Order> existingOrderOptional = Optional.ofNullable(orderRepository.findByOrderNo(orderNo));
        if (!existingOrderOptional.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Order with orderNo " + orderNo + " not found.");
        }

        Order existingOrder = existingOrderOptional.get();

        updatedOrder.setOrderKey(existingOrder.getOrderKey());
        updatedOrder.setOrderNo(existingOrder.getOrderNo());

        if (updatedOrder.getOrderStatus() == null) {
            updatedOrder.setOrderStatus(existingOrder.getOrderStatus());
        }

        if (updatedOrder.getOrderDate() == null) {
            updatedOrder.setOrderDate(existingOrder.getOrderDate());
        }

        if (updatedOrder.getTotalItems() == 0) {
            updatedOrder.setTotalItems(existingOrder.getTotalItems());
        }

        if (updatedOrder.getOrderTotal() == 0.0) {
            updatedOrder.setOrderTotal(existingOrder.getOrderTotal());
        }

        if (updatedOrder.getCurrency() == null) {
            updatedOrder.setCurrency(existingOrder.getCurrency());
        }

        updatedOrder.setLastModifiedTS(LocalDateTime.now());

        return orderRepository.save(updatedOrder);
    }

    @Override
    public void deleteOrder(String orderNo) {
        Optional<Order> existingOrderOptional = Optional.ofNullable(orderRepository.findByOrderNo(orderNo));
        if (!existingOrderOptional.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Order with orderNo " + orderNo + " not found.");
        }

        Order existingOrder = existingOrderOptional.get();

        if ("Shipped".equalsIgnoreCase(existingOrder.getOrderStatus())) {
            LocalDateTime currentTimestamp = LocalDateTime.now();
            LocalDateTime lastModifiedTimestamp = existingOrder.getLastModifiedTS();
            long monthsDifference = currentTimestamp.getMonthValue() - lastModifiedTimestamp.getMonthValue();

            if (monthsDifference >= 3) {
                orderRepository.delete(existingOrder);
            } else {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Order cannot be deleted as it is not in Shipped status or the difference between the current date and last order modified date is less than 3 months.");
            }
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Order cannot be deleted as it is not in Shipped status.");
        }
    }

    @Override
    public Order getOrderByOrderNo(String orderNo) {
        Optional<Order> order = Optional.ofNullable(orderRepository.findByOrderNo(orderNo));
        if (order.isPresent()) {
            return order.get();
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Order with orderNo " + orderNo + " not found.");
        }
    }


    @Override
    public List<Order> getOrdersByPhoneNo(String phoneNo) {
        List<Order> orders = orderRepository.findByCustomerPhoneNo(phoneNo);
        if (orders.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No orders found for phone number: " + phoneNo);
        }
        return orders;
    }

    @Override
    public List<Order> getOrdersByCustomerId(String customerId) {
        List<Order> orders = orderRepository.findByCustomerId(customerId);
        if (orders.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No orders found for customer Id: " + customerId);
        }
        return orders;
    }


}