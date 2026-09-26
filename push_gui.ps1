Add-Type -AssemblyName Microsoft.VisualBasic
Add-Type -AssemblyName System.Windows.Forms

$token = [Microsoft.VisualBasic.Interaction]::InputBox(
    "Please paste your GitHub Personal Access Token (PAT) to push the complete Spaceship Runner project to:`nhttps://github.com/SanskreetiMeshram/SpaceRunner`n`nTo create a token in 10 seconds:`n1. Open: https://github.com/settings/tokens`n2. Check 'repo' scope and click 'Generate token'`n3. Paste the token below:",
    "GitHub Upload Authentication - SpaceRunner"
)

if ($token -and $token.Trim() -ne "") {
    $token = $token.Trim()
    Set-Location "d:\Dnnovate\Spacegame"
    $env:PATH = "C:\Users\loq\AppData\Local\Programs\MinGit\cmd;" + $env:PATH
    $output = & "C:\Users\loq\AppData\Local\Programs\MinGit\cmd\git.exe" push "https://${token}@github.com/SanskreetiMeshram/SpaceRunner.git" main 2>&1 | Out-String
    if ($LASTEXITCODE -eq 0) {
        [System.Windows.Forms.MessageBox]::Show("SUCCESS! All project files have been pushed to GitHub!`n`nRepository: https://github.com/SanskreetiMeshram/SpaceRunner`nBranch: main", "SpaceRunner Upload Complete", [System.Windows.Forms.MessageBoxButtons]::OK, [System.Windows.Forms.MessageBoxIcon]::Information)
    } else {
        [System.Windows.Forms.MessageBox]::Show("Upload failed with error:`n$output", "GitHub Upload Error", [System.Windows.Forms.MessageBoxButtons]::OK, [System.Windows.Forms.MessageBoxIcon]::Error)
    }
}
