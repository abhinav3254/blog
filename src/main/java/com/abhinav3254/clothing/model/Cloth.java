package com.abhinav3254.clothing.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "cloth")
public class Cloth {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "product_name", length = 255)
    private String productName;

    @Column(name = "price")
    private Long price;

    @Column(name = "image_1", columnDefinition = "TEXT")
    private String image1;

    @Column(name = "image_2", columnDefinition = "TEXT")
    private String image2;

    @Column(name = "image_3", columnDefinition = "TEXT")
    private String image3;

    @Column(name = "image_4", columnDefinition = "TEXT")
    private String image4;

    @Column(name = "image_5", columnDefinition = "TEXT")
    private String image5;

    @Column(name = "image_6", columnDefinition = "TEXT")
    private String image6;

    @Column(name = "description", columnDefinition = "TEXT", nullable = true)
    private String description;

    @Column(name = "product_id")
    private Long productId;

    @Column(name = "category", length = 255)
    private String category;

    @Column(name = "brand", length = 255, nullable = true)
    private String brand;

    @Column(name = "rating")
    private Double rating;

    @Column(name = "reviews_count")
    private Long reviewsCount;

    @Column(name = "availability", length = 255)
    private String availability;

    @Column(name = "sizes", length = 255)
    private String sizes;

    @Column(name = "specifications", columnDefinition = "TEXT", nullable = true)
    private String specifications;

    @Column(name = "gender", length = 255)
    private String gender;

    @Column(name = "colors", length = 255)
    private String colors;

    @Column(name = "country", length = 255)
    private String country;

    @Column(name = "occasion", length = 255)
    private String occasion;

    @Column(name = "care_instructions", columnDefinition = "TEXT")
    private String careInstructions;

    @Column(name = "material", length = 255)
    private String material;

    @Column(name = "season", length = 255)
    private String season;
}
