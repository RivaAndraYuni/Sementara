package com.miniproject.backend.service.impl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.miniproject.backend.dto.TransactionDetailsDTO;
import com.miniproject.backend.dto.TransactionRequestDTO;
import com.miniproject.backend.dto.TransactionsDTO;
import com.miniproject.backend.model.Products;
import com.miniproject.backend.model.TransactionDetails;
import com.miniproject.backend.model.Transactions;
import com.miniproject.backend.repository.ProductsRepository;
import com.miniproject.backend.repository.TransactionsRepository;
import com.miniproject.backend.service.TransactionsService;
import com.miniproject.backend.dto.ResponseDTO;

@Service
public class TransactionsServiceImpl implements TransactionsService {
    @Autowired
    private TransactionsRepository transactionsRepository;

    @Autowired
    private ProductsRepository productsRepository;

    @Override
    public List<TransactionsDTO> getAllTransactions() {
        List<Transactions> transactionsList = transactionsRepository.findAll();
        return transactionsList.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public TransactionsDTO getTransactionById(Integer id) {
        Transactions transaction = transactionsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found with id: " + id));
        return convertToDTO(transaction);
    }

    private TransactionsDTO convertToDTO(Transactions transaction) {
        TransactionsDTO dto = new TransactionsDTO();
        dto.setId(transaction.getId());
        dto.setTransactionDate(transaction.getTransactionDate());
        dto.setTotalAmount(transaction.getTotalAmount());
        dto.setTotalPay(transaction.getTotalPay());

        List<TransactionDetailsDTO> transactionDetailsDTOList = transaction.getTransactionDetails().stream()
                .map(this::convertToTransactionDetailsDTO)
                .collect(Collectors.toList());

        dto.setTransactionDetails(transactionDetailsDTOList);

        return dto;
    }


    private TransactionDetailsDTO convertToTransactionDetailsDTO(TransactionDetails transactionDetails) {
        TransactionDetailsDTO dto = new TransactionDetailsDTO();
        dto.setProduct_id(transactionDetails.getProducts().getId());
        dto.setQuantity(transactionDetails.getQuantity());
        dto.setSubtotal(transactionDetails.getSubTotal());
        return dto;
    }


    @Override
    public ResponseDTO addTransaction(TransactionRequestDTO requestDTO) {
        Transactions transaction = new Transactions();
        transaction.setTotalAmount(requestDTO.getTotalAmount());
        transaction.setTotalPay(requestDTO.getTotalPay());
        transaction.setTransactionDate(LocalDate.now());

        List<TransactionDetails> transactionDetailsList = new ArrayList<>();

        for (TransactionDetailsDTO detailDTO : requestDTO.getTransaction_details()) {
            TransactionDetails transactionDetail = new TransactionDetails();
            transactionDetail.setQuantity(detailDTO.getQuantity());
            transactionDetail.setSubTotal(detailDTO.getSubtotal());

            Products product = productsRepository.findById(detailDTO.getProduct_id()).orElse(null);
            if (product == null) {
                throw new RuntimeException("Product not found with id: " + detailDTO.getProduct_id());
            }
            transactionDetail.setProducts(product);
            transactionDetail.setTransactions(transaction);
            transactionDetailsList.add(transactionDetail);
        }

        transaction.setTransactionDetails(transactionDetailsList);

        Transactions savedTransaction = transactionsRepository.save(transaction);

        ResponseDTO responseDTO = new ResponseDTO();
        responseDTO.setStatus("ok");
        responseDTO.setMessage("success");
        return responseDTO;
    }
}
