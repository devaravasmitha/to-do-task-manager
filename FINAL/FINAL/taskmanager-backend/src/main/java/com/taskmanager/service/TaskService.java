package com.taskmanager.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.taskmanager.entity.Task;
import com.taskmanager.repository.TaskRepository;

@Service
public class TaskService {

    private final TaskRepository repo;

    public TaskService(TaskRepository repo) {
        this.repo = repo;
    }

    public Task save(Task task) {
        if (task.getDueDate().isBefore(LocalDate.now())) {
            throw new RuntimeException("Due date cannot be in the past");
        }
        return repo.save(task);
    }

    public List<Task> getAll() {
        return repo.findAll();
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}