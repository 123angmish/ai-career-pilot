-- =============================================================================
-- CareerPilot Production MySQL Database DDL Schema
-- Database: careerpilot_db
-- =============================================================================

CREATE DATABASE IF NOT EXISTS careerpilot_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE careerpilot_db;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    target_role VARCHAR(150),
    experience_level VARCHAR(50),
    skills TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Resumes Table
CREATE TABLE IF NOT EXISTS resumes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    file_name VARCHAR(255),
    file_path VARCHAR(500),
    extracted_text LONGTEXT,
    ats_score INT,
    summary TEXT,
    skills TEXT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Senior Engineers Table (Real Mock Interviewers)
CREATE TABLE IF NOT EXISTS senior_engineers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    role VARCHAR(150) NOT NULL,
    company VARCHAR(150) NOT NULL,
    experience_years INT NOT NULL,
    expertise VARCHAR(255),
    rating DOUBLE DEFAULT 4.9,
    reviews_count INT DEFAULT 0,
    fee_inr INT NOT NULL,
    fee_usd INT NOT NULL,
    avatar_bg VARCHAR(100),
    available_slots VARCHAR(255),
    email VARCHAR(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Mock Bookings Table
CREATE TABLE IF NOT EXISTS mock_bookings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    booking_id VARCHAR(100) UNIQUE NOT NULL,
    engineer_id BIGINT NOT NULL,
    engineer_name VARCHAR(150) NOT NULL,
    engineer_email VARCHAR(150) NOT NULL,
    candidate_email VARCHAR(150) NOT NULL,
    time_slot VARCHAR(100) NOT NULL,
    interview_type VARCHAR(100) NOT NULL,
    fee_paid VARCHAR(50) NOT NULL,
    meeting_link VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'SCHEDULED',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (engineer_id) REFERENCES senior_engineers(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Live Chat Messages Table
CREATE TABLE IF NOT EXISTS chat_messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    booking_id VARCHAR(100) NOT NULL,
    sender_email VARCHAR(150) NOT NULL,
    sender_name VARCHAR(150) NOT NULL,
    message_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. Automated Job Applications Table
CREATE TABLE IF NOT EXISTS applications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    company VARCHAR(150) NOT NULL,
    role VARCHAR(150) NOT NULL,
    platform VARCHAR(100) NOT NULL,
    url VARCHAR(500),
    status VARCHAR(50) NOT NULL DEFAULT 'Applied',
    last_activity VARCHAR(255),
    date_added DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 7. Jobs & Saved Jobs Tables
CREATE TABLE IF NOT EXISTS jobs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    company VARCHAR(150) NOT NULL,
    location VARCHAR(150),
    job_type VARCHAR(50),
    description TEXT,
    posted_date DATE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS saved_jobs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    job_id BIGINT,
    saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
