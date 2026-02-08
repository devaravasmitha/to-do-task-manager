import requests

url = 'http://localhost:8081/api/auth/register'
payload = {
    'email': 'test@example.com',
    'password': 'password123',
    'name': 'Test User'
}

response = requests.post(url, json=payload)
print(f"Status: {response.status_code}")
print(f"Response: {response.text}")
