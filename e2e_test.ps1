Add-Type -AssemblyName 'System.Net.Http'

$base  = 'http://localhost:8080'
$ts    = Get-Date -Format 'HHmmss'
$email = "e2etest_$ts@careerpilot.dev"
$pass  = 'TestPass123!'
$token = $null

function Invoke-Api {
    param(
        [string]$Method,
        [string]$Path,
        [string]$Body = '',
        [string]$Token = '',
        [string]$MultiFile = ''
    )
    $c = [System.Net.Http.HttpClient]::new()
    if ($Token -ne '') {
        $c.DefaultRequestHeaders.Authorization = [System.Net.Http.Headers.AuthenticationHeaderValue]::new('Bearer', $Token)
    }
    try {
        $r = $null
        if ($MultiFile -ne '' -and (Test-Path $MultiFile)) {
            $mc = [System.Net.Http.MultipartFormDataContent]::new()
            $fb = [System.IO.File]::ReadAllBytes($MultiFile)
            $fc = [System.Net.Http.ByteArrayContent]::new($fb)
            $fc.Headers.ContentType = [System.Net.Http.Headers.MediaTypeHeaderValue]::new('application/pdf')
            $mc.Add($fc, 'file', 'resume.pdf')
            $r = $c.PostAsync("$base$Path", $mc).Result
        } elseif ($Body -ne '') {
            $sc = [System.Net.Http.StringContent]::new($Body, [System.Text.Encoding]::UTF8, 'application/json')
            $r = if ($Method -eq 'POST') { $c.PostAsync("$base$Path", $sc).Result } else { $c.PutAsync("$base$Path", $sc).Result }
        } else {
            $req = [System.Net.Http.HttpRequestMessage]::new([System.Net.Http.HttpMethod]::Get, "$base$Path")
            $r = $c.SendAsync($req).Result
        }
        $bodyText = $r.Content.ReadAsStringAsync().Result
        return @{ SC = [int]$r.StatusCode; Body = $bodyText; OK = $r.IsSuccessStatusCode }
    } catch {
        return @{ SC = 0; Body = "$_"; OK = $false }
    } finally {
        $c.Dispose()
    }
}

Write-Host '================================================' -ForegroundColor Cyan
Write-Host '  CareerPilot E2E API Test' -ForegroundColor Cyan
Write-Host '================================================' -ForegroundColor Cyan
Write-Host ''

# ─── [1] REGISTER ────────────────────────────────────────────────────────────
Write-Host '[1/6] REGISTER' -ForegroundColor Yellow
Write-Host "      Email: $email"
$regJson = '{"fullName":"Test User","email":"' + $email + '","password":"' + $pass + '","phoneNumber":"+911234567890"}'
$r = Invoke-Api -Method POST -Path '/api/users/register' -Body $regJson
if ($r.OK) {
    Write-Host '      SUCCESS - Registration OK' -ForegroundColor Green
    try {
        $d = $r.Body | ConvertFrom-Json
        if ($d.token) { $token = $d.token }
        elseif ($d.data -and $d.data.token) { $token = $d.data.token }
        Write-Host "      Body: $($r.Body.Substring(0, [Math]::Min(200, $r.Body.Length)))"
    } catch { Write-Host "      (Could not parse response JSON)" }
} else {
    Write-Host "      FAILED (HTTP $($r.SC))" -ForegroundColor Red
    if ($r.Body) { Write-Host "      $($r.Body.Substring(0, [Math]::Min(400, $r.Body.Length)))" }
}
Write-Host ''

# ─── [2] LOGIN ────────────────────────────────────────────────────────────────
Write-Host '[2/6] LOGIN' -ForegroundColor Yellow
$loginJson = '{"email":"' + $email + '","password":"' + $pass + '"}'
$r = Invoke-Api -Method POST -Path '/api/users/login' -Body $loginJson
if ($r.OK) {
    try {
        $d = $r.Body | ConvertFrom-Json
        $tok = if ($d.token) { $d.token } elseif ($d.data -and $d.data.token) { $d.data.token } else { '' }
        if ($tok -ne '') {
            $token = $tok
            Write-Host '      SUCCESS - Login OK, JWT received' -ForegroundColor Green
            Write-Host "      Token: $($tok.Substring(0, [Math]::Min(50, $tok.Length)))..."
        } else {
            Write-Host '      OK but no token in response' -ForegroundColor Yellow
            Write-Host "      Body: $($r.Body)"
        }
    } catch { Write-Host "      (Parse error: $_)"; Write-Host "      Raw: $($r.Body)" }
} else {
    Write-Host "      FAILED (HTTP $($r.SC))" -ForegroundColor Red
    if ($r.Body) { Write-Host "      $($r.Body.Substring(0, [Math]::Min(300, $r.Body.Length)))" }
}
Write-Host ''

# ─── [3] CHECK RESUME ────────────────────────────────────────────────────────
Write-Host '[3/6] CHECK RESUME (expect none for new user)' -ForegroundColor Yellow
if ($token -ne '') {
    $r = Invoke-Api -Method GET -Path '/api/resumes/my-resume' -Token $token
    if ($r.SC -eq 403 -or $r.SC -eq 404) {
        Write-Host "      OK - No resume yet (HTTP $($r.SC)) - expected for new user" -ForegroundColor Green
    } elseif ($r.OK) {
        Write-Host '      INFO - Resume already exists' -ForegroundColor Cyan
        try { $d = $r.Body | ConvertFrom-Json; $rd = if ($d.data) { $d.data } else { $d }; Write-Host "      File: $($rd.fileName)" } catch {}
    } else {
        Write-Host "      Unexpected HTTP $($r.SC)" -ForegroundColor Yellow
    }
} else { Write-Host '      SKIP - no token' -ForegroundColor Gray }
Write-Host ''

# ─── [4] UPLOAD RESUME ───────────────────────────────────────────────────────
Write-Host '[4/6] UPLOAD RESUME (PDF)' -ForegroundColor Yellow
$pdfPath = 'q:\careerpilot-ai\my_dummy_resume.pdf'
if ($token -ne '' -and (Test-Path $pdfPath)) {
    $r = Invoke-Api -Method POST -Path '/api/resumes/upload' -Token $token -MultiFile $pdfPath
    if ($r.OK) {
        Write-Host '      SUCCESS - Resume uploaded' -ForegroundColor Green
        try {
            $d = $r.Body | ConvertFrom-Json
            $rd = if ($d.data) { $d.data } else { $d }
            Write-Host "      ID: $($rd.id) | File: $($rd.fileName) | Size: $($rd.fileSize)"
        } catch { Write-Host "      Body: $($r.Body.Substring(0, [Math]::Min(200, $r.Body.Length)))" }
    } else {
        Write-Host "      FAILED (HTTP $($r.SC))" -ForegroundColor Red
        if ($r.Body) { Write-Host "      $($r.Body.Substring(0, [Math]::Min(300, $r.Body.Length)))" }
    }
} elseif ($token -eq '') {
    Write-Host '      SKIP - no token' -ForegroundColor Gray
} else {
    Write-Host "      SKIP - PDF not found at $pdfPath" -ForegroundColor Yellow
}
Write-Host ''

# ─── [5] VERIFY RESUME ───────────────────────────────────────────────────────
Write-Host '[5/6] VERIFY RESUME RETRIEVAL' -ForegroundColor Yellow
if ($token -ne '') {
    $r = Invoke-Api -Method GET -Path '/api/resumes/my-resume' -Token $token
    if ($r.OK) {
        Write-Host '      SUCCESS - Resume retrieved' -ForegroundColor Green
        try {
            $d = $r.Body | ConvertFrom-Json
            $rd = if ($d.data) { $d.data } else { $d }
            Write-Host "      File: $($rd.fileName) | Size: $($rd.fileSize) bytes | Uploaded: $($rd.uploadedAt)"
        } catch {}
    } elseif ($r.SC -eq 403 -or $r.SC -eq 404) {
        Write-Host '      FAILED - No resume (upload may have failed)' -ForegroundColor Red
    } else {
        Write-Host "      FAILED HTTP $($r.SC)" -ForegroundColor Red
    }
} else { Write-Host '      SKIP - no token' -ForegroundColor Gray }
Write-Host ''

# ─── [6] AI ANALYSIS ─────────────────────────────────────────────────────────
Write-Host '[6/6] AI RESUME ANALYSIS (Gemini AI - may take 15-30s)' -ForegroundColor Yellow
if ($token -ne '') {
    $r = Invoke-Api -Method GET -Path '/api/ai/analyze' -Token $token
    if ($r.OK) {
        Write-Host '      SUCCESS - Analysis complete' -ForegroundColor Green
        try {
            $d = $r.Body | ConvertFrom-Json
            $an = if ($d.data) { $d.data } else { $d }
            Write-Host "      ATS Score    : $($an.atsScore)"
            Write-Host "      Skills Found : $($an.skills.Count)"
            Write-Host "      Missing      : $($an.missingSkills.Count)"
            Write-Host "      Suggestions  : $($an.suggestions.Count)"
            if ($an.aiSuggestions) {
                Write-Host "      AI Review    : Present ($($an.aiSuggestions.Length) chars)"
                try {
                    $ai = $an.aiSuggestions | ConvertFrom-Json
                    Write-Host "      Strengths    : $($ai.strengths.Count)"
                    Write-Host "      Weaknesses   : $($ai.weaknesses.Count)"
                    Write-Host "      ATS Tips     : $($ai.atsTips.Count)"
                    if ($ai.professionalSummary -and $ai.professionalSummary.Length -gt 0) {
                        $ps = $ai.professionalSummary
                        Write-Host "      Prof Summary : $($ps.Substring(0, [Math]::Min(80, $ps.Length)))..."
                    }
                } catch { Write-Host '      (aiSuggestions is plain text, not JSON)' }
            } else {
                Write-Host '      AI Review    : Empty'
            }
        } catch { Write-Host "      (Parse error: $_)"; Write-Host "      Raw: $($r.Body.Substring(0, [Math]::Min(200, $r.Body.Length)))" }
    } elseif ($r.SC -eq 403 -or $r.SC -eq 404) {
        Write-Host "      FAILED (HTTP $($r.SC)) - No resume for analysis" -ForegroundColor Red
    } else {
        Write-Host "      FAILED (HTTP $($r.SC))" -ForegroundColor Red
        if ($r.Body) { Write-Host "      $($r.Body.Substring(0, [Math]::Min(300, $r.Body.Length)))" }
    }
} else { Write-Host '      SKIP - no token' -ForegroundColor Gray }

Write-Host ''
Write-Host '================================================' -ForegroundColor Cyan
Write-Host '  E2E Test Complete' -ForegroundColor Cyan
Write-Host '================================================' -ForegroundColor Cyan
