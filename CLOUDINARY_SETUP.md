# Cloudinary Setup Guide

## ✅ What's Been Done

1. **Installed next-cloudinary package**
2. **Created configuration files**:
   - `lib/cloudinary/config.ts` - Cloudinary client setup
   - `lib/cloudinary/image.ts` - Helper functions for URL generation
   - `components/CloudinaryImage.tsx` - Optimized Image component

## 🔑 Next Steps - Add Your Credentials

### 1. Get Your Cloudinary Credentials

Go to: https://cloudinary.com/console

Copy these values from your dashboard:
- **Cloud name** (e.g., `demo` or your custom name)
- **API Key**
- **API Secret**

### 2. Update `.env.local`

Replace the placeholder values in `.env.local`:

```env
CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
CLOUDINARY_API_KEY=your_actual_api_key
CLOUDINARY_API_SECRET=your_actual_api_secret
```

**Example:**
```env
CLOUDINARY_CLOUD_NAME=demo
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=demo
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abc123def456ghi789...
```

## 📸 How to Upload Images to Cloudinary

### Option 1: Upload via Cloudinary Console
1. Go to https://cloudinary.com/console
2. Click "Media Library"
3. Click "Upload"
4. Select your images
5. Note the **Public ID** of each image (e.g., `sample`, `folder/image123`)

### Option 2: Upload Programmatically (Later)

## 🎨 How to Use in Your Code

### Basic Usage

```tsx
import CloudinaryImage from '@/components/CloudinaryImage'

// For thumbnails (photo listings)
<CloudinaryImage
  publicId="sample"
  alt="My Photo"
  width={280}
  height={210}
  size="thumbnail"
/>

// For grid view
<CloudinaryImage
  publicId="sample"
  alt="My Photo"
  width={600}
  height={450}
  size="grid"
/>

// For lightbox
<CloudinaryImage
  publicId="sample"
  alt="My Photo"
  width={1200}
  height={900}
  size="lightbox"
/>
```

### Using Helper Function Directly

```tsx
import { cloudinaryUrl } from '@/lib/cloudinary/image'

// Generate URL with custom options
const imageUrl = cloudinaryUrl('sample', {
  width: 800,
  height: 600,
  quality: 80,
  format: 'webp',
})

<img src={imageUrl} alt="My Photo" />
```

## 🔄 Migrating from Sanity to Cloudinary

### Current Sanity Usage:
```tsx
import { urlFor } from '@/sanity/lib/image'

<Image
  src={urlFor(story.mainImage).width(280).height(210).url()}
  alt={story.title}
  width={280}
  height={210}
/>
```

### New Cloudinary Usage:
```tsx
import CloudinaryImage from '@/components/CloudinaryImage'

<CloudinaryImage
  publicId="photo-public-id-from-cloudinary"
  alt={story.title}
  width={280}
  height={210}
  size="thumbnail"
/>
```

## 📊 Expected Benefits

- **60-70% smaller file sizes** (WebP + quality optimization)
- **10x faster image loading** (CDN delivery)
- **Zero server storage** for images
- **Automatic format selection** (WebP for modern browsers, JPEG for old ones)
- **Smart compression** based on content

## 🎯 Migration Strategy

### Phase 1: Test with One Image
1. Upload one test image to Cloudinary
2. Replace one image in your code with Cloudinary
3. Verify it works and looks good

### Phase 2: Batch Migration
1. Upload all images to Cloudinary
2. Update photo listing page (`app/photos/page.tsx`)
3. Update photo detail pages (`app/photos/[slug]/page.tsx`)

### Phase 3: Optimization
1. Add blur placeholders for faster loading
2. Implement responsive images
3. Add lazy loading

## ⚡ Quick Start

1. **Add your credentials to `.env.local`**
2. **Upload 1-2 test images** to Cloudinary
3. **Test the component**:
```tsx
<CloudinaryImage
  publicId="your-uploaded-image-public-id"
  alt="Test"
  width={280}
  height={210}
  size="thumbnail"
/>
```

## 📝 Image Upload Process

When you upload an image to Cloudinary, you get a **Public ID** like:
- `photo-001`
- `2024/photos/vacation-1`
- `gallery/wedding/couple`

Use this Public ID in your components!

## 🆘 Need Help?

- Cloudinary Docs: https://cloudinary.com/documentation
- Image Transformations: https://cloudinary.com/documentation/image_transformations
- Upload API: https://cloudinary.com/documentation/image_upload_api_reference

---

**Ready to proceed?** Add your credentials and upload a test image! 🚀
