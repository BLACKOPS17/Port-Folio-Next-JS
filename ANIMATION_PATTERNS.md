# Animation Patterns Reference Guide

## Quick Copy-Paste Code Snippets

### 1. Fade-In Animation (Framer Motion)
```tsx
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
  viewport={{ once: true }}
>
  Content
</motion.div>
```

### 2. Slide-Up Animation
```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
>
  Content
</motion.div>
```

### 3. Zoom-In Animation
```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  whileInView={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.5 }}
  viewport={{ once: true }}
>
  Content
</motion.div>
```

### 4. Staggered Children Animation
```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

<motion.div
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  {items.map((item) => (
    <motion.div key={item.id} variants={itemVariants}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

### 5. Hover Scale Animation
```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="..."
>
  Click Me
</motion.button>
```

### 6. Infinite Loop Animation
```tsx
<motion.div
  animate={{ rotate: 360 }}
  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
  className="..."
>
  Spinning element
</motion.div>
```

### 7. Scroll-Based Animation
```tsx
const containerRef = useRef(null);
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ["start end", "end start"],
});

const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

<motion.div style={{ opacity }}>
  Content
</motion.div>
```

### 8. AOS Fade-Up Animation
```tsx
<div data-aos="fade-up" data-aos-delay="100">
  Content
</div>
```

### 9. Animated Progress Bar
```tsx
<div className="h-2 bg-gray-300 rounded-full overflow-hidden">
  <motion.div
    initial={{ width: 0 }}
    whileInView={{ width: "80%" }}
    transition={{ duration: 1, ease: "easeOut" }}
    viewport={{ once: true }}
    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
  />
</div>
```

### 10. Button with Gradient Overlay on Hover
```tsx
<motion.button className="group relative px-6 py-3 rounded-lg bg-white text-black font-bold overflow-hidden">
  <span className="relative z-10">View Details</span>
  <motion.div
    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500"
    initial={{ x: "100%" }}
    whileHover={{ x: 0 }}
    transition={{ duration: 0.3 }}
  />
</motion.button>
```

---

## Animation Timing Presets

### Fast (UI feedback)
```tsx
transition={{ duration: 0.2 }}
```

### Normal (Default animations)
```tsx
transition={{ duration: 0.5 }}
```

### Slow (Emphasis animations)
```tsx
transition={{ duration: 1 }}
```

### Very Slow (Background animations)
```tsx
transition={{ duration: 2 }}
```

---

## Easing Functions

### Linear
```tsx
ease: "linear"  // Constant speed
```

### Ease In
```tsx
ease: "easeIn"  // Starts slow, speeds up
```

### Ease Out
```tsx
ease: "easeOut"  // Starts fast, slows down
```

### Ease In-Out
```tsx
ease: "easeInOut"  // Slow start and end
```

### Spring
```tsx
transition={{ type: "spring", stiffness: 300, damping: 10 }}
```

---

## Tailwind Color Classes Used

### Gradients
```tsx
from-blue-400 to-cyan-400
from-purple-500 to-pink-500
from-emerald-500 to-teal-500
```

### Backgrounds
```tsx
bg-white/5        // 5% white
bg-blue-500/10    // 10% blue
bg-black/90       // 90% black
```

### Hover States
```tsx
hover:border-blue-500/30
hover:bg-blue-500/5
hover:text-white
```

---

## AOS Attributes Cheat Sheet

| Attribute | Values |
|-----------|--------|
| `data-aos` | `fade`, `fade-up`, `zoom-in`, `zoom-in-up`, `flip-left`, `bounce` |
| `data-aos-delay` | `0`, `100`, `200`, `300` (ms) |
| `data-aos-duration` | `400`, `800`, `1000` (ms) |
| `data-aos-easing` | `ease-in-out`, `ease-in`, `ease-out`, `linear` |
| `data-aos-offset` | `0`, `50`, `100`, `120` (px) |

---

## Performance Tips

1. **Limit animations on page load**
   - Use `viewport={{ once: true }}` to animate only once
   
2. **Use transform over position changes**
   - ✅ `transform: translateX()` 
   - ❌ `left: 0px`

3. **Reduce blur for better performance**
   - Use `blur-sm` or `blur-md` instead of `blur-3xl`

4. **Optimize animation durations**
   - Keep most animations between 0.3s - 1s
   - Longer durations feel sluggish

5. **Use CSS animations for continuous loops**
   - More performant than Framer Motion for infinite animations

---

## Debugging Animations

### Check animation is running:
```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 3 }}  // Make it very slow to debug
>
  Check if this animates
</motion.div>
```

### Verify viewport detection:
```tsx
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  onViewportEnter={() => console.log("Element entered viewport")}
  viewport={{ once: true }}
>
  Check console when scrolling to this element
</motion.div>
```

### Test on mobile:
- Use browser DevTools device emulation
- Check for janky animations (low FPS)
- Verify touch interactions work

---

## Common Issues & Solutions

### Animation not playing
- Missing `whileInView` or `animate` prop
- Check `viewport={{ once: true }}` isn't blocking re-triggers
- Verify element is actually in view

### Animation too slow/fast
- Adjust `duration` value
- Change `easing` function
- Reduce/increase transition delay

### Jumpy animations
- Use `position: relative` on parent
- Check for conflicting CSS transforms
- Verify no inline styles overriding animation

### Animation not smooth on mobile
- Reduce blur effects
- Simplify animation complexity
- Use `transform` instead of position changes

---

## Advanced Patterns

### Parallax Scroll Effect
```tsx
const { scrollYProgress } = useScroll();
const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

<motion.div style={{ y }}>Parallax content</motion.div>
```

### 3D Card Rotation
```tsx
const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]));
const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]));

<motion.div
  style={{ rotateX, rotateY }}
  onMouseMove={handleMouseMove}
  onMouseLeave={handleMouseLeave}
>
  3D Card
</motion.div>
```

### Shimmer Effect
```tsx
<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
```

---

## Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [AOS Library Docs](https://michalsnik.github.io/aos/)
- [Tailwind CSS Animations](https://tailwindcss.com/docs/animation)

