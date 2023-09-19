package com.lalith.customer.controller;

import com.lalith.customer.dto.OrderSubmission;
import com.lalith.customer.exception.CustomErrorResponse;
import com.lalith.customer.model.Order;
import com.lalith.customer.service.OrderService;
import com.lalith.customer.service.RewardService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/orders")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService, RewardService rewardService) {
        this.orderService = orderService;
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> createOrder(@RequestBody OrderSubmission orderSubmission) {
        Order order = orderSubmission.getOrderModalData();
        String withCoins = orderSubmission.getWithCoinsData();
        String orderNo = order.getOrderNo();
        if (orderNo == null) {
            orderNo = orderService.generateOrderNo();
            order.setOrderNo(orderNo);
        }
        if(withCoins.equalsIgnoreCase("No")) {
            try {
                Order createdOrder = orderService.createOrderWithoutRedeem(order);
                return ResponseEntity.status(HttpStatus.CREATED).body(createdOrder);
            } catch (ResponseStatusException e) {
                CustomErrorResponse errorResponse = new CustomErrorResponse(e.getReason());
                return ResponseEntity.status(e.getStatusCode()).body(errorResponse);
            }
        }else{
            try {
                Order createdNewOrder = orderService.createOrderWithRedeem(order);
                return ResponseEntity.status(HttpStatus.CREATED).body(createdNewOrder);
            } catch (ResponseStatusException e) {
                CustomErrorResponse errorResponse = new CustomErrorResponse(e.getReason());
                return ResponseEntity.status(e.getStatusCode()).body(errorResponse);
            }
        }
    }

    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> getAllOrders() {
        try {
            List<Order> orders = orderService.getAllOrders();
            return ResponseEntity.ok(orders);
        } catch (ResponseStatusException e) {
            CustomErrorResponse errorResponse = new CustomErrorResponse(e.getReason());
            return ResponseEntity.status(e.getStatusCode()).body(errorResponse);
        }
    }

    @GetMapping("/byOrder/{orderNo}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> getOrderByOrderNo(@PathVariable String orderNo) {
        try {
            Order order = orderService.getOrderByOrderNo(orderNo);
            return ResponseEntity.ok(order);
        } catch (ResponseStatusException e) {
            CustomErrorResponse errorResponse = new CustomErrorResponse(e.getReason());
            return ResponseEntity.status(e.getStatusCode()).body(errorResponse);
        }
    }

    @GetMapping("/byPhone/{phoneNo}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> getOrdersByPhoneNo(@RequestParam String phoneNo) {
        try {
            List<Order> orders = orderService.getOrdersByPhoneNo(phoneNo);
            return ResponseEntity.ok(orders);
        } catch (ResponseStatusException e) {
            CustomErrorResponse errorResponse = new CustomErrorResponse(e.getReason());
            return ResponseEntity.status(e.getStatusCode()).body(errorResponse);
        }
    }

    @GetMapping("/{customerId}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> getOrdersByCustomerId(@PathVariable String customerId) {
        try {
            List<Order> orders = orderService.getOrdersByCustomerId(customerId);
            return ResponseEntity.ok(orders);
        } catch (ResponseStatusException e) {
            CustomErrorResponse errorResponse = new CustomErrorResponse(e.getReason());
            return ResponseEntity.status(e.getStatusCode()).body(errorResponse);
        }
    }

    @PutMapping("/{orderNo}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> updateOrder(
            @PathVariable String orderNo,
            @RequestBody Order updatedOrder) {
        try {
            Order updated = orderService.updateOrder(orderNo, updatedOrder);
            return ResponseEntity.ok(updated);
        } catch (ResponseStatusException e) {
            CustomErrorResponse errorResponse = new CustomErrorResponse(e.getReason());
            return ResponseEntity.status(e.getStatusCode()).body(errorResponse);
        }
    }

    @DeleteMapping("/{orderNo}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> deleteOrder(@PathVariable String orderNo) {
        try {
            orderService.deleteOrder(orderNo);
            return ResponseEntity.ok("Order with " + orderNo + " has been deleted successfully");
        } catch (ResponseStatusException e) {
            CustomErrorResponse errorResponse = new CustomErrorResponse(e.getReason());
            return ResponseEntity.status(e.getStatusCode()).body(errorResponse);
        }
    }
}