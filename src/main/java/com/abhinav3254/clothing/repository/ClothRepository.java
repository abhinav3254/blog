package com.abhinav3254.clothing.repository;


import com.abhinav3254.clothing.model.Cloth;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface ClothRepository extends JpaRepository<Cloth,Long> {

    @Query("SELECT c FROM Cloth c WHERE " +
            "LOWER(c.productName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "CAST(c.price AS string) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(c.description) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(c.category) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(c.brand) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(c.occasion) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(c.gender) LIKE LOWER(CONCAT('', :query, ''))")
    Page<Cloth> searchCloths(String query, Pageable pageable);
}
