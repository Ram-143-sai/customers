package com.lalith.customer.controller;

import com.lalith.customer.exception.CustomErrorResponse;
import com.lalith.customer.model.Reward;
import com.lalith.customer.service.RewardService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/rewards")
public class RewardController {
    private final RewardService rewardService;

    public RewardController(RewardService rewardService) {
        this.rewardService = rewardService;
    }

    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> getAllCustomers() {
        try {
            List<Reward> customers = rewardService.getAllRewards();
            return ResponseEntity.ok(customers);
        } catch (ResponseStatusException e) {
            CustomErrorResponse errorResponse = new CustomErrorResponse(e.getReason());
            return ResponseEntity.status(e.getStatusCode()).body(errorResponse);
        }
    }

    @GetMapping("/{customerId}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<List<Reward>> getRewardsByCustomerId(@PathVariable String customerId) {
        List<Reward> rewards = rewardService.getRewardsByCustomerId(customerId);
        return ResponseEntity.ok(rewards);
    }

    @GetMapping("/rewardDetails/{customerId}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<List<Double>> getRewardBalance(@PathVariable String customerId) {
        List<Double> rewardBalance = rewardService.getRewardDetails(customerId);
        return ResponseEntity.ok(rewardBalance);
    }
}