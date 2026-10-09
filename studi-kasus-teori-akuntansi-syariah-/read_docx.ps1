param(
    [string]$FilePath
)
Add-Type -AssemblyName System.IO.Compression.FileSystem
try {
    $zip = [System.IO.Compression.ZipFile]::OpenRead($FilePath)
    $entry = $zip.GetEntry("word/document.xml")
    if ($entry) {
        $reader = New-Object System.IO.StreamReader($entry.Open())
        $xml = $reader.ReadToEnd()
        $reader.Close()
        # Basic xml strip
        $text = $xml -replace '<[^>]+>', ' ' -replace '&amp;', '&' -replace '&lt;', '<' -replace '&gt;', '>' -replace '\s+', ' '
        Write-Output $text.Trim()
    } else {
        Write-Error "word/document.xml not found in $FilePath"
    }
} finally {
    if ($zip) { $zip.Dispose() }
}
