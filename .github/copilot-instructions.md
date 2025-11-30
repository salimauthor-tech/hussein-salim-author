# Hussein Salim Author Website - AI Coding Agent Instructions

## Project Overview
A premium single-page author website showcasing Hussein Salim with a dark theme, metallic gold accents, and interactive animations. Built with vanilla HTML, CSS, and JavaScript—no framework dependencies.

## Architecture & Key Patterns

### Design System
- **Color Scheme**: CSS variables in `:root` (see `css/style.css`):
  - `--primary-gold: #c9b388` (main accent)
  - `--dark-base: #0a0a0a` (background)
  - `--fire-orange: #ff6b35` and `--water-blue: #4fc3f7` (elemental accents)
- **Typography**: Serif fonts (`Cormorant Garamond`) for headings, sans-serif (`Inter`) for body
- **Common Classes**: `.glass-card`, `.hover-lift`, `.gradient-text`, `.text-gold` for consistent styling

### JavaScript Event Patterns
All interactivity centralizes in `js/main.js` with DOMContentLoaded listeners:
- **Navigation**: Toggle on mobile via `.nav-toggle`, close menu when navigating
- **Smooth Scrolling**: All `a[href^="#"]` anchors auto-scroll with `headerHeight = 80` offset
- **Animations**: `.scroll-animate` elements gain `.visible` class when viewport-entered
- **User Feedback**: `showNotification()` function displays temporary messages (5s default) for button clicks

### Button Action Handlers
- `.book-purchase`: Opens external purchase link (redirects to `https://example.com/...`)
- `.book-sample`: Opens `/samples/the-phoenix-covenant-sample.pdf`
- `.speaker-kit`: Opens `/downloads/speaker-kit.pdf`
- `.social-link`: Routes via `data-social` attribute to hardcoded URLs (Facebook, Twitter, Instagram, LinkedIn, Goodreads)

### 3D Effects
- **Book Cover**: `.book-cover-3d` responds to mouse position with `rotateY/rotateX/scale` transforms on mousemove
- **Particle System**: Dynamic particles in hero background; regenerated on page load with random size/position/animation duration

## Development Workflow

### Running Locally
```bash
npm run dev  # Starts live-server on port 3000
```

### Building
```bash
npm run build  # Currently just echoes "Build complete" (placeholder)
```

## When Modifying Content

1. **Adding New Sections**: Use `.section-padding` for vertical spacing; add `.scroll-animate` class to elements that should fade-in on scroll
2. **Contact Form**: Currently simulates submission (2s delay). Real backend integration would replace the setTimeout block in `contactForm.addEventListener('submit')`
3. **Links**: Use hash anchors (`#about`, `#books`) for internal navigation; external links should trigger `showNotification()` first
4. **Responsive Design**: Mobile menu toggle already implemented; test breakpoints by inspecting `.nav-toggle` visibility

## Critical Integration Points

- **External URLs**: All hardcoded in `js/main.js` (purchase page, PDF paths, social media)—update these constants when links change
- **Form Submission**: Currently client-side only; production would need backend endpoint or email service integration
- **SEO**: Meta tags in `<head>` reference "The Phoenix Covenant" book—keep these synchronized if rebranding

## Common Tasks

- **Change Colors**: Update `:root` variables in `css/style.css`
- **Add Navigation Link**: Add `<a href="#section-id" class="nav-link">Label</a>` to `.nav-menu`; ensure corresponding section ID exists
- **Modify Text**: Search `index.html` for section-specific content; preserve semantic HTML structure
- **Debug**: Check browser console for "Hussein Salim Author Website 2025 loaded successfully!" confirmation message
