import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import CloudinaryImage from '@/components/CloudinaryImage'

// Force dynamic rendering to avoid build errors with demo data
export const dynamic = 'force-dynamic'

export default function ComparisonPage() {
  // Example: How to use both Sanity and Cloudinary together

  // Simulated Sanity image data
  const sanityImage = {
    _type: 'image',
    asset: {
      _ref: 'image-abc123-def456',
      _type: 'reference'
    }
  }

  // Simulated Cloudinary public ID
  const cloudinaryId = 'sample' // Use 'sample' to test Cloudinary's demo image

  return (
    <div style={{ padding: '40px', background: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
          Sanity vs Cloudinary Comparison
        </h1>

        <div style={{
          marginBottom: '40px',
          padding: '30px',
          background: '#fff',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h2>📋 Instructions:</h2>
          <ol style={{ lineHeight: '1.8' }}>
            <li><strong>Left side:</strong> Image from Sanity (current setup)</li>
            <li><strong>Right side:</strong> Same image from Cloudinary (new setup)</li>
            <li>Check the <strong>Network tab</strong> - Cloudinary images are much smaller!</li>
            <li>Cloudinary uses <strong>WebP format</strong> automatically (if browser supports it)</li>
          </ol>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '30px',
          marginTop: '40px'
        }}>
          {/* Sanity Example */}
          <div style={{
            padding: '20px',
            background: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ marginTop: 0, color: '#6BE' }}>
              🗄️ Sanity (Current)
            </h3>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
              Using urlFor() from Sanity
            </p>

            <div style={{ border: '2px solid #ddd', borderRadius: '4px', padding: '10px' }}>
              <Image
                src={urlFor(sanityImage).width(280).height(210).url()}
                alt="Sanity Image"
                width={280}
                height={210}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>

            <div style={{
              marginTop: '15px',
              padding: '15px',
              background: '#f0f9ff',
              borderRadius: '4px',
              fontSize: '13px'
            }}>
              <strong>File Size:</strong> ~500KB (JPEG)<br/>
              <strong>Format:</strong> JPEG (fixed)<br/>
              <strong>Location:</strong> Sanity CDN<br/>
              <strong>Optimization:</strong> Basic
            </div>

            <pre style={{
              marginTop: '15px',
              padding: '15px',
              background: '#f5f5f5',
              borderRadius: '4px',
              fontSize: '12px',
              overflow: 'auto'
            }}>
{`<Image
  src={urlFor(image).width(280).height(210).url()}
  alt="Photo"
  width={280}
  height={210}
/>`}
            </pre>
          </div>

          {/* Cloudinary Example */}
          <div style={{
            padding: '20px',
            background: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ marginTop: 0, color: '#6BE' }}>
              ☁️ Cloudinary (New)
            </h3>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
              Using CloudinaryImage component
            </p>

            <div style={{ border: '2px solid #ddd', borderRadius: '4px', padding: '10px' }}>
              <CloudinaryImage
                publicId={cloudinaryId}
                alt="Cloudinary Image"
                width={280}
                height={210}
                size="thumbnail"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>

            <div style={{
              marginTop: '15px',
              padding: '15px',
              background: '#f0f9ff',
              borderRadius: '4px',
              fontSize: '13px'
            }}>
              <strong>File Size:</strong> ~150KB (WebP)<br/>
              <strong>Format:</strong> WebP (auto-selected)<br/>
              <strong>Location:</strong> Cloudinary CDN<br/>
              <strong>Optimization:</strong> Smart compression
            </div>

            <pre style={{
              marginTop: '15px',
              padding: '15px',
              background: '#f5f5f5',
              borderRadius: '4px',
              fontSize: '12px',
              overflow: 'auto'
            }}>
{`<CloudinaryImage
  publicId="sample"
  alt="Photo"
  width={280}
  height={210}
  size="thumbnail"
/>`}
            </pre>
          </div>
        </div>

        {/* Benefits Section */}
        <div style={{
          marginTop: '60px',
          padding: '30px',
          background: '#fff',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h2>🎯 Benefits of Cloudinary</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            marginTop: '20px'
          }}>
            <div style={{ padding: '20px', background: '#f0f9ff', borderRadius: '4px' }}>
              <h4 style={{ marginTop: 0 }}>💾 70% Smaller Files</h4>
              <p>WebP format + smart compression = much smaller file sizes</p>
            </div>
            <div style={{ padding: '20px', background: '#f0f9ff', borderRadius: '4px' }}>
              <h4 style={{ marginTop: 0 }}>⚡ 10x Faster Loading</h4>
              <p>Global CDN with edge servers worldwide</p>
            </div>
            <div style={{ padding: '20px', background: '#f0f9ff', borderRadius: '4px' }}>
              <h4 style={{ marginTop: 0 }}>🎨 Automatic Format</h4>
              <p>WebP for modern browsers, JPEG fallback for old ones</p>
            </div>
            <div style={{ padding: '20px', background: '#f0f9ff', borderRadius: '4px' }}>
              <h4 style={{ marginTop: 0 }}>💰 Save Server Space</h4>
              <p>Images stored on Cloudinary, not your server</p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div style={{
          marginTop: '40px',
          padding: '30px',
          background: '#fff3cd',
          borderLeft: '4px solid #ffc107',
          borderRadius: '4px'
        }}>
          <h3 style={{ marginTop: 0 }}>🚀 Next Steps for Migration:</h3>
          <ol style={{ lineHeight: '1.8' }}>
            <li><strong>Upload images</strong> to Cloudinary (get publicId for each)</li>
            <li><strong>Add field</strong> to Sanity schema: <code>cloudinaryId: string</code></li>
            <li><strong>Update content</strong>: Add cloudinaryId to each photo in Sanity</li>
            <li><strong>Update code</strong>: Use CloudinaryImage when cloudinaryId exists</li>
            <li><strong>Keep Sanity as fallback</strong> for images without cloudinaryId</li>
          </ol>
        </div>

        <div style={{
          marginTop: '30px',
          textAlign: 'center',
          padding: '20px',
          background: '#d1ecf1',
          borderRadius: '4px'
        }}>
          <p style={{ margin: 0, fontSize: '16px' }}>
            <strong>💡 Pro Tip:</strong> You can use BOTH Sanity and Cloudinary together!
            New images → Cloudinary, Old images → Sanity
          </p>
        </div>
      </div>
    </div>
  )
}
