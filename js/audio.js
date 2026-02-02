// PolyFit - Audio System
// Synthesized sounds using Web Audio API (no external files needed)

class AudioManager {
    constructor() {
        this.enabled = this.loadMuteState();
        this.context = null;
        this.initialized = false;
    }

    // Lazy init (requires user interaction)
    init() {
        if (this.initialized) return;
        try {
            this.context = new (window.AudioContext || window.webkitAudioContext)();
            this.initialized = true;
        } catch (e) {
            console.warn('Web Audio API not supported');
            this.enabled = false;
        }
    }

    // Ensure context is running (for autoplay policies)
    resume() {
        if (this.context && this.context.state === 'suspended') {
            this.context.resume();
        }
    }

    // Toggle sound on/off
    toggle() {
        this.enabled = !this.enabled;
        this.saveMuteState();
        return this.enabled;
    }

    loadMuteState() {
        try {
            return localStorage.getItem('polyfit-sound') !== 'off';
        } catch {
            return true;
        }
    }

    saveMuteState() {
        try {
            localStorage.setItem('polyfit-sound', this.enabled ? 'on' : 'off');
        } catch {}
    }

    // Play a synthesized sound
    play(type) {
        if (!this.enabled || !this.context) return;
        this.resume();

        switch (type) {
            case 'pickup':
                this.playTone(400, 0.08, 'sine', 0.3);
                break;
            case 'drop':
                this.playTone(300, 0.1, 'sine', 0.2);
                break;
            case 'snap':
                this.playTone(600, 0.05, 'square', 0.15);
                setTimeout(() => this.playTone(800, 0.05, 'square', 0.15), 50);
                break;
            case 'invalid':
                this.playTone(150, 0.15, 'sawtooth', 0.2);
                break;
            case 'rotate':
                this.playTone(500, 0.05, 'sine', 0.2);
                break;
            case 'undo':
                this.playTone(350, 0.1, 'triangle', 0.2);
                break;
            case 'win':
                this.playWinSound();
                break;
            case 'click':
                this.playTone(450, 0.03, 'sine', 0.15);
                break;
        }
    }

    playTone(frequency, duration, type = 'sine', volume = 0.3) {
        if (!this.context) return;

        const oscillator = this.context.createOscillator();
        const gainNode = this.context.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.context.destination);

        oscillator.type = type;
        oscillator.frequency.setValueAtTime(frequency, this.context.currentTime);

        gainNode.gain.setValueAtTime(volume, this.context.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + duration);

        oscillator.start(this.context.currentTime);
        oscillator.stop(this.context.currentTime + duration);
    }

    playWinSound() {
        if (!this.context) return;
        
        const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
        notes.forEach((freq, i) => {
            setTimeout(() => {
                this.playTone(freq, 0.2, 'sine', 0.25);
            }, i * 100);
        });
    }
}

// Global instance
const audio = new AudioManager();
