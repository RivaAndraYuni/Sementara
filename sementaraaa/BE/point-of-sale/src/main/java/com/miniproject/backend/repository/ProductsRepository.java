package com.miniproject.backend.repository;

import com.miniproject.backend.model.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductsRepository extends JpaRepository<Products, Integer> {
    List<Products> findByCategoryId(Integer categoryId);
    List<Products> findByTitleContainingIgnoreCase(String title);
    List<Products> findByPrice(Integer price);
}

