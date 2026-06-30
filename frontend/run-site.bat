@echo off
setlocal

set "SITE_FILE=%~dp0index.html"

if not exist "%SITE_FILE%" (
  echo Could not find index.html in this folder.
  exit /b 1
)

start "" "%SITE_FILE%"
