# ProdigySpace CSS Design System

This document outlines the CSS design system implemented for the ProdigySpace application. The system uses CSS variables to ensure consistent styling, easy theme switching, and maintainable code.

## CSS Variables Structure

All global CSS variables are defined in `globals.css` and are organized into the following categories:

### Color System

The color system is structured in a hierarchical manner:

1. **Base Color Palette** - Raw color values defined as CSS variables (e.g., `--color-primary-500`)
2. **Theme Variables** - Semantic mappings of colors to specific UI elements (e.g., `--background`, `--foreground`)
3. **Semantic Variables** - Component-level variables that use theme variables (e.g., `--color-background`)

#### Example

```css
/* Base color palette */
--color-primary-500: #22c55e;

/* Theme variable */
--primary: var(--color-primary-500);

/* Semantic variable */
--color-primary: var(--primary);
```

### Spacing System

A consistent spacing scale based on multiples of 4px:

- `--space-1`: 0.25rem (4px)
- `--space-2`: 0.5rem (8px)
- `--space-3`: 0.75rem (12px)
- `--space-4`: 1rem (16px)
- etc.

### Border Radius

Consistent border radius variables:

- `--radius-sm`: 0.25rem
- `--radius-md`: 0.375rem
- `--radius-lg`: 0.5rem
- etc.

### Shadows

Predefined shadow values for consistent elevation:

- `--shadow-sm`
- `--shadow-md`
- `--shadow-lg`
- `--shadow-xl`

### Transitions

Standardized transition durations and timing functions:

- `--transition-fast`: 150ms
- `--transition-normal`: 250ms
- `--transition-slow`: 350ms
- `--transition-ease`: cubic-bezier(0.4, 0, 0.2, 1)

## Usage Guidelines

### Colors

Always use semantic color variables instead of hard-coded values:

```css
/* ✅ Good */
color: var(--color-primary);

/* ❌ Bad */
color: #15803d;
```

### Spacing

Use spacing variables for margins, paddings, and gaps:

```css
/* ✅ Good */
margin: var(--space-4);

/* ❌ Bad */
margin: 16px;
```

### Dark Mode Support

The dark mode theme is automatically applied when the `.dark` class is present on the `html` or `body` element. All theme variables change their values accordingly.

## Component-Specific Variables

Some components have their own specific variables in their CSS files. These should follow the same naming pattern but be scoped to that component's needs.

Example from `sticky-note.css`:

```css
:root {
  --sticky-yellow-bg: #fef08a;
  --sticky-yellow-border: #fde047;
  --sticky-yellow-text: #713f12;
}
```

## Best Practices

1. **Use existing variables** before creating new ones
2. **Document any new variables** you create
3. **Keep component-specific variables** in their component CSS files
4. **Use semantic naming** that describes the purpose, not the value
5. **Maintain consistent formatting** in variable declarations
