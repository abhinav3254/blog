package com.abhinav3254.clothing.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClothDTO {
    private Long clothId;
    private String name;
    private String image;
    private Long clothPrice;
}
