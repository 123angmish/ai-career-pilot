package com.careerpilot.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.careerpilot.dto.ResumeResponse;
import com.careerpilot.entity.Resume;
import com.careerpilot.entity.User;
import com.careerpilot.repository.ResumeRepository;
import com.careerpilot.repository.UserRepository;

@Service
public class ResumeService {

    @Autowired
    private ResumeRepository resumeRepository;

    @Autowired
    private UserRepository userRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;


    private User getOrInitUser(String email) {
        if (email == null || email.isBlank() || email.equalsIgnoreCase("anonymousUser")) {
            email = "demo@careerpilot.dev";
        }
        String finalEmail = email;
        return userRepository.findByEmail(finalEmail).orElseGet(() -> {
            User u = new User();
            u.setEmail(finalEmail);
            u.setFullName("Demo User");
            u.setPassword("password");
            u.setPhoneNumber("+1234567890");
            return userRepository.save(u);
        });
    }

    public ResumeResponse uploadResume(MultipartFile file, String email) throws IOException {

        User user = getOrInitUser(email);

        if (file.isEmpty()) {
            throw new RuntimeException("Please select a file");
        }

        String contentType = file.getContentType();

        if (contentType == null || (!contentType.equals("application/pdf")
                && !contentType.equals("application/vnd.openxmlformats-officedocument.wordprocessingml.document"))) {
            throw new RuntimeException("Only PDF and DOCX files are allowed");
        }

        Resume resume = resumeRepository.findByUser(user)
                .orElse(new Resume());

        if (resume.getFilePath() != null) {
            Path oldPath = Paths.get(resume.getFilePath());

            if (Files.exists(oldPath)) {
                Files.delete(oldPath);
            }
        }

        Path uploadPath = Paths.get(uploadDir);

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

        Path filePath = uploadPath.resolve(fileName);

        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        resume.setFileName(fileName);
        resume.setFileType(contentType);
        resume.setFilePath(filePath.toString());
        resume.setFileSize(file.getSize());
        resume.setUploadedAt(LocalDateTime.now());

        if (resume.getId() == null) {
            resume.setUser(user);
        }

        Resume savedResume = resumeRepository.save(resume);

        return new ResumeResponse(
                savedResume.getId(),
                savedResume.getFileName(),
                savedResume.getFileType(),
                savedResume.getFileSize(),
                savedResume.getUploadedAt()
        );
    }
public ResumeResponse getMyResume(String email) {

    User user = getOrInitUser(email);

    Resume resume = resumeRepository.findByUser(user).orElse(null);
    if (resume == null) {
        return null;
    }

    return new ResumeResponse(
            resume.getId(),
            resume.getFileName(),
            resume.getFileType(),
            resume.getFileSize(),
            resume.getUploadedAt()
    );
}
public Resume downloadResume(Long id) {

    return resumeRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Resume not found"));
}
public void deleteResume(Long id, String email) throws IOException {

    // Find logged-in user
    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

    // Find resume
    Resume resume = resumeRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Resume not found"));

    // Security check
    if (!resume.getUser().getId().equals(user.getId())) {
        throw new RuntimeException("You are not allowed to delete this resume");
    }

    // Delete file from disk
    Path path = Paths.get(resume.getFilePath());

    if (Files.exists(path)) {
        Files.delete(path);
    }

    // Delete database record
    resumeRepository.delete(resume);
}
}