# Setup PostgreSQL cho dự án landingpage
# Cách chạy trong Claude Code:  ! powershell -ExecutionPolicy Bypass -File scripts/setup-db.ps1

$ErrorActionPreference = 'Stop'
$env:PGPASSWORD = '54321'

Write-Host '==> Tìm psql.exe...'
$pgBin = Get-ChildItem 'C:\Program Files\PostgreSQL' -Directory -ErrorAction SilentlyContinue | ForEach-Object {
  Join-Path $_.FullName 'bin\psql.exe'
} | Where-Object { Test-Path $_ } | Sort-Object -Descending | Select-Object -First 1

if (-not $pgBin) {
  Write-Error 'Không tìm thấy psql.exe. Vui lòng kiểm tra thư mục C:\Program Files\PostgreSQL\<version>\bin hoặc cài PostgreSQL.'
  exit 1
}
Write-Host "     Dùng: $pgBin"

Write-Host '==> Đảm bảo dịch vụ PostgreSQL đang chạy...'
$svc = Get-Service -Name 'postgresql*' -ErrorAction SilentlyContinue | Where-Object { $_.Status -ne 'Running' }
if ($svc) {
  Write-Host "     Khởi động $($svc.Name) ..."
  Start-Service -Name $svc.Name
  Start-Sleep -Seconds 2
}

$ready = $false
for ($i = 0; $i -lt 10; $i++) {
  if (Test-NetConnection -ComputerName localhost -Port 5432 -InformationLevel Quiet) { $ready = $true; break }
  Start-Sleep -Seconds 1
}
if (-not $ready) { Write-Error 'PostgreSQL chưa sẵn sàng trên cổng 5432.'; exit 1 }
Write-Host '     PostgreSQL sẵn sàng trên 5432.'

Write-Host '==> Tạo database landingpage_db nếu chưa tồn tại...'
$exists = (& $pgBin -U postgres -h localhost -tAc "SELECT 1 FROM pg_database WHERE datname='landingpage_db'").Trim()
if ($exists -ne '1') {
  & $pgBin -U postgres -h localhost -c 'CREATE DATABASE landingpage_db'
  Write-Host '     Đã tạo database landingpage_db.'
} else {
  Write-Host '     Database landingpage_db đã tồn tại.'
}

Write-Host '==> Chạy database/schema.sql ...'
& $pgBin -U postgres -h localhost -d landingpage_db -f 'database\schema.sql'
if ($LASTEXITCODE -ne 0) { Write-Error 'schema.sql thất bại.'; exit 1 }

Write-Host '==> Chạy database/seed-zalo.sql (chèn link Zalo)...'
& $pgBin -U postgres -h localhost -d landingpage_db -f 'database\seed-zalo.sql'
if ($LASTEXITCODE -ne 0) { Write-Error 'seed-zalo.sql thất bại.'; exit 1 }

Write-Host ''
Write-Host 'HOÀN TẤT. Database đã sẵn sàng:'
Write-Host '  DATABASE_URL=postgresql://postgres:__LOCAL_SECRET_REMOVED__@localhost:5432/landingpage_db?schema=public'
Write-Host '  Zalo group seeded: https://zalo.me/g/c7rgykyyplog3nfc7u8t'