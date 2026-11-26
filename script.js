
/* ==========================================
   GAMEWORLD
   20 JUEGOS EXTERNOS + PLAYER
========================================== */

const GAMES_BASE =
    "https://classroom6-games.gitlab.io/game/";


/* ==========================================
   BIBLIOTECA DE 20 JUEGOS
========================================== */

const games = [

    {
        title: "Drive Mad",
        category: "carreras",
        emoji: "🚙",
        description: "Conduce y supera obstáculos imposibles.",
        url: GAMES_BASE + "drive-mad.html"
    },

    {
        title: "Among Us",
        category: "multiplayer",
        emoji: "🚀",
        description: "Descubre al impostor y sobrevive.",
        url: GAMES_BASE + "among-us.html"
    },

    {
        title: "Basket Random",
        category: "deportes",
        emoji: "🏀",
        description: "Partidos de baloncesto llenos de locura.",
        url: GAMES_BASE + "basket-random.html"
    },

    {
        title: "Basketball Stars",
        category: "deportes",
        emoji: "🏆",
        description: "Demuestra tu talento en la cancha.",
        url: GAMES_BASE + "basketball-stars.html"
    },

    {
        title: "Fireboy and Watergirl",
        category: "plataformas",
        emoji: "🔥",
        description: "Resuelve templos con dos personajes.",
        url: GAMES_BASE +
            "fireboy-and-watergirl-1-forest-temple.html"
    },

    {
        title: "Geometry Dash",
        category: "plataformas",
        emoji: "🟪",
        description: "Salta obstáculos siguiendo el ritmo.",
        url: GAMES_BASE + "geometry-dash.html"
    },

    {
        title: "Cluster Rush",
        category: "accion",
        emoji: "🚛",
        description: "Salta entre camiones en movimiento.",
        url: GAMES_BASE + "cluster-rush.html"
    },

    {
        title: "Madalin Stunt Cars 2",
        category: "carreras",
        emoji: "🏎️",
        description: "Carreras y acrobacias con superautos.",
        url: GAMES_BASE + "madalin-stunt-cars-2.html"
    },

    {
        title: "Ducklings.io",
        category: "arcade",
        emoji: "🦆",
        description: "Rescata patitos y construye tu nido.",
        url: GAMES_BASE + "ducklingsio.html"
    },

    {
        title: "Dreadhead Parkour",
        category: "plataformas",
        emoji: "🏃",
        description: "Supera recorridos con parkour.",
        url: GAMES_BASE + "dreadhead-parkour.html"
    },

    {
        title: "Drift Boss",
        category: "carreras",
        emoji: "🏁",
        description: "Domina las curvas y no caigas.",
        url: GAMES_BASE + "drift-boss.html"
    },

    {
        title: "Duo Vikings",
        category: "multiplayer",
        emoji: "⚔️",
        description: "Aventura cooperativa de dos jugadores.",
        url: GAMES_BASE + "duo-vikings.html"
    },

    {
        title: "Minecraft Builder",
        category: "puzzle",
        emoji: "🧱",
        description: "Construye y crea tu propio mundo.",
        url: GAMES_BASE + "minecraft-builder.html"
    },

    {
        title: "Hoppenhelm",
        category: "accion",
        emoji: "🛡️",
        description: "Atraviesa mazmorras llenas de peligros.",
        url: GAMES_BASE + "hoppenhelm.html"
    },

    {
        title: "Marble Dash",
        category: "arcade",
        emoji: "🔵",
        description: "Controla la canica y supera los desafíos.",
        url: GAMES_BASE + "marble-dash.html"
    },

    {
        title: "Drift Hunters",
        category: "carreras",
        emoji: "🏎️",
        description: "Derrapa y controla coches deportivos.",
        url: GAMES_BASE + "drift-hunters.html"
    },

    {
        title: "Jigsaw Puzzle",
        category: "puzzle",
        emoji: "🧩",
        description: "Arma imágenes pieza por pieza.",
        url: GAMES_BASE + "jigsaw-photo-puzzle-summer.html"
    },

    {
        title: "Slime Road",
        category: "arcade",
        emoji: "🟢",
        description: "Avanza y supera obstáculos.",
        url: GAMES_BASE + "slime-road.html"
    },

    {
        title: "Crossy Road",
        category: "arcade",
        emoji: "🐔",
        description: "Cruza carreteras y evita el tráfico.",
        url: GAMES_BASE + "crossy-road.html"
    },

    {
        title: "Throw It Higher",
        category: "arcade",
        emoji: "🚀",
        description: "Lanza objetos cada vez más alto.",
        url: GAMES_BASE + "throw-it-higher.html"
    }

];


/* ==========================================
   ELEMENTOS DE LA PÁGINA
========================================== */

const gameGrid = document.getElementById("gameGrid");
const gameSearch = document.getElementById("gameSearch");
const emptyMessage = document.getElementById("emptyMessage");

const gameModal = document.getElementById("gameModal");
const gameWindow = document.getElementById("gameWindow");
const gameFrame = document.getElementById("gameFrame");

const gameTitle = document.getElementById("gameTitle");
const fullscreenButton = document.getElementById("fullscreenButton");
const closeButton = document.getElementById("closeGame");
const openExternal = document.getElementById("openExternal");

const categoryButtons = [
    ...document.querySelectorAll(".category")
];

let currentCategory = "todos";


/* ==========================================
   CATEGORÍAS
========================================== */

const categoryNames = {
    carreras: "CARRERAS",
    accion: "ACCIÓN",
    deportes: "DEPORTES",
    plataformas: "PLATAFORMAS",
    puzzle: "PUZZLE",
    arcade: "ARCADE",
    multiplayer: "MULTIJUGADOR"
};


/* ==========================================
   CREAR LAS TARJETAS
========================================== */

function renderGames(list) {

    gameGrid.innerHTML = list.map(game => {

        const index = games.indexOf(game) + 1;

        return `
            <article class="game-card">

                <div class="game-art art-${index}">

                    <span class="game-emoji">
                        ${game.emoji}
                    </span>

                </div>

                <div class="game-info">

                    <span class="game-category">
                        ${categoryNames[game.category]}
                    </span>

                    <h3>
                        ${game.title}
                    </h3>

                    <p>
                        ${game.description}
                    </p>

                    <button
                        class="play-button"
                        data-index="${index - 1}">

                        JUGAR AHORA →

                    </button>

                </div>

            </article>
        `;

    }).join("");

    emptyMessage.style.display =
        list.length === 0 ? "block" : "none";
}


/* ==========================================
   BUSCADOR Y FILTROS
========================================== */

function filterGames() {

    const search = gameSearch.value
        .toLowerCase()
        .trim();

    const filtered = games.filter(game => {

        const matchesCategory =
            currentCategory === "todos" ||
            game.category === currentCategory;

        const matchesSearch =
            game.title.toLowerCase().includes(search) ||
            game.description.toLowerCase().includes(search) ||
            game.category.toLowerCase().includes(search);

        return matchesCategory && matchesSearch;

    });

    renderGames(filtered);
}


gameSearch.addEventListener("input", filterGames);


categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        currentCategory = button.dataset.filter;

        filterGames();

    });

});


/* ==========================================
   ABRIR UN JUEGO
========================================== */

function openGame(index) {

    const game = games[index];

    if (!game) return;

    gameTitle.textContent = game.title;

    openExternal.href = game.url;

    gameFrame.title = game.title;

    // Mostrar reproductor
    gameModal.classList.add("is-open");

    gameModal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    // Cargar el juego original
    gameFrame.src = game.url;

    fullscreenButton.textContent =
        "⛶ PANTALLA COMPLETA";

}


gameGrid.addEventListener("click", event => {

    const button = event.target.closest(".play-button");

    if (!button) return;

    const index = Number(button.dataset.index);

    openGame(index);

});


/* ==========================================
   CERRAR JUEGO
========================================== */

async function closeGame() {

    if (document.fullscreenElement) {

        try {
            await document.exitFullscreen();
        } catch (error) {
            console.warn("No se pudo salir de pantalla completa.");
        }

    }

    gameModal.classList.remove("is-open");

    gameModal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

    // Detener el juego al cerrar
    gameFrame.src = "about:blank";

    fullscreenButton.textContent =
        "⛶ PANTALLA COMPLETA";

}


closeButton.addEventListener("click", closeGame);


gameModal.addEventListener("click", event => {

    if (event.target === gameModal) {
        closeGame();
    }

});


document.addEventListener("keydown", event => {

    if (
        event.key === "Escape" &&
        gameModal.classList.contains("is-open") &&
        !document.fullscreenElement
    ) {
        closeGame();
    }

});


/* ==========================================
   PANTALLA COMPLETA
========================================== */

async function activateFullscreen() {

    try {

        if (document.fullscreenElement) {

            await document.exitFullscreen();

        } else {

            // Expandir el reproductor completo
            await gameWindow.requestFullscreen();

        }

    } catch (error) {

        console.error("Pantalla completa no disponible:", error);

        // Alternativa: intentar con el iframe
        try {

            await gameFrame.requestFullscreen();

        } catch (fallbackError) {

            openExternal.click();

        }

    }

}


fullscreenButton.addEventListener(
    "click",
    activateFullscreen
);


document.addEventListener("fullscreenchange", () => {

    if (document.fullscreenElement) {

        fullscreenButton.textContent =
            "✕ SALIR DE PANTALLA COMPLETA";

    } else {

        fullscreenButton.textContent =
            "⛶ PANTALLA COMPLETA";

    }

});


/* ==========================================
   INICIAR GAMEWORLD
========================================== */

renderGames(games);

console.log("🎮 GAMEWORLD iniciado.");
console.log("Juegos disponibles:", games.length);
console.log("Biblioteca Classroom 6x conectada.");
