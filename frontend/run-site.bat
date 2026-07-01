@echo off
setlocal

set "SITE_DIR=%~dp0"
set "SITE_URL=http://localhost:3000/activities.html"

if not exist "%SITE_DIR%index.html" (
  echo Could not find index.html in this folder.
  exit /b 1
)

where node >nul 2>nul
if %errorlevel%==0 (
  start "Galagadi local site" /min /D "%SITE_DIR%" node local-server.js
  goto open_site
) else (
  where py >nul 2>nul
  if %errorlevel%==0 (
    start "Galagadi local site" /min /D "%SITE_DIR%" py -3 -m http.server 3000 --bind localhost
    goto open_site
  ) else (
    where python >nul 2>nul
    if %errorlevel%==0 (
      start "Galagadi local site" /min /D "%SITE_DIR%" python -m http.server 3000 --bind localhost
      goto open_site
    ) else (
      echo Node.js or Python is required to serve the site at %SITE_URL%.
      echo Install Node.js/Python or open index.html directly.
      exit /b 1
    )
  )
)

:open_site
timeout /t 2 /nobreak >nul
start "" "%SITE_URL%"
