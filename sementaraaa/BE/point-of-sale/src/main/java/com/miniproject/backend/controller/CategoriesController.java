package com.miniproject.backend.controller;

import com.miniproject.backend.dto.CategoriesDTO;
import com.miniproject.backend.dto.ResponseDTO;
import com.miniproject.backend.service.CategoriesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/pos/api")
public class CategoriesController {

    @Autowired
    private CategoriesService categoriesService;

    @GetMapping("/listcategory")
    public List<CategoriesDTO> getAllCategories() {
        return categoriesService.getAllCategories();
    }

    @GetMapping("/category/{id}")
    public CategoriesDTO getCategoryById(@PathVariable Integer id) {
        return categoriesService.getCategoryById(id);
    }

    @PostMapping("/addcategory")
    public ResponseDTO addCategory(@RequestBody CategoriesDTO categoryDTO) {
        categoriesService.addCategory(categoryDTO);
        return createSuccessResponse();
    }

    @PutMapping("/updatecategory/{id}")
    public ResponseDTO updateCategory(@PathVariable Integer id, @RequestBody CategoriesDTO categoryDTO) {
       categoriesService.updateCategory(id, categoryDTO);
        return createSuccessResponse();
    }

    @DeleteMapping("/deletecategory/{id}")
    public ResponseDTO deleteCategory(@PathVariable Integer id) {
        categoriesService.deleteCategory(id);
        return createSuccessResponse();
    }

    private ResponseDTO createSuccessResponse() {
        ResponseDTO responseDTO = new ResponseDTO();
        responseDTO.setStatus("ok");
        responseDTO.setMessage("success");
        return responseDTO;
    }
}
