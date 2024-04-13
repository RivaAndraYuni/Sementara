package com.miniproject.backend.service;

import com.miniproject.backend.dto.ProductDetailsDTO;
import com.miniproject.backend.dto.ProductsDTO;

import java.util.List;

public interface ProductsService {
    List<ProductsDTO> getAllProducts();
    List<ProductsDTO> getProductsByCategoryId(Integer categoryId);
    List<ProductsDTO> searchProductsByTitle(String title);
    List<ProductsDTO> getProductsByPrice(Integer price);
    ProductDetailsDTO getProductById(Integer id); 
    ProductsDTO addProduct(ProductsDTO productDTO);
    ProductsDTO updateProduct(Integer id, ProductsDTO productDTO);
    void deleteProduct(Integer id);
}

