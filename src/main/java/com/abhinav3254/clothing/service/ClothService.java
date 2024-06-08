package com.abhinav3254.clothing.service;


import com.abhinav3254.clothing.dto.ClothDTO;
import com.abhinav3254.clothing.exception.CustomException;
import com.abhinav3254.clothing.model.Cloth;
import com.abhinav3254.clothing.repository.ClothRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
public class ClothService {

    @Autowired
    private ClothRepository clothRepository;

    public Page<ClothDTO> getAllCloths(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Cloth> clothsPage = clothRepository.findAll(pageable);

        return clothsPage.map(cloth -> {
            ClothDTO clothDTO = new ClothDTO();
            clothDTO.setClothId(cloth.getId());
            clothDTO.setName(cloth.getProductName());
            clothDTO.setImage(cloth.getImage1());
            clothDTO.setClothPrice(cloth.getPrice());
            return clothDTO;
        });
    }

    public List<String> getAllCategory() {
        List<Cloth> clothList = clothRepository.findAll();
        HashSet<String> categories = new HashSet<>();
        for (Cloth cloth:clothList) {
            categories.add(cloth.getCategory());
        }
        return new ArrayList<>(categories);
    }

    public Cloth findById(Long id) {
        Optional<Cloth> clothOptional = this.clothRepository.findById(id);
        if (clothOptional.isEmpty()) throw new CustomException("Id not found", HttpStatus.NOT_FOUND);
        return clothOptional.get();
    }

    public Page<ClothDTO> getByQuery(String query,int page,int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Cloth> clothsPage = clothRepository.searchCloths(query,pageable);

        return clothsPage.map(cloth -> {
            ClothDTO clothDTO = new ClothDTO();
            clothDTO.setClothId(cloth.getId());
            clothDTO.setName(cloth.getProductName());
            clothDTO.setImage(cloth.getImage1());
            clothDTO.setClothPrice(cloth.getPrice());
            return clothDTO;
        });
    }
}
