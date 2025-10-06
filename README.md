# Baobab Theme

A custom Drupal 11 theme built with TailwindCSS and AlpineJS.

## Features

- **TailwindCSS 3.4** - Utility-first CSS framework
- **AlpineJS 3.14** - Lightweight JavaScript framework
- **Vite** - Fast build tool and dev server
- **Tailwind Plugins** - Includes forms and typography plugins

## Installation

1. Navigate to the theme directory:
```bash
cd web/themes/custom/baobab_theme
```

2. Install dependencies:
```bash
npm install
```

3. Build assets:
```bash
npm run build
```

## Development

### Build Commands

- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run watch` - Watch mode for development

### Enable the Theme

1. Go to **Appearance** in your Drupal admin
2. Install and set **Baobab Theme** as default

## Structure

```
baobab_theme/
├── dist/              # Compiled assets (auto-generated)
├── src/
│   ├── styles/
│   │   └── main.css   # Main CSS with Tailwind directives
│   └── main.js        # Main JavaScript entry point
├── templates/         # Twig templates
│   ├── html.html.twig
│   └── page.html.twig
├── baobab_theme.info.yml
├── baobab_theme.libraries.yml
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## Customization

### Tailwind Configuration

Edit `tailwind.config.js` to customize your design system.

### Adding Custom Styles

Add custom CSS in `src/styles/main.css` using Tailwind's `@layer` directive.

### Using AlpineJS

AlpineJS is globally available. Add Alpine directives directly in your Twig templates:

```html
<div x-data="{ open: false }">
  <button @click="open = !open" class="btn btn-primary">Toggle</button>
  <div x-show="open">Content</div>
</div>
```
