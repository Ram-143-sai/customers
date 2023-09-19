package com.lalith.customer.dto;
import com.lalith.customer.model.Order;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class OrderSubmission {
    private Order orderModalData;
    public String withCoinsData;
}