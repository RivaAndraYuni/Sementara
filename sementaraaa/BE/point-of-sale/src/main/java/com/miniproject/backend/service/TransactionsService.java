package com.miniproject.backend.service;


import java.util.List;

import com.miniproject.backend.dto.ResponseDTO;
import com.miniproject.backend.dto.TransactionRequestDTO;
import com.miniproject.backend.dto.TransactionsDTO;


public interface TransactionsService {

	ResponseDTO addTransaction(TransactionRequestDTO requestDTO);
	List<TransactionsDTO> getAllTransactions();
    TransactionsDTO getTransactionById(Integer id);
    
}
