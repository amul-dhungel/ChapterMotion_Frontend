# Motion Canvas Animations

This directory contains Motion Canvas 2D animations for Chapter Motion.

## Apple Gravity Animation

**File:** `appleGravity.tsx`

### Features:
- 🍎 **Apple falling from tree** with realistic gravity
- 🌳 **Tree with trunk and leaves**
- ⬇️ **Gravity arrow** showing force direction
- 📊 **Real-time height display**
- 🎨 **Chapter Motion branding** (cream background, gradient colors)
- ⚡ **Physics equation** (F = mg)
- 💥 **Impact animation** with wiggle effect

### Animation Sequence:
1. Scene fades in (ground, tree, apple)
2. Gravity arrow appears
3. Apple falls with acceleration (easeInQuad)
4. Arrow disappears on impact
5. Apple wiggles on landing
6. "Newton's Law of Gravity!" message appears

### How to Run:

#### Option 1: Motion Canvas Player (Standalone)
```bash
npm install -g @motion-canvas/cli
motion-canvas serve src/animations/project.json
```

#### Option 2: Integrated in React
The animation is already integrated in the `MotionCanvasPlayer` component.

Click **"Test Interactive"** button in the editor to see it!

### Customization:

```typescript
// Change colors
const CREAM = '#FDF5E6';
const DEEP_BLUE = '#003366';
const PURPLE = '#4A00E0';

// Adjust fall speed
yield* appleY(180, 1.5, easeInQuad); // 1.5 seconds

// Change apple size
<Circle size={40} fill={RED} />
```

### Comparison with Manim:

| Feature | Manim (Python) | Motion Canvas (JS) |
|---------|---------------|-------------------|
| Language | Python | TypeScript/JavaScript |
| Rendering | Video (MP4) | Canvas/SVG |
| Interactive | No (desktop only) | Yes (browser) |
| Quality | High | High |
| LaTeX | Yes | Limited |
| Learning Curve | Medium | Medium |

### Next Steps:

1. Add more animations (pendulum, projectile motion, etc.)
2. Create interactive controls (drag apple, adjust gravity)
3. Export to video format
4. Add sound effects

---

**Made with ❤️ for Chapter Motion**
