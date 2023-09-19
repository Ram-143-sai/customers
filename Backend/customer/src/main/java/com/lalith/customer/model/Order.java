package com.lalith.customer.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Getter
@Setter
@Document(collection = "orders")
public class Order {
    @Id
    private String orderKey;
    @NotNull(message = "orderNo should not be empty!")
    private String orderNo;
    private Reward reward;
    private String customerId;
    private LocalDateTime orderDate = LocalDateTime.now();
    private String orderStatus = "Created";
    private int totalItems;
    private double orderTotal;
    private String currency;
    private LocalDateTime lastModifiedTS = LocalDateTime.now();
    private String customerPhoneNo;
}