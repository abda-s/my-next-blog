# Step 8: Push the public folder to the gh-pages branch using subtree split and force push
Write-Host "Deploying to GitHub pages..."

# Check if the temporary branch exists and delete it
$branchExists = git branch --list "gh-pages-deploy"
if ($branchExists) {
    git branch -D gh-pages-deploy
}

# Perform subtree split
Write-Host "Running npm scripts..."
# npm run copy-posts-from-obsidian
# npm run process-images
# npm run build
try {
git add .
git commit -m "Deploy to gh-pages - $(Get-Date -Format G)"
    git subtree split --prefix out -b gh-pages-deploy
} catch {
    Write-Error "Subtree split failed."
    exit 1
}

# Push to gh-pages branch with force
try {
    git push origin gh-pages-deploy:gh-pages --force
} catch {
    Write-Error "Failed to push to hostinger branch."
    git branch -D gh-pages-deploy
    exit 1
}

# Delete the temporary branch
git branch -D gh-pages-deploy

Write-Host "All done! Site synced, processed, committed, built, and deployed."
