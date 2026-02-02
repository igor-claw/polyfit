#!/usr/bin/env node
// Puzzle Solver - Verify all puzzles are solvable

const fs = require('fs');
const vm = require('vm');
const puzzleCode = fs.readFileSync(__dirname + '/js/puzzles.js', 'utf8');
const context = { PUZZLES: null, DIFFICULTY_COLORS: null };
vm.createContext(context);
vm.runInContext(puzzleCode, context);
const PUZZLES = context.PUZZLES;

// Get all rotations of a shape (0, 90, 180, 270 degrees)
function getRotations(shape) {
    const rotations = [shape];
    let current = shape;
    
    for (let i = 0; i < 3; i++) {
        current = rotateShape(current);
        // Check if this rotation is unique
        if (!rotations.some(r => shapesEqual(r, current))) {
            rotations.push(current);
        }
    }
    
    return rotations;
}

function rotateShape(shape) {
    const rows = shape.length;
    const cols = shape[0].length;
    const rotated = [];
    
    for (let c = 0; c < cols; c++) {
        const newRow = [];
        for (let r = rows - 1; r >= 0; r--) {
            newRow.push(shape[r][c]);
        }
        rotated.push(newRow);
    }
    
    return rotated;
}

function shapesEqual(a, b) {
    if (a.length !== b.length) return false;
    for (let r = 0; r < a.length; r++) {
        if (a[r].length !== b[r].length) return false;
        for (let c = 0; c < a[r].length; c++) {
            if (a[r][c] !== b[r][c]) return false;
        }
    }
    return true;
}

// Check if a piece can be placed at position
function canPlace(grid, shape, startRow, startCol) {
    for (let r = 0; r < shape.length; r++) {
        for (let c = 0; c < shape[r].length; c++) {
            if (shape[r][c] === 1) {
                const gr = startRow + r;
                const gc = startCol + c;
                if (gr < 0 || gr >= grid.length || gc < 0 || gc >= grid[0].length) {
                    return false;
                }
                if (grid[gr][gc] !== 0) {
                    return false;
                }
            }
        }
    }
    return true;
}

// Place a piece on the grid
function placePiece(grid, shape, startRow, startCol, pieceId) {
    const newGrid = grid.map(row => [...row]);
    for (let r = 0; r < shape.length; r++) {
        for (let c = 0; c < shape[r].length; c++) {
            if (shape[r][c] === 1) {
                newGrid[startRow + r][startCol + c] = pieceId;
            }
        }
    }
    return newGrid;
}

// Check if grid is full
function isFull(grid) {
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
            if (grid[r][c] === 0) return false;
        }
    }
    return true;
}

// Solve puzzle using backtracking
function solve(grid, pieces, pieceIndex) {
    if (pieceIndex >= pieces.length) {
        return isFull(grid);
    }
    
    const piece = pieces[pieceIndex];
    const rotations = getRotations(piece.shape);
    
    for (const shape of rotations) {
        for (let r = 0; r <= grid.length - shape.length; r++) {
            for (let c = 0; c <= grid[0].length - shape[0].length; c++) {
                if (canPlace(grid, shape, r, c)) {
                    const newGrid = placePiece(grid, shape, r, c, pieceIndex + 1);
                    if (solve(newGrid, pieces, pieceIndex + 1)) {
                        return true;
                    }
                }
            }
        }
    }
    
    return false;
}

// Count cells in all pieces
function countPieceCells(pieces) {
    let total = 0;
    for (const piece of pieces) {
        for (const row of piece.shape) {
            for (const cell of row) {
                if (cell === 1) total++;
            }
        }
    }
    return total;
}

// Verify all puzzles
console.log("PolyFit Puzzle Verification\n");
console.log("=".repeat(50));

let allSolvable = true;

for (const puzzle of PUZZLES) {
    const gridSize = puzzle.gridWidth * puzzle.gridHeight;
    const piecesCells = countPieceCells(puzzle.pieces);
    
    process.stdout.write(`Puzzle ${puzzle.id}: "${puzzle.name}" (${puzzle.difficulty})`);
    process.stdout.write(` [${puzzle.gridWidth}x${puzzle.gridHeight}=${gridSize} cells, ${piecesCells} piece cells]`);
    
    // First check: do piece cells match grid size?
    if (piecesCells !== gridSize) {
        console.log(` ❌ CELL COUNT MISMATCH`);
        allSolvable = false;
        continue;
    }
    
    // Create empty grid
    const grid = [];
    for (let r = 0; r < puzzle.gridHeight; r++) {
        grid.push(new Array(puzzle.gridWidth).fill(0));
    }
    
    // Try to solve
    const solvable = solve(grid, puzzle.pieces, 0);
    
    if (solvable) {
        console.log(` ✅`);
    } else {
        console.log(` ❌ NO SOLUTION FOUND`);
        allSolvable = false;
    }
}

console.log("\n" + "=".repeat(50));
console.log(allSolvable ? "All puzzles verified! ✅" : "Some puzzles have issues! ❌");
process.exit(allSolvable ? 0 : 1);
