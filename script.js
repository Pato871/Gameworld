
/* ==========================================
   GAMEWORLD
   CLASSROOM 6X + PANTALLA COMPLETA
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const player = document.getElementById("externalPlayer");
    const frame = document.getElementById("gamesFrame");
    const fullscreenButton = document.getElementById("fullscreenButton");
    const playerMessage = document.querySelector(".player-message p");

    const classroomURL = "https://sites.google.com/view/classroom6x/";

    // Comprobar que los elementos existen
    if (!player || !frame || !fullscreenButton) {
        console.error("GAMEWORLD: No se encontró el reproductor.");
        return;
    }

    // Actualizar el texto del botón
    function updateFullscreenButton() {

        const current = document.fullscreenElement;

        const isFullscreen =
            current === player ||
            current === frame ||
            (current && player.contains(current));

        fullscreenButton.textContent = isFullscreen
            ? "✕ SALIR DE PANTALLA COMPLETA"
            : "⛶ PANTALLA COMPLETA";

        fullscreenButton.setAttribute(
            "aria-pressed",
            String(Boolean(isFullscreen))
        );
    }

    // Activar o desactivar pantalla completa
    async function toggleFullscreen() {

        try {

            const current = document.fullscreenElement;

            const isOurPlayer =
                current === player ||
                current === frame ||
                (current && player.contains(current));

            if (isOurPlayer) {

                await document.exitFullscreen();

            } else {

                if (player.requestFullscreen) {

                    await player.requestFullscreen();

                } else if (frame.requestFullscreen) {

                    await frame.requestFullscreen();

                } else {

                    showFallbackMessage();
                }

            }

        } catch (error) {

            console.error("Error de pantalla completa:", error);

            showFallbackMessage();

        }

    }

    // Mensaje alternativo
    function showFallbackMessage() {

        if (playerMessage) {

            playerMessage.textContent =
                "Tu navegador no permitió activar la pantalla completa. " +
                "Abre Classroom 6x directamente o utiliza F11 en tu computadora.";

        }

    }

    // Botón de pantalla completa
    fullscreenButton.addEventListener(
        "click",
        toggleFullscreen
    );

    // Detectar cambios de pantalla completa
    document.addEventListener(
        "fullscreenchange",
        updateFullscreenButton
    );

    // Compatibilidad adicional con algunos navegadores
    document.addEventListener(
        "webkitfullscreenchange",
        updateFullscreenButton
    );

    // Confirmar que la conexión está configurada
    console.log("GAMEWORLD iniciado correctamente.");
    console.log("Biblioteca externa:", classroomURL);

    updateFullscreenButton();

});
