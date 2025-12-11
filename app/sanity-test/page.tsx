import { schema } from '@/sanity/schemaTypes'

export default function SanityTestPage() {
  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Sanity Schema Test</h1>
      <p>Project ID: bkexk006</p>
      <p>Dataset: production</p>
      <p>API Version: 2022-06-30</p>
      
      <h2>Loaded Schema Types ({schema.types.length}):</h2>
      <ul>
        {schema.types.map((type: any, i: number) => (
          <li key={i}>
            <strong>{type.name || type.title}</strong> - {type.type}
          </li>
        ))}
      </ul>
      
      <h2>Check These in Browser Console:</h2>
      <p>Press F12 and check for errors</p>
      
      <h2>Sanity Studio Links:</h2>
      <ul>
        <li><a href="/sanity">Open Sanity Studio</a></li>
      </ul>
    </div>
  )
}
