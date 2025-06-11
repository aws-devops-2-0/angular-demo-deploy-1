# angular-demo-deploy-1

## 🚀 Deploy Angular App on AWS EC2 (Dev Server Setup)

This guide explains how to deploy your Angular application on an AWS EC2 instance using `ng serve` for testing purposes.

---

### ✅ Prerequisites

* AWS EC2 instance (Ubuntu OS)
* Opened port **4200** in EC2 Security Group
* IAM user with EC2 full access (or admin for learning purposes)

---

### 📦 EC2 Setup Steps

1. **Launch EC2 Instance**

   * Choose **Ubuntu OS**
   * Select appropriate instance type
   * Create key pair (for SSH access)
   * Add inbound rule in **Security Group**:

     * **Custom TCP**, port `4200`, source `0.0.0.0/0`

2. **SSH into EC2**

   ```bash
   ssh -i your-key.pem ubuntu@<your-ec2-public-ip>
   ```

3. **Install Dependencies**

   ```bash
   sudo apt update
   sudo apt install -y git curl
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs
   sudo npm install -g @angular/cli
   ```

4. **Clone Your Repository**

   ```bash
   git clone <your-repo-url>
   cd <your-project-folder>
   ```

5. **Install Node Modules**

   ```bash
   npm install
   ```

6. **Run Angular App**

   ```bash
   ng serve --host 0.0.0.0
   ```

   * App will run at: `http://<ec2-public-ip>:4200`

> ⚠️ **Important:** Keep the terminal open. Closing it will stop the Angular dev server.

---

### 🌐 Access the App in Browser

Open your browser and navigate to:

```
http://<your-ec2-public-ip>:4200
```

---

### 🛡️ Note

This method uses Angular’s development server and is **not suitable for production**. For production-ready deployment, consider:

* Building with `ng build`
* Serving with **Nginx** or **Apache**
* Using HTTPS, load balancers, and CI/CD

