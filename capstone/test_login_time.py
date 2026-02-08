import requests, time
url='http://localhost:8081/api/auth/login'
payload={'email':'test@example.com','password':'password123'}
for i in range(5):
    t0=time.time()
    r=requests.post(url,json=payload)
    t1=time.time()
    print(f"try {i+1}: status={r.status_code} time_ms={(t1-t0)*1000:.1f} len={len(r.text)}")
