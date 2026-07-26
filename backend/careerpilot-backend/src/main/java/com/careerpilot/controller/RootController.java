package com.careerpilot.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
public class RootController {

    @GetMapping(value = {"/", "/error", "/status"}, produces = MediaType.TEXT_HTML_VALUE)
    public ResponseEntity<String> getRootDashboardHtml() {
        String html = """
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>CareerPilot AI Backend Engine | System Status</title>
                <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
                <style>
                    * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Plus Jakarta Sans', sans-serif; }
                    body { background-color: #090d16; color: #f3f4f6; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 2rem; }
                    .card { background: rgba(15, 23, 42, 0.8); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 24px; padding: 2.5rem; max-width: 720px; width: 100%; shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); }
                    .header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem; border-b: 1px solid rgba(255, 255, 255, 0.08); padding-bottom: 1.5rem; }
                    .logo { display: flex; align-items: center; gap: 12px; font-weight: 800; font-size: 1.25rem; }
                    .logo-icon { background: linear-gradient(135deg, #2563eb, #4f46e5); width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; }
                    .badge { background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3); padding: 6px 14px; border-radius: 9999px; font-size: 0.75rem; font-weight: 700; display: flex; align-items: center; gap: 8px; text-transform: uppercase; tracking: 1px; }
                    .pulse { width: 8px; height: 8px; background-color: #10b981; border-radius: 50%; box-shadow: 0 0 10px #10b981; }
                    h1 { font-size: 1.75rem; font-weight: 800; margin-bottom: 0.5rem; background: linear-gradient(to right, #ffffff, #94a3b8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
                    p.sub { color: #94a3b8; font-size: 0.9rem; margin-bottom: 1.5rem; }
                    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin-bottom: 2rem; }
                    .stat { background: rgba(30, 41, 59, 0.5); border: 1px solid rgba(255, 255, 255, 0.05); padding: 16px; border-radius: 16px; }
                    .stat-label { font-size: 0.7rem; color: #64748b; font-weight: 700; text-transform: uppercase; margin-bottom: 4px; }
                    .stat-val { font-size: 0.95rem; font-weight: 700; color: #e2e8f0; }
                    .endpoints { margin-bottom: 2rem; }
                    .endpoint-item { background: rgba(30, 41, 59, 0.3); border: 1px solid rgba(255, 255, 255, 0.05); padding: 10px 14px; border-radius: 12px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; }
                    .method { font-weight: 800; padding: 2px 8px; border-radius: 6px; font-size: 0.65rem; }
                    .get { background: rgba(59, 130, 246, 0.2); color: #60a5fa; }
                    .post { background: rgba(16, 185, 129, 0.2); color: #34d399; }
                    .actions { display: flex; gap: 12px; }
                    .btn { flex: 1; text-align: center; padding: 12px; border-radius: 12px; font-weight: 700; text-decoration: none; font-size: 0.85rem; transition: all 0.2s; }
                    .btn-primary { background: linear-gradient(135deg, #2563eb, #3b82f6); color: white; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.4); }
                    .btn-secondary { background: rgba(255, 255, 255, 0.08); color: #e2e8f0; border: 1px solid rgba(255, 255, 255, 0.1); }
                    .btn:hover { opacity: 0.9; transform: translateY(-1px); }
                </style>
            </head>
            <body>
                <div class="card">
                    <div class="header">
                        <div class="logo">
                            <div class="logo-icon">🚀</div>
                            <span>CareerPilot API</span>
                        </div>
                        <div class="badge">
                            <div class="pulse"></div>
                            <span>100% ONLINE</span>
                        </div>
                    </div>
                    <h1>Enterprise AI Backend Engine</h1>
                    <p class="sub">Spring Boot 3 REST API Server with MySQL & H2 Engine Synchronization.</p>
                    <div class="grid">
                        <div class="stat">
                            <div class="stat-label">Version</div>
                            <div class="stat-val">v2.5.0 Enterprise</div>
                        </div>
                        <div class="stat">
                            <div class="stat-label">Database</div>
                            <div class="stat-val">MySQL & H2 Active</div>
                        </div>
                        <div class="stat">
                            <div class="stat-label">CORS Policy</div>
                            <div class="stat-val">Allowed (*) Enabled</div>
                        </div>
                    </div>
                    <div class="endpoints">
                        <div style="font-size: 0.75rem; font-weight: 700; color: #64748b; margin-bottom: 8px; text-transform: uppercase;">Active Rest API Endpoints</div>
                        <div class="endpoint-item"><span>/api/engineers</span> <span class="method get">GET</span></div>
                        <div class="endpoint-item"><span>/api/users/register</span> <span class="method post">POST</span></div>
                        <div class="endpoint-item"><span>/api/users/login</span> <span class="method post">POST</span></div>
                        <div class="endpoint-item"><span>/api/resumes/upload</span> <span class="method post">POST</span></div>
                    </div>
                    <div class="actions">
                        <a href="https://career-copilot-rosy.vercel.app" target="_blank" class="btn btn-primary">🌐 Launch Live Web App</a>
                        <a href="https://github.com/123angmish/ai-career-pilot" target="_blank" class="btn btn-secondary">📦 GitHub Repo</a>
                    </div>
                </div>
            </body>
            </html>
            """;
        return ResponseEntity.ok(html);
    }
}
