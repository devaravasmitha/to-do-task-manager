package com.taskmanager.controller;

import com.taskmanager.entity.Task;
import com.taskmanager.service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")
public class TaskController {

    private final TaskService taskService;

    //  ONLY TaskService here
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    //  CREATE TASK (NO EMAIL HERE)
    @PostMapping
    public Task create(@RequestBody Task task) {
        return taskService.save(task);
    }

    // GET ALL TASKS
    @GetMapping
    public List<Task> getAll() {
        return taskService.getAll();
    }

    //  UPDATE TASK
    @PutMapping("/{id}")
    public Task update(@PathVariable Long id, @RequestBody Task task) {
        task.setId(id);
        return taskService.save(task);
    }

    //  DELETE TASK
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        taskService.delete(id);
    }
}