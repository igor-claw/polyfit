// PolyFit - Puzzle Definitions

const PUZZLES = [
    // Easy puzzles
    {
        id: 1,
        name: "First Steps",
        difficulty: "easy",
        gridWidth: 4,
        gridHeight: 3,
        pieces: [
            { shape: [[1, 1], [1, 0]], color: "#FF6B6B" },  // L-tromino
            { shape: [[1, 1, 1]], color: "#4ECDC4" },       // I-tromino
            { shape: [[1, 1], [1, 1]], color: "#45B7D1" },  // O-tetromino
            { shape: [[1]], color: "#96CEB4" },             // Monomino
            { shape: [[1]], color: "#FFEAA7" }              // Monomino
        ]
    },
    {
        id: 2,
        name: "Building Blocks",
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
    {
        id: 3,
        name: "L is for Learn",
        difficulty: "easy",
        gridWidth: 4,
        gridHeight: 3,
        pieces: [
            // L + J + O = 4+4+4 = 12
            { shape: [[1, 0], [1, 0], [1, 1]], color: "#FF6B6B" },
            { shape: [[0, 1], [0, 1], [1, 1]], color: "#4ECDC4" },
            { shape: [[1, 1], [1, 1]], color: "#45B7D1" }
        ]
    },
    
    // Medium puzzles
    {
        id: 4,
        name: "Getting Tricky",
        difficulty: "medium",
        gridWidth: 5,
        gridHeight: 4,
        pieces: [
            // 20 cells: 5x vertical I-tetromino (each 1x4)
            { shape: [[1], [1], [1], [1]], color: "#FF6B6B" },
            { shape: [[1], [1], [1], [1]], color: "#4ECDC4" },
            { shape: [[1], [1], [1], [1]], color: "#45B7D1" },
            { shape: [[1], [1], [1], [1]], color: "#96CEB4" },
            { shape: [[1], [1], [1], [1]], color: "#FFEAA7" }
        ]
    },
    {
        id: 5,
        name: "Line Up",
        difficulty: "medium",
        gridWidth: 4,
        gridHeight: 5,
        pieces: [
            // 20 cells: 5x I-tetromino = 20
            { shape: [[1, 1, 1, 1]], color: "#FF6B6B" },
            { shape: [[1, 1, 1, 1]], color: "#4ECDC4" },
            { shape: [[1, 1, 1, 1]], color: "#45B7D1" },
            { shape: [[1, 1, 1, 1]], color: "#96CEB4" },
            { shape: [[1, 1, 1, 1]], color: "#FFEAA7" }
        ]
    },
    {
        id: 6,
        name: "Mixed Bag",
        difficulty: "medium",
        gridWidth: 5,
        gridHeight: 4,
        pieces: [
            { shape: [[1, 1, 1, 1, 1]], color: "#FF6B6B" },       // I-pentomino (5)
            { shape: [[1, 1], [1, 1]], color: "#4ECDC4" },        // O (4)
            { shape: [[1, 1], [1, 0]], color: "#45B7D1" },        // L-tromino (3)
            { shape: [[1, 1], [0, 1]], color: "#96CEB4" },        // J-tromino (3)
            { shape: [[1, 1, 1]], color: "#FFEAA7" },             // I-tromino (3)
            { shape: [[1, 1]], color: "#DDA0DD" }                 // Domino (2)
        ]
    },
    {
        id: 7,
        name: "Tetris Time",
        difficulty: "medium",
        gridWidth: 4,
        gridHeight: 4,
        pieces: [
            // 16 cells: 4x O-tetromino
            { shape: [[1, 1], [1, 1]], color: "#FF6B6B" },
            { shape: [[1, 1], [1, 1]], color: "#4ECDC4" },
            { shape: [[1, 1], [1, 1]], color: "#45B7D1" },
            { shape: [[1, 1], [1, 1]], color: "#96CEB4" }
        ]
    },
    
    // Hard puzzles
    {
        id: 8,
        name: "Pentomino Intro",
        difficulty: "hard",
        gridWidth: 6,
        gridHeight: 5,
        pieces: [
            // 30 cells: 6x I-pentomino
            { shape: [[1, 1, 1, 1, 1]], color: "#FF6B6B" },
            { shape: [[1, 1, 1, 1, 1]], color: "#4ECDC4" },
            { shape: [[1, 1, 1, 1, 1]], color: "#45B7D1" },
            { shape: [[1, 1, 1, 1, 1]], color: "#96CEB4" },
            { shape: [[1, 1, 1, 1, 1]], color: "#FFEAA7" },
            { shape: [[1, 1, 1, 1, 1]], color: "#DDA0DD" }
        ]
    },
    {
        id: 9,
        name: "Complex Shapes",
        difficulty: "hard",
        gridWidth: 6,
        gridHeight: 5,
        pieces: [
            // 30 cells: 4x I-pent (20) + domino (2) + 2x O (8) = 30
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
        id: 10,
        name: "Master Challenge",
        difficulty: "hard",
        gridWidth: 6,
        gridHeight: 5,
        pieces: [
            // 30 cells: 4x I-pent (20) + 2x O (8) + domino (2) = 30
            { shape: [[1, 1, 1, 1, 1]], color: "#FF6B6B" },
            { shape: [[1, 1, 1, 1, 1]], color: "#4ECDC4" },
            { shape: [[1, 1, 1, 1, 1]], color: "#45B7D1" },
            { shape: [[1, 1, 1, 1, 1]], color: "#96CEB4" },
            { shape: [[1, 1], [1, 1]], color: "#FFEAA7" },
            { shape: [[1, 1], [1, 1]], color: "#DDA0DD" },
            { shape: [[1, 1]], color: "#FFB6C1" }
        ]
    }
];

// Difficulty colors
const DIFFICULTY_COLORS = {
    easy: "#4ECDC4",
    medium: "#FFEAA7",
    hard: "#FF6B6B"
};
