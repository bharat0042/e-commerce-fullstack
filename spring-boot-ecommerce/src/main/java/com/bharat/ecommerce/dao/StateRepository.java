package com.bharat.ecommerce.dao;

import com.bharat.ecommerce.entity.State;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin("http://localhost:4200")
public interface StateRepository extends JpaRepository<State, Integer> {

    Page<State> findByCountryId(@RequestParam("id") int id, Pageable pageable);
}
