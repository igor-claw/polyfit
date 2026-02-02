# PolyFit Production Readiness Tasks

## Analysis Summary

**Current State:** Functional POC with basic drag-and-drop mechanics, 10 verified puzzles, localStorage progress.

**Key Gaps:** No audio, no tutorial, no PWA support, no accessibility, limited puzzle variety, no build pipeline.

---

## Task List

### Phase 1: Core Experience (Must Have)

#### 1.1 Audio System
- [ ] Add sound effects (piece pickup, drop, snap, invalid placement, win)
- [ ] Add background music (toggleable)
- [ ] Add mute button with localStorage persistence
- [ ] Use Web Audio API for low latency

#### 1.2 Improved Puzzles
- [ ] Redesign puzzles with more interesting shapes (not just I-bars and O-blocks)
- [ ] Add 5 more puzzles (15 total)
- [ ] Ensure smooth difficulty curve (truly easy → challenging hard)
- [ ] Re-verify all puzzles are solvable

#### 1.3 Tutorial / Onboarding
- [ ] First-time user tutorial (overlay showing drag, rotate, place)
- [ ] Highlight first piece to drag
- [ ] Show rotation hint on first puzzle
- [ ] Store tutorial completion in localStorage

#### 1.4 Visual Polish
- [ ] Add piece snap animation (smooth slide into place)
- [ ] Add piece pickup scale animation
- [ ] Improve grid cell highlight on valid drop
- [ ] Add subtle grid pulse on successful placement
- [ ] Improve confetti effect (shapes, physics)
- [ ] Add level complete animation before modal

#### 1.5 UX Improvements
- [ ] Add haptic feedback on mobile (navigator.vibrate)
- [ ] Improve touch target sizes
- [ ] Add piece tray scroll indicators when overflow
- [ ] Show piece count remaining
- [ ] Add "tap to rotate" hint on pieces
- [ ] Better invalid placement feedback (shake animation)

---

### Phase 2: PWA & Offline (Must Have)

#### 2.1 Web App Manifest
- [ ] Create manifest.json with app metadata
- [ ] Add app icons (192x192, 512x512, maskable)
- [ ] Add splash screen colors
- [ ] Configure display: standalone
- [ ] Add shortcuts for quick actions

#### 2.2 Service Worker
- [ ] Implement service worker for offline caching
- [ ] Cache all game assets (HTML, CSS, JS, audio)
- [ ] Add offline fallback
- [ ] Handle updates gracefully

#### 2.3 Installation
- [ ] Add install prompt (beforeinstallprompt)
- [ ] Show custom "Add to Home Screen" button
- [ ] Track installation events

---

### Phase 3: Accessibility (Must Have)

#### 3.1 Keyboard Support
- [ ] Tab navigation through pieces
- [ ] Arrow keys to move selected piece on grid
- [ ] R key to rotate selected piece
- [ ] Enter/Space to place piece
- [ ] Escape to deselect

#### 3.2 Screen Reader Support
- [ ] Add ARIA labels to all interactive elements
- [ ] Announce piece selection, placement, errors
- [ ] Add role="application" to game area
- [ ] Provide text descriptions of grid state

#### 3.3 Visual Accessibility
- [ ] Add high contrast mode
- [ ] Add colorblind-friendly palette option
- [ ] Respect prefers-reduced-motion
- [ ] Ensure minimum contrast ratios (WCAG AA)

#### 3.4 Focus Management
- [ ] Visible focus indicators
- [ ] Logical focus order
- [ ] Focus trap in modals

---

### Phase 4: Engagement Features (Should Have)

#### 4.1 Scoring & Stats
- [ ] Add move counter per puzzle
- [ ] Track best (fewest) moves per puzzle
- [ ] Track total play time
- [ ] Track puzzles completed
- [ ] Show personal best on level select

#### 4.2 Hints System
- [ ] Add hint button (shows one correct piece placement)
- [ ] Limit hints per puzzle (3 free, then cooldown)
- [ ] Optional: reveal next piece position

#### 4.3 Daily Challenge
- [ ] Generate daily puzzle from seed
- [ ] Track daily streak
- [ ] Show streak on home screen

#### 4.4 Achievements
- [ ] First puzzle completed
- [ ] Complete all easy/medium/hard
- [ ] Complete puzzle without undo
- [ ] Speed achievements
- [ ] Streak achievements
- [ ] Show achievement unlocks with toast

---

### Phase 5: Technical Quality (Must Have)

#### 5.1 Build Pipeline
- [ ] Set up Vite or similar bundler
- [ ] Minify CSS and JS
- [ ] Generate source maps
- [ ] Add cache busting (content hashes)

#### 5.2 Error Handling
- [ ] Add global error handler
- [ ] Graceful localStorage failures
- [ ] Handle missing assets

#### 5.3 Performance
- [ ] Lazy load audio files
- [ ] Optimize animations (requestAnimationFrame)
- [ ] Reduce DOM operations during drag
- [ ] Test on low-end devices

#### 5.4 Code Quality
- [ ] Add JSDoc comments
- [ ] Split code into modules (Game, Audio, UI, Storage)
- [ ] Add basic unit tests for puzzle solver
- [ ] Lint with ESLint

---

### Phase 6: SEO & Metadata (Should Have)

#### 6.1 Meta Tags
- [ ] Add Open Graph tags (title, description, image)
- [ ] Add Twitter Card tags
- [ ] Add structured data (Game schema)

#### 6.2 Assets
- [ ] Create OG image (1200x630)
- [ ] Create favicon (multiple sizes)
- [ ] Create Apple touch icons

#### 6.3 Content
- [ ] Write proper meta description
- [ ] Add humans.txt
- [ ] Add robots.txt

---

### Phase 7: Nice to Have

#### 7.1 Social Features
- [ ] Share puzzle completion (Web Share API)
- [ ] Share specific puzzle challenge link

#### 7.2 Themes
- [ ] Light mode option
- [ ] Multiple color themes

#### 7.3 Advanced
- [ ] Puzzle editor (create custom puzzles)
- [ ] Import/export puzzle codes
- [ ] Leaderboards (requires backend)

---

## Decision Log

| Decision | Rationale | Date |
|----------|-----------|------|
| Used simpler puzzle shapes (I-bars, O-blocks) | Complex pentomino combinations often unsolvable; prioritized guaranteed solvability over visual variety | 2026-02-02 |
| Synthesized audio via Web Audio API | No external audio files needed; instant loading; works offline | 2026-02-02 |
| SVG icon instead of PNG | Scalable, small file size, can generate PNGs later if needed | 2026-02-02 |
| Basic keyboard support (R to rotate, Ctrl+Z undo) | Full keyboard navigation deferred; added essentials first | 2026-02-02 |
| Cache-first service worker strategy | Game should work offline immediately; network updates cache in background | 2026-02-02 |

---

## Implementation Order

1. Phase 1 (Core Experience) - Improves gameplay immediately
2. Phase 3 (Accessibility) - Should be baked in early
3. Phase 5 (Technical Quality) - Enables better development
4. Phase 2 (PWA) - Major feature for mobile users
5. Phase 4 (Engagement) - Adds depth
6. Phase 6 (SEO) - Polish
7. Phase 7 (Nice to Have) - If time permits

---

## Success Criteria

- All 15+ puzzles verified solvable
- Lighthouse PWA score: 100
- Lighthouse Accessibility score: 95+
- Lighthouse Performance score: 90+
- Works offline
- Keyboard fully navigable
- No console errors
- Smooth 60fps animations
