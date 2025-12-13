# Script to set up public folder for Netlify deployment
Write-Host "Setting up public folder for images..." -ForegroundColor Green

# Create public folder if it doesn't exist
if (-not (Test-Path public)) {
    New-Item -ItemType Directory -Path public -Force | Out-Null
    Write-Host "Created public folder" -ForegroundColor Yellow
}

# Copy imgs folder to public
if (Test-Path imgs) {
    if (Test-Path public/imgs) {
        Remove-Item -Path public/imgs -Recurse -Force
    }
    Copy-Item -Path imgs -Destination public/imgs -Recurse -Force
    Write-Host "Copied imgs folder to public/imgs" -ForegroundColor Yellow
} else {
    Write-Host "Warning: imgs folder not found" -ForegroundColor Red
}

# Copy logo to public
if (Test-Path logo.png) {
    Copy-Item -Path logo.png -Destination public/logo.png -Force
    Write-Host "Copied logo.png to public/" -ForegroundColor Yellow
} else {
    Write-Host "Warning: logo.png not found" -ForegroundColor Red
}

# Verify structure
Write-Host "`nPublic folder structure:" -ForegroundColor Green
Get-ChildItem public -Recurse -File | Select-Object FullName | ForEach-Object { Write-Host $_.FullName }

Write-Host "`nSetup complete!" -ForegroundColor Green

