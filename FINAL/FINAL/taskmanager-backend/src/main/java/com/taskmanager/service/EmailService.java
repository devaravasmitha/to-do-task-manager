package com.taskmanager.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendReminder(String to, String taskTitle, String dueDate) {

        //  DEBUG LOG
        System.out.println("EMAIL SERVICE CALLED");
        System.out.println("Sending mail to: " + to);

        SimpleMailMessage message = new SimpleMailMessage();

        //  SENDER = application Gmail (same as spring.mail.username)
        message.setFrom("yourgmail@gmail.com");  

        //  RECEIVER = client email
        message.setTo(to);

        message.setSubject(" TaskFlow Reminder: " + taskTitle);
        message.setText(
            "Hello,\n\n" +
            "This is a reminder for your task.\n\n" +
            "Task Title : " + taskTitle + "\n" +
            "Due Date   : " + dueDate + "\n\n" +
            "Please complete it on time.\n\n" +
            "Regards,\n" +
            "TaskFlow Team"
        );

        mailSender.send(message);

        //  CONFIRMATION LOG
        System.out.println("EMAIL SENT SUCCESSFULLY");
    }
}