export default function DiagnosticPage() {
  return (
    <main style={{ padding: '40px', fontFamily: 'monospace' }}>
      <h1>Sanity Configuration Diagnostic</h1>
      
      <h2>Environment Variables:</h2>
      <ul>
        <li>NEXT_PUBLIC_SANITY_PROJECT_ID: {process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}</li>
        <li>NEXT_PUBLIC_SANITY_DATASET: {process.env.NEXT_PUBLIC_SANITY_DATASET}</li>
        <li>NEXT_PUBLIC_SANITY_API_VERSION: {process.env.NEXT_PUBLIC_SANITY_API_VERSION}</li>
      </ul>

      <h2>Sanity Config:</h2>
      <ul>
        <li>Project ID: bkexk006</li>
        <li>Dataset: production</li>
        <li>API Version: 2022-06-30</li>
        <li>Base Path: /sanity</li>
      </ul>

      <h2>Schema Types (should be 7):</h2>
      <ol>
        <li>post (News Post)</li>
        <li>category</li>
        <li>tag</li>
        <li>author</li>
        <li>photoStory (Photo Stories) ← NEW</li>
        <li>videoStory (Video Stories) ← NEW</li>
        <li>podcast (Podcasts) ← NEW</li>
      </ol>

      <h2>Routes:</h2>
      <ul>
        <li><a href="/sanity">Sanity Studio</a></li>
        <li><a href="/photos">Photos</a></li>
        <li><a href="/videos">Videos</a></li>
        <li><a href="/podcasts">Podcasts</a></li>
      </ul>

      <h2>Troubleshooting:</h2>
      <p><strong>WebSocket Error?</strong> This is a network connectivity issue to Sanity's servers.</p>
      <p><strong>Solutions:</strong></p>
      <ul>
        <li>Try accessing from a different network</li>
        <li>Check if your firewall allows wss://bkexk006.api.sanity.io</li>
        <li>The schemas should still load even with WebSocket errors</li>
        <li>Try incognito/private browsing mode</li>
      </ul>
    </main>
  )
}
