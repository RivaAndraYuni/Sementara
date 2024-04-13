package com.miniproject.backend.dto;

import java.time.LocalDate;
import java.util.List;

public class TransactionsDTO {
    
    private Integer id;
    private LocalDate transactionDate;
    private Integer totalAmount;
    private Integer totalPay;
    private List<TransactionDetailsDTO> transactionDetails;
    
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public LocalDate getTransactionDate() {
		return transactionDate;
	}
	public void setTransactionDate(LocalDate transactionDate) {
		this.transactionDate = transactionDate;
	}
	public Integer getTotalAmount() {
		return totalAmount;
	}
	public void setTotalAmount(Integer totalAmount) {
		this.totalAmount = totalAmount;
	}
	public Integer getTotalPay() {
		return totalPay;
	}
	public void setTotalPay(Integer totalPay) {
		this.totalPay = totalPay;
	}
	public List<TransactionDetailsDTO> getTransactionDetails() {
		return transactionDetails;
	}
	public void setTransactionDetails(List<TransactionDetailsDTO> transactionDetails) {
		this.transactionDetails = transactionDetails;
	}
    

}
