package com.miniproject.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.miniproject.backend.model.Categories;

public interface CategoriesRepository extends JpaRepository<Categories, Integer> {

  
}
