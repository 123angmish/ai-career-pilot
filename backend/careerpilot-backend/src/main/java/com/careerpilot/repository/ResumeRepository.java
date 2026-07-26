package com.careerpilot.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import com.careerpilot.entity.Resume;
import com.careerpilot.entity.User;

import jakarta.transaction.Transactional;

@Repository
public interface ResumeRepository extends JpaRepository<Resume, Long> {

    Optional<Resume> findByUser(User user);
    
    @Modifying
    @Transactional
    void deleteByUser(User user);

}