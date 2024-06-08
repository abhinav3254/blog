package com.abhinav3254.clothing.controller;


import com.abhinav3254.clothing.dto.ClothDTO;
import com.abhinav3254.clothing.model.Cloth;
import com.abhinav3254.clothing.service.ClothService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin("*")
@RequestMapping("/cloth")
@RestController
public class ClothController {
    @Autowired
    private ClothService clothService;

    @GetMapping
    public ResponseEntity<?> getAllCloths(
            @RequestParam(value = "page",required = false,defaultValue = "0") int page,
            @RequestParam(value = "size",required = false,defaultValue = "20") int size
            ) {
        return ResponseEntity.ok(clothService.getAllCloths(page,size));
    }

    @GetMapping("/category")
    public List<String> getAllCategory() {
        return clothService.getAllCategory();
    }

    @GetMapping("/{id}")
    public Cloth findById(@PathVariable("id")Long id) {
        return clothService.findById(id);
    }

    @GetMapping("/search")
    public Page<ClothDTO> getByQuery(
            @RequestParam("query")String query,
            @RequestParam(value = "page",required = false,defaultValue = "0") int page,
            @RequestParam(value = "size",required = false,defaultValue = "20") int size
    ) {
        System.out.println(query);
        return clothService.getByQuery(query,page,size);
    }

}
