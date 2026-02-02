# PolyFit Production Readiness Tasks

## Analysis Summary

**Current State:** Functional POC with basic drag-and-drop mechanics, 10 verified puzzles, localStorage progress.

**Key Gaps:** No audio, no tutorial, no PWA support, no accessibility, limited puzzle variety, no build pipeline.

---

## Task List

### Phase 1: Core Experience (Must Have)

#### 1.1 Audio System
- [x] Add sound effects (piece pickup, drop, snap, invalid placement, win)
- [ ] Add background music (toggleable) — DEFERRED: may be distracting
- [x] Add mute button with localStorage persistence
- [x] Use Web Audio API for low latency

#### 1.2 Improved Puzzles
- [x] Redesign puzzles with more interesting shapes (not just I-bars and O-blocks)
- [x] 15 puzzles total (5 easy, 6 medium, 4 hard)
- [x] Ensure smooth difficulty curve (truly easy → challenging hard)
- [x] Re-verify all puzzles are solvable

#### 1.3 Tutorial / Onboarding
- [x] First-time user tutorial (overlay showing drag, rotate, place)
- [ ] Highlight first piece to drag — DEFERRED
- [x] Show rotation hint on first puzzle
- [x] Store tutorial completion in localStorage

#### 1.4 Visual Polish
- [x] Add piece snap animation (pop effect)
- [x] Add piece pickup scale animation (via dragging class)
- [x] Improve grid cell highlight on valid drop (preview class)
- [x] Add subtle grid pulse on successful placement (just-placed class)
- [x] Improve confetti effect (shapes, physics)
- [ ] Add level complete animation before modal — DEFERRED

#### 1.5 UX Improvements
- [x] Add haptic feedback on mobile (navigator.vibrate)
- [x] Improve touch target sizes (44px minimum)
- [ ] Add piece tray scroll indicators when overflow — DEFERRED
- [x] Show piece count remaining
- [x] Add "tap to rotate" hint on pieces
- [x] Better invalid placement feedback (shake animation)

---

### Phase 2: PWA & Offline (Must Have)

#### 2.1 Web App Manifest
- [x] Create manifest.json with app metadata
- [x] Add app icons (192x192, 512x512, maskable)
- [x] Add splash screen colors
- [x] Configure display: standalone
- [x] Add shortcuts for quick actions

#### 2.2 Service Worker
- [x] Implement service worker for offline caching
- [x] Cache all game assets (HTML, CSS, JS)
- [x] Add offline fallback (cache-first strategy)
- [x] Handle updates gracefully (new cache version)

#### 2.3 Installation
- [ ] Add install prompt (beforeinstallprompt) — DEFERRED
- [ ] Show custom "Add to Home Screen" button — DEFERRED
- [ ] Track installation events — DEFERRED

---

### Phase 3: Accessibility (Must Have)

#### 3.1 Keyboard Support
- [ ] Tab navigation through pieces — PARTIAL (pieces are focusable)
- [ ] Arrow keys to move selected piece on grid — DEFERRED
- [x] R key to rotate selected piece
- [ ] Enter/Space to place piece — DEFERRED
- [x] Escape to go back to levels

#### 3.2 Screen Reader Support
- [x] Add ARIA labels to all interactive elements
- [ ] Announce piece selection, placement, errors — DEFERRED
- [x] Add role="application" to game area
- [ ] Provide text descriptions of grid state — DEFERRED

#### 3.3 Visual Accessibility
- [x] Add high contrast mode (@media prefers-contrast)
- [ ] Add colorblind-friendly palette option — DEFERRED
- [x] Respect prefers-reduced-motion
- [x] Ensure minimum contrast ratios (WCAG AA)

#### 3.4 Focus Management
- [x] Visible focus indicators
- [x] Logical focus order
- [ ] Focus trap in modals — DEFERRED

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
- [ ] Set up Vite or similar bundler — DEFERRED (vanilla JS works fine)
- [ ] Minify CSS and JS — DEFERRED
- [ ] Generate source maps — DEFERRED
- [ ] Add cache busting (content hashes) — service worker handles this

#### 5.2 Error Handling
- [ ] Add global error handler — DEFERRED
- [x] Graceful localStorage failures (try/catch in all storage ops)
- [x] Handle missing assets (SVG fallback favicon)

#### 5.3 Performance
- [x] Lazy load audio (Web Audio created on demand)
- [x] Optimize animations (CSS transforms, GPU accelerated)
- [x] Reduce DOM operations during drag (single clone element)
- [ ] Test on low-end devices — TODO

#### 5.4 Code Quality
- [ ] Add JSDoc comments — DEFERRED
- [x] Split code into modules (Game, Audio, Puzzles)
- [x] Add basic unit tests for puzzle solver (verify.js)
- [ ] Lint with ESLint — DEFERRED

---

### Phase 6: SEO & Metadata (Should Have)

#### 6.1 Meta Tags
- [x] Add Open Graph tags (title, description, image)
- [ ] Add Twitter Card tags — DEFERRED
- [ ] Add structured data (Game schema) — DEFERRED

#### 6.2 Assets
- [ ] Create OG image (1200x630) — DEFERRED
- [x] Create favicon (SVG emoji)
- [x] Create Apple touch icons (192px PNG)

#### 6.3 Content
- [x] Write proper meta description
- [ ] Add humans.txt — DEFERRED
- [ ] Add robots.txt — DEFERRED

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
