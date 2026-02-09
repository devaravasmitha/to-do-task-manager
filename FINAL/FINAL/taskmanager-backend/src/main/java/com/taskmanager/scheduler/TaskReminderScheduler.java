package com.taskmanager.scheduler;

import java.time.LocalDate;
import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.taskmanager.entity.Person;
import com.taskmanager.entity.Task;
import com.taskmanager.service.EmailService;
import com.taskmanager.service.TaskService;

@Component
public class TaskReminderScheduler {

    private final TaskService taskService;
    private final EmailService emailService;

    public TaskReminderScheduler(TaskService taskService, EmailService emailService) {
        this.taskService = taskService;
        this.emailService = emailService;
    }

    @Scheduled(cron = "0 0 9 * * ?") // every day 9 AM
    public void sendReminders() {

        LocalDate tomorrow = LocalDate.now().plusDays(1);
        List<Task> tasks = taskService.getAll();

        for (Task task : tasks) {
            if (task.getDueDate() != null && task.getDueDate().equals(tomorrow)) {
                for (Person person : task.getAssignedTo()) {
                    emailService.sendReminder(
                        person.getEmail(),
                        task.getTitle(),
                        task.getDueDate().toString()
                    );
                }
            }
        }
    }
}