#!/bin/bash

# ADUANKU Backend Setup Script
# This script helps you set up environment files for all services

echo "🚀 Setting up ADUANKU Backend Environment Files..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to create .env file from example
create_env_file() {
    local service=$1
    local example_file="$service/env.example"
    local env_file="$service/.env"
    
    if [ -f "$example_file" ]; then
        if [ ! -f "$env_file" ]; then
            cp "$example_file" "$env_file"
            echo -e "${GREEN}✅ Created $env_file${NC}"
        else
            echo -e "${YELLOW}⚠️  $env_file already exists, skipping...${NC}"
        fi
    else
        echo -e "${RED}❌ $example_file not found${NC}"
    fi
}

# Create main .env file for docker-compose
if [ -f "env.example" ]; then
    if [ ! -f ".env" ]; then
        cp "env.example" ".env"
        echo -e "${GREEN}✅ Created main .env file${NC}"
    else
        echo -e "${YELLOW}⚠️  Main .env file already exists, skipping...${NC}"
    fi
else
    echo -e "${RED}❌ Main env.example not found${NC}"
fi

# Create .env files for each service
echo -e "\n${BLUE}📁 Creating service environment files...${NC}"
create_env_file "auth-service"
create_env_file "user-service"
create_env_file "issue-service"
create_env_file "comments-service"
create_env_file "analytics-service"

echo -e "\n${GREEN}🎉 Environment setup complete!${NC}"
echo -e "\n${YELLOW}📝 Next steps:${NC}"
echo "1. Update the .env files with your actual values"
echo "2. Make sure MongoDB is running"
echo "3. Set up AWS S3 credentials (if using file uploads)"
echo "4. Run: docker-compose up -d"
echo -e "\n${BLUE}💡 Quick MongoDB setup:${NC}"
echo "   - Install MongoDB locally, or"
echo "   - Use MongoDB Atlas (cloud) and update connection strings"
echo -e "\n${BLUE}💡 Quick AWS S3 setup:${NC}"
echo "   - Create an S3 bucket named 'aduanku-uploads'"
echo "   - Create IAM user with S3 permissions"
echo "   - Update AWS credentials in .env files"
