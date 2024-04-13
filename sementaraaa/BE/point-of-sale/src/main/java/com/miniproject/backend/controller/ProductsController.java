package com.miniproject.backend.controller;

import com.miniproject.backend.dto.ProductDetailsDTO;
import com.miniproject.backend.dto.ProductsDTO;
import com.miniproject.backend.dto.ResponseDTO;
import com.miniproject.backend.service.ProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/pos/api")
public class ProductsController {

    @Autowired
    private ProductsService productsService;

    @GetMapping("/listproduct")
    public ResponseEntity<Object> getAllProducts(
            @RequestParam(name = "sort_by", required = false) String sortBy,
            @RequestParam(name = "sort_order", required = false) String sortOrder,
            @RequestParam(name = "title", required = false) String title,
            @RequestParam(name = "category_id", required = false) Integer categoryId,
            @RequestParam(name = "price", required = false) Integer price
    ) {
    	
        List<ProductsDTO> products;

        if (categoryId != null) {
            products = productsService.getProductsByCategoryId(categoryId);
            if (products.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }
        else if (title != null && !title.isEmpty()) {
            products = productsService.searchProductsByTitle(title);
        }
        else if (price != null) {
            products = productsService.getProductsByPrice(price);
        }
        else {
            products = productsService.getAllProducts();
        }

        if (sortBy != null && sortOrder != null) {
            if ("title".equalsIgnoreCase(sortBy)) {
                products.sort((p1, p2) -> {
                    if ("asc".equalsIgnoreCase(sortOrder)) {
                        return p1.getTitle().compareToIgnoreCase(p2.getTitle());
                    } else {
                        return p2.getTitle().compareToIgnoreCase(p1.getTitle());
                    }
                });
            } else if ("price".equalsIgnoreCase(sortBy)) {
                products.sort((p1, p2) -> {
                    if ("asc".equalsIgnoreCase(sortOrder)) {
                        return Integer.compare(p1.getPrice(), p2.getPrice());
                    } else {
                        return Integer.compare(p2.getPrice(), p1.getPrice());
                    }
                });
            }
        }

        return new ResponseEntity<>(products, HttpStatus.OK);
    }


    @PostMapping("/addproduct")
    public ResponseEntity<Object> addProduct(@RequestBody ProductsDTO productDTO) {
        productsService.addProduct(productDTO);
        ResponseDTO responseDTO = createSuccessResponse();
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    @PutMapping("/updateproduct/{id}")
    public ResponseEntity<Object> updateProduct(@PathVariable Integer id, @RequestBody ProductsDTO productDTO) {
        productsService.updateProduct(id, productDTO);
        ResponseDTO responseDTO = createSuccessResponse();
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    @DeleteMapping("/deleteproduct/{id}")
    public ResponseEntity<Object> deleteProduct(@PathVariable Integer id) {
        productsService.deleteProduct(id);
        return new ResponseEntity<>(createSuccessResponse(), HttpStatus.OK);
    }

    @GetMapping("/detailproduct/{id}")
    public ResponseEntity<Object> getProductById(@PathVariable Integer id) {
        ProductDetailsDTO productDetailsDTO = productsService.getProductById(id);
        return new ResponseEntity<>(productDetailsDTO, HttpStatus.OK);
    }

    private ResponseDTO createSuccessResponse() {
        ResponseDTO responseDTO = new ResponseDTO();
        responseDTO.setStatus("ok");
        responseDTO.setMessage("success");
        return responseDTO;
    }
}