@echo off
echo 正在启动DJI网站克隆版...
echo 请在浏览器中访问 http://localhost:8000
cd %~dp0
python -m http.server 8000