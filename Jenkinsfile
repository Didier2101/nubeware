pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Didier2101/nubeware.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t nubeware-app .'
                }
            }
        }

        stage('Run Container') {
            steps {
                script {
                    // Si ya existe un contenedor viejo, lo eliminamos
                    sh 'docker rm -f nubeware-app || true'
                    
                    // Levantamos el nuevo
                    sh 'docker run -d -p 3000:3000 --name nubeware-app nubeware-app'
                }
            }
        }
    }
}
