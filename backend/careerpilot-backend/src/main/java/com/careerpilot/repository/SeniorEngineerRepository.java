package com.careerpilot.repository;

import com.careerpilot.entity.SeniorEngineer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SeniorEngineerRepository extends JpaRepository<SeniorEngineer, Long> {
}
