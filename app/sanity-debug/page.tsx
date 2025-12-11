export const dynamic = 'force-static'

import { schema } from '@/sanity/schemaTypes'

export default function SanityDebugPage() {
  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Sanity Configuration Debug</h1>
      
      <h2>Schema Types ({schema.types.length}):</h2>
      <ul>
        {schema.types.map((type: any, i: number) => (
          <li key={i}>
            <strong>{type.name}</strong> ({type.type})
            {type.name === 'photoStory' && ' ← SHOULD SHOW IN STUDIO'}
            {type.name === 'videoStory' && ' ← SHOULD SHOW IN STUDIO'}
            {type.name === 'podcast' && ' ← SHOULD SHOW IN STUDIO'}
          </li>
        ))}
      </ul>
      
      <h2>Next Steps:</h2>
      <ol>
        <li>Check browser console for errors (F12)</li>
        <li>Go to <a href="/sanity">Sanity Studio</a></li>
        <li>Look for Photo Stories, Video Stories, Podcasts in left sidebar</li>
      </ol>
      
      <h2>Expected in Studio:</h2>
      <ul>
        <li>News Post</li>
        <li>Category</li>
        <li>Tag</li>
        <li>Author</li>
        <li style={{ color: 'green' }}>Photo Stories ←</li>
        <li style={{ color: 'green' }}>Video Stories ←</li>
        <li style={{ color: 'green' }}>Podcasts ←</li>
      </ul>
    </div>
  )
}
