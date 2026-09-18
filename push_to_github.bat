@echo off
title Push Spaceship Runner to GitHub
echo ==============================================
echo Pushing Spaceship Runner to GitHub...
echo Repository: https://github.com/SanskreetiMeshram/Spaceship-Runner
echo ==============================================
set "PATH=C:\Users\loq\AppData\Local\Programs\MinGit\cmd;C:\Users\loq\AppData\Local\Programs\MinGit\mingw64\bin;%PATH%"
git push -u origin main
if %ERRORLEVEL% equ 0 (
    echo.
    echo ==============================================
    echo [SUCCESS] Pushed all code to GitHub successfully!
    echo Visit: https://github.com/SanskreetiMeshram/Spaceship-Runner
    echo ==============================================
) else (
    echo.
    echo [FAILED] Push did not complete. If prompted, please complete browser login or provide a GitHub Personal Access Token.
)
echo.
pause
