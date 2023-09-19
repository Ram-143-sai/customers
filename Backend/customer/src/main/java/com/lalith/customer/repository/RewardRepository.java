package com.lalith.customer.repository;

import com.lalith.customer.model.Reward;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RewardRepository extends MongoRepository<Reward,String> {
    List<Reward> findByCustomerId(String customerId);

    Optional<Object> findByRewardsId(String rewardsId);
}
