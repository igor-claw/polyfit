// PolyFit - Puzzle Definitions
// All puzzles verified solvable via: npm run verify

const PUZZLES = [
    // ═══════════════════════════════════════════════════════════════
    // EASY (5 puzzles) - Small grids, simple shapes, gentle intro
    // ═══════════════════════════════════════════════════════════════
    {
        id: 1,
        name: "First Steps",
        difficulty: "easy",
        gridWidth: 4,
        gridHeight: 2,
        pieces: [
            { shape: [[1, 1], [1, 1]], color: "#FF6B6B" },
            { shape: [[1, 1], [1, 1]], color: "#4ECDC4" }
        ]
    },
    {
        id: 2,
        name: "Three in a Row",
        difficulty: "easy",
        gridWidth: 3,
        gridHeight: 3,
        pieces: [
            { shape: [[1, 1, 1]], color: "#FF6B6B" },
            { shape: [[1, 1, 1]], color: "#4ECDC4" },
            { shape: [[1, 1, 1]], color: "#45B7D1" }
        ]
    },
    {
        id: 3,
        name: "L Shapes",
        difficulty: "easy",
        gridWidth: 4,
        gridHeight: 3,
        pieces: [
            { shape: [[1, 0], [1, 0], [1, 1]], color: "#FF6B6B" },
            { shape: [[0, 1], [0, 1], [1, 1]], color: "#4ECDC4" },
            { shape: [[1, 1], [1, 1]], color: "#45B7D1" }
        ]
    },
    {
        id: 4,
        name: "Trominoes",
        difficulty: "easy",
        gridWidth: 3,
        gridHeight: 4,
        pieces: [
            { shape: [[1, 1], [1, 0]], color: "#FF6B6B" },
            { shape: [[1, 1], [0, 1]], color: "#4ECDC4" },
            { shape: [[1, 1, 1]], color: "#45B7D1" },
            { shape: [[1, 1, 1]], color: "#96CEB4" }
        ]
    },
    {
        id: 5,
        name: "Square Dance",
        difficulty: "easy",
        gridWidth: 4,
        gridHeight: 4,
        pieces: [
            { shape: [[1, 1], [1, 1]], color: "#FF6B6B" },
            { shape: [[1, 1], [1, 1]], color: "#4ECDC4" },
            { shape: [[1, 1], [1, 1]], color: "#45B7D1" },
            { shape: [[1, 1], [1, 1]], color: "#96CEB4" }
        ]
    },

    // ═══════════════════════════════════════════════════════════════
    // MEDIUM (6 puzzles) - Larger grids, tetromino combinations
    // ═══════════════════════════════════════════════════════════════
    {
        id: 6,
        name: "Long Lines",
        difficulty: "medium",
        gridWidth: 4,
        gridHeight: 4,
        pieces: [
            { shape: [[1, 1, 1, 1]], color: "#FF6B6B" },
            { shape: [[1, 1, 1, 1]], color: "#4ECDC4" },
            { shape: [[1, 1, 1, 1]], color: "#45B7D1" },
            { shape: [[1, 1, 1, 1]], color: "#96CEB4" }
        ]
    },
    {
        id: 7,
        name: "Mixed Bag",
        difficulty: "medium",
        gridWidth: 5,
        gridHeight: 4,
        pieces: [
            { shape: [[1, 1, 1, 1, 1]], color: "#FF6B6B" },
            { shape: [[1, 1], [1, 1]], color: "#4ECDC4" },
            { shape: [[1, 1], [1, 0]], color: "#45B7D1" },
            { shape: [[1, 1], [0, 1]], color: "#96CEB4" },
            { shape: [[1, 1, 1]], color: "#FFEAA7" },
            { shape: [[1, 1]], color: "#DDA0DD" }
        ]
    },
    {
        id: 8,
        name: "The L Gang",
        difficulty: "medium",
        gridWidth: 4,
        gridHeight: 5,
        pieces: [
            { shape: [[1, 0], [1, 0], [1, 1]], color: "#FF6B6B" },
            { shape: [[0, 1], [0, 1], [1, 1]], color: "#4ECDC4" },
            { shape: [[1, 0], [1, 0], [1, 1]], color: "#45B7D1" },
            { shape: [[0, 1], [0, 1], [1, 1]], color: "#96CEB4" },
            { shape: [[1, 1], [1, 1]], color: "#FFEAA7" }
        ]
    },
    {
        id: 9,
        name: "Wide Open",
        difficulty: "medium",
        gridWidth: 6,
        gridHeight: 3,
        pieces: [
            { shape: [[1, 1], [1, 1]], color: "#FF6B6B" },
            { shape: [[1, 1], [1, 1]], color: "#4ECDC4" },
            { shape: [[1, 1], [1, 1]], color: "#45B7D1" },
            { shape: [[1, 1]], color: "#96CEB4" },
            { shape: [[1, 1]], color: "#FFEAA7" },
            { shape: [[1, 1]], color: "#DDA0DD" }
        ]
    },
    {
        id: 10,
        name: "Tower Stack",
        difficulty: "medium",
        gridWidth: 5,
        gridHeight: 4,
        pieces: [
            { shape: [[1], [1], [1], [1]], color: "#FF6B6B" },
            { shape: [[1], [1], [1], [1]], color: "#4ECDC4" },
            { shape: [[1], [1], [1], [1]], color: "#45B7D1" },
            { shape: [[1], [1], [1], [1]], color: "#96CEB4" },
            { shape: [[1], [1], [1], [1]], color: "#FFEAA7" }
        ]
    },
    {
        id: 11,
        name: "Tight Fit",
        difficulty: "medium",
        gridWidth: 5,
        gridHeight: 4,
        pieces: [
            { shape: [[1, 1, 1, 1]], color: "#FF6B6B" },
            { shape: [[1, 1, 1, 1]], color: "#4ECDC4" },
            { shape: [[1, 1, 1], [1, 0, 0]], color: "#45B7D1" },
            { shape: [[1, 1, 1], [0, 0, 1]], color: "#96CEB4" },
            { shape: [[1, 1], [1, 1]], color: "#FFEAA7" }
        ]
    },

    // ═══════════════════════════════════════════════════════════════
    // HARD (4 puzzles) - Large grids, pentominoes, many pieces
    // ═══════════════════════════════════════════════════════════════
    {
        id: 12,
        name: "Five Alive",
        difficulty: "hard",
        gridWidth: 5,
        gridHeight: 5,
        pieces: [
            { shape: [[1, 1, 1, 1, 1]], color: "#FF6B6B" },
            { shape: [[1, 1, 1, 1, 1]], color: "#4ECDC4" },
            { shape: [[1, 1, 1, 1, 1]], color: "#45B7D1" },
            { shape: [[1, 1, 1, 1, 1]], color: "#96CEB4" },
            { shape: [[1, 1, 1, 1, 1]], color: "#FFEAA7" }
        ]
    },
    {
        id: 13,
        name: "Shape Shifter",
        difficulty: "hard",
        gridWidth: 6,
        gridHeight: 5,
        pieces: [
            { shape: [[1, 1, 1, 1, 1]], color: "#FF6B6B" },
            { shape: [[1, 1, 1, 1, 1]], color: "#4ECDC4" },
            { shape: [[1, 1, 1, 1, 1]], color: "#45B7D1" },
            { shape: [[1, 1, 1, 1, 1]], color: "#96CEB4" },
            { shape: [[1, 1], [1, 1]], color: "#FFEAA7" },
            { shape: [[1, 1], [1, 1]], color: "#DDA0DD" },
            { shape: [[1, 1]], color: "#FFB6C1" }
        ]
    },
    {
        id: 14,
        name: "Big Grid",
        difficulty: "hard",
        gridWidth: 6,
        gridHeight: 5,
        pieces: [
            { shape: [[1, 1, 1, 1, 1]], color: "#FF6B6B" },
            { shape: [[1, 1, 1, 1, 1]], color: "#4ECDC4" },
            { shape: [[1, 1, 1, 1, 1]], color: "#45B7D1" },
            { shape: [[1, 1, 1, 1, 1]], color: "#96CEB4" },
            { shape: [[1, 1, 1, 1, 1]], color: "#FFEAA7" },
            { shape: [[1, 1, 1, 1, 1]], color: "#DDA0DD" }
        ]
    },
    {
        id: 15,
        name: "Master Challenge",
        difficulty: "hard",
        gridWidth: 6,
        gridHeight: 6,
        pieces: [
            { shape: [[1, 1], [1, 1]], color: "#FF6B6B" },
            { shape: [[1, 1], [1, 1]], color: "#4ECDC4" },
            { shape: [[1, 1], [1, 1]], color: "#45B7D1" },
            { shape: [[1, 1], [1, 1]], color: "#96CEB4" },
            { shape: [[1, 1], [1, 1]], color: "#FFEAA7" },
            { shape: [[1, 1], [1, 1]], color: "#DDA0DD" },
            { shape: [[1, 1], [1, 1]], color: "#FFB6C1" },
            { shape: [[1, 1], [1, 1]], color: "#98D8C8" },
            { shape: [[1, 1], [1, 1]], color: "#F7DC6F" }
        ]
    }
];

// Difficulty colors for UI
const DIFFICULTY_COLORS = {
    easy: "#4ECDC4",
    medium: "#FFEAA7",
    hard: "#FF6B6B"
};
