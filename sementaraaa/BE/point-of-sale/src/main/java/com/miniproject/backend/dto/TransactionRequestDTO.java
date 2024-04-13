package com.miniproject.backend.dto;

import java.util.List;

public class TransactionRequestDTO {
    private Integer totalAmount;
    private Integer totalPay;
    private List<TransactionDetailsDTO> transaction_details;
	
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
	public List<TransactionDetailsDTO> getTransaction_details() {
		return transaction_details;
	}
	public void setTransaction_details(List<TransactionDetailsDTO> transaction_details) {
		this.transaction_details = transaction_details;
	}

    
    
}
