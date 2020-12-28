package com.bharat.ecommerce.dao;

import com.bharat.ecommerce.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
public interface CountryRepository extends JpaRepository<Country, Integer> {

}
