Write-Host "Verifying image setup for Netlify..." -ForegroundColor Green
Write-Host ""

# Check if public folder exists
if (Test-Path public) {
    Write-Host "✓ public folder exists" -ForegroundColor Green
} else {
    Write-Host "✗ public folder does NOT exist - creating..." -ForegroundColor Red
    New-Item -ItemType Directory -Path public -Force | Out-Null
}

# Check if images are in public
$images = @(
    "public/logo.png",
    "public/imgs/certificate.png",
    "public/imgs/projects/genAI.png",
    "public/imgs/projects/ai.png",
    "public/imgs/projects/DPL.png",
    "public/imgs/projects/DP.png",
    "public/imgs/projects/VR.png",
    "public/imgs/partner/HB.png",
    "public/imgs/partner/noJoom.png",
    "public/imgs/partner/sam.png",
    "public/imgs/partner/siminsghit.png"
)

Write-Host "`nChecking image files:" -ForegroundColor Yellow
foreach ($img in $images) {
    if (Test-Path $img) {
        Write-Host "  ✓ $img" -ForegroundColor Green
    } else {
        Write-Host "  ✗ $img - MISSING" -ForegroundColor Red
    }
}

Write-Host "`nChecking git status:" -ForegroundColor Yellow
git status public/ --short

Write-Host "`nDone!" -ForegroundColor Green

