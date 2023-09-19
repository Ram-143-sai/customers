package com.lalith.customer.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Document(collection = "customers")
public class Customer {
        @Id
        private String customerKey;
        @NotNull(message = "customerId should not be empty!")
        private String customerId;
        private String firstName;
        private String lastName;
        private String addressLine1;
        private String addressLine2;
        private String city;
        private String state;
        private String zipCode;
        private String country;
        private String phoneNo;
        private String emailId;
        private String status = "Active";
}
