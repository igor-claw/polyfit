#!/usr/bin/env node
// Puzzle Solver - Verify all puzzles are solvable

const fs = require('fs');
const puzzleCode = fs.readFileSync(__dirname + '/js/puzzles.js', 'utf8')
    .replace(/^const /gm, 'var ');
eval(puzzleCode);

function getRotations(shape) {
    const rotations = [shape];
    let current = shape;
    for (let i = 0; i < 3; i++) {
        current = rotateShape(current);
        if (!rotations.some(r => shapesEqual(r, current))) rotations.push(current);
    }
    return rotations;
}

function rotateShape(shape) {
    const rows = shape.length, cols = shape[0].length, rotated = [];
    for (let c = 0; c < cols; c++) {
        const newRow = [];
        for (let r = rows - 1; r >= 0; r--) newRow.push(shape[r][c]);
        rotated.push(newRow);
    }
    return rotated;
}

function shapesEqual(a, b) {
    if (a.length !== b.length) return false;
    for (let r = 0; r < a.length; r++) {
        if (a[r].length !== b[r].length) return false;
        for (let c = 0; c < a[r].length; c++) if (a[r][c] !== b[r][c]) return false;
    }
    return true;
}

function canPlace(grid, shape, startRow, startCol) {
    for (let r = 0; r < shape.length; r++) {
        for (let c = 0; c < shape[r].length; c++) {
            if (shape[r][c] === 1) {
                const gr = startRow + r, gc = startCol + c;
                if (gr < 0 || gr >= grid.length || gc < 0 || gc >= grid[0].length) return false;
                if (grid[gr][gc] !== 0) return false;
            }
        }
    }
    return true;
}

function placePiece(grid, shape, startRow, startCol, pieceId) {
    const newGrid = grid.map(row => [...row]);
    for (let r = 0; r < shape.length; r++) {
        for (let c = 0; c < shape[r].length; c++) {
            if (shape[r][c] === 1) newGrid[startRow + r][startCol + c] = pieceId;
        }
    }
    return newGrid;
}

function isFull(grid) {
    for (const row of grid) for (const cell of row) if (cell === 0) return false;
    return true;
}

function solve(grid, pieces, pieceIndex) {
    if (pieceIndex >= pieces.length) return isFull(grid);
    const rotations = getRotations(pieces[pieceIndex].shape);
    for (const shape of rotations) {
        for (let r = 0; r <= grid.length - shape.length; r++) {
            for (let c = 0; c <= grid[0].length - shape[0].length; c++) {
                if (canPlace(grid, shape, r, c)) {
                    if (solve(placePiece(grid, shape, r, c, pieceIndex + 1), pieces, pieceIndex + 1)) return true;
                }
            }
        }
    }
    return false;
}

function countPieceCells(pieces) {
    let total = 0;
    for (const p of pieces) for (const row of p.shape) for (const cell of row) if (cell === 1) total++;
    return total;
}

console.log("PolyFit Puzzle Verification\n" + "=".repeat(60));
let allSolvable = true;
let easyCount = 0, medCount = 0, hardCount = 0;

for (const puzzle of PUZZLES) {
    const gridSize = puzzle.gridWidth * puzzle.gridHeight;
    const piecesCells = countPieceCells(puzzle.pieces);
    const tag = `[${puzzle.difficulty.toUpperCase().padEnd(6)}]`;
    
    process.stdout.write(`${tag} Puzzle ${String(puzzle.id).padStart(2)}: "${puzzle.name.padEnd(18)}" `);
    process.stdout.write(`${puzzle.gridWidth}x${puzzle.gridHeight}=${String(gridSize).padStart(2)}, ${puzzle.pieces.length} pieces `);
    
    if (piecesCells !== gridSize) { 
        console.log(`❌ CELL MISMATCH (${piecesCells} vs ${gridSize})`); 
        allSolvable = false; 
        continue; 
    }
    
    const grid = Array.from({ length: puzzle.gridHeight }, () => new Array(puzzle.gridWidth).fill(0));
    const solvable = solve(grid, puzzle.pieces, 0);
    
    if (solvable) {
        console.log(`✅`);
        if (puzzle.difficulty === 'easy') easyCount++;
        else if (puzzle.difficulty === 'medium') medCount++;
        else hardCount++;
    } else {
        console.log(`❌ NO SOLUTION`);
        allSolvable = false;
    }
}

console.log("\n" + "=".repeat(60));
console.log(`Summary: ${easyCount} easy, ${medCount} medium, ${hardCount} hard`);
console.log(allSolvable ? "All puzzles verified! ✅" : "Some puzzles have issues! ❌");
process.exit(allSolvable ? 0 : 1);
