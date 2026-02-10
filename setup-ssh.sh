#!/bin/bash

# Portfolio Website - GitHub SSH Setup Script
# Run this script to set up SSH authentication for GitHub

echo "Portfolio Website - GitHub SSH Setup"
echo "===================================="
echo ""

# Check for existing SSH key
if [ -f ~/.ssh/id_ed25519.pub ]; then
    echo "SSH key already exists!"
    echo "Your SSH public key:"
    cat ~/.ssh/id_ed25519.pub
elif [ -f ~/.ssh/id_rsa.pub ]; then
    echo "SSH key already exists!"
    echo "Your SSH public key:"
    cat ~/.ssh/id_rsa.pub
else
    echo "Creating new SSH key..."
    echo ""
    echo "Enter your GitHub email: "
    read email
    ssh-keygen -t ed25519 -C "$email" -f ~/.ssh/id_ed25519 -N ""
    echo ""
    echo "SSH key created!"
    echo "Your SSH public key:"
    cat ~/.ssh/id_ed25519.pub
fi

echo ""
echo "===================================="
echo "ADD SSH KEY TO GITHUB:"
echo "===================================="
echo ""
echo "1. Go to: https://github.com/settings/keys"
echo "2. Click 'New SSH key'"
echo "3. Title: 'Portfolio Website'"
echo "4. Key type: Authentication Key"
echo "5. Paste the SSH key above"
echo "6. Click 'Add SSH key'"
echo ""
echo "7. Verify connection:"
echo "   ssh -T git@github.com"
echo ""

# Add SSH key to agent
eval "$(ssh-agent -s)" 2>/dev/null
ssh-add ~/.ssh/id_ed25519 2>/dev/null || ssh-add ~/.ssh/id_rsa 2>/dev/null

echo "===================================="
echo "CREATE GITHUB REPOSITORY:"
echo "===================================="
echo ""
echo "1. Go to: https://github.com/new"
echo "2. Repository name: portfolio-web"
echo "3. Description: A modern MERN Stack portfolio website"
echo "4. Select: Public"
echo "5. Don't add README (we have one already)"
echo "6. Click 'Create repository'"
echo ""
echo "Press Enter after creating the repository..."
read confirm

echo ""
echo "===================================="
echo "PUSH TO GITHUB:"
echo "===================================="
echo ""

# Initialize git if needed
if [ ! -d ".git" ]; then
    git init
    git add .
    git commit -m "Initial commit: MERN Stack Portfolio Website"
fi

# Set remote URL (SSH format)
echo "Enter your GitHub username: "
read username

git remote set-url origin "git@github.com:${username}/portfolio-web.git" 2>/dev/null || \
git remote add origin "git@github.com:${username}/portfolio-web.git"

# Push
git branch -M main
git push -u origin main

echo ""
echo "===================================="
echo "Done! Your portfolio is on GitHub!"
echo "===================================="

