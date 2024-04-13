package com.miniproject.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.miniproject.backend.dto.ResponseDTO;
import com.miniproject.backend.dto.TransactionRequestDTO;
import com.miniproject.backend.dto.TransactionsDTO;
import com.miniproject.backend.service.TransactionsService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/pos/api")
public class TransactionsController {

    @Autowired
    private TransactionsService transactionsService;

    @PostMapping("/addtransaction")
    public ResponseEntity<ResponseDTO> addTransaction(@RequestBody TransactionRequestDTO requestDTO) {
        ResponseDTO responseDTO = transactionsService.addTransaction(requestDTO);
        return ResponseEntity.ok().body(responseDTO);
    }
    
    @GetMapping("/listtransactions")
    public ResponseEntity<List<TransactionsDTO>> getAllTransactions() {
        List<TransactionsDTO> transactionsList = transactionsService.getAllTransactions();
        return ResponseEntity.ok().body(transactionsList);
    }
    @GetMapping("/transaction/{id}")
    public ResponseEntity<TransactionsDTO> getTransactionById(@PathVariable Integer id) {
        TransactionsDTO transaction = transactionsService.getTransactionById(id);
        return ResponseEntity.ok().body(transaction);
    }
}
