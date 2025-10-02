@echo off
REM Navigate to the folder of this script
cd /d "%~dp0"

REM Start http-server on port 8080
npx http-server -p 8080

REM Keep window open after server stops
pause
