package com.careerpilot.dto;

import java.time.LocalDate;

public class JobRequest {

    private String title;
    private String company;
    private String location;
    private String jobType;
    private String salary;
    private String experience;
    private String description;
    private String skillsRequired;
    private LocalDate applicationDeadline;

    public JobRequest() {
    }

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getJobType() {
		return jobType;
	}

	public void setJobType(String jobType) {
		this.jobType = jobType;
	}

	public String getSalary() {
		return salary;
	}

	public void setSalary(String salary) {
		this.salary = salary;
	}

	public String getExperience() {
		return experience;
	}

	public void setExperience(String experience) {
		this.experience = experience;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getSkillsRequired() {
		return skillsRequired;
	}

	public void setSkillsRequired(String skillsRequired) {
		this.skillsRequired = skillsRequired;
	}

	public LocalDate getApplicationDeadline() {
		return applicationDeadline;
	}

	public void setApplicationDeadline(LocalDate applicationDeadline) {
		this.applicationDeadline = applicationDeadline;
	}

	@Override
	public String toString() {
		return "JobRequest [title=" + title + ", company=" + company + ", location=" + location + ", jobType=" + jobType
				+ ", salary=" + salary + ", experience=" + experience + ", description=" + description
				+ ", skillsRequired=" + skillsRequired + ", applicationDeadline=" + applicationDeadline + "]";
	}

    
}