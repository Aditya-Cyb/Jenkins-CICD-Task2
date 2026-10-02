pipeline {
    agent any

    environment {
        IMAGE_NAME = "jenkins-cicd-task2"
        CONTAINER_NAME = "jenkins-cicd-task2-container"
        DEPLOY_PORT = "3001"
    }

    stages {

        stage('Build') {
            steps {
                echo 'Building Docker image...'

                sh 'docker build -t ${IMAGE_NAME}:latest .'
            }
        }

        stage('Test') {
            steps {
                echo 'Testing Docker container...'

                sh '''
                    docker rm -f ${CONTAINER_NAME}-test 2>/dev/null || true

                    docker run -d \
                        --name ${CONTAINER_NAME}-test \
                        ${IMAGE_NAME}:latest

                    sleep 5

                    docker exec ${CONTAINER_NAME}-test \
                        node -e "require('http').get('http://localhost:3000/health', r => { if(r.statusCode !== 200) process.exit(1); console.log('Health check passed'); }).on('error', () => process.exit(1))"

                    docker rm -f ${CONTAINER_NAME}-test
                '''
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying application...'

                sh '''
                    docker rm -f ${CONTAINER_NAME} 2>/dev/null || true

                    docker run -d \
                        -p ${DEPLOY_PORT}:3000 \
                        --name ${CONTAINER_NAME} \
                        ${IMAGE_NAME}:latest

                    echo "Application deployed on port ${DEPLOY_PORT}"
                '''
            }
        }
    }

    post {
        success {
            echo 'Jenkins CI/CD Pipeline completed successfully!'
        }

        failure {
            echo 'Jenkins CI/CD Pipeline failed.'
        }
    }
}