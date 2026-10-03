# Task 2 -- Simple Jenkins Pipeline for CI/CD

A simple Jenkins-based CI/CD pipeline for a Node.js application using
**Jenkins, Docker, GitHub, and GitHub Webhooks**.

## 🔗 Project Resources

-   **GitHub Repository:**
    [Aditya-Cyb/Jenkins-CICD-Task2](https://github.com/Aditya-Cyb/Jenkins-CICD-Task2)
-   **📄 Project Documentation:** [Task 2 Jenkins CI/CD
    Documentation](./Task_2_CICD_Documentation_Jenkins.docx)
-   **🚀 Application:** [Open Application](http://localhost:3001)

> **Deployment note:** The application is deployed locally through
> Docker on port `3001`. It is not a public internet deployment.

------------------------------------------------------------------------

## 1. Objective

The objective of this task is to create a basic Jenkins CI/CD pipeline
that automates the **build, testing, and deployment** of a Node.js
application using Docker.

The Jenkins pipeline is connected to GitHub and is automatically
triggered whenever code is pushed to the `main` branch.

------------------------------------------------------------------------

## 2. Technologies Used

  Technology          Purpose
  ------------------- --------------------------------------------------
  Node.js + Express   Web application and HTTP server
  Git                 Version control
  GitHub              Source-code repository
  Jenkins             CI/CD pipeline automation
  Docker              Containerization and deployment
  ngrok               Temporary public access to local Jenkins webhook

------------------------------------------------------------------------

## 3. Project Structure

``` text
Jenkins-CICD-Task2/
│
├── .gitignore
├── Dockerfile
├── Jenkinsfile
├── app.js
├── jenkins-docker/
│   └── Dockerfile
├── package.json
├── package-lock.json
└── README.md
```

------------------------------------------------------------------------

## 4. Application

The project is a simple Node.js application using Express.

### Application Routes

-   `/` → Displays the application message.
-   `/health` → Returns the application health status.

The application runs inside the Docker container on port `3000`.

The host maps port `3001` to the container port:

``` text
3001:3000
```

Application URL:

``` text
http://localhost:3001
```

------------------------------------------------------------------------

## 5. Dockerization

The application is containerized using the following Dockerfile:

``` dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "app.js"]
```

### Build Docker Image

``` bash
docker build -t jenkins-cicd-task2:latest .
```

### Run Container

``` bash
docker run -d -p 3001:3000 \
--name jenkins-cicd-task2-container \
jenkins-cicd-task2:latest
```

------------------------------------------------------------------------

## 6. Jenkins Configuration

Jenkins is running inside Docker using a custom Jenkins image with
Docker CLI installed.

The Jenkins pipeline job is:

``` text
Jenkins-CICD-Task2
```

### Pipeline Configuration

``` text
Definition: Pipeline script from SCM
SCM: Git
Repository: https://github.com/Aditya-Cyb/Jenkins-CICD-Task2.git
Branch: */main
Script Path: Jenkinsfile
```

### Trigger

``` text
GitHub hook trigger for GITScm polling
```

This allows Jenkins to automatically start the pipeline after a GitHub
push.

------------------------------------------------------------------------

## 7. Jenkins Pipeline

The pipeline is defined in the `Jenkinsfile` and contains three main
stages:

``` text
Build
  ↓
Test
  ↓
Deploy
```

### Build

The Docker image is created:

``` bash
docker build -t jenkins-cicd-task2:latest .
```

### Test

A temporary Docker container is started and the `/health` endpoint is
checked.

Expected result:

``` text
Health check passed
```

### Deploy

The tested image is deployed as a Docker container:

``` bash
docker run -d \
-p 3001:3000 \
--name jenkins-cicd-task2-container \
jenkins-cicd-task2:latest
```

------------------------------------------------------------------------

## 8. GitHub Webhook Integration

GitHub Webhook is used to automatically notify Jenkins when code is
pushed.

Because Jenkins is running locally, **ngrok** is used to expose the
Jenkins webhook endpoint temporarily.

### Start ngrok

``` bash
ngrok http 8080
```

### Jenkins Webhook Endpoint

``` text
/github-webhook/
```

The webhook was verified through the ngrok Inspector with:

``` text
POST /github-webhook/
200 OK
```

------------------------------------------------------------------------

## 9. Automatic CI/CD Flow

The complete workflow is:

``` text
Developer
    ↓
git push
    ↓
GitHub Repository
    ↓
GitHub Webhook
    ↓
ngrok
    ↓
Jenkins
    ↓
Build
    ↓
Test
    ↓
Deploy
    ↓
Docker Container
    ↓
localhost:3001
```

------------------------------------------------------------------------

## 10. Automatic Pipeline Test

A test change was pushed to GitHub:

``` bash
echo "Webhook test" >> README.md

git add README.md

git commit -m "Test Github push webhook"

git push origin main
```

Jenkins received the GitHub push event and automatically triggered Build
#2.

Jenkins log confirmed:

``` text
Received PushEvent
SCM changes detected in Jenkins-CICD-Task2
Triggering #2
```

------------------------------------------------------------------------

## 11. Pipeline Result

The automatically triggered Jenkins Build #2 successfully completed:

``` text
Started by GitHub push by Aditya-Cyb

Building Docker image...

Testing Docker container...

Health check passed

Deploying application...

Application deployed on port 3001

Jenkins CI/CD Pipeline completed successfully!

Finished: SUCCESS
```

### Final Result

✅ GitHub push automatically triggered Jenkins.

✅ Docker image successfully built.

✅ Application health check passed.

✅ Application successfully deployed through Docker.

✅ Jenkins pipeline finished with `SUCCESS`.

------------------------------------------------------------------------

## 12. Jenkins Security

After completing and testing the CI/CD pipeline, Jenkins security was
restored.

The administrator login was successfully verified and existing Jenkins
jobs were preserved.

------------------------------------------------------------------------

## 13. Key Achievements

-   Created a Node.js web application.
-   Containerized the application using Docker.
-   Created a Jenkinsfile for CI/CD automation.
-   Configured Jenkins Pipeline from GitHub SCM.
-   Implemented Build, Test, and Deploy stages.
-   Configured GitHub Webhook integration.
-   Used ngrok to expose the local Jenkins webhook endpoint.
-   Successfully triggered Jenkins automatically through a GitHub push.
-   Successfully built, tested, and deployed the Docker application.
-   Restored Jenkins security after pipeline verification.

------------------------------------------------------------------------

## 14. Documentation

For the complete implementation details, configuration, commands,
screenshots, pipeline verification, and submission evidence:

**[📄 Open Task 2 Jenkins CI/CD
Documentation](./Task_2_CICD_Documentation_Jenkins.docx)**

------------------------------------------------------------------------

## 15. Repository

**GitHub Repository:**

[Aditya-Cyb/Jenkins-CICD-Task2](https://github.com/Aditya-Cyb/Jenkins-CICD-Task2)

------------------------------------------------------------------------

## 16. Conclusion

This project demonstrates a practical Jenkins CI/CD workflow for a
Node.js application.

GitHub is used for source control, GitHub Webhooks initiate the
automation, Jenkins orchestrates the pipeline, and Docker provides
containerization and deployment.

The complete **GitHub Push → Build → Test → Deploy** workflow was
successfully implemented and verified.
