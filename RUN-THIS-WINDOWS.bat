@echo off
setlocal EnableExtensions
cd /d "%~dp0"

echo ======================================================
echo  FLEXIKNEE - INSTALL 4 GUIDES, BUILD, COMMIT AND PUSH
echo ======================================================
echo.

if not exist package.json (
  echo ERROR: package.json bulunamadi.
  echo ZIP icindeki tum dosya ve klasorleri projenin ana dizinine kopyalayin.
  pause
  exit /b 1
)

where node >nul 2>nul
if errorlevel 1 (
  echo ERROR: Node.js bulunamadi.
  pause
  exit /b 1
)

node scripts\install-flexiknee-four-guides.mjs
if errorlevel 1 goto :failed

if not exist node_modules (
  echo node_modules bulunamadi - npm ci calistiriliyor...
  call npm ci --no-audit --no-fund
  if errorlevel 1 goto :failed
)

call npm run build
if errorlevel 1 goto :failed

git rev-parse --is-inside-work-tree >nul 2>nul
if errorlevel 1 goto :success

git add src/data/articles src/data/guides.ts src/pages/GuideArticle.tsx src/pages/Guides.tsx src/assets scripts RUN-THIS-WINDOWS.bat RUN-THIS-CODEX.sh INSTALL-README.txt

git diff --cached --quiet
if not errorlevel 1 goto :pushOnly

git commit -m "feat: publish four new FlexiKnee guides"
if errorlevel 1 goto :failed

:pushOnly
for /f "delims=" %%B in ('git branch --show-current') do set CURRENT_BRANCH=%%B
if "%CURRENT_BRANCH%"=="" set CURRENT_BRANCH=main
git push origin %CURRENT_BRANCH%
if errorlevel 1 goto :failed

:success
echo.
echo ======================================================
echo  TAMAMLANDI - Build basarili, degisiklikler yuklendi.
echo  Vercel deploy tamamlaninca Guides sayfasini kontrol edin.
echo ======================================================
pause
exit /b 0

:failed
echo.
echo ======================================================
echo  ISLEM BASARISIZ - Yukaridaki hata mesajini kontrol edin.
echo ======================================================
pause
exit /b 1
