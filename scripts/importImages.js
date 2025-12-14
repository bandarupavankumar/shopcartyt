const fs = require('fs');
const path = require('path');
const { createClient } = require('@sanity/client');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });


const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_WRITE_TOKEN,  // Using the write token from .env.local
  useCdn: false,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION
});

const imageDir = path.join(__dirname, '..', 'images', 'products');

async function uploadImages() {
  if (!fs.existsSync(imageDir)) {
    console.error(`Error: Directory not found: ${imageDir}`);
    return;
  }

  const files = fs.readdirSync(imageDir);
  console.log(`Found ${files.length} files in ${imageDir}`);

  for (const file of files) {
    if (file.match(/\.(png|jpg|jpeg)$/i)) {
      const filePath = path.join(imageDir, file);
      console.log(`\nProcessing ${file}...`);

      try {
        // Upload image
        console.log('Uploading image...');
        const result = await client.assets.upload('image', fs.createReadStream(filePath), {
          filename: file,
          contentType: `image/${path.extname(file).substring(1)}`
        });
        console.log('Image uploaded:', result.url);

        // Create product
        const productName = path.basename(file, path.extname(file))
          .replace(/_/g, ' ')
          .replace(/\b\w/g, l => l.toUpperCase()); // Capitalize first letters

        console.log('Creating product:', productName);
        
        await client.create({
          _type: 'product',
          name: productName,
          slug: {
            _type: 'slug',
            current: productName.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
          },
          images: [{
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: result._id
            }
          }],
          price: Math.floor(Math.random() * 500) + 50,
          description: `High-quality ${productName}`,
          variant: 'gadget',
          categories: ['electronics']
        });

        console.log('✅ Product created successfully!');

      } catch (error) {
        console.error('❌ Error:', error.message);
        if (error.responseBody) {
          console.error('Error details:', JSON.parse(error.responseBody));
        }
      }
    }
  }
}

// Run the upload
uploadImages()
  .then(() => console.log('\n🎉 All done!'))
  .catch(console.error);