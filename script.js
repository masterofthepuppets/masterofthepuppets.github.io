let ctx;
let canvas;
let maze;
let mazeHeight;
let mazeWidth;
let player;

const htop = 0;
const hparent = i => ((i + 1) >>> 1) - 1;
const left = i => (i << 1) + 1;
const right = i => (i + 1) << 1;

class PriorityQueue {
    constructor(comparator = (a, b) => a[1] < b[1]) {
        this._heap = [];
        this._comparator = comparator;
    }
    size() {
        return this._heap.length;
    }
    isEmpty() {
        return this.size() == 0;
    }
    peek() {
        return this._heap[htop];
    }
    push(...values) {
        values.forEach(value => {
            this._heap.push(value);
            this._siftUp();
        });
        return this.size();
    }
    pop() {
        const poppedValue = this.peek();
        const bottom = this.size() - 1;
        if (bottom > htop) {
            this._swap(htop, bottom);
        }
        this._heap.pop();
        this._siftDown();
        return poppedValue;
    }
    replace(value) {
        const replacedValue = this.peek();
        this._heap[htop] = value;
        this._siftDown();
        return replacedValue;
    }
    _greater(i, j) {
        return this._comparator(this._heap[i], this._heap[j]);
    }
    _swap(i, j) {
        [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
    }
    _siftUp() {
        let node = this.size() - 1;
        while (node > htop && this._greater(node, hparent(node))) {
            this._swap(node, hparent(node));
            node = hparent(node);
        }
    }
    _siftDown() {
        let node = htop;
        while (
            (left(node) < this.size() && this._greater(left(node), node)) ||
            (right(node) < this.size() && this._greater(right(node), node))
        ) {
            let maxChild = (right(node) < this.size() && this._greater(right(node), left(node))) ? right(node) : left(node);
            this._swap(node, maxChild);
            node = maxChild;
        }
    }
}

class Player {
    constructor() {
        this.reset();
    }

    reset() {
        this.col = 0;
        this.row = 0;
    }
}

class MazeCell {
    constructor(col, row) {
        this.col = col;
        this.row = row;

        this.eastWall = true;
        this.northWall = true;
        this.southWall = true;
        this.westWall = true;

        this.visited = false;
    }
}

class Maze {
    constructor(cols, rows, cellSize) {
        this.backgroundColor = "#ffffff";
        this.cols = cols;
        this.endColor = "#65EBD2";
        this.mazeColor = "#000000";
        this.playerColor = "#EB8A2D";
        this.rows = rows;
        this.cellSize = cellSize;

        this.cells = [];

        this.generate()
    }

    generate() {
        mazeHeight = this.rows * this.cellSize;
        mazeWidth = this.cols * this.cellSize;

        canvas.height = mazeHeight;
        canvas.width = mazeWidth;
        canvas.style.height = mazeHeight;
        canvas.style.width = mazeWidth;

        for (let col = 0; col < this.cols; col++) {
            this.cells[col] = [];
            for (let row = 0; row < this.rows; row++) {
                this.cells[col][row] = new MazeCell(col, row);
            }
        }

        let rndCol = Math.floor(Math.random() * this.cols);
        let rndRow = Math.floor(Math.random() * this.rows);

        let stack = [];
        stack.push(this.cells[rndCol][rndRow]);

        let currCell;
        let dir;
        let foundNeighbor;
        let nextCell;

        while (this.hasUnvisited(this.cells)) {
            currCell = stack[stack.length - 1];
            currCell.visited = true;
            if (this.hasUnvisitedNeighbor(currCell)) {
                nextCell = null;
                foundNeighbor = false;
                do {
                    dir = Math.floor(Math.random() * 4);
                    switch (dir) {
                        case 0:
                            if (currCell.col !== (this.cols - 1) && !this.cells[currCell.col + 1][currCell.row].visited) {
                                currCell.eastWall = false;
                                nextCell = this.cells[currCell.col + 1][currCell.row];
                                nextCell.westWall = false;
                                foundNeighbor = true;
                            }
                            break;
                        case 1:
                            if (currCell.row !== 0 && !this.cells[currCell.col][currCell.row - 1].visited) {
                                currCell.northWall = false;
                                nextCell = this.cells[currCell.col][currCell.row - 1];
                                nextCell.southWall = false;
                                foundNeighbor = true;
                            }
                            break;
                        case 2:
                            if (currCell.row !== (this.rows - 1) && !this.cells[currCell.col][currCell.row + 1].visited) {
                                currCell.southWall = false;
                                nextCell = this.cells[currCell.col][currCell.row + 1];
                                nextCell.northWall = false;
                                foundNeighbor = true;
                            }
                            break;
                        case 3:
                            if (currCell.col !== 0 && !this.cells[currCell.col - 1][currCell.row].visited) {
                                currCell.westWall = false;
                                nextCell = this.cells[currCell.col - 1][currCell.row];
                                nextCell.eastWall = false;
                                foundNeighbor = true;
                            }
                            break;
                    }
                    if (foundNeighbor) {
                        stack.push(nextCell);
                    }
                } while (!foundNeighbor)
            } else {
                currCell = stack.pop();
            }
        }
        this.redraw();
    }

    hasUnvisited() {
        for (let col = 0; col < this.cols; col++) {
            for (let row = 0; row < this.rows; row++) {
                if (!this.cells[col][row].visited) {
                    return true;
                }
            }
        }
        return false;
    }

    hasUnvisitedNeighbor(mazeCell) {
        return ((mazeCell.col !== 0 && !this.cells[mazeCell.col - 1][mazeCell.row].visited) ||
            (mazeCell.col !== (this.cols - 1) && !this.cells[mazeCell.col + 1][mazeCell.row].visited) ||
            (mazeCell.row !== 0 && !this.cells[mazeCell.col][mazeCell.row - 1].visited) ||
            (mazeCell.row !== (this.rows - 1) && !this.cells[mazeCell.col][mazeCell.row + 1].visited));
    }

    redraw() {
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(0, 0, mazeHeight, mazeWidth);

        ctx.fillStyle = this.endColor;
        ctx.fillRect((this.cols - 1) * this.cellSize, (this.rows - 1) * this.cellSize, this.cellSize, this.cellSize);

        ctx.strokeStyle = this.mazeColor;
        ctx.strokeRect(0, 0, mazeHeight, mazeWidth);

        for (let col = 0; col < this.cols; col++) {
            for (let row = 0; row < this.rows; row++) {
                if (this.cells[col][row].eastWall) {
                    ctx.beginPath();
                    ctx.moveTo((col + 1) * this.cellSize, row * this.cellSize);
                    ctx.lineTo((col + 1) * this.cellSize, (row + 1) * this.cellSize);
                    ctx.stroke();
                }
                if (this.cells[col][row].northWall) {
                    ctx.beginPath();
                    ctx.moveTo(col * this.cellSize, row * this.cellSize);
                    ctx.lineTo((col + 1) * this.cellSize, row * this.cellSize);
                    ctx.stroke();
                }
                if (this.cells[col][row].southWall) {
                    ctx.beginPath();
                    ctx.moveTo(col * this.cellSize, (row + 1) * this.cellSize);
                    ctx.lineTo((col + 1) * this.cellSize, (row + 1) * this.cellSize);
                    ctx.stroke();
                }
                if (this.cells[col][row].westWall) {
                    ctx.beginPath();
                    ctx.moveTo(col * this.cellSize, row * this.cellSize);
                    ctx.lineTo(col * this.cellSize, (row + 1) * this.cellSize);
                    ctx.stroke();
                }
            }
        }
        ctx.fillStyle = this.playerColor;
        ctx.fillRect((player.col * this.cellSize) + 2, (player.row * this.cellSize) + 2, this.cellSize - 4, this.cellSize - 4);
    }
}

function onClick(event) {
    player.reset();
    maze.cols = document.getElementById("cols").value;
    maze.rows = document.getElementById("rows").value;
    maze.generate();
}

function onSolveClick(event) {
	document.getElementById('generate').disabled = true;
    document.getElementById('auto_solve').disabled = true;
    player.reset();
	maze.redraw();
    auto_solve();
}

function onControlClick(event) {
    switch (event.target.id) {
        case 'left':
            if (!maze.cells[player.col][player.row].westWall) {
                player.col -= 1;
            }
            break;
        case 'right':
            if (!maze.cells[player.col][player.row].eastWall) {
                player.col += 1;
            }
            break;
        case 'down':
            if (!maze.cells[player.col][player.row].southWall) {
                player.row += 1;
            }
            break;
        case 'up':
            if (!maze.cells[player.col][player.row].northWall) {
                player.row -= 1;
            }
            break;
        default:
            break;
    }
    maze.redraw();
}

function onKeyDown(event) {
    switch (event.keyCode) {
        case 37:
        case 65:
            if (!maze.cells[player.col][player.row].westWall) {
                player.col -= 1;
            }
            break;
        case 39:
        case 68:
            if (!maze.cells[player.col][player.row].eastWall) {
                player.col += 1;
            }
            break;
        case 40:
        case 83:
            if (!maze.cells[player.col][player.row].southWall) {
                player.row += 1;
            }
            break;
        case 38:
        case 87:
            if (!maze.cells[player.col][player.row].northWall) {
                player.row -= 1;
            }
            break;
        default:
            break;
    }
    maze.redraw();
}

function neighbors(mazeCell) {
	let x = mazeCell.col;
	let y = mazeCell.row;
	let neighbors = [[x + 1, y], [x - 1, y], [x, y - 1], [x, y + 1]];

	if ((x + y) % 2 == 0) {
		neighbors.reverse();
	}
	neighbors = neighbors.filter(pair => (pair[0] >= 0 && pair[0] < maze.cols && pair[1] >= 0 && pair[1] < maze.rows));
	
	
	if (mazeCell.eastWall) {
		neighbors = neighbors.filter(function(e) { return (e[0] != x + 1) });
	}
	
	if (mazeCell.westWall) {
		neighbors = neighbors.filter(function(e) { return (e[0] != x - 1) });
	}
	if (mazeCell.northWall) {
		neighbors = neighbors.filter(function(e) { return (e[1] != y - 1) });
	}
	if (mazeCell.southWall) {
		neighbors = neighbors.filter(function(e) { return (e[1] != y + 1) });
	}
	return neighbors;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function heuristic(c1, c2) {
	return Math.abs(c1[0] - c2[0]) + Math.abs(c1[1] - c2[1]);
}

async function auto_solve() {
	const delay = parseInt(prompt('Enter required delay of movement in milliseconds: (Recommended: 150ms)'));
	let start = [0, 0];
	let goal = [maze.cols - 1, maze.rows - 1];
	let path = [];
	let frontier = new PriorityQueue();
	frontier.push([start, 0]);
	
	let came_from = new Map();
	let cost_so_far = new Map();
	
	came_from.set(start.toString(), null);
	cost_so_far.set(start.toString(), 0);
	
	while (!frontier.isEmpty()) {
		let [current, current_priority]	= frontier.pop();
		if (current.toString() == goal.toString()) {
			break;
		}
		let neighborCells = neighbors(maze.cells[current[0]][current[1]]);
		for (let i = 0; i < neighborCells.length; i++) {
			let next = neighborCells[i];
			let new_cost = cost_so_far.get(current.toString()) + 1;
			
			if (!cost_so_far.has(next.toString()) || new_cost < cost_so_far.get(next.toString())) {
				cost_so_far.set(next.toString(), new_cost);
				let priority = new_cost + heuristic(next, goal);
				frontier.push([next, priority]);
				came_from.set(next.toString(), current);
			}
		}
	}
	
	let cur = goal.toString();
	while (cur != start.toString()) {
		path.push(cur.split(',').map(r => parseInt(r)));
		cur = came_from.get(cur.toString()).toString();
	}
	path.push(start);
	path.reverse();
	
	for (let i = 1; i < path.length; i++) {
		let move = path[i];
		let prev = path[i - 1];
		if (move[0] == prev[0] + 1) {
			player.col += 1;
		} else if (move[0] == prev[0] - 1) {
			player.col -= 1;
		} else if (move[1] == prev[1] + 1) {
			player.row += 1;
		} else if (move[1] == prev[1] - 1) {
			player.row -= 1;
		}
		maze.redraw();
		await sleep(delay);
	}
	document.getElementById('generate').disabled = false;
    document.getElementById('auto_solve').disabled = false;
}

function onLoad() {

    canvas = document.getElementById('maze');
    ctx = canvas.getContext('2d');

    player = new Player();
    maze = new Maze(10, 10, 25);

    document.addEventListener('keydown', onKeyDown);
    document.getElementById('generate').addEventListener('click', onClick);
    document.getElementById('auto_solve').addEventListener('click', onSolveClick);
    document.getElementById('up').addEventListener('click', onControlClick);
    document.getElementById('right').addEventListener('click', onControlClick);
    document.getElementById('down').addEventListener('click', onControlClick);
    document.getElementById('left').addEventListener('click', onControlClick);

}
