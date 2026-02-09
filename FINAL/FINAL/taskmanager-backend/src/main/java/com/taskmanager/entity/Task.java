package com.taskmanager.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String status;

    private LocalDate dueDate;

    @ElementCollection
    @CollectionTable(
        name = "task_assigned_to",
        joinColumns = @JoinColumn(name = "task_id")
    )
    private List<Person> assignedTo = new ArrayList<>();

    public Task() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public List<Person> getAssignedTo() {
        return assignedTo;
    }

    public void setAssignedTo(List<Person> assignedTo) {
        this.assignedTo = assignedTo;
    }
}