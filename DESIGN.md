# A working collection

## Direction

The visitor is a hiring engineer or creative collaborator opening a personal studio after hours. The site feels like a tactile piece of software: carbon surfaces, warm metal, clear type, and real work brought close enough to inspect.

Voice: direct, professional, exact. The content positions Adnan as a full-stack developer with a frontend foundation. Geologica supplies clear typography, with system monospace limited to the actual CLI example. Real project evidence supports the introduction.

## Composition

- The hero is a simple introduction: full-stack role, a two-line headline, a short summary and links to work and contact. No 3D object or project previews.
- Three featured projects form an overlapping scroll sequence; the remaining four live in a compact, interactive work index.
- Screenshots are always displayed at their original aspect ratio, with intrinsic dimensions, `height: auto`, and containment. No image fill or cover cropping.
- Native image dialogs provide a larger view. The source link and deployment link are distinct actions.
- Case studies use the same navigation, image viewer, color system and route entrance.

## Motion

The hero stays still. Project scenes scale and stack as the visitor advances. GSAP owns scroll choreography below the introduction. Native scrolling and links remain functional.

Use exponential easing, a single route entrance and scene-specific transitions. Content is visible before JavaScript. Reduced motion and the motion switch disable scroll transforms and stacking. Animate transforms and opacity rather than layout dimensions.

## Tokens

Carbon `#101110`, soft white `#f4f4ef`, muted mineral `#adb0a6`, warm copper `#e6b788`. Project surface tints distinguish work without changing typography. Compact metadata supports larger editorial text. Primary controls provide 44px touch targets. Display type caps at 96px. Focus is high contrast.
