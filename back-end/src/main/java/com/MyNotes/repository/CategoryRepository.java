package com.MyNotes.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.MyNotes.entity.Category;

public interface CategoryRepository extends JpaRepository<Category,Integer>{

	public Category findByName(String name);
}
