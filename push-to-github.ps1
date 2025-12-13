# Script to push code to GitHub
Write-Host "Initializing git repository..." -ForegroundColor Green

# Initialize git if not already initialized
if (-not (Test-Path .git)) {
    git init
    Write-Host "Git repository initialized" -ForegroundColor Green
}

# Add all files
Write-Host "Adding all files..." -ForegroundColor Green
git add -A

# Check status
Write-Host "Current git status:" -ForegroundColor Yellow
git status

# Commit changes
Write-Host "Committing changes..." -ForegroundColor Green
git commit -m "Initial commit: ADAM Data Services website with 3D animations, robot character, and all features"

# Set main branch
Write-Host "Setting main branch..." -ForegroundColor Green
git branch -M main

# Set remote
Write-Host "Setting remote repository..." -ForegroundColor Green
git remote remove origin 2>$null
git remote add origin https://github.com/ahmadabuadas2025/adam-data-services-website.git

# Verify remote
Write-Host "Remote repository:" -ForegroundColor Yellow
git remote -v

# Push to GitHub
Write-Host "Pushing to GitHub..." -ForegroundColor Green
Write-Host "Note: You may be prompted for GitHub credentials" -ForegroundColor Yellow
git push -u origin main

Write-Host "Done! Check your repository at: https://github.com/ahmadabuadas2025/adam-data-services-website" -ForegroundColor Green

