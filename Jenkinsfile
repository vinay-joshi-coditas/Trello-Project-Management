pipeline {
agent any

environment {
// Azure Service Principal
AZURE_CLIENT_ID = credentials('azure_client_id')
AZURE_CLIENT_SECRET = credentials('azure_client_secret')
AZURE_TENANT_ID = credentials('azure-tenant-id')
AZURE_SUBSCRIPTION_ID = credentials('azure_subscription_id')

// Required because Jenkins runs migrations
DATABASE_URL = credentials('db_url')

 DB_USERNAME = credentials('dbv_username')
    DB_PASSWORD = credentials('dbv_password')
    DB_NAME     = credentials('dbv_name')
    DB_HOST     = credentials('dbv_host')

// Azure Resources
AZURE_RESOURCE_GROUP = 'testvinaybe'
APP_SERVICE_NAME = 'VinayBE'

// Versioning
VERSION_FILE = '.version'
}

tools {
nodejs 'NodeJS-20'
}

options {
disableConcurrentBuilds()
timestamps()
}

stages {

stage('Checkout') {
steps {
checkout scm

sh '''
git fetch --tags || true
'''
}
}


stage('Calculate Version') {
steps {
script {
def commitMsg = sh(
script: 'git log -1 --pretty=%B',
returnStdout: true
).trim()

def currentVersion = fileExists(VERSION_FILE)
? readFile(VERSION_FILE).trim()
: "1.0.0"

def parts = currentVersion.tokenize('.')

int major = parts[0].toInteger()
int minor = parts[1].toInteger()
int patch = parts[2].toInteger()

if (commitMsg.contains('BREAKING CHANGE')) {
major++
minor = 0
patch = 0
} else if (commitMsg.startsWith('feat:')) {
minor++
patch = 0
} else if (commitMsg.startsWith('fix:')) {
patch++
} else {
patch++
}

env.APP_VERSION = "${major}.${minor}.${patch}"

writeFile(
file: VERSION_FILE,
text: env.APP_VERSION
)

echo "Deploying version ${env.APP_VERSION}"
}
}
}

stage('Azure Login') {
steps {
sh '''
az login \
--service-principal \
--username "$AZURE_CLIENT_ID" \
--password "$AZURE_CLIENT_SECRET" \
--tenant "$AZURE_TENANT_ID"

az account set \
--subscription "$AZURE_SUBSCRIPTION_ID"
'''
}
}

stage('Install pnpm') {
steps {
sh '''
npm install -g pnpm
pnpm --version
pnpm add -D typescript
'''
}
}

stage('Install Dependencies') {
steps {
sh '''
pnpm install --frozen-lockfile
'''
}
}

stage('Build Application') {
steps {
sh '''
pnpm build
'''
}
}

stage('Verify Database Connectivity') {
steps {
sh '''
node -e "
const { Client } = require('pg');

const client = new Client({
connectionString: process.env.DATABASE_URL
});

client.connect()
.then(() => {
console.log('PostgreSQL connection successful');
return client.end();
})
.catch(err => {
console.error(err);
process.exit(1);
});
"
'''
}
}

stage('Run Sequelize Migrations') {
steps {
sh '''


npx sequelize-cli db:migrate
'''
}
}

stage('Package Application') {
steps {
sh '''
zip -r app.zip . \
-x ".git/*" \
-x ".github/*" \
-x "node_modules/*" \
-x ".env*" \
-x "*.log"
'''
}
}

stage('Deploy to App Service') {
steps {
sh '''
az webapp deployment source config-zip \
--resource-group "$AZURE_RESOURCE_GROUP" \
--name "$APP_SERVICE_NAME" \
--src app.zip
'''
}
}

stage('Restart App Service') {
steps {
sh '''
az webapp restart \
--resource-group "$AZURE_RESOURCE_GROUP" \
--name "$APP_SERVICE_NAME"
'''
}
}
}


}
