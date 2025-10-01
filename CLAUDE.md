# CLAUDE.md

## Language Preference

**IMPORTANT: Always communicate in Spanish with this user.**

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Tinta website (https://tinta.wine) is a multilingual (Spanish/English) Next.js 15 application built with PayloadCMS 3.7 as the headless CMS. The project serves a wine culture business offering agency services, academy courses, software solutions, and editorial content.

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **CMS**: PayloadCMS 3.7 with Lexical rich text editor
- **Database**: PostgreSQL (via @payloadcms/db-postgres)
- **Storage**: Vercel Blob Storage
- **Email**: Resend
- **Styling**: Tailwind CSS with Radix UI components
- **i18n**: next-international
- **Animation**: Framer Motion

## Development Commands

```bash
# Development server
pnpm dev

# Production build
pnpm build

# Production-like local build
pnpm dev:prod

# Start production server
pnpm start

# Linting
pnpm lint
pnpm lint:fix

# Generate Payload types
pnpm generate:types

# Generate import map
pnpm generate:importmap

# Clean reinstall
pnpm reinstall
```

## Architecture

### App Router Structure

The application uses Next.js 15 App Router with route groups:

- `src/app/(frontend)/[locale]/` - Public-facing multilingual pages (Spanish/English)
- `src/app/(payload)/` - PayloadCMS admin panel and API routes
- `src/app/(sitemaps)/` - Dynamic XML sitemaps for SEO

### PayloadCMS Collections

Defined in `src/collections/`:
- **Posts** - Blog posts with versioning, drafts, live preview, and language support
- **Pages** - Static pages with flexible content blocks
- **Media** - File uploads stored in Vercel Blob
- **Categories** - Nested hierarchical categories for posts
- **Users** - Authentication and authorship

### PayloadCMS Globals

Defined in `src/`:
- **Header** (`src/Header/`) - Global navigation configuration
- **Footer** (`src/Footer/`) - Global footer configuration

### Content Blocks

Reusable content blocks in `src/blocks/`:
- **Banner** - Promotional banners
- **CallToAction** - CTA components
- **Code** - Syntax-highlighted code blocks
- **Content** - Rich text content
- **Form** - Form builder integration
- **MediaBlock** - Media display
- **ArchiveBlock** - Post archives
- **RelatedPosts** - Related content display

Blocks are rendered via `src/blocks/RenderBlocks.tsx` and configured in collection/page editors.

### Hero Components

Page hero variants in `src/heros/`:
- **HighImpact** - Large hero with prominent visuals
- **MediumImpact** - Balanced hero layout
- **LowImpact** - Minimal hero

### Internationalization (i18n)

- Locales: Spanish (es) and English (en)
- Translations in `src/locales/en.ts` and `src/locales/es.ts`
- Use `getScopedI18n()` from `@/locales/server` for server components
- Routes are prefixed with `[locale]` dynamic segment
- Posts and Pages have `language` field to filter content by locale

### Plugins

Configured in `src/plugins/index.ts`:
- **redirects** - URL redirects with revalidation
- **nested-docs** - Hierarchical categories
- **seo** - SEO metadata management
- **form-builder** - Dynamic forms
- **search** - Full-text search for posts
- **payload-cloud** - Payload Cloud integration

### Access Control

Access policies in `src/access/`:
- `authenticated` - Requires login
- `authenticatedOrPublished` - Public if published, otherwise requires auth
- `anyone` - Public access

### Hooks

PayloadCMS hooks in `src/hooks/` and collection-specific hooks:
- `formatSlug` - Auto-generate slugs from titles
- `populatePublishedAt` - Set publish dates
- `revalidateRedirects` - Rebuild redirects on change
- `populateAuthors` - Populate author data in posts
- `revalidatePost` / `revalidatePage` - Trigger Next.js revalidation on content changes

### Path Aliases

TypeScript paths configured in `tsconfig.json`:
- `@/*` maps to `src/*`
- `@payload-config` maps to `src/payload.config.ts`

### Custom Fields

- **Slug field** (`src/fields/slug/`) - Customizable slug with auto-generation
- **Link fields** (`src/fields/link.ts`, `linkGroup.ts`) - Reusable link structures
- **Default Lexical** (`src/fields/defaultLexical.ts`) - Default rich text editor config

### UI Components

Shadcn/UI components in `src/components/ui/` (Button, Input, Select, Card, etc.)

Custom components in `src/components/`:
- **AdminBar** - Frontend admin toolbar for authenticated users
- **RichText** - Lexical content renderer
- **Media** - Image/media display with Next.js Image optimization
- **Link** - Internal/external link handling
- **Card** - Post/page cards
- **CollectionArchive** - Paginated post archives
- **Pagination** - Page navigation
- **LivePreviewListener** - PayloadCMS live preview integration
- **PayloadRedirects** - Client-side redirect handling

### Environment Variables

Required in `.env`:
- `DATABASE_URI` - PostgreSQL connection string
- `PAYLOAD_SECRET` - PayloadCMS secret key
- `BLOB_READ_WRITE_TOKEN` - Vercel Blob storage token
- `RESEND_API_KEY` - Email service API key
- `NEXT_PUBLIC_SERVER_URL` - Public URL (auto-set on Vercel)

### Styling

- Tailwind CSS configured in `tailwind.config.mjs`
- Custom theme colors: `tinta-verde` (primary brand color)
- CSS variables defined in `src/cssVariables.js`
- Geist font family
- Dark mode support via theme provider (`src/providers/Theme/`)

## Project-Specific Notes

- **Documentation language**: Spanish (as per `.cursorrules`)
- **Memory bank**: Documentation stored in `memory-bank/` directory
- **Live preview**: Enabled for Posts and Pages with autosave every 100ms
- **Versioning**: Up to 50 versions per document with draft/publish workflow
- **Analytics**: Vercel Analytics integrated
- **Sitemap**: Auto-generated post-build via `next-sitemap`
- **GraphQL**: Available at `/api/graphql` with playground at `/api/graphql-playground`

## Important Development Notes

- Always use `cross-env NODE_OPTIONS=--no-deprecation` for scripts (defined in package.json)
- Revalidation hooks trigger Next.js cache updates when CMS content changes
- Posts support multiple authors via relationship field
- SEO fields (meta title, description, image) are built into Pages and Posts
- Form submissions are handled by PayloadCMS form-builder plugin
- Search is enabled only for Posts collection
