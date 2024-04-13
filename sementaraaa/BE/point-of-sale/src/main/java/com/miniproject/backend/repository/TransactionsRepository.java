package com.miniproject.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.miniproject.backend.model.Transactions;

public interface TransactionsRepository extends JpaRepository<Transactions, Integer>{

}
