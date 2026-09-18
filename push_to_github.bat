@echo off
title Push SpaceRunner to GitHub
echo ==============================================
echo Pushing SpaceRunner to GitHub...
echo Target: https://github.com/SanskreetiMeshram/SpaceRunner.git
echo ==============================================
set "PATH=C:\Users\loq\AppData\Local\Programs\MinGit\cmd;C:\Users\loq\AppData\Local\Programs\MinGit\mingw64\bin;%PATH%"
git remote set-url origin https://github.com/SanskreetiMeshram/SpaceRunner.git
git push -u origin main
if %ERRORLEVEL% equ 0 (
    echo.
    echo ==============================================
    echo [SUCCESS] Pushed all code to GitHub successfully!
    echo Visit: https://github.com/SanskreetiMeshram/SpaceRunner
    echo ==============================================
) else (
    echo.
    echo [NOTE] If a browser window opened, click Authorize to complete the push.
)
echo.
pause
