package com.MyNotes.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.MyNotes.entity.TODO;

public interface TODORepository extends  JpaRepository<TODO,Integer>{

}
