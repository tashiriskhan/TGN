# Sanity Studio Schema Troubleshooting Guide

## ✅ WHAT'S BEEN VERIFIED

1. **Schema Files Created** ✓
   - /sanity/schemaTypes/photoStory.js
   - /sanity/schemaTypes/videoStory.js
   - /sanity/schemaTypes/podcast.js

2. **Schema Index Updated** ✓
   - All 7 schemas imported with .js extensions
   - Exporting `schema.types` correctly

3. **Sanity Config** ✓
   - Project ID: bkexk006
   - Dataset: production
   - API Version: 2022-06-30
   - All plugins configured correctly

4. **Structure Configured** ✓
   - Using `S.documentTypeListItems()` to auto-generate list

5. **Build Successful** ✓
   - All routes generated correctly
   - No TypeScript errors
   - Schema loads all 7 types

## 🔍 DIAGNOSTIC STEPS

### Step 1: Restart Everything
```bash
# Kill the dev server (Ctrl+C)
# Clear ALL caches:
rm -rf .next .sanity node_modules/.cache
# Restart:
npm run dev
```

### Step 2: Check Browser Console
1. Go to: http://localhost:3000/sanity
2. Press F12 → Console tab
3. Look for **RED ERROR MESSAGES**
4. Copy any errors you see

### Step 3: Check Network Tab
1. Press F12 → Network tab
2. Refresh the page
3. Look for requests to Sanity API
4. Check for 404 or 500 errors

### Step 4: Check Schema Debug Page
1. Go to: http://localhost:3000/sanity-debug
2. This page shows loaded schema types
3. Should display all 7 types including Photo Stories, Video Stories, Podcasts

## 🐛 POSSIBLE CAUSES

### Cause 1: Browser Cache
**Solution:** Hard refresh (Ctrl+Shift+R) or use incognito mode

### Cause 2: .sanity Cache Directory
**Solution:** Already cleared, but if it comes back:
```bash
rm -rf .sanity
npm run dev
```

### Cause 3: WebSocket Blocking
The wss://... error is a NETWORK issue (firewall, VPN, corporate network).
**This should NOT prevent schemas from loading.**
**Solution:** Try different network or disable VPN.

### Cause 4: Schema Loading Error
Check browser console for errors like:
- "Cannot find module photoStory"
- "Unexpected token"
- "Failed to load schema"

### Cause 5: Structure Not Applied
The structure configuration might not be working.
**Solution:** Already using auto-generated structure.

## 📋 WHAT TO REPORT BACK

Please run these commands and share the output:

```bash
# 1. Check schema loads
node -e "const {schema} = require('./sanity/schemaTypes/index.js'); console.log('Total types:', schema.types.length);"

# 2. Check build
npm run build 2>&1 | tail -20

# 3. Open browser and check console
# Go to http://localhost:3000/sanity
# Press F12, copy any RED errors from Console tab
```

## 🎯 EXPECTED RESULT

After restart, Sanity Studio at http://localhost:3000/sanity should show:

**Left Sidebar:**
- News Post
- Category
- Tag
- Author
- Photo Stories ← NEW
- Video Stories ← NEW
- Podcasts ← NEW

If you don't see the 3 new types, check the browser console for errors.
