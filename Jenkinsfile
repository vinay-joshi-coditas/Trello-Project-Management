pipeline {
agent any

environment {
RESOURCE_GROUP = "kanban-project-rg"
APP_NAME = "kanban-backend-app"
}

tools {
nodejs "NodeJS-22"
}

stages {

stage('Checkout') {
steps {
checkout scm
}
}

stage('Install PNPM') {
steps {
sh '''
npm install -g pnpm
'''
}
}

stage('Install Dependencies') {
steps {
sh 'pnpm install --frozen-lockfile'
}
}

stage('Build') {
steps {
sh 'pnpm build'
}
}

stage('Package') {
steps {
sh '''
zip -r app.zip \
dist \
package.json \
pnpm-lock.yaml \
.swcrc
'''
}
}

stage('Azure Login') {
steps {
withCredentials([
string(credentialsId: 'AZURE_CLIENT_ID', variable: 'CLIENT_ID'),
string(credentialsId: 'AZURE_CLIENT_SECRET', variable: 'CLIENT_SECRET'),
string(credentialsId: 'AZURE_TENANT_ID', variable: 'TENANT_ID'),
string(credentialsId: 'AZURE_SUBSCRIPTION_ID', variable: 'SUBSCRIPTION_ID')
]) {

sh '''
az login --service-principal \
--username $CLIENT_ID \
--password $CLIENT_SECRET \
--tenant $TENANT_ID

az account set \
--subscription $SUBSCRIPTION_ID
'''
}
}
}

stage('Configure App Settings') {
steps {
withCredentials([
string(credentialsId: 'DATABASE_URL', variable: 'DATABASE_URL'),
string(credentialsId: 'REDIS_HOST', variable: 'REDIS_HOST'),
string(credentialsId: 'REDIS_PORT', variable: 'REDIS_PORT'),
string(credentialsId: 'JWT_SECRET', variable: 'JWT_SECRET'),
string(credentialsId: 'AWS_ACCESS_KEY_ID', variable: 'AWS_ACCESS_KEY_ID'),
string(credentialsId: 'AWS_SECRET_ACCESS_KEY', variable: 'AWS_SECRET_ACCESS_KEY'),
string(credentialsId: 'AWS_REGION', variable: 'AWS_REGION'),
string(credentialsId: 'SES_FROM_EMAIL', variable: 'SES_FROM_EMAIL')
]) {

sh '''
az webapp config appsettings set \
--resource-group $RESOURCE_GROUP \
--name $APP_NAME \
--settings \
DATABASE_URL="$DATABASE_URL" \
REDIS_HOST="$REDIS_HOST" \
REDIS_PORT="$REDIS_PORT" \
JWT_SECRET="$JWT_SECRET" \
AWS_ACCESS_KEY_ID="$AWS_ACCESS_KEY_ID" \
AWS_SECRET_ACCESS_KEY="$AWS_SECRET_ACCESS_KEY" \
AWS_REGION="$AWS_REGION" \
SES_FROM_EMAIL="$SES_FROM_EMAIL"
'''
}
}
}

stage('Deploy') {
steps {
sh '''
az webapp deploy \
--resource-group $RESOURCE_GROUP \
--name $APP_NAME \
--src-path app.zip \
--type zip
'''
}
}
}

post {
always {
cleanWs()
}
}
}
