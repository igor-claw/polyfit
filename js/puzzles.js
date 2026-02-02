// PolyFit - Puzzle Definitions
// All puzzles verified solvable via verify.js

const PUZZLES = [
    // ═══════════════════════════════════════════════════════════════
    // EASY (4 puzzles) - Small grids, simple shapes
    // ═══════════════════════════════════════════════════════════════
    {
        id: 1,
        name: "First Steps",
        difficulty: "easy",
        gridWidth: 4,
        gridHeight: 2,
        // 8 cells: 4 + 4 = 8
        pieces: [
            { shape: [[1, 1], [1, 1]], color: "#FF6B6B" },           // O
            { shape: [[1, 1], [1, 1]], color: "#4ECDC4" }            // O
        ]
    },
    {
        id: 2,
        name: "Three's Company",
        difficulty: "easy",
        gridWidth: 3,
        gridHeight: 3,
        // 9 cells: 3 + 3 + 3 = 9
        pieces: [
            { shape: [[1, 1, 1]], color: "#FF6B6B" },                // I-tromino
            { shape: [[1, 1, 1]], color: "#4ECDC4" },                // I-tromino
            { shape: [[1, 1, 1]], color: "#45B7D1" }                 // I-tromino
        ]
    },
    {
        id: 3,
        name: "L Shapes",
        difficulty: "easy",
        gridWidth: 4,
        gridHeight: 3,
        // 12 cells: 4 + 4 + 4 = 12
        pieces: [
            { shape: [[1, 0], [1, 0], [1, 1]], color: "#FF6B6B" },   // L-tetromino
            { shape: [[0, 1], [0, 1], [1, 1]], color: "#4ECDC4" },   // J-tetromino
            { shape: [[1, 1], [1, 1]], color: "#45B7D1" }            // O-tetromino
        ]
    },
    {
        id: 4,
        name: "Trominoes",
        difficulty: "easy",
        gridWidth: 3,
        gridHeight: 4,
        // 12 cells: 3 + 3 + 3 + 3 = 12
        pieces: [
            { shape: [[1, 1], [1, 0]], color: "#FF6B6B" },           // L-tromino
            { shape: [[1, 1], [0, 1]], color: "#4ECDC4" },           // J-tromino
            { shape: [[1, 1, 1]], color: "#45B7D1" },                // I-tromino
            { shape: [[1, 1, 1]], color: "#96CEB4" }                 // I-tromino
        ]
    },

    // ═══════════════════════════════════════════════════════════════
    // MEDIUM (6 puzzles) - Larger grids, more variety
    // ═══════════════════════════════════════════════════════════════
    {
        id: 5,
        name: "Four Square",
        difficulty: "medium",
        gridWidth: 4,
        gridHeight: 4,
        // 16 cells: 4 x O = 16
        pieces: [
            { shape: [[1, 1], [1, 1]], color: "#FF6B6B" },
            { shape: [[1, 1], [1, 1]], color: "#4ECDC4" },
            { shape: [[1, 1], [1, 1]], color: "#45B7D1" },
            { shape: [[1, 1], [1, 1]], color: "#96CEB4" }
        ]
    },
    {
        id: 6,
        name: "Long Lines",
        difficulty: "medium",
        gridWidth: 4,
        gridHeight: 4,
        // 16 cells: 4 x I = 16
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
        // 20 cells: 5 + 4 + 3 + 3 + 3 + 2 = 20
        pieces: [
            { shape: [[1, 1, 1, 1, 1]], color: "#FF6B6B" },          // I-pentomino
            { shape: [[1, 1], [1, 1]], color: "#4ECDC4" },           // O
            { shape: [[1, 1], [1, 0]], color: "#45B7D1" },           // L-tromino
            { shape: [[1, 1], [0, 1]], color: "#96CEB4" },           // J-tromino
            { shape: [[1, 1, 1]], color: "#FFEAA7" },                // I-tromino
            { shape: [[1, 1]], color: "#DDA0DD" }                    // Domino
        ]
    },
    {
        id: 8,
        name: "The L Gang",
        difficulty: "medium",
        gridWidth: 4,
        gridHeight: 5,
        // 20 cells: L + J + L + J + O = 4+4+4+4+4 = 20
        pieces: [
            { shape: [[1, 0], [1, 0], [1, 1]], color: "#FF6B6B" },   // L
            { shape: [[0, 1], [0, 1], [1, 1]], color: "#4ECDC4" },   // J
            { shape: [[1, 0], [1, 0], [1, 1]], color: "#45B7D1" },   // L
            { shape: [[0, 1], [0, 1], [1, 1]], color: "#96CEB4" },   // J
            { shape: [[1, 1], [1, 1]], color: "#FFEAA7" }            // O
        ]
    },
    {
        id: 9,
        name: "Wide Open",
        difficulty: "medium",
        gridWidth: 6,
        gridHeight: 3,
        // 18 cells: O + O + O + I + I + I = 4+4+4+2+2+2 = 18
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
        // 20 cells: I-tet x 5 = 20
        pieces: [
            { shape: [[1], [1], [1], [1]], color: "#FF6B6B" },
            { shape: [[1], [1], [1], [1]], color: "#4ECDC4" },
            { shape: [[1], [1], [1], [1]], color: "#45B7D1" },
            { shape: [[1], [1], [1], [1]], color: "#96CEB4" },
            { shape: [[1], [1], [1], [1]], color: "#FFEAA7" }
        ]
    },

    // ═══════════════════════════════════════════════════════════════
    // HARD (5 puzzles) - Complex combinations
    // ═══════════════════════════════════════════════════════════════
    {
        id: 11,
        name: "Five Alive",
        difficulty: "hard",
        gridWidth: 5,
        gridHeight: 5,
        // 25 cells: I-pent x 5 = 25
        pieces: [
            { shape: [[1, 1, 1, 1, 1]], color: "#FF6B6B" },
            { shape: [[1, 1, 1, 1, 1]], color: "#4ECDC4" },
            { shape: [[1, 1, 1, 1, 1]], color: "#45B7D1" },
            { shape: [[1, 1, 1, 1, 1]], color: "#96CEB4" },
            { shape: [[1, 1, 1, 1, 1]], color: "#FFEAA7" }
        ]
    },
    {
        id: 12,
        name: "Shape Shifter",
        difficulty: "hard",
        gridWidth: 6,
        gridHeight: 5,
        // 30 cells: I-pent x 4 + O x 2 + domino = 20 + 8 + 2 = 30
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
        id: 13,
        name: "Big Mix",
        difficulty: "hard",
        gridWidth: 6,
        gridHeight: 5,
        // 30 cells: I-pent x 6 = 30
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
        id: 14,
        name: "Tall Order",
        difficulty: "hard",
        gridWidth: 5,
        gridHeight: 6,
        // 30 cells: I-pent (vertical) x 6 = 30
        pieces: [
            { shape: [[1], [1], [1], [1], [1]], color: "#FF6B6B" },
            { shape: [[1], [1], [1], [1], [1]], color: "#4ECDC4" },
            { shape: [[1], [1], [1], [1], [1]], color: "#45B7D1" },
            { shape: [[1], [1], [1], [1], [1]], color: "#96CEB4" },
            { shape: [[1], [1], [1], [1], [1]], color: "#FFEAA7" },
            { shape: [[1], [1], [1], [1], [1]], color: "#DDA0DD" }
        ]
    },
    {
        id: 15,
        name: "Master Challenge",
        difficulty: "hard",
        gridWidth: 6,
        gridHeight: 6,
        // 36 cells: O x 9 = 36
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

// Difficulty labels
const DIFFICULTY_ORDER = ["easy", "medium", "hard"];
