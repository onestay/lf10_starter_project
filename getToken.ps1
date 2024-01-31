$headers = @{
    "Content-Type" = "application/x-www-form-urlencoded"
}

$body = @{
    "grant_type"    = "password"
    "client_id"     = "employee-management-service"
    "username"      = "user"
    "password"      = "test"
}

$response = Invoke-WebRequest -Uri "http://authproxy.szut.dev" -Method POST -Headers $headers -Body $body

# Extract and print the token
$token = ($response.Content | ConvertFrom-Json).access_token
Write-Output "Access Token: $token"

# Set the token in the clipboard (Zwischenspeicher)
$token | Set-Clipboard
Write-Output "Token copied to clipboard."