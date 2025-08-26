# Vue.js E-commerce Store

![App Preview](https://imgix.cosmicjs.com/9e97d620-8254-11f0-83d8-7b0502815c4d-photo-1498049794561-7780e7231661-1756196039157.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern e-commerce store built with Vue.js 3 showcasing your product catalog with collections, customer reviews, and a responsive shopping experience.

## Features

- 🛍️ **Product Catalog** - Browse all products with images, prices, and ratings
- 📦 **Collections** - Filter products by Electronics and Home & Living categories
- ⭐ **Customer Reviews** - Display verified customer reviews with star ratings
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile
- 🔍 **Search & Filter** - Advanced product filtering capabilities
- 🖼️ **Image Gallery** - High-quality product images with optimization

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68ad6c371f09167261d58d22&clone_repository=68ad6e061f09167261d58d46)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Design a content model for an e-commerce store with products, collections, and customer reviews, and UI"

### Code Generation Prompt

> Develop a Vue.js application that uses my existing object types and objects

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Vue.js 3** - Progressive JavaScript framework with Composition API
- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe JavaScript development
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic SDK** - Content management and API integration
- **Vue Router** - Client-side routing for SPA navigation

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with your e-commerce content

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up your environment variables by creating a `.env.local` file:
   ```env
   VITE_COSMIC_BUCKET_SLUG=your-bucket-slug
   VITE_COSMIC_READ_KEY=your-read-key
   VITE_COSMIC_WRITE_KEY=your-write-key
   ```

4. Start the development server:
   ```bash
   bun run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) to view the application

## Cosmic SDK Examples

### Fetching Products
```typescript
// Get all products with collections
const response = await cosmic.objects
  .find({ type: 'products' })
  .depth(1)

const products = response.objects
```

### Fetching Reviews
```typescript
// Get reviews with product information
const response = await cosmic.objects
  .find({ type: 'reviews' })
  .depth(1)

const reviews = response.objects
```

### Fetching Collections
```typescript
// Get all collections
const response = await cosmic.objects
  .find({ type: 'collections' })

const collections = response.objects
```

## Cosmic CMS Integration

This application integrates with your Cosmic CMS bucket to display:

- **Products** - Product catalog with names, descriptions, prices, images, and stock status
- **Collections** - Product categories (Electronics, Home & Living) with featured collections
- **Reviews** - Customer reviews with ratings, comments, and verified purchase status

The content structure matches your existing object types:
- Products include collections relationship and multiple product images
- Reviews are linked to specific products with star ratings (1-5 Stars)
- Collections can be marked as featured and include descriptive images

## Deployment Options

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy with automatic deployments on push

### Netlify
1. Connect your repository to Netlify
2. Set build command: `bun run build`
3. Set publish directory: `dist`
4. Configure environment variables

### Traditional Hosting
1. Build the application: `bun run build`
2. Upload the `dist` folder contents to your web server
3. Configure environment variables on your hosting platform

For production, make sure to set your environment variables in your hosting platform's dashboard.
<!-- README_END -->