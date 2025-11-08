@echo off
echo ========================================
echo   Komiku REST API Server (Supabase)
echo ========================================
echo.
echo Starting server...
echo Server will be available at: http://localhost:3000
echo.
echo Data source: Supabase Storage
echo Bucket: komiku-data
echo File: metadata/metadata.json
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

npm run api

pause
