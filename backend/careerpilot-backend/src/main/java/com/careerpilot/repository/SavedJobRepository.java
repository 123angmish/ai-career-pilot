package com.careerpilot.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import com.careerpilot.entity.Job;
import com.careerpilot.entity.SavedJob;
import com.careerpilot.entity.User;

import jakarta.transaction.Transactional;

@Repository
public interface SavedJobRepository extends JpaRepository<SavedJob, Long> {

    // Check if a job is already saved by the user
    Optional<SavedJob> findByUserAndJob(User user, Job job);

    // Get all saved jobs of a user
    List<SavedJob> findByUser(User user);
    
    @Modifying
    @Transactional
    void deleteByUser(User user);
    @Modifying
    @Transactional
    void deleteByJob(Job job);
}