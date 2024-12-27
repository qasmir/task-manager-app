pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'mirlabs/task-manager-app'
        //DOCKER_TAG = "${env.BUILD_ID}"
        DOCKER_TAG = 'latest'
        DOCKER_REGISTRY = 'your-docker-registry'
        DOCKER_CREDENTIALS_ID = 'docker-credentials-id'
    }

    stages {
        stage('Build') {
            steps {
                script {
                    // Build the Docker image
                    sh 'docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} .'
                }
            }
        }
        
        '''
        // Placeholder Stage for running unit tests
        stage('Test') {
            steps {
                script {
                    // Run unit tests
                    // Placeholder for running unit tests
            }
        }
        '''

        stage('Publish') {
            steps {
                script {
                    // Login to Docker registry
                    withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIALS_ID}", usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh 'echo $DOCKER_PASSWORD | docker login ${DOCKER_REGISTRY} -u $DOCKER_USERNAME --password-stdin'
                    }
                    
                    // Push the Docker image
                    sh 'docker push ${DOCKER_IMAGE}:${DOCKER_TAG}'
                }
            }
        }
    }

    post {
        always {
            // Clean up workspace
            cleanWs()
        }
    }
}