
pipeline {
    agent any

    environment {
        IMAGE_NAME = 'jotibabhate/aegiscyber'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME:$BUILD_NUMBER .'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-credentials',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_TOKEN'
                    )
                ]) {
                    sh '''
                        set +x
                        echo "$DOCKER_TOKEN" | docker login \
                            -u "$DOCKER_USER" --password-stdin

                        docker push $IMAGE_NAME:$BUILD_NUMBER

                        docker tag $IMAGE_NAME:$BUILD_NUMBER $IMAGE_NAME:latest
                        docker push $IMAGE_NAME:latest

                        docker logout
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'AegisCyber image pushed successfully!'
        }

        failure {
            echo 'Pipeline failed. Check Console Output.'
        }

        always {
            sh 'docker logout || true'
        }
    }
}

