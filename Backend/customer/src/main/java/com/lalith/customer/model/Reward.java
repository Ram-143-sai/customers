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
@Document(collection = "rewards")
public class Reward {
    @Id
    private String rewardsKey;
    @NotNull(message = "rewardsId should not be empty!")
    private String rewardsId;
    private String orderNo;
    private String customerId;
    private double rewardsEarned;
    private double rewardsRedeemed;
    private double rewardsBalance;
    private LocalDateTime rewardsDate;
}

