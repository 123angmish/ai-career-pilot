package com.careerpilot.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.careerpilot.entity.Application;
import com.careerpilot.entity.Job;
import com.careerpilot.entity.User;

import jakarta.transaction.Transactional;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {

    // Check if a user has already applied for a job
    Optional<Application> findByUserAndJob(User user, Job job);

    // Get all applications of a user
    List<Application> findByUser(User user);

    // Get all applicants for a job
    List<Application> findByJob(Job job);
    
    @Modifying
    @Transactional
    void deleteByUser(User user);
    
    @Modifying
    @Transactional
    void deleteByJob(Job job);
    
    @Query("""
    	       SELECT a.status, COUNT(a)
    	       FROM Application a
    	       GROUP BY a.status
    	       """)
    	List<Object[]> countApplicationsByStatus();
}