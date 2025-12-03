pipeline {
    agent {
        node {
            label 'buildkit'
        }
    }
    
    environment {
        REGISTRY = 'registry.adoah.dev'
        VERSION = "${env.BRANCH_NAME}-${BUILD_NUMBER}"
    }

    post {
        always {
            cleanWs(deleteDirs: true, notFailBuild: false)
        }
    }


    stages {
        stage("Build") {
            failFast true
            parallel {
                stage("Build") {
                    agent { label 'buildkit' }
                    environment {
                        IMAGE = 'projects/monomotion-placeholder'
                    }
                    steps {
                        container(name: 'buildkitd') {
                            sh '''
                                buildctl \
                                    --addr tcp://buildkit.adoah.dev:1234 \
                                    --tlscert /root/.certs/tls.crt \
                                    --tlskey /root/.certs/tls.key \
                                    --tlscacert /root/.ca/ca.pem \
                                build \
                                    --frontend dockerfile.v0 \
                                    --local context=. \
                                    --local dockerfile=. \
                                    --opt target=production \
                                    --output type=image,name=${REGISTRY}/${IMAGE}:${VERSION},push=true
                            '''
                        }
                    }
                }
            }
        }
        stage("Development") {
            agent { label 'helm-deploy'}
            when {
                branch 'master'
            }
            steps {
                container(name: 'helm') {
                    sh 'helm upgrade --install monomotion-placeholder .ci/chart --namespace development -f .ci/config/dev.yaml --version ${BUILD_NUMBER} --set image.tag=${VERSION}'
                }
            }
        }
    }
}
