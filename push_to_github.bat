@echo off
echo ==============================================
echo Pushing Spaceship Runner to GitHub...
echo Repository: https://github.com/SanskreetiMeshram/Spaceship-Runner
echo ==============================================
set PATH=C:\Users\loq\AppData\Local\Programs\MinGit\cmd;%PATH%
git push -u origin main
if %ERRORLEVEL% equ 0 (
    echo.
    echo ==============================================
    echo [SUCCESS] Pushed all files to GitHub!
    echo Visit: https://github.com/SanskreetiMeshram/Spaceship-Runner
    echo ==============================================
) else (
    echo.
    echo [NOTE] If prompted, sign in with your GitHub account in the browser or paste your GitHub Personal Access Token.
)
pause
