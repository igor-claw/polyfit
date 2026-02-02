// PolyFit - Main Game Engine

class PolyFitGame {
    constructor() {
        this.currentPuzzle = null;
        this.currentPuzzleIndex = 0;
        this.grid = [];
        this.pieces = [];
        this.placedPieces = [];
        this.draggedPiece = null;
        this.dragOffset = { x: 0, y: 0 };
        this.cellSize = 40;
        this.progress = this.loadProgress();
        this.tutorialShown = this.loadTutorialState();
        
        this.initElements();
        this.initEventListeners();
        this.showScreen('title-screen');
        this.updateSoundButton();
    }
    
    initElements() {
        this.screens = {
            title: document.getElementById('title-screen'),
            levels: document.getElementById('level-screen'),
            game: document.getElementById('game-screen')
        };
        
        this.gridEl = document.getElementById('grid');
        this.trayEl = document.getElementById('piece-tray');
        this.levelTitle = document.getElementById('level-title');
        this.levelGrid = document.getElementById('level-grid');
        this.winModal = document.getElementById('win-modal');
        this.confettiContainer = document.getElementById('confetti-container');
        this.tutorialOverlay = document.getElementById('tutorial-overlay');
        this.pieceCountEl = document.getElementById('piece-count');
    }
    
    initEventListeners() {
        // Initialize audio on first interaction
        document.addEventListener('click', () => audio.init(), { once: true });
        document.addEventListener('touchstart', () => audio.init(), { once: true });
        
        // Navigation
        document.getElementById('play-btn').addEventListener('click', () => {
            audio.play('click');
            this.showLevelSelect();
        });
        
        document.getElementById('back-to-title').addEventListener('click', () => {
            audio.play('click');
            this.showScreen('title-screen');
        });
        
        document.getElementById('back-to-levels').addEventListener('click', () => {
            audio.play('click');
            this.showLevelSelect();
        });
        
        document.getElementById('reset-btn').addEventListener('click', () => {
            audio.play('click');
            this.resetPuzzle();
        });
        
        document.getElementById('undo-btn').addEventListener('click', () => {
            audio.play('undo');
            this.undoLastMove();
        });
        
        // Sound toggle
        document.getElementById('sound-btn').addEventListener('click', () => {
            const enabled = audio.toggle();
            this.updateSoundButton();
            if (enabled) audio.play('click');
        });
        
        // Win modal
        document.getElementById('next-level-btn').addEventListener('click', () => {
            audio.play('click');
            this.hideWinModal();
            if (this.currentPuzzleIndex < PUZZLES.length - 1) {
                this.loadPuzzle(this.currentPuzzleIndex + 1);
            } else {
                this.showLevelSelect();
            }
        });
        
        document.getElementById('levels-btn').addEventListener('click', () => {
            audio.play('click');
            this.hideWinModal();
            this.showLevelSelect();
        });
        
        // Tutorial dismiss
        if (this.tutorialOverlay) {
            this.tutorialOverlay.addEventListener('click', (e) => {
                // Dismiss when clicking overlay background or the button
                if (e.target === this.tutorialOverlay || 
                    e.target.classList.contains('tutorial-dismiss')) {
                    this.dismissTutorial();
                }
            });
        }
        
        // Global mouse/touch events for dragging
        document.addEventListener('mousemove', (e) => this.onDragMove(e));
        document.addEventListener('mouseup', (e) => this.onDragEnd(e));
        document.addEventListener('touchmove', (e) => this.onDragMove(e), { passive: false });
        document.addEventListener('touchend', (e) => this.onDragEnd(e));
        
        // Keyboard support
        document.addEventListener('keydown', (e) => this.onKeyDown(e));
    }
    
    updateSoundButton() {
        const btn = document.getElementById('sound-btn');
        if (btn) {
            btn.textContent = audio.enabled ? '🔊' : '🔇';
            btn.title = audio.enabled ? 'Mute' : 'Unmute';
        }
    }
    
    // Screen Management
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(screenId).classList.add('active');
    }
    
    showLevelSelect() {
        this.renderLevelGrid();
        this.showScreen('level-screen');
    }
    
    renderLevelGrid() {
        this.levelGrid.innerHTML = '';
        
        PUZZLES.forEach((puzzle, index) => {
            const btn = document.createElement('button');
            btn.className = 'level-btn';
            
            if (this.progress.completed.includes(puzzle.id)) {
                btn.classList.add('completed');
            }
            
            btn.innerHTML = `
                <span class="level-number">${index + 1}</span>
                <span class="difficulty-dot" style="background: ${DIFFICULTY_COLORS[puzzle.difficulty]}"></span>
            `;
            
            btn.addEventListener('click', () => {
                audio.play('click');
                this.loadPuzzle(index);
            });
            this.levelGrid.appendChild(btn);
        });
    }
    
    // Puzzle Loading
    loadPuzzle(index) {
        this.currentPuzzleIndex = index;
        this.currentPuzzle = JSON.parse(JSON.stringify(PUZZLES[index]));
        this.levelTitle.textContent = this.currentPuzzle.name;
        
        this.initGrid();
        this.initPieces();
        this.placedPieces = [];
        
        this.showScreen('game-screen');
        this.calculateCellSize();
        this.updateUndoButton();
        this.updatePieceCount();
        
        // Show tutorial on first puzzle if not seen
        if (index === 0 && !this.tutorialShown) {
            this.showTutorial();
        }
    }
    
    calculateCellSize() {
        const container = document.getElementById('grid-container');
        const maxWidth = container.clientWidth - 40;
        const maxHeight = container.clientHeight - 40;
        
        const cellByWidth = Math.floor(maxWidth / this.currentPuzzle.gridWidth);
        const cellByHeight = Math.floor(maxHeight / this.currentPuzzle.gridHeight);
        
        this.cellSize = Math.min(cellByWidth, cellByHeight, 60);
        this.renderGrid();
    }
    
    initGrid() {
        this.grid = [];
        for (let y = 0; y < this.currentPuzzle.gridHeight; y++) {
            this.grid[y] = [];
            for (let x = 0; x < this.currentPuzzle.gridWidth; x++) {
                this.grid[y][x] = null;
            }
        }
    }
    
    renderGrid() {
        this.gridEl.innerHTML = '';
        this.gridEl.style.gridTemplateColumns = `repeat(${this.currentPuzzle.gridWidth}, ${this.cellSize}px)`;
        this.gridEl.style.gridTemplateRows = `repeat(${this.currentPuzzle.gridHeight}, ${this.cellSize}px)`;
        
        for (let y = 0; y < this.currentPuzzle.gridHeight; y++) {
            for (let x = 0; x < this.currentPuzzle.gridWidth; x++) {
                const cell = document.createElement('div');
                cell.className = 'grid-cell';
                cell.dataset.x = x;
                cell.dataset.y = y;
                
                if (this.grid[y][x]) {
                    cell.classList.add('filled');
                    cell.style.backgroundColor = this.grid[y][x];
                }
                
                this.gridEl.appendChild(cell);
            }
        }
    }
    
    initPieces() {
        this.pieces = this.currentPuzzle.pieces.map((p, i) => ({
            ...p,
            id: i,
            placed: false,
            rotation: 0
        }));
        this.renderPieces();
    }
    
    renderPieces() {
        this.trayEl.innerHTML = '';
        
        this.pieces.forEach((piece, index) => {
            if (piece.placed) return;
            
            const pieceEl = this.createPieceElement(piece, index);
            this.trayEl.appendChild(pieceEl);
        });
    }
    
    createPieceElement(piece, index) {
        const shape = this.getRotatedShape(piece.shape, piece.rotation);
        const height = shape.length;
        const width = shape[0].length;
        
        const pieceEl = document.createElement('div');
        pieceEl.className = 'piece';
        pieceEl.dataset.index = index;
        pieceEl.tabIndex = 0; // Make focusable for keyboard
        pieceEl.setAttribute('role', 'button');
        pieceEl.setAttribute('aria-label', `Piece ${index + 1}, ${this.describePiece(shape)}`);
        pieceEl.style.gridTemplateColumns = `repeat(${width}, 25px)`;
        pieceEl.style.gridTemplateRows = `repeat(${height}, 25px)`;
        
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const cell = document.createElement('div');
                cell.className = 'piece-cell';
                
                if (shape[y][x]) {
                    cell.classList.add('filled');
                    cell.style.backgroundColor = piece.color;
                } else {
                    cell.classList.add('empty');
                }
                
                pieceEl.appendChild(cell);
            }
        }
        
        // Drag events
        pieceEl.addEventListener('mousedown', (e) => this.onDragStart(e, index));
        pieceEl.addEventListener('touchstart', (e) => this.onDragStart(e, index), { passive: false });
        
        // Track tap position for rotation detection
        let tapStartX = 0, tapStartY = 0;
        
        pieceEl.addEventListener('mousedown', (e) => {
            tapStartX = e.clientX;
            tapStartY = e.clientY;
        });
        
        pieceEl.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                tapStartX = e.touches[0].clientX;
                tapStartY = e.touches[0].clientY;
            }
        }, { passive: true });
        
        pieceEl.addEventListener('click', (e) => {
            const dx = Math.abs(e.clientX - tapStartX);
            const dy = Math.abs(e.clientY - tapStartY);
            if (dx < 10 && dy < 10 && !this.wasDragging) {
                this.rotatePiece(index);
            }
            this.wasDragging = false;
        });
        
        return pieceEl;
    }
    
    describePiece(shape) {
        const cells = shape.flat().filter(c => c).length;
        return `${cells} cells`;
    }
    
    getRotatedShape(shape, rotation) {
        let result = shape.map(row => [...row]);
        for (let r = 0; r < rotation; r++) {
            result = this.rotate90(result);
        }
        return result;
    }
    
    rotate90(shape) {
        const rows = shape.length;
        const cols = shape[0].length;
        const rotated = [];
        
        for (let x = 0; x < cols; x++) {
            rotated[x] = [];
            for (let y = rows - 1; y >= 0; y--) {
                rotated[x].push(shape[y][x]);
            }
        }
        return rotated;
    }
    
    rotatePiece(index) {
        this.pieces[index].rotation = (this.pieces[index].rotation + 1) % 4;
        audio.play('rotate');
        this.renderPieces();
        
        // Add rotation animation class
        const pieceEl = this.trayEl.querySelector(`[data-index="${index}"]`);
        if (pieceEl) {
            pieceEl.classList.add('rotating');
            setTimeout(() => pieceEl.classList.remove('rotating'), 150);
        }
    }
    
    // Drag and Drop
    onDragStart(e, pieceIndex) {
        e.preventDefault();
        
        const piece = this.pieces[pieceIndex];
        if (piece.placed) return;
        
        this.draggedPiece = pieceIndex;
        this.wasDragging = false;
        
        audio.play('pickup');
        
        const pieceEl = e.currentTarget;
        const rect = pieceEl.getBoundingClientRect();
        
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        
        this.dragOffset = {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
        
        // Create dragging element
        const clone = pieceEl.cloneNode(true);
        clone.classList.add('dragging');
        clone.id = 'dragging-piece';
        clone.style.left = `${clientX - this.dragOffset.x}px`;
        clone.style.top = `${clientY - this.dragOffset.y}px`;
        document.body.appendChild(clone);
        
        pieceEl.style.opacity = '0.3';
        
        // Haptic feedback
        this.vibrate(10);
    }
    
    onDragMove(e) {
        if (this.draggedPiece === null) return;
        
        e.preventDefault();
        this.wasDragging = true;
        
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        
        const dragEl = document.getElementById('dragging-piece');
        if (dragEl) {
            dragEl.style.left = `${clientX - this.dragOffset.x}px`;
            dragEl.style.top = `${clientY - this.dragOffset.y}px`;
        }
        
        this.updatePreview(clientX, clientY);
    }
    
    onDragEnd(e) {
        if (this.draggedPiece === null) return;
        
        const dragEl = document.getElementById('dragging-piece');
        if (dragEl) dragEl.remove();
        
        const origPieceEl = this.trayEl.querySelector(`[data-index="${this.draggedPiece}"]`);
        if (origPieceEl) origPieceEl.style.opacity = '1';
        
        const clientX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
        const clientY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
        
        const gridPos = this.getGridPosition(clientX, clientY);
        if (gridPos && this.canPlacePiece(this.draggedPiece, gridPos.x, gridPos.y)) {
            this.placePiece(this.draggedPiece, gridPos.x, gridPos.y);
        } else if (gridPos) {
            audio.play('invalid');
            this.shakeGrid();
        } else {
            audio.play('drop');
        }
        
        this.clearPreview();
        this.draggedPiece = null;
    }
    
    getGridPosition(clientX, clientY) {
        const gridRect = this.gridEl.getBoundingClientRect();
        const padding = 10;
        
        const x = Math.floor((clientX - gridRect.left - padding) / (this.cellSize + 2));
        const y = Math.floor((clientY - gridRect.top - padding) / (this.cellSize + 2));
        
        if (x >= 0 && x < this.currentPuzzle.gridWidth && 
            y >= 0 && y < this.currentPuzzle.gridHeight) {
            return { x, y };
        }
        return null;
    }
    
    updatePreview(clientX, clientY) {
        this.clearPreview();
        
        const gridPos = this.getGridPosition(clientX, clientY);
        if (!gridPos) return;
        
        const piece = this.pieces[this.draggedPiece];
        const shape = this.getRotatedShape(piece.shape, piece.rotation);
        const canPlace = this.canPlacePiece(this.draggedPiece, gridPos.x, gridPos.y);
        
        for (let py = 0; py < shape.length; py++) {
            for (let px = 0; px < shape[py].length; px++) {
                if (!shape[py][px]) continue;
                
                const gx = gridPos.x + px;
                const gy = gridPos.y + py;
                
                if (gx >= 0 && gx < this.currentPuzzle.gridWidth &&
                    gy >= 0 && gy < this.currentPuzzle.gridHeight) {
                    const cell = this.gridEl.querySelector(`[data-x="${gx}"][data-y="${gy}"]`);
                    if (cell) {
                        cell.classList.add('preview');
                        cell.style.backgroundColor = piece.color;
                        if (!canPlace) {
                            cell.classList.add('invalid');
                        }
                    }
                }
            }
        }
    }
    
    clearPreview() {
        this.gridEl.querySelectorAll('.preview').forEach(cell => {
            cell.classList.remove('preview', 'invalid');
            const x = parseInt(cell.dataset.x);
            const y = parseInt(cell.dataset.y);
            cell.style.backgroundColor = this.grid[y][x] || '';
        });
    }
    
    canPlacePiece(pieceIndex, gridX, gridY) {
        const piece = this.pieces[pieceIndex];
        const shape = this.getRotatedShape(piece.shape, piece.rotation);
        
        for (let py = 0; py < shape.length; py++) {
            for (let px = 0; px < shape[py].length; px++) {
                if (!shape[py][px]) continue;
                
                const gx = gridX + px;
                const gy = gridY + py;
                
                if (gx < 0 || gx >= this.currentPuzzle.gridWidth ||
                    gy < 0 || gy >= this.currentPuzzle.gridHeight) {
                    return false;
                }
                
                if (this.grid[gy][gx] !== null) {
                    return false;
                }
            }
        }
        return true;
    }
    
    placePiece(pieceIndex, gridX, gridY) {
        const piece = this.pieces[pieceIndex];
        const shape = this.getRotatedShape(piece.shape, piece.rotation);
        
        for (let py = 0; py < shape.length; py++) {
            for (let px = 0; px < shape[py].length; px++) {
                if (!shape[py][px]) continue;
                
                const gx = gridX + px;
                const gy = gridY + py;
                
                this.grid[gy][gx] = piece.color;
            }
        }
        
        piece.placed = true;
        this.placedPieces.push({
            pieceIndex,
            gridX,
            gridY,
            rotation: piece.rotation
        });
        
        audio.play('snap');
        this.vibrate(15);
        
        this.renderGrid();
        this.renderPieces();
        this.updateUndoButton();
        this.updatePieceCount();
        
        // Add placement animation
        this.animatePlacement(gridX, gridY, shape);
        
        if (this.checkWin()) {
            this.onWin();
        }
    }
    
    animatePlacement(gridX, gridY, shape) {
        for (let py = 0; py < shape.length; py++) {
            for (let px = 0; px < shape[py].length; px++) {
                if (!shape[py][px]) continue;
                const gx = gridX + px;
                const gy = gridY + py;
                const cell = this.gridEl.querySelector(`[data-x="${gx}"][data-y="${gy}"]`);
                if (cell) {
                    cell.classList.add('just-placed');
                    setTimeout(() => cell.classList.remove('just-placed'), 300);
                }
            }
        }
    }
    
    shakeGrid() {
        this.gridEl.classList.add('shake');
        setTimeout(() => this.gridEl.classList.remove('shake'), 300);
    }
    
    checkWin() {
        for (let y = 0; y < this.currentPuzzle.gridHeight; y++) {
            for (let x = 0; x < this.currentPuzzle.gridWidth; x++) {
                if (this.grid[y][x] === null) {
                    return false;
                }
            }
        }
        return true;
    }
    
    onWin() {
        if (!this.progress.completed.includes(this.currentPuzzle.id)) {
            this.progress.completed.push(this.currentPuzzle.id);
            this.saveProgress();
        }
        
        setTimeout(() => {
            audio.play('win');
            this.vibrate([50, 30, 50]);
            this.showConfetti();
            this.showWinModal();
        }, 400);
    }
    
    showWinModal() {
        const messages = [
            "Perfect fit! 🎯",
            "Great job! ⭐",
            "Puzzle master! 🧩",
            "Excellent! 🎉",
            "Nailed it! 💪"
        ];
        document.getElementById('win-message').textContent = 
            messages[Math.floor(Math.random() * messages.length)];
        
        this.winModal.classList.add('active');
        
        const nextBtn = document.getElementById('next-level-btn');
        nextBtn.style.display = this.currentPuzzleIndex < PUZZLES.length - 1 ? 'block' : 'none';
    }
    
    hideWinModal() {
        this.winModal.classList.remove('active');
    }
    
    showConfetti() {
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];
        const shapes = ['square', 'circle'];
        
        for (let i = 0; i < 60; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti ' + shapes[Math.floor(Math.random() * shapes.length)];
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = `${Math.random() * 0.5}s`;
            confetti.style.animationDuration = `${2 + Math.random() * 2}s`;
            this.confettiContainer.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 4000);
        }
    }
    
    undoLastMove() {
        if (this.placedPieces.length === 0) return;
        
        const lastPlacement = this.placedPieces.pop();
        const piece = this.pieces[lastPlacement.pieceIndex];
        const shape = this.getRotatedShape(piece.shape, lastPlacement.rotation);
        
        for (let py = 0; py < shape.length; py++) {
            for (let px = 0; px < shape[py].length; px++) {
                if (!shape[py][px]) continue;
                const gx = lastPlacement.gridX + px;
                const gy = lastPlacement.gridY + py;
                this.grid[gy][gx] = null;
            }
        }
        
        piece.placed = false;
        
        this.renderGrid();
        this.renderPieces();
        this.updateUndoButton();
        this.updatePieceCount();
    }
    
    updateUndoButton() {
        const undoBtn = document.getElementById('undo-btn');
        undoBtn.disabled = this.placedPieces.length === 0;
    }
    
    updatePieceCount() {
        if (this.pieceCountEl) {
            const remaining = this.pieces.filter(p => !p.placed).length;
            this.pieceCountEl.textContent = `${remaining} piece${remaining !== 1 ? 's' : ''} left`;
        }
    }
    
    resetPuzzle() {
        this.loadPuzzle(this.currentPuzzleIndex);
    }
    
    // Tutorial
    showTutorial() {
        if (this.tutorialOverlay) {
            this.tutorialOverlay.classList.add('active');
        }
    }
    
    dismissTutorial() {
        if (this.tutorialOverlay) {
            this.tutorialOverlay.classList.remove('active');
        }
        this.tutorialShown = true;
        this.saveTutorialState();
    }
    
    loadTutorialState() {
        try {
            return localStorage.getItem('polyfit-tutorial') === 'done';
        } catch {
            return false;
        }
    }
    
    saveTutorialState() {
        try {
            localStorage.setItem('polyfit-tutorial', 'done');
        } catch {}
    }
    
    // Keyboard Support
    onKeyDown(e) {
        // Only when game screen is active
        if (!this.screens.game.classList.contains('active')) return;
        
        switch (e.key) {
            case 'Escape':
                this.showLevelSelect();
                break;
            case 'r':
            case 'R':
                // Rotate first unplaced piece (simple implementation)
                const unplaced = this.pieces.findIndex(p => !p.placed);
                if (unplaced !== -1) {
                    this.rotatePiece(unplaced);
                }
                break;
            case 'z':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    this.undoLastMove();
                }
                break;
        }
    }
    
    // Haptic feedback
    vibrate(pattern) {
        if (navigator.vibrate) {
            navigator.vibrate(pattern);
        }
    }
    
    // Progress persistence
    loadProgress() {
        try {
            const saved = localStorage.getItem('polyfit-progress');
            return saved ? JSON.parse(saved) : { completed: [] };
        } catch {
            return { completed: [] };
        }
    }
    
    saveProgress() {
        try {
            localStorage.setItem('polyfit-progress', JSON.stringify(this.progress));
        } catch {}
    }
}

// Initialize game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.game = new PolyFitGame();
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.game && window.game.currentPuzzle) {
        window.game.calculateCellSize();
    }
});
