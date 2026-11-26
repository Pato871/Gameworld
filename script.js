
/* =========================================
   GAMEWORLD - GAME ENGINE
   Juegos + buscador + categorías
========================================= */

/* ---------- BUSCADOR Y CATEGORÍAS ---------- */

const searchInput = document.getElementById("gameSearch");
const gameCards = [...document.querySelectorAll(".game-card")];
const categoryButtons = [...document.querySelectorAll(".category")];

let activeCategory = "todos";

function filterGames() {
    const search = searchInput.value.toLowerCase().trim();
    let visible = 0;

    gameCards.forEach(card => {
        const category = card.dataset.category;
        const title = card.querySelector("h3").textContent.toLowerCase();
        const description = card.querySelector("p").textContent.toLowerCase();

        const matchesCategory =
            activeCategory === "todos" || category === activeCategory;

        const matchesSearch =
            title.includes(search) || description.includes(search);

        const show = matchesCategory && matchesSearch;

        card.style.display = show ? "" : "none";
        if (show) visible++;
    });

    emptyMessage.style.display = visible === 0 ? "block" : "none";
}

const emptyMessage = document.createElement("p");
emptyMessage.textContent = "No encontramos juegos con esa búsqueda. 🎮";
emptyMessage.style.cssText =
    "display:none;text-align:center;color:#aaaabd;padding:35px;font-size:20px;";
document.getElementById("gameGrid").after(emptyMessage);

searchInput.addEventListener("input", filterGames);

categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
        categoryButtons.forEach(item => item.classList.remove("active"));
        button.classList.add("active");
        activeCategory = button.dataset.category;
        filterGames();
    });
});


/* ---------- VENTANA DE JUEGOS ---------- */

const modalStyle = document.createElement("style");

modalStyle.textContent = `
.gw-modal {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: none;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background: rgba(3, 3, 12, .88);
    backdrop-filter: blur(12px);
}
.gw-modal.is-open { display: flex; }
.gw-dialog {
    width: min(760px, 100%);
    max-height: 90vh;
    overflow-y: auto;
    background: #11111f;
    border: 1px solid #39305e;
    border-radius: 16px;
    box-shadow: 0 0 60px rgba(139, 92, 246, .22);
    animation: gwPop .25s ease;
}
@keyframes gwPop {
    from {opacity:0;transform:scale(.96) translateY(10px);}
    to {opacity:1;transform:scale(1) translateY(0);}
}
.gw-modal-header {
    padding: 19px 23px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #292940;
}
.gw-modal-header h2 {
    color: white;
    font-family: 'Orbitron', sans-serif;
    font-size: 17px;
}
.gw-close {
    width: 38px;
    height: 38px;
    border: 1px solid #44405d;
    border-radius: 8px;
    background: #1b1b2c;
    color: white;
    font-size: 23px;
    cursor: pointer;
}
.gw-close:hover { background:#8b5cf6; }
.gw-content {
    padding: 25px;
    color: white;
    text-align: center;
}
.gw-description { color:#aaaabd;margin-bottom:20px;font-size:17px; }
.gw-status {
    min-height: 32px;
    margin: 16px 0;
    color: #c4b5fd;
    font-size: 18px;
    font-weight: 700;
}
.gw-btn {
    border: 0;
    padding: 12px 20px;
    border-radius: 7px;
    background: linear-gradient(100deg,#8b5cf6,#5b50df);
    color: white;
    font-weight: 800;
    font-size: 14px;
    cursor: pointer;
    margin: 5px;
    transition: .2s;
}
.gw-btn:hover { transform:translateY(-2px);filter:brightness(1.15); }
.gw-btn.secondary { background:#292940;border:1px solid #484365; }
.gw-score { color:#38bdf8;font-weight:800;font-size:20px; }

.gw-snake-canvas {
    display:block;
    width:min(400px,100%);
    height:auto;
    margin:15px auto;
    background:#080d18;
    border:2px solid #8b5cf6;
    border-radius:8px;
}
.gw-controls {
    display:grid;
    grid-template-columns:repeat(3,48px);
    gap:6px;
    justify-content:center;
    margin:12px auto;
}
.gw-controls button {
    height:42px;
    border:1px solid #514277;
    border-radius:7px;
    background:#242039;
    color:white;
    font-size:20px;
    cursor:pointer;
}
.gw-controls button:active {background:#8b5cf6;}
.gw-controls .empty {visibility:hidden;}

.gw-memory-grid {
    display:grid;
    grid-template-columns:repeat(4,minmax(55px,90px));
    justify-content:center;
    gap:10px;
    margin:20px auto;
}
.gw-memory-card {
    aspect-ratio:1;
    border:1px solid #56418d;
    border-radius:10px;
    background:linear-gradient(140deg,#292144,#17172a);
    color:white;
    font-size:34px;
    cursor:pointer;
}
.gw-memory-card.is-flipped,
.gw-memory-card.is-matched {
    background:#3b2a68;
    border-color:#a78bfa;
}
.gw-memory-card.is-matched {opacity:.55;cursor:default;}

.gw-ttt-grid {
    display:grid;
    grid-template-columns:repeat(3,90px);
    gap:9px;
    justify-content:center;
    margin:20px auto;
}
.gw-ttt-cell {
    width:90px;
    height:90px;
    border:1px solid #55447f;
    border-radius:10px;
    background:#1d1b30;
    color:white;
    font-size:42px;
    font-weight:800;
    cursor:pointer;
}
.gw-ttt-cell:hover:empty {background:#30274e;}
.gw-ttt-cell.x {color:#38bdf8;}
.gw-ttt-cell.o {color:#c084fc;}

.gw-reaction-pad {
    min-height:190px;
    display:grid;
    place-items:center;
    padding:25px;
    border:2px solid #62506e;
    border-radius:14px;
    background:#7f1d1d;
    color:white;
    font-size:clamp(22px,5vw,36px);
    font-weight:900;
    cursor:pointer;
    user-select:none;
    transition:background .15s;
}
.gw-reaction-pad.ready {background:#15803d;border-color:#4ade80;}
.gw-reaction-pad.fail {background:#7f1d1d;}
.gw-reaction-pad.done {background:#1e3a5f;}

.gw-scoreboard {
    display:flex;
    justify-content:center;
    gap:35px;
    margin:15px 0;
}
.gw-scoreboard strong {display:block;color:#38bdf8;font-size:28px;}
.gw-goal {
    max-width:470px;
    margin:20px auto;
    padding:20px 12px;
    border:8px solid white;
    border-bottom:12px solid #d1d5db;
    border-radius:8px 8px 3px 3px;
    background:repeating-linear-gradient(0deg,#164e63,#164e63 20px,#155064 21px);
    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:8px;
}
.gw-shot {
    min-height:95px;
    border:1px dashed rgba(255,255,255,.5);
    background:rgba(255,255,255,.08);
    border-radius:5px;
    color:white;
    font-size:17px;
    font-weight:800;
    cursor:pointer;
}
.gw-shot:hover {background:rgba(255,255,255,.25);}
.gw-puzzle {
    display:grid;
    grid-template-columns:repeat(3,minmax(65px,100px));
    gap:8px;
    justify-content:center;
    margin:20px auto;
}
.gw-tile {
    aspect-ratio:1;
    border:1px solid #6d55a8;
    border-radius:9px;
    background:linear-gradient(140deg,#4c1d95,#312e81);
    color:white;
    font-size:30px;
    font-weight:900;
    cursor:pointer;
}
.gw-tile.empty {background:#090914;border:1px dashed #34344b;cursor:default;}
@media(max-width:500px) {
    .gw-content {padding:18px 12px;}
    .gw-memory-grid {gap:7px;}
    .gw-ttt-grid {grid-template-columns:repeat(3,75px);}
    .gw-ttt-cell {width:75px;height:75px;}
    .gw-shot {min-height:75px;font-size:14px;}
}
`;

document.head.appendChild(modalStyle);

const gameModal = document.createElement("div");
gameModal.className = "gw-modal";
gameModal.setAttribute("aria-hidden", "true");

gameModal.innerHTML = `
    <div class="gw-dialog" role="dialog" aria-modal="true"
         aria-labelledby="gwTitle">
        <div class="gw-modal-header">
            <h2 id="gwTitle">GAMEWORLD</h2>
            <button class="gw-close" aria-label="Cerrar juego">×</button>
        </div>
        <div class="gw-content" id="gwGameContent"></div>
    </div>
`;

document.body.appendChild(gameModal);

const gameContent = document.getElementById("gwGameContent");
const gameTitle = document.getElementById("gwTitle");
let gameCleanup = null;

function closeGame() {
    if (typeof gameCleanup === "function") {
        gameCleanup();
        gameCleanup = null;
    }

    gameModal.classList.remove("is-open");
    gameModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

gameModal.querySelector(".gw-close").addEventListener("click", closeGame);

gameModal.addEventListener("click", event => {
    if (event.target === gameModal) closeGame();
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape" && gameModal.classList.contains("is-open")) {
        closeGame();
    }
});

function openGame(name) {
    if (typeof gameCleanup === "function") gameCleanup();

    gameCleanup = null;
    gameContent.innerHTML = "";
    gameModal.classList.add("is-open");
    gameModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    const titles = {
        snake: "🐍 SNAKE",
        memory: "🧠 MEMORY",
        tictactoe: "⭕ TRES EN RAYA",
        reaction: "⚡ REFLEJOS",
        soccer: "⚽ FÚTBOL",
        puzzle: "🧩 PUZZLE"
    };

    gameTitle.textContent = titles[name] || "GAMEWORLD";

    const games = {
        snake: renderSnake,
        memory: renderMemory,
        tictactoe: renderTicTacToe,
        reaction: renderReaction,
        soccer: renderSoccer,
        puzzle: renderPuzzle
    };

    if (games[name]) {
        games[name](gameContent);
    } else {
        gameContent.textContent = "Juego no encontrado.";
    }
}

document.querySelectorAll(".play-button").forEach(button => {
    button.addEventListener("click", () => {
        openGame(button.dataset.game);
    });
});


/* ---------- 1. SNAKE ---------- */

function renderSnake(root) {
    root.innerHTML = `
        <p class="gw-description">
            Usa las flechas del teclado o los controles para comer y crecer.
            ¡No choques con las paredes ni contigo mismo!
        </p>
        <div class="gw-score">Puntos: <span id="snakeScore">0</span></div>
        <canvas class="gw-snake-canvas" id="snakeCanvas"
                width="400" height="400"></canvas>
        <div class="gw-status" id="snakeStatus">Pulsa Empezar para jugar.</div>
        <button class="gw-btn" id="snakeStart">EMPEZAR</button>
        <button class="gw-btn secondary" id="snakeReset">REINICIAR</button>
        <div class="gw-controls">
            <span class="empty"></span>
            <button data-dir="up">↑</button>
            <span class="empty"></span>
            <button data-dir="left">←</button>
            <button data-dir="down">↓</button>
            <button data-dir="right">→</button>
        </div>
    `;

    const canvas = root.querySelector("#snakeCanvas");
    const ctx = canvas.getContext("2d");
    const scoreLabel = root.querySelector("#snakeScore");
    const status = root.querySelector("#snakeStatus");

    const size = 20;
    const cells = 20;

    let snake, direction, nextDirection, food, score;
    let timer = null;
    let running = false;

    function placeFood() {
        do {
            food = {
                x: Math.floor(Math.random() * cells),
                y: Math.floor(Math.random() * cells)
            };
        } while (snake.some(part => part.x === food.x && part.y === food.y));
    }

    function resetState() {
        clearInterval(timer);
        timer = null;
        running = false;
        snake = [{x:10,y:10},{x:9,y:10},{x:8,y:10}];
        direction = {x:1,y:0};
        nextDirection = {x:1,y:0};
        score = 0;
        scoreLabel.textContent = score;
        placeFood();
        status.textContent = "Pulsa Empezar para jugar.";
        draw();
    }

    function draw() {
        ctx.fillStyle = "#080d18";
        ctx.fillRect(0,0,400,400);

        ctx.strokeStyle = "rgba(255,255,255,.045)";
        for (let i=0;i<=400;i+=size) {
            ctx.beginPath();
            ctx.moveTo(i,0);
            ctx.lineTo(i,400);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0,i);
            ctx.lineTo(400,i);
            ctx.stroke();
        }

        ctx.fillStyle = "#fb7185";
        ctx.beginPath();
        ctx.arc(food.x*size+10,food.y*size+10,8,0,Math.PI*2);
        ctx.fill();

        snake.forEach((part,index) => {
            ctx.fillStyle = index === 0 ? "#a78bfa" : "#22c55e";
            ctx.fillRect(part.x*size+2,part.y*size+2,size-4,size-4);
        });
    }

    function tick() {
        direction = nextDirection;

        const head = {
            x: snake[0].x + direction.x,
            y: snake[0].y + direction.y
        };

        const ate = head.x === food.x && head.y === food.y;
        const bodyToCheck = ate ? snake : snake.slice(0,-1);

        const hitWall =
            head.x < 0 || head.x >= cells ||
            head.y < 0 || head.y >= cells;

        const hitBody = bodyToCheck.some(part =>
            part.x === head.x && part.y === head.y
        );

        if (hitWall || hitBody) {
            clearInterval(timer);
            running = false;
            status.textContent = "¡GAME OVER! Tu puntuación fue " + score + ".";
            return;
        }

        snake.unshift(head);

        if (ate) {
            score += 10;
            scoreLabel.textContent = score;

            if (snake.length === cells*cells) {
                clearInterval(timer);
                running = false;
                status.textContent = "¡INCREÍBLE! ¡Llenaste todo el tablero!";
                draw();
                return;
            }

            placeFood();
        } else {
            snake.pop();
        }

        draw();
    }

    function setDirection(dir) {
        const directions = {
            up:{x:0,y:-1},
            down:{x:0,y:1},
            left:{x:-1,y:0},
            right:{x:1,y:0}
        };

        const next = directions[dir];
        if (!next) return;

        if (next.x !== -direction.x || next.y !== -direction.y) {
            nextDirection = next;
        }
    }

    function onKey(event) {
        const keys = {
            ArrowUp:"up",
            ArrowDown:"down",
            ArrowLeft:"left",
            ArrowRight:"right"
        };

        if (keys[event.key]) {
            event.preventDefault();
            setDirection(keys[event.key]);
        }
    }

    function startGame() {
        resetState();
        running = true;
        status.textContent = "¡Vamos! Consigue la mayor puntuación.";
        timer = setInterval(tick,115);
    }

    root.querySelector("#snakeStart").addEventListener("click",startGame);
    root.querySelector("#snakeReset").addEventListener("click",startGame);

    root.querySelectorAll("[data-dir]").forEach(button => {
        button.addEventListener("click",() => setDirection(button.dataset.dir));
    });

    document.addEventListener("keydown",onKey);
    resetState();

    gameCleanup = () => {
        clearInterval(timer);
        document.removeEventListener("keydown",onKey);
    };
}


/* ---------- 2. MEMORY ---------- */

function renderMemory(root) {
    root.innerHTML = `
        <p class="gw-description">
            Encuentra las ocho parejas. ¡Memoriza dónde está cada símbolo!
        </p>
        <div class="gw-score" id="memoryScore">Parejas: 0/8 · Movimientos: 0</div>
        <div class="gw-memory-grid" id="memoryGrid"></div>
        <div class="gw-status" id="memoryStatus">¡Encuentra todas las parejas!</div>
        <button class="gw-btn" id="memoryReset">NUEVA PARTIDA</button>
    `;

    const icons = ["🍒","🚀","🐸","👾","🎧","🦄","⚽","💎"];
    const grid = root.querySelector("#memoryGrid");
    const scoreLabel = root.querySelector("#memoryScore");
    const status = root.querySelector("#memoryStatus");

    let deck = [];
    let first = null;
    let second = null;
    let locked = false;
    let matches = 0;
    let moves = 0;
    let timeouts = [];

    function later(callback,delay) {
        const id = setTimeout(callback,delay);
        timeouts.push(id);
        return id;
    }

    function shuffle(array) {
        const result = [...array];
        for (let i=result.length-1;i>0;i--) {
            const j = Math.floor(Math.random()*(i+1));
            [result[i],result[j]] = [result[j],result[i]];
        }
        return result;
    }

    function updateScore() {
        scoreLabel.textContent =
            `Parejas: ${matches}/8 · Movimientos: ${moves}`;
    }

    function newGame() {
        timeouts.forEach(clearTimeout);
        timeouts = [];
        deck = shuffle([...icons,...icons]);
        first = null;
        second = null;
        locked = false;
        matches = 0;
        moves = 0;
        status.textContent = "¡Encuentra todas las parejas!";
        updateScore();

        grid.innerHTML = deck.map((icon,index) => `
            <button class="gw-memory-card" data-index="${index}"
                    aria-label="Carta oculta">?</button>
        `).join("");
    }

    grid.addEventListener("click",event => {
        const card = event.target.closest(".gw-memory-card");
        if (!card || locked || card.classList.contains("is-flipped") ||
            card.classList.contains("is-matched")) return;

        const index = Number(card.dataset.index);
        card.textContent = deck[index];
        card.classList.add("is-flipped");
        card.setAttribute("aria-label",deck[index]);

        if (first === null) {
            first = card;
            return;
        }

        second = card;
        moves++;
        locked = true;
        updateScore();

        if (first.textContent === second.textContent) {
            first.classList.add("is-matched");
            second.classList.add("is-matched");
            matches++;
            first = null;
            second = null;
            locked = false;
            updateScore();

            if (matches === 8) {
                status.textContent =
                    `¡GANASTE! Lo lograste en ${moves} movimientos. 🏆`;
            }
        } else {
            later(() => {
                [first,second].forEach(item => {
                    item.textContent = "?";
                    item.classList.remove("is-flipped");
                    item.setAttribute("aria-label","Carta oculta");
                });
                first = null;
                second = null;
                locked = false;
            },850);
        }
    });

    root.querySelector("#memoryReset").addEventListener("click",newGame);
    newGame();

    gameCleanup = () => timeouts.forEach(clearTimeout);
}


/* ---------- 3. TRES EN RAYA ---------- */

function renderTicTacToe(root) {
    root.innerHTML = `
        <p class="gw-description">
            Dos jugadores, un tablero y un objetivo: conseguir tres en línea.
        </p>
        <div class="gw-score" id="tttStatus">Turno del jugador X</div>
        <div class="gw-ttt-grid" id="tttGrid">
            ${Array.from({length:9},(_,i) =>
                `<button class="gw-ttt-cell" data-cell="${i}"></button>`
            ).join("")}
        </div>
        <div class="gw-status" id="tttMessage">Jugador X comienza.</div>
        <button class="gw-btn" id="tttReset">REINICIAR PARTIDA</button>
    `;

    const grid = root.querySelector("#tttGrid");
    const status = root.querySelector("#tttStatus");
    const message = root.querySelector("#tttMessage");

    const wins = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    let board = Array(9).fill("");
    let player = "X";
    let ended = false;

    function reset() {
        board = Array(9).fill("");
        player = "X";
        ended = false;
        status.textContent = "Turno del jugador X";
        message.textContent = "Jugador X comienza.";

        grid.querySelectorAll(".gw-ttt-cell").forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("x","o");
        });
    }

    grid.addEventListener("click",event => {
        const cell = event.target.closest(".gw-ttt-cell");
        if (!cell || ended) return;

        const index = Number(cell.dataset.cell);
        if (board[index]) return;

        board[index] = player;
        cell.textContent = player;
        cell.classList.add(player.toLowerCase());

        const winner = wins.find(combo =>
            combo.every(position => board[position] === player)
        );

        if (winner) {
            ended = true;
            status.textContent = `¡Jugador ${player} gana!`;
            message.textContent = "¡Felicidades! 🏆";
            return;
        }

        if (board.every(Boolean)) {
            ended = true;
            status.textContent = "¡Empate!";
            message.textContent = "Nadie ganó esta vez. ¡Otra partida!";
            return;
        }

        player = player === "X" ? "O" : "X";
        status.textContent = `Turno del jugador ${player}`;
        message.textContent = `Ahora juega ${player}.`;
    });

    root.querySelector("#tttReset").addEventListener("click",reset);
    reset();
}


/* ---------- 4. REFLEJOS ---------- */

function renderReaction(root) {
    root.innerHTML = `
        <p class="gw-description">
            Pulsa EMPEZAR y espera. Cuando la pantalla se ponga verde,
            ¡haz clic lo más rápido posible!
        </p>
        <div class="gw-reaction-pad" id="reactionPad">
            PULSA EMPEZAR
        </div>
        <div class="gw-status" id="reactionStatus">
            Tu tiempo aparecerá aquí.
        </div>
        <button class="gw-btn" id="reactionStart">EMPEZAR</button>
    `;

    const pad = root.querySelector("#reactionPad");
    const status = root.querySelector("#reactionStatus");
    const start = root.querySelector("#reactionStart");

    let timeout = null;
    let waiting = false;
    let active = false;
    let startTime = 0;

    start.addEventListener("click",() => {
        clearTimeout(timeout);
        waiting = true;
        active = false;
        pad.className = "gw-reaction-pad";
        pad.textContent = "ESPERA AL VERDE...";
        status.textContent = "No pulses antes de tiempo.";

        const delay = 1500 + Math.random()*3500;

        timeout = setTimeout(() => {
            waiting = false;
            active = true;
            startTime = performance.now();
            pad.classList.add("ready");
            pad.textContent = "¡AHORA!";
        },delay);
    });

    pad.addEventListener("click",() => {
        if (waiting) {
            clearTimeout(timeout);
            waiting = false;
            active = false;
            pad.className = "gw-reaction-pad fail";
            pad.textContent = "¡DEMASIADO PRONTO!";
            status.textContent = "Espera a que aparezca el verde y vuelve a intentar.";
            return;
        }

        if (active) {
            const time = Math.round(performance.now()-startTime);
            active = false;
            pad.className = "gw-reaction-pad done";
            pad.textContent = time + " ms";
            status.textContent =
                time < 220 ? "¡INCREÍBLE! ¡Reflejos de campeón! ⚡" :
                time < 350 ? "¡Muy buen tiempo!" :
                "¡Buen intento! ¿Puedes hacerlo más rápido?";
        }
    });

    gameCleanup = () => clearTimeout(timeout);
}


/* ---------- 5. FÚTBOL ---------- */

function renderSoccer(root) {
    root.innerHTML = `
        <p class="gw-description">
            Tienes cinco tiros. Elige dónde patear y trata de vencer al portero.
        </p>
        <div class="gw-scoreboard">
            <div>GOLES<strong id="soccerGoals">0</strong></div>
            <div>TIROS<strong id="soccerKicks">0/5</strong></div>
        </div>
        <div class="gw-goal">
            <button class="gw-shot" data-shot="left">⬅ IZQUIERDA</button>
            <button class="gw-shot" data-shot="center">⬆ CENTRO</button>
            <button class="gw-shot" data-shot="right">DERECHA ➡</button>
        </div>
        <div class="gw-status" id="soccerStatus">
            ¡Elige dónde quieres patear!
        </div>
        <button class="gw-btn secondary" id="soccerReset">NUEVO PARTIDO</button>
    `;

    const goalsLabel = root.querySelector("#soccerGoals");
    const kicksLabel = root.querySelector("#soccerKicks");
    const status = root.querySelector("#soccerStatus");
    const shots = [...root.querySelectorAll(".gw-shot")];

    let goals = 0;
    let kicks = 0;
    let finished = false;

    function reset() {
        goals = 0;
        kicks = 0;
        finished = false;
        goalsLabel.textContent = "0";
        kicksLabel.textContent = "0/5";
        status.textContent = "¡Elige dónde quieres patear!";
        shots.forEach(button => button.disabled = false);
    }

    function shoot(direction) {
        if (finished) return;

        const directions = ["left","center","right"];
        const keeper = directions[Math.floor(Math.random()*3)];

        kicks++;

        if (direction === keeper) {
            status.textContent = "🧤 ¡EL PORTERO LO ATAJÓ!";
        } else {
            goals++;
            status.textContent = "⚽ ¡GOOOOOOL!";
        }

        goalsLabel.textContent = goals;
        kicksLabel.textContent = `${kicks}/5`;

        if (kicks === 5) {
            finished = true;
            shots.forEach(button => button.disabled = true);
            status.textContent += ` FINAL: ${goals} goles de 5 tiros. ${
                goals >= 4 ? "¡Eres una estrella! 🏆" :
                goals >= 2 ? "¡Buen partido!" : "¡A entrenar para la revancha!"
            }`;
        }
    }

    shots.forEach(button => {
        button.addEventListener("click",() => shoot(button.dataset.shot));
    });

    root.querySelector("#soccerReset").addEventListener("click",reset);
}


/* ---------- 6. PUZZLE ---------- */

function renderPuzzle(root) {
    root.innerHTML = `
        <p class="gw-description">
            Ordena los números del 1 al 8. El espacio vacío debe quedar al final.
            Pulsa una ficha junto al espacio para moverla.
        </p>
        <div class="gw-score">Movimientos: <span id="puzzleMoves">0</span></div>
        <div class="gw-puzzle" id="puzzleGrid"></div>
        <div class="gw-status" id="puzzleStatus">¡Ordena las fichas!</div>
        <button class="gw-btn" id="puzzleReset">MEZCLAR DE NUEVO</button>
    `;

    const grid = root.querySelector("#puzzleGrid");
    const movesLabel = root.querySelector("#puzzleMoves");
    const status = root.querySelector("#puzzleStatus");

    let board = [];
    let moves = 0;
    let finished = false;

    function neighbors(index) {
        const result = [];
        const row = Math.floor(index/3);
        const col = index%3;

        if (row > 0) result.push(index-3);
        if (row < 2) result.push(index+3);
        if (col > 0) result.push(index-1);
        if (col < 2) result.push(index+1);

        return result;
    }

    function isSolved() {
        return board.every((number,index) =>
            number === (index === 8 ? 0 : index+1)
        );
    }

    function draw() {
        grid.innerHTML = board.map((number,index) => `
            <button class="gw-tile ${number === 0 ? "empty" : ""}"
                    data-index="${index}"
                    ${number === 0 ? "disabled" : ""}>
                ${number === 0 ? "" : number}
            </button>
        `).join("");

        movesLabel.textContent = moves;
    }

    function shuffle() {
        board = [1,2,3,4,5,6,7,8,0];
        let blank = 8;
        let previousBlank = -1;

        for (let i=0;i<120;i++) {
            let options = neighbors(blank).filter(index => index !== previousBlank);
            const next = options[Math.floor(Math.random()*options.length)];

            [board[blank],board[next]] = [board[next],board[blank]];
            previousBlank = blank;
            blank = next;
        }

        moves = 0;
        finished = false;
        status.textContent = "¡Ordena las fichas!";
        draw();
    }

    grid.addEventListener("click",event => {
        const tile = event.target.closest(".gw-tile");
        if (!tile || finished) return;

        const index = Number(tile.dataset.index);
        const blank = board.indexOf(0);

        if (!neighbors(blank).includes(index)) return;

        [board[blank],board[index]] = [board[index],board[blank]];
        moves++;
        draw();

        if (isSolved()) {
            finished = true;
            status.textContent =
                `¡PUZZLE COMPLETADO! Lo resolviste en ${moves} movimientos. 🏆`;
        }
    });

    root.querySelector("#puzzleReset").addEventListener("click",shuffle);
    shuffle();
}


/* =========================================
   GAMEWORLD LISTO
========================================= */

console.log("🎮 GAMEWORLD iniciado correctamente.");
