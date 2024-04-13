package com.miniproject.backend.service.impl;

import com.miniproject.backend.dto.ProductDetailsDTO;
import com.miniproject.backend.dto.ProductsDTO;
import com.miniproject.backend.model.Categories;
import com.miniproject.backend.model.Products;
import com.miniproject.backend.repository.CategoriesRepository;
import com.miniproject.backend.repository.ProductsRepository;
import com.miniproject.backend.service.ProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductsServiceImpl implements ProductsService {

    @Autowired
    private ProductsRepository productsRepository;

    @Autowired
    private CategoriesRepository categoriesRepository;

    @Override
    public List<ProductsDTO> getAllProducts() {
        List<Products> productsList = productsRepository.findAll();
        return productsList.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductsDTO> getProductsByCategoryId(Integer categoryId) {
        List<Products> productsList = productsRepository.findByCategoryId(categoryId);
        return productsList.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductsDTO> searchProductsByTitle(String title) {
        List<Products> productsList = productsRepository.findByTitleContainingIgnoreCase(title);
        return productsList.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<ProductsDTO> getProductsByPrice(Integer price) {
        List<Products> productsList = productsRepository.findByPrice(price);
        return productsList.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }


    @Override
    public ProductDetailsDTO getProductById(Integer id) {
        Products product = productsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
                
        ProductDetailsDTO productDetailsDTO = new ProductDetailsDTO();
        productDetailsDTO.setId(product.getId());
        productDetailsDTO.setTitle(product.getTitle());
        productDetailsDTO.setImage(product.getImage());
        productDetailsDTO.setPrice(product.getPrice());
        productDetailsDTO.setCategoryId(product.getCategory().getId());
        productDetailsDTO.setCategoryName(product.getCategory().getName());
        
        return productDetailsDTO;
    }


    
    @Override
    public ProductsDTO addProduct(ProductsDTO productDTO) {
        Products product = convertToEntity(productDTO);
        Products savedProduct = productsRepository.save(product);
        return convertToDTO(savedProduct);
    }

    @Override
    public ProductsDTO updateProduct(Integer id, ProductsDTO productDTO) {
        Products existingProduct = productsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

        existingProduct.setTitle(productDTO.getTitle());
        existingProduct.setImage(productDTO.getImage());
        existingProduct.setPrice(productDTO.getPrice());

        Categories category = categoriesRepository.findById(productDTO.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + productDTO.getCategoryId()));

        existingProduct.setCategory(category);

        Products updatedProduct = productsRepository.save(existingProduct);
        return convertToDTO(updatedProduct);
    }

    @Override
    public void deleteProduct(Integer id) {
        Products existingProduct = productsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
     
        productsRepository.delete(existingProduct);
    }

    private ProductsDTO convertToDTO(Products product) {
        ProductsDTO productDTO = new ProductsDTO();
        productDTO.setId(product.getId());
        productDTO.setTitle(product.getTitle());
        productDTO.setImage(product.getImage());
        productDTO.setPrice(product.getPrice());
        productDTO.setCategoryId(product.getCategory().getId());
        return productDTO;
    }

    private Products convertToEntity(ProductsDTO productDTO) {
        Products product = new Products();
        product.setTitle(productDTO.getTitle());
        product.setImage(productDTO.getImage());
        product.setPrice(productDTO.getPrice());

        Categories category = categoriesRepository.findById(productDTO.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + productDTO.getCategoryId()));

        product.setCategory(category);
        return product;
    }

   
}