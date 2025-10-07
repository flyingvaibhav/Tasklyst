# Animated To‑Do List

A lightweight, dependency‑free, animated To‑Do app built with plain HTML, CSS, and JavaScript. Emphasis on polished micro‑interactions (enter / edit / delete animations, gradient background, accessible motion fallbacks) while keeping the code simple and hackable.

## Features
- Add / edit (inline) / delete tasks
- Animated task lifecycle:
  - Cascading springy entrance
  - Pulsed highlight on edit
  - Smooth shrink + slide removal
- Dynamic radial gradient background animation
- Gradient animated title with glow
- Button ripple / shimmer interactions
- Keyboard friendly (Enter to add)
- LocalStorage persistence (simple string array)
- Respects prefers-reduced-motion (disables animations)


## Quick Start
1. Clone:
   git clone https://github.com/your-user/your-repo.git
2. Open folder:
   cd your-repo
3. Open index.html in a browser (or use Live Server)
4. Start typing a task and press Enter or click Add.

No build step. No dependencies.

## File Structure
- index.html — Markup container, minimal semantics
- style.css — Theme, layout, keyframe animations, motion fallbacks
- script.js — LocalStorage sync + DOM lifecycle + animation class handling

## Key Implementation Ideas
| Concern | Approach |
|---------|----------|
| State storage | localStorage, array of strings (order preserved) |
| Rendering | Imperative DOM element creation per task |
| Animations | CSS classes toggled from JS (enter / removing / editing) |
| Cleanup | Removal deferred until exit animation ends |
| Accessibility | aria-label on title, reduced-motion safeguard |

## Editing / Deleting Flow
1. Add: value validated → stored → element built → assigned staggered delay.
2. Edit: prompt (or inline if implemented later) → update storage → trigger flash class.
3. Delete: mark with .removing → listen for animationend → remove + persist.

## Customization
You can tweak animation timing in style.css:
- Root CSS vars: adjust durations / easing
- Keyframes: bgShift, todoEnter, todoExit, editPulse
- Add a dark mode: duplicate :root with a data-theme selector

## Potential Extensions
- Completion state with strike+fade animation
- Filter (All / Active / Done) with animated reflow
- Drag + drop reordering
- Confetti burst when list emptied
- Stats footer (Remaining / Total)

## Accessibility Notes
- Motion reduced if user sets prefers-reduced-motion: reduce
- Consider adding role="list" / role="listitem" (optional)
- For future: replace prompt-based edit with inline <input> for better UX

## Performance
- Minimal repaint impact (GPU-friendly transforms / opacity)
- Avoids layout thrash (no per-frame JS)
- Only re-renders changed items

## Contributing
Fork → branch → changes → pull request.
Keep animations subtle and respect reduced-motion users.

## License
MIT (add LICENSE file if desired)

## Author
Vaibhav Pandey

Website Link 
https://flyingvaibhav.github.io/Tasklyst/
---
Feel free to request: dark mode, completion feature, or test plan.
