pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS_ID = 'dockerhub-credentials-id'
        DOCKER_IMAGE_NAME = 'my-frontend-image'
        DOCKER_IMAGE_TAG = 'latest'
        KUBERNETES_DEPLOYMENT_FILE = 'kubernetes/deployment.yaml'
        K8S_DEPLOYMENT_NAME = 'your-deployment-name'
        K8S_NAMESPACE = 'your-namespace'
    }

    stages {
        stage('Checkout') {
            steps {
                // 从 GitHub 仓库中拉取代码
                git url: 'https://github.com/BuggggTester/WangWangVue.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                script {
                    try {
                        withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIALS_ID}", usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                            bat """
                            docker login -u %DOCKER_USERNAME% -p %DOCKER_PASSWORD%
                            docker build -t %DOCKER_IMAGE_NAME%:%DOCKER_IMAGE_TAG% .
                            """
                        }
                    } catch (Exception e) {
                        echo "Docker build failed: ${e.message}"
                        currentBuild.result = 'FAILURE'
                        throw e
                    }
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                echo 'Pushing Docker image to Docker Hub...'
                script {
                    try {
                        withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIALS_ID}", usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                            bat """
                            docker login -u %DOCKER_USERNAME% -p %DOCKER_PASSWORD%
                            docker push %DOCKER_IMAGE_NAME%:%DOCKER_IMAGE_TAG%
                            """
                        }
                    } catch (Exception e) {
                        echo "Docker push failed: ${e.message}"
                        currentBuild.result = 'FAILURE'
                        throw e
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                // 更新 Kubernetes 部署
                script {
                    def kubectlCmd = "kubectl set image deployment/${K8S_DEPLOYMENT_NAME} ${K8S_DEPLOYMENT_NAME}=${DOCKER_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG} -n ${K8S_NAMESPACE}"
                    sh kubectlCmd
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}