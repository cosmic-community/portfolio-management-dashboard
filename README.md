# Portfolio Management Dashboard

![Portfolio Management Dashboard](https://imgix.cosmicjs.com/f20ac060-9abe-11f0-bba7-d56988718db7-photo-1611224923853-80b023f02d71-1758880488058.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A comprehensive React-based dashboard for managing your web developer portfolio content. This powerful admin interface provides full CRUD operations for projects, skills, work experience, and testimonials, all powered by your existing Cosmic CMS data structure.

## Features

- 🚀 **Complete Content Management** - Full CRUD operations for all portfolio content types
- 🔄 **Real-time Data Sync** - Live updates with Cosmic CMS backend
- 🔍 **Advanced Filtering & Search** - Find and organize content quickly
- ✅ **Rich Form Validation** - Comprehensive validation for all data fields
- 📱 **Responsive Dashboard Design** - Works perfectly on desktop and mobile
- 📊 **Professional Analytics Views** - Visual insights into your portfolio data
- 🎯 **Type-safe Development** - Full TypeScript support with strict typing
- 🎨 **Modern UI Components** - Clean, professional interface design

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68d66227e4b13704227fb7a5&clone_repository=68d6660be4b13704227fb7cb)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a web developer portfolio with projects, skills, work experience, and testimonials"

### Code Generation Prompt

> "Create a React dashboard that displays and manages my existing content"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS with custom dashboard theme
- **CMS**: Cosmic SDK v1.5.5
- **Form Handling**: React Hook Form with validation
- **UI Components**: Custom dashboard components
- **Icons**: Heroicons for consistent iconography
- **Development**: ESLint, TypeScript strict mode

## Getting Started

### Prerequisites

- Node.js 18+ or Bun runtime
- A Cosmic account with portfolio content model

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up your environment variables:
   ```bash
   cp .env.example .env.local
   ```
   
   Add your Cosmic credentials:
   ```
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

4. Run the development server:
   ```bash
   bun run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the dashboard

## Cosmic SDK Examples

### Fetching All Projects
```typescript
import { cosmic } from '@/lib/cosmic'

const projects = await cosmic.objects
  .find({ type: 'projects' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Creating New Content
```typescript
const newProject = await cosmic.objects.insertOne({
  type: 'projects',
  title: 'New Project',
  metadata: {
    name: 'Project Name',
    description: 'Project description',
    technologies: 'React, TypeScript, Next.js',
    featured: false
  }
})
```

### Updating Existing Content
```typescript
await cosmic.objects.updateOne(projectId, {
  metadata: {
    featured: true,
    description: 'Updated description'
  }
})
```

## Cosmic CMS Integration

This dashboard integrates seamlessly with your Cosmic CMS content model:

- **Projects**: Manage portfolio projects with images, technologies, and links
- **Skills**: Organize technical skills by category with proficiency levels
- **Work Experience**: Track career history with achievements and technologies
- **Testimonials**: Collect and display client testimonials with ratings

The dashboard automatically handles:
- File uploads for images and documents
- Select dropdown validation for categories and ratings
- Date formatting for work experience timelines
- Rich text editing for descriptions and testimonials

## Deployment Options

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Netlify
1. Build the project: `bun run build`
2. Deploy the `out` folder to Netlify
3. Set up environment variables in Netlify dashboard

### Other Platforms
The dashboard can be deployed to any platform that supports Node.js applications.

<!-- README_END -->