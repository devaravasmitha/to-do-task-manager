#!/usr/bin/env python3
import requests
import json
import datetime

# Register a new user
unique_email = f"user_{int(datetime.datetime.now().timestamp())}@test.com"
register_url = 'http://localhost:8081/api/auth/register'
register_data = {
    'email': unique_email,
    'password': 'SecurePass123',
    'name': 'New User'
}

print("=== TESTING REGISTRATION ===")
print(f"Registering: {unique_email}")
resp = requests.post(register_url, json=register_data)
print(f"Status: {resp.status_code}")
print(f"Response: {resp.text}")

if resp.status_code == 201:
    resp_json = resp.json()
    token = resp_json.get('user', {}).get('token')
    if token:
        print(f"\n✓ Registration successful!")
        print(f"  Token: {token[:30]}...")
        
        # Test creating a task with the token
        print("\n=== TESTING TASK CREATION ===")
        task_url = 'http://localhost:8081/api/tasks'
        task_data = {
            'title': 'Complete Project',
            'description': 'Finish the task manager app',
            'status': 'pending',
            'dueDate': '2026-02-28'
        }
        headers = {'Authorization': f'Bearer {token}'}
        print(f"Creating task...")
        task_resp = requests.post(task_url, json=task_data, headers=headers)
        print(f"Status: {task_resp.status_code}")
        print(f"Response: {task_resp.text}")
        
        # Test getting tasks
        print("\n=== TESTING GET TASKS ===")
        get_resp = requests.get(task_url, headers=headers)
        print(f"Status: {get_resp.status_code}")
        print(f"Response: {get_resp.text}")
