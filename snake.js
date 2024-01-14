document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const gridSize = 20;
    let snake = [{ x: 10, y: 10 }];
    let direction = 'right';
    let food = generateFood();

    function createBoard() {
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.id = `cell-${i}-${j}`;
                board.appendChild(cell);
            }
        }
    }

    function draw() {
        clearBoard();
        drawSnake();
        drawFood();
    }

    function drawSnake() {
        snake.forEach(segment => {
            const cell = document.getElementById(`cell-${segment.x}-${segment.y}`);
            cell.style.backgroundColor = 'green';
        });
    }

    function drawFood() {
        const cell = document.getElementById(`cell-${food.x}-${food.y}`);
        cell.style.backgroundColor = 'red';
    }

    function clearBoard() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.style.backgroundColor = '';
        });
    }

    function generateFood() {
        const x = Math.floor(Math.random() * gridSize);
        const y = Math.floor(Math.random() * gridSize);
        return { x, y };
    }

    function update() {
        const head = { ...snake[0] };

        switch (direction) {
            case 'up':
                head.x = (head.x - 1 + gridSize) % gridSize;
                break;
            case 'down':
                head.x = (head.x + 1) % gridSize;
                break;
            case 'left':
                head.y = (head.y - 1 + gridSize) % gridSize;
                break;
            case 'right':
                head.y = (head.y + 1) % gridSize;
                break;
        }

        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            food = generateFood();
        } else {
            snake.pop();
        }
    }

    function checkCollision() {
        const head = snake[0];
        const collided = snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
        return collided;
    }

    function gameOver() {
        alert('Game Over!');
        snake = [{ x: 10, y: 10 }];
        direction = 'right';
        food = generateFood();
    }

    function handleKeyPress(event) {
        switch (event.key) {
            case 'ArrowUp':
                direction = 'up';
                break;
            case 'ArrowDown':
                direction = 'down';
                break;
            case 'ArrowLeft':
                direction = 'left';
                break;
            case 'ArrowRight':
                direction = 'right';
                break;
        }
    }

    createBoard();

    setInterval(() => {
        update();
        draw();

        if (checkCollision()) {
            gameOver();
        }
    }, 200);

    document.addEventListener('keydown', handleKeyPress);
});
