"use strict";

/* ==========================================================
   DHANORIX MARKET
   Main Script
========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initializeLoadingScreen();
    initializeGameCards();
});

/* ==========================================================
   Loading Screen
========================================================== */

function initializeLoadingScreen() {
    const loadingScreen = document.getElementById("loadingScreen");

    if (!loadingScreen) {
        return;
    }

    window.addEventListener("load", () => {
        setTimeout(() => {
            loadingScreen.style.opacity = "0";
            loadingScreen.style.visibility = "hidden";
            loadingScreen.style.pointerEvents = "none";

            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 900);
    });
}

/* ==========================================================
   Game Card Interaction
========================================================== */

function initializeGameCards() {
    const cards = document.querySelectorAll(".game-card");

    if (!cards.length) {
        return;
    }

    const savedGame = localStorage.getItem("selectedGame");

    if (savedGame) {
        cards.forEach((card) => {
            if (card.dataset.game === savedGame) {
                card.classList.add("active");
            }
        });
    }

    cards.forEach((card) => {
        card.addEventListener("click", (event) => {
            event.preventDefault();

            cards.forEach((item) => {
                item.classList.remove("active");
            });

            card.classList.add("active");

            const selectedGame = card.dataset.game || "";

            localStorage.setItem("selectedGame", selectedGame);

            showToast(`Memilih ${selectedGame}...`);

            redirectWithFade("form.html");
        });
    });
}

/* ==========================================================
   Toast Notification
========================================================== */

function showToast(message) {
    const container = document.getElementById("toastContainer");

    if (!container) {
        return;
    }

    const toast = document.createElement("div");

    toast.className = "toast";
    toast.textContent = message;

    container.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.opacity = "1";
        toast.style.transform = "translateY(0)";
    });

    setTimeout(() => {
        toast.style.transition = "all .3s ease";
        toast.style.opacity = "0";
        toast.style.transform = "translateY(20px)";

        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 1800);
}

/* ==========================================================
   Page Transition
========================================================== */

function redirectWithFade(url) {
    document.body.style.transition = "opacity .35s ease";
    document.body.style.opacity = "0";

    setTimeout(() => {
        window.location.href = url;
    }, 350);
}