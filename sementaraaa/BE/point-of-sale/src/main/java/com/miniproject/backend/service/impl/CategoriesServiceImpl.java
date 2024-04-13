package com.miniproject.backend.service.impl;

import com.miniproject.backend.dto.CategoriesDTO;
import com.miniproject.backend.model.Categories;
import com.miniproject.backend.repository.CategoriesRepository;
import com.miniproject.backend.service.CategoriesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoriesServiceImpl implements CategoriesService {

    @Autowired
    private CategoriesRepository categoriesRepository;

    @Override
    public List<CategoriesDTO> getAllCategories() {
        List<Categories> categoriesList = categoriesRepository.findAll();
        return categoriesList.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public CategoriesDTO getCategoryById(Integer id) {
        Categories category = categoriesRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));
        return convertToDTO(category);
    }

    @Override
    public CategoriesDTO addCategory(CategoriesDTO categoryDTO) {
        Categories category = convertToEntity(categoryDTO);
        Categories savedCategory = categoriesRepository.save(category);
        return convertToDTO(savedCategory);
    }

    @Override
    public CategoriesDTO updateCategory(Integer id, CategoriesDTO categoryDTO) {
        Categories existingCategory = categoriesRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));

        existingCategory.setName(categoryDTO.getName());

        Categories updatedCategory = categoriesRepository.save(existingCategory);
        return convertToDTO(updatedCategory);
    }

    @Override
    public void deleteCategory(Integer id) {
        categoriesRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));
        categoriesRepository.deleteById(id);
    }
    
    
    private CategoriesDTO convertToDTO(Categories category) {
        CategoriesDTO categoryDTO = new CategoriesDTO();
        categoryDTO.setId(category.getId());
        categoryDTO.setName(category.getName());
        return categoryDTO;
    }

    private Categories convertToEntity(CategoriesDTO categoryDTO) {
        Categories category = new Categories();
        category.setName(categoryDTO.getName());
        return category;
    }

}

