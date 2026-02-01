// PolyFit - Puzzle Definitions

const PUZZLES = [
    // Easy puzzles (4x3 grid)
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
            { shape: [[1, 1], [1, 1]], color: "#FF6B6B" },  // O
            { shape: [[1, 1], [1, 1]], color: "#4ECDC4" },  // O
            { shape: [[1, 1], [1, 1]], color: "#45B7D1" },  // O
            { shape: [[1, 1], [1, 1]], color: "#96CEB4" }   // O
        ]
    },
    {
        id: 3,
        name: "L is for Learn",
        difficulty: "easy",
        gridWidth: 4,
        gridHeight: 3,
        pieces: [
            { shape: [[1, 0], [1, 0], [1, 1]], color: "#FF6B6B" },  // L-tetromino
            { shape: [[0, 1], [0, 1], [1, 1]], color: "#4ECDC4" },  // J-tetromino
            { shape: [[1, 1, 1, 1]], color: "#45B7D1" }             // I-tetromino
        ]
    },
    
    // Medium puzzles (5x4 grid)
    {
        id: 4,
        name: "Getting Tricky",
        difficulty: "medium",
        gridWidth: 5,
        gridHeight: 4,
        pieces: [
            { shape: [[1, 1, 1], [0, 1, 0]], color: "#FF6B6B" },  // T-tetromino
            { shape: [[1, 1, 1], [0, 1, 0]], color: "#4ECDC4" },  // T-tetromino
            { shape: [[1, 1], [1, 1]], color: "#45B7D1" },        // O-tetromino
            { shape: [[1, 1], [1, 1]], color: "#96CEB4" },        // O-tetromino
            { shape: [[1, 1, 1, 1]], color: "#FFEAA7" }           // I-tetromino
        ]
    },
    {
        id: 5,
        name: "Snake Pit",
        difficulty: "medium",
        gridWidth: 5,
        gridHeight: 4,
        pieces: [
            { shape: [[1, 1, 0], [0, 1, 1]], color: "#FF6B6B" },  // S-tetromino
            { shape: [[0, 1, 1], [1, 1, 0]], color: "#4ECDC4" },  // Z-tetromino
            { shape: [[1, 1, 0], [0, 1, 1]], color: "#45B7D1" },  // S-tetromino
            { shape: [[0, 1, 1], [1, 1, 0]], color: "#96CEB4" },  // Z-tetromino
            { shape: [[1, 1, 1, 1]], color: "#FFEAA7" }           // I-tetromino
        ]
    },
    {
        id: 6,
        name: "Mixed Bag",
        difficulty: "medium",
        gridWidth: 5,
        gridHeight: 4,
        pieces: [
            { shape: [[1, 1, 1, 1, 1]], color: "#FF6B6B" },       // I-pentomino
            { shape: [[1, 1], [1, 1]], color: "#4ECDC4" },        // O-tetromino
            { shape: [[1, 1], [1, 0]], color: "#45B7D1" },        // L-tromino
            { shape: [[1, 1], [0, 1]], color: "#96CEB4" },        // L-tromino (mirror)
            { shape: [[1, 1, 1]], color: "#FFEAA7" },             // I-tromino
            { shape: [[1, 1]], color: "#DDA0DD" }                 // Domino
        ]
    },
    {
        id: 7,
        name: "Tetris Time",
        difficulty: "medium",
        gridWidth: 4,
        gridHeight: 5,
        pieces: [
            { shape: [[1, 1, 1, 1]], color: "#FF6B6B" },          // I
            { shape: [[1, 1], [1, 1]], color: "#4ECDC4" },        // O
            { shape: [[1, 1, 1], [0, 1, 0]], color: "#45B7D1" },  // T
            { shape: [[1, 0], [1, 1], [0, 1]], color: "#96CEB4" },// S
            { shape: [[0, 1], [1, 1], [1, 0]], color: "#FFEAA7" } // Z
        ]
    },
    
    // Hard puzzles (6x5 grid)
    {
        id: 8,
        name: "Pentomino Intro",
        difficulty: "hard",
        gridWidth: 6,
        gridHeight: 5,
        pieces: [
            { shape: [[1, 1, 1], [1, 0, 0], [1, 0, 0]], color: "#FF6B6B" },  // L-pentomino
            { shape: [[1, 1, 1], [0, 0, 1], [0, 0, 1]], color: "#4ECDC4" },  // J-pentomino (mirror)
            { shape: [[0, 1, 0], [1, 1, 1], [0, 1, 0]], color: "#45B7D1" },  // + pentomino
            { shape: [[1, 1, 1, 1, 1]], color: "#96CEB4" },                   // I-pentomino
            { shape: [[1, 1], [1, 1]], color: "#FFEAA7" },                    // O-tetromino
            { shape: [[1]], color: "#DDA0DD" }                                // Monomino
        ]
    },
    {
        id: 9,
        name: "Complex Shapes",
        difficulty: "hard",
        gridWidth: 6,
        gridHeight: 5,
        pieces: [
            { shape: [[1, 1, 0], [0, 1, 0], [0, 1, 1]], color: "#FF6B6B" },  // S-pentomino
            { shape: [[0, 1, 1], [0, 1, 0], [1, 1, 0]], color: "#4ECDC4" },  // Z-pentomino
            { shape: [[1, 1, 1], [1, 0, 1]], color: "#45B7D1" },             // U-pentomino
            { shape: [[1, 1, 1], [0, 1, 0]], color: "#96CEB4" },             // T-tetromino
            { shape: [[1, 1, 1, 1]], color: "#FFEAA7" },                     // I-tetromino
            { shape: [[1, 1], [1, 1]], color: "#DDA0DD" }                    // O-tetromino
        ]
    },
    {
        id: 10,
        name: "Master Challenge",
        difficulty: "hard",
        gridWidth: 6,
        gridHeight: 5,
        pieces: [
            { shape: [[1, 1], [1, 0], [1, 0], [1, 0]], color: "#FF6B6B" },   // L-pentomino tall
            { shape: [[1, 1], [0, 1], [0, 1], [0, 1]], color: "#4ECDC4" },   // J-pentomino tall
            { shape: [[1, 1, 1], [1, 1, 0]], color: "#45B7D1" },             // P-pentomino
            { shape: [[1, 1, 1], [0, 1, 1]], color: "#96CEB4" },             // P-pentomino mirror
            { shape: [[1, 1, 1, 1]], color: "#FFEAA7" },                     // I-tetromino
            { shape: [[1, 1]], color: "#DDA0DD" }                            // Domino
        ]
    }
];

// Difficulty colors
const DIFFICULTY_COLORS = {
    easy: "#4ECDC4",
    medium: "#FFEAA7",
    hard: "#FF6B6B"
};
