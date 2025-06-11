## 🌐 Production Deployment on AWS EC2 using Nginx

This section documents how to deploy your Angular app on an AWS EC2 instance with **Nginx** as a production web server.

---

### ✅ Prerequisites

* EC2 instance running **Ubuntu**
* Inbound rule open for **port 80 (HTTP)** in the **Security Group**
* Angular project pushed to a Git repository

---

### 🧩 Step-by-Step Deployment Guide

#### 1. **SSH into EC2**

```bash
ssh -i your-key.pem ubuntu@<your-ec2-public-ip>
```

#### 2. **Install Node.js, npm, Angular CLI**

```bash
sudo apt update
sudo apt install -y git curl
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g @angular/cli
```

---

#### 3. **Clone Your Angular Project**

```bash
git clone <your-repo-url>
cd <your-project-folder>
```

---

#### 4. **Install Dependencies & Build Project**

If you're using Angular Universal (SSR/prerender):

```bash
npm install
ng build --configuration production
```

> ⚠️ Your build files will be in:
> `dist/<your-project-name>/browser/`

---

#### 5. **Install and Configure Nginx**

```bash
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

Create a new Nginx config file:

```bash
sudo nano /etc/nginx/sites-available/angular-app
```

Paste the following config:

```nginx
server {
    listen 80;
    server_name _;

    root /var/www/angular-app;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/angular-app /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
```

Test and reload Nginx:

```bash
sudo nginx -t
sudo systemctl restart nginx
```

---

#### 6. **Copy Build Files to Web Root**

If build is inside `dist/<project-name>/browser`, copy like this:

```bash
sudo mkdir -p /var/www/angular-app
sudo cp -r dist/<your-project-name>/browser/* /var/www/angular-app
sudo chown -R www-data:www-data /var/www/angular-app
sudo chmod -R 755 /var/www/angular-app
```

---

### 🚀 Access the Application

Open a browser:

```
http://<your-ec2-public-ip>
```

Your Angular app should now load successfully.

---

### 📌 Notes

* This setup serves **static Angular builds** — perfect for production.
* If you don’t use SSR/prerendering, the build output will be directly in `dist/<project-name>/`.





------------------------------------------------------------------------------------------------------------------------------------------------
                                                      Testing Purpose
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




------------------------------------------------------------------------------------------------------------------------------------------------
                                            Stopping the Angular Development Server or Nginx 

# 🛑 Stopping the Angular Development Server or Nginx on AWS EC2

## 1. Stopping the Angular Development Server (`ng serve`)

### If Started in the Foreground (Standard Way)
1. In your SSH terminal (the one running `ng serve`), press:
   ```
   Ctrl + C
   ```
   This will gracefully stop the dev server.

### If Started in the Background (with `&` or `nohup`)
1. Find the process ID (PID) for the Angular dev server:
   ```bash
   ps aux | grep ng
   ```
   Look for a line showing `ng serve` or `node` related to your project.
2. Kill the process using the PID found:
   ```bash
   kill <PID>
   ```
   Replace `<PID>` with the actual number.  
   If it does not stop, use:
   ```bash
   kill -9 <PID>
   ```

---

## 2. Stopping the Nginx Server

**Recommended: Use systemd to stop Nginx safely**

```bash
sudo systemctl stop nginx
```

This command stops the Nginx service gracefully.

---

## 3. Verifying That the Server Has Stopped

- Check running processes:
  ```bash
  ps aux | grep ng
  ps aux | grep nginx
  ```
- If you see no relevant `ng serve` or `nginx` process (except for your grep command), the server is stopped.
- Try accessing your app in a browser; it should not load.

---

## 4. Notes

- Never kill system or kernel processes (e.g., `[khungtaskd]`).
- Always use `systemctl` for Nginx instead of `kill`, to ensure a clean shutdown.
- For production, prefer stopping Nginx; for development, stop `ng serve`.

---
