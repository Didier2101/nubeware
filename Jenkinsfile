pipeline {
  agent any
  environment {
    IMAGE = "nubeware_app:${env.BUILD_NUMBER}"
    CONTAINER = "nubeware_app"
  }
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    stage('Build Docker') {
      steps {
        sh 'docker build -t $IMAGE .'
      }
    }
    stage('Deploy') {
      steps {
        sh '''
          docker stop $CONTAINER || true
          docker rm $CONTAINER || true
          docker run -d --name $CONTAINER -p 3000:3000 $IMAGE
        '''
      }
    }
  }
}
