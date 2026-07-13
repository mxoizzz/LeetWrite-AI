Get-Content .env | Foreach-Object {
    $var = $_.Split('=', 2)
    if ($var.Length -eq 2) {
        [Environment]::SetEnvironmentVariable($var[0], $var[1], "Process")
    }
}
.\mvnw.cmd spring-boot:run
