package com.miniproject.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.miniproject.backend.model.TransactionDetails;

public interface TransactionDetailsRepository extends JpaRepository<TransactionDetails, Integer> {
}
