/**
 * Bulk Migration Script: Sanity → Cloudinary
 *
 * This script will:
 * 1. Fetch all photo stories from Sanity
 * 2. Download images from Sanity
 * 3. Upload them to Cloudinary
 * 4. Update Sanity records with cloudinaryId
 *
 * RUN WITH: npx tsx scripts/migrate-to-cloudinary.ts
 */

import { createClient } from '@sanity/client'
import cloudinary from 'cloudinary'
import fs from 'fs'
import path from 'path'
import https from 'https'

// Configure Sanity
const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2022-06-30',
  token: process.env.SANITY_API_TOKEN, // Needed for mutations
  useCdn: false,
})

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

// Helper: Download image from URL
function downloadImage(url: string, filepath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      const file = fs.createWriteStream(filepath)
      response.pipe(file)
      file.on('finish', () => file.close(() => resolve()))
    }).on('error', (err) => {
      fs.unlink(filepath, () => reject(err))
    })
  })
}

// Helper: Upload to Cloudinary
async function uploadToCloudinary(localPath: string, publicId: string): Promise<string> {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(
      localPath,
      {
        public_id: publicId,
        folder: 'photos',
        resource_type: 'image',
      },
      (error: any, result: any) => {
        // Clean up temp file
        fs.unlink(localPath, () => {})
        if (error) reject(error)
        else resolve(result?.public_id || '')
      }
    )
  })
}

// Main migration function
async function migratePhotos() {
  console.log('🚀 Starting Sanity → Cloudinary migration...\n')

  // Step 1: Fetch all photo stories
  console.log('📋 Fetching photo stories from Sanity...')
  const photoStories = await sanity.fetch(`
    *[_type == "photoStory"]{
      _id,
      title,
      mainImage,
      cloudinaryId
    }
  `)

  console.log(`Found ${photoStories.length} photo stories\n`)

  // Step 2: Process each photo
  let migrated = 0
  let skipped = 0

  for (const story of photoStories) {
    // Skip if already migrated
    if (story.cloudinaryId) {
      console.log(`⏭️  Skipping "${story.title}" (already has cloudinaryId: ${story.cloudinaryId})`)
      skipped++
      continue
    }

    // Skip if no image
    if (!story.mainImage?.asset?._ref) {
      console.log(`⚠️  Skipping "${story.title}" (no mainImage)`)
      skipped++
      continue
    }

    try {
      console.log(`\n📸 Processing: "${story.title}"`)

      // Get image URL from Sanity
      const imageUrl = `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${story.mainImage.asset._ref}.jpg`

      // Create temp file path
      const tempDir = './temp-downloads'
      if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir)
      const tempPath = path.join(tempDir, `${story._id}.jpg`)

      // Download from Sanity
      console.log(`  ⬇️  Downloading from Sanity...`)
      await downloadImage(imageUrl, tempPath)

      // Upload to Cloudinary
      console.log(`  ⬆️  Uploading to Cloudinary...`)
      const publicId = `photos/${story._id}`
      await uploadToCloudinary(tempPath, publicId)

      // Update Sanity with cloudinaryId
      console.log(`  💾 Updating Sanity...`)
      await sanity
        .patch(story._id)
        .set({ cloudinaryId: publicId })
        .commit()

      console.log(`  ✅ Migrated successfully: ${publicId}`)
      migrated++

    } catch (error) {
      console.error(`  ❌ Error:`, error)
    }
  }

  // Cleanup temp directory
  if (fs.existsSync('./temp-downloads')) {
    fs.rmSync('./temp-downloads', { recursive: true, force: true })
  }

  // Summary
  console.log(`\n🎉 Migration Complete!`)
  console.log(`✅ Migrated: ${migrated}`)
  console.log(`⏭️  Skipped: ${skipped}`)
  console.log(`📊 Total: ${photoStories.length}`)
}

// Run migration
migratePhotos().catch((error) => {
  console.error('❌ Migration failed:', error)
  process.exit(1)
})
