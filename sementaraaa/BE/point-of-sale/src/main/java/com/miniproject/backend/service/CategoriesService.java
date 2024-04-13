package com.miniproject.backend.service;

import com.miniproject.backend.dto.CategoriesDTO;
import java.util.List;

public interface CategoriesService {
    List<CategoriesDTO> getAllCategories();
    CategoriesDTO getCategoryById(Integer id);
    CategoriesDTO addCategory(CategoriesDTO categoryDTO);
    CategoriesDTO updateCategory(Integer id, CategoriesDTO categoryDTO);
    void deleteCategory(Integer id);
}


