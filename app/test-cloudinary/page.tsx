import CloudinaryImage from '@/components/CloudinaryImage'

export default function TestCloudinaryPage() {
  return (
    <div style={{ padding: '40px', background: '#f5f5f5', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>
        Cloudinary Test Page
      </h1>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <p style={{ marginBottom: '20px', textAlign: 'center' }}>
          Test your Cloudinary setup by uploading an image to your Cloudinary account
          and replacing the publicId below.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
          marginTop: '40px'
        }}>
          {/* Thumbnail Test */}
          <div style={{ textAlign: 'center' }}>
            <h3>Thumbnail (280x210)</h3>
            <p style={{ fontSize: '12px', color: '#666' }}>
              For photo listings
            </p>
            <CloudinaryImage
              publicId="sample" // Replace with your uploaded image publicId
              alt="Test Thumbnail"
              width={280}
              height={210}
              size="thumbnail"
              style={{ border: '2px solid #ddd', borderRadius: '4px' }}
            />
          </div>

          {/* Grid Test */}
          <div style={{ textAlign: 'center' }}>
            <h3>Grid (600x450)</h3>
            <p style={{ fontSize: '12px', color: '#666' }}>
              For photo gallery
            </p>
            <CloudinaryImage
              publicId="sample" // Replace with your uploaded image publicId
              alt="Test Grid"
              width={600}
              height={450}
              size="grid"
              style={{ border: '2px solid #ddd', borderRadius: '4px' }}
            />
          </div>

          {/* Lightbox Test */}
          <div style={{ textAlign: 'center' }}>
            <h3>Lightbox (1200x900)</h3>
            <p style={{ fontSize: '12px', color: '#666' }}>
              For full-size view
            </p>
            <CloudinaryImage
              publicId="sample" // Replace with your uploaded image publicId
              alt="Test Lightbox"
              width={1200}
              height={900}
              size="lightbox"
              style={{ border: '2px solid #ddd', borderRadius: '4px' }}
            />
          </div>
        </div>

        <div style={{
          marginTop: '60px',
          padding: '30px',
          background: '#fff',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h2>Instructions:</h2>
          <ol style={{ lineHeight: '1.8' }}>
            <li>Go to <a href="https://cloudinary.com/console" target="_blank" rel="noopener noreferrer">Cloudinary Console</a></li>
            <li>Upload an image (drag & drop or click Upload)</li>
            <li>Copy the <strong>Public ID</strong> from the uploaded image</li>
            <li>Replace <code>publicId="sample"</code> with your actual Public ID above</li>
            <li>Save the file and refresh this page</li>
          </ol>

          <div style={{
            marginTop: '30px',
            padding: '20px',
            background: '#f0f9ff',
            borderLeft: '4px solid #6BE',
            borderRadius: '4px'
          }}>
            <h3 style={{ marginTop: 0 }}>💡 Pro Tips:</h3>
            <ul style={{ lineHeight: '1.8' }}>
              <li>Use <code>sample</code> as publicId to test with Cloudinary's demo image</li>
              <li>Different sizes show optimized images automatically</li>
              <li>Check Network tab to see the image sizes (should be much smaller than originals!)</li>
              <li>On modern browsers, you'll see WebP format (smaller files)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
