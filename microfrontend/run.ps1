
# echo "asdasd"
# Переходим в директорию microfrontend
# Set-Location -Path ./microfrontend

# Запускаем каждую команду в фоновом режиме
Start-Process powershell -NoNewWindow -WorkingDirectory ./host -ArgumentList "npm install ; npm start"
Start-Process powershell -NoNewWindow -WorkingDirectory ./auth -ArgumentList "npm install ; npm start"
Start-Process powershell -NoNewWindow -WorkingDirectory ./profile -ArgumentList "npm install ; npm start"
Start-Process powershell -NoNewWindow -WorkingDirectory ./places -ArgumentList "npm install ; npm start"

# Ждем завершения всех процессов
Get-Process | Where-Object { $_.Path -like "*npm*" } | Wait-Process