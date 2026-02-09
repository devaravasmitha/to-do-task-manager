package com.taskmanager.entity;

import jakarta.persistence.Embeddable;
import jakarta.persistence.Column;

@Embeddable
public class Person {

	@Column(name="name")
    private String name;
	@Column(name="email")
    private String email;

    public Person() {}

    public Person(String name, String email) {
        this.name = name;
        this.email = email;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}