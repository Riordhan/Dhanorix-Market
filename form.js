"use strict";

/* ==========================================================
   DHANORIX MARKET
   form.js
   BAGIAN 1
   - Konfigurasi
   - Product Data
   - Ambil Game
   - Inisialisasi Element
   - Utility Function
========================================================== */

/* ==========================================================
   KONFIGURASI
========================================================== */

const WHATSAPP_NUMBER = "6285736428667"; // Ganti dengan nomor WhatsApp Admin

/* ==========================================================
   PRODUCT DATA
========================================================== */

const productData = {

    "Mobile Legends": {
        image: "assets/ml.png.jpg",
        server: true,
        nominal: [
            { name: "86 Diamonds", price: 20000 },
            { name: "172 Diamonds", price: 39000, best: true },
            { name: "257 Diamonds", price: 58000 },
            { name: "344 Diamonds", price: 77000 },
            { name: "429 Diamonds", price: 96000 },
            { name: "514 Diamonds", price: 115000 }
        ]
    },

    "Free Fire": {
        image: "assets/ff.jpeg",
        server: false,
        nominal: [
            { name: "70 Diamonds", price: 10000 },
            { name: "140 Diamonds", price: 19000, best: true },
            { name: "355 Diamonds", price: 47000 },
            { name: "720 Diamonds", price: 93000 },
            { name: "1450 Diamonds", price: 186000 }
        ]
    },

    "PUBG Mobile": {
        image: "assets/pubg.jpeg",
        server: false,
        nominal: [
            { name: "60 UC", price: 16000 },
            { name: "325 UC", price: 76000, best: true },
            { name: "660 UC", price: 149000 },
            { name: "1800 UC", price: 385000 }
        ]
    },

    "Blood Strike": {
        image: "assets/bs.jpeg",
        server: false,
        nominal: [
            { name: "100 Gold", price: 15000 },
            { name: "300 Gold", price: 42000, best: true },
            { name: "500 Gold", price: 68000 },
            { name: "1000 Gold", price: 132000 }
        ]
    },

    "Magic Chess": {
        image: "assets/mcgg.webp",
        server: false,
        nominal: [
            { name: "Weekly Pass", price: 29000, best: true },
            { name: "Monthly Pass", price: 76000 }
        ]
    },

    "FC Mobile": {
        image: "assets/fcmobile.png",
        server: false,
        nominal: [
            { name: "100 FC Point", price: 18000 },
            { name: "520 FC Point", price: 85000, best: true },
            { name: "1070 FC Point", price: 170000 }
        ]
    },

    "PES": {
        image: "assets/pes.jpeg",
        server: false,
        nominal: [
            { name: "130 Coin", price: 18000 },
            { name: "550 Coin", price: 76000, best: true },
            { name: "1040 Coin", price: 148000 }
        ]
    },

    "HOK": {
        image: "assets/hok.jpeg",
        server: false,
        nominal: [
            { name: "80 Token", price: 16000 },
            { name: "240 Token", price: 45000, best: true },
            { name: "400 Token", price: 73000 },
            { name: "800 Token", price: 145000 }
        ]
    }

};

/* ==========================================================
   PAYMENT DATA
========================================================== */

const paymentData = [

    {
        name: "QRIS"
    },

    {
        name: "DANA"
    },

    {
        name: "OVO"
    },

    {
        name: "GoPay"
    },

    {
        name: "ShopeePay"
    },

    {
        name: "Bank BCA"
    },

    {
        name: "Bank BRI"
    }

];

/* ==========================================================
   STATE
========================================================== */

const state = {

    game: localStorage.getItem("selectedGame") || "",

    nominal: null,

    payment: null

};

/* ==========================================================
   ELEMENT
========================================================== */

const gameImage = document.getElementById("gameImage");

const gameTitle = document.getElementById("gameTitle");

const nominalContainer = document.getElementById("nominalContainer");

const paymentContainer = document.getElementById("paymentContainer");

const userIdInput = document.getElementById("userId");

const serverIdInput = document.getElementById("serverId");

const summaryGame = document.getElementById("summaryGame");

const summaryUser = document.getElementById("summaryUser");

const summaryNominal = document.getElementById("summaryNominal");

const summaryPayment = document.getElementById("summaryPayment");

const summaryTotal = document.getElementById("summaryTotal");

const buyButton = document.getElementById("buyButton");

const toastContainer = document.getElementById("toastContainer");

/* ==========================================================
   VALIDASI GAME
========================================================== */

if (!productData[state.game]) {

    window.location.href = "index.html";

}

/* ==========================================================
   TAMPILKAN GAME
========================================================== */

gameTitle.textContent = state.game;

gameImage.src = productData[state.game].image;

gameImage.alt = state.game;

summaryGame.textContent = state.game;

/* ==========================================================
   FORMAT RUPIAH
========================================================== */

function formatRupiah(number) {

    return new Intl.NumberFormat("id-ID", {

        style: "currency",

        currency: "IDR",

        minimumFractionDigits: 0

    }).format(number);

}

/* ==========================================================
   TOAST
========================================================== */

function showToast(message) {

    const toast = document.createElement("div");

    toast.className = "toast";

    toast.textContent = message;

    toastContainer.appendChild(toast);

    requestAnimationFrame(() => {

        toast.style.opacity = "1";

        toast.style.transform = "translateY(0)";

    });

    setTimeout(() => {

        toast.style.opacity = "0";

        toast.style.transform = "translateY(20px)";

        setTimeout(() => {

            toast.remove();

        }, 300);

    }, 2500);

}

/* ==========================================================
   BAGIAN 2
   - Render Nominal
   - Render Payment
   - Update Ringkasan
========================================================== */

/* ==========================================================
   RENDER NOMINAL
========================================================== */

function renderNominal() {

    nominalContainer.innerHTML = "";

    const listNominal = productData[state.game].nominal;

    listNominal.forEach((item) => {

        const card = document.createElement("div");
        card.className = "nominal-card";

        const title = document.createElement("div");
        title.className = "nominal-title";
        title.textContent = item.name;

        const price = document.createElement("div");
        price.className = "nominal-price";
        price.textContent = formatRupiah(item.price);

        card.appendChild(title);
        card.appendChild(price);

        /* Best Seller Badge */

        if (item.best) {

            const badge = document.createElement("span");

            badge.className = "best-seller";

            badge.textContent = "BEST SELLER";

            card.appendChild(badge);

        }

        /* Klik Nominal */

        card.addEventListener("click", () => {

            document
                .querySelectorAll(".nominal-card")
                .forEach(element => {

                    element.classList.remove("active");

                });

            card.classList.add("active");

            state.nominal = item;

            updateSummary();

        });

        nominalContainer.appendChild(card);

    });

}

/* ==========================================================
   RENDER PAYMENT
========================================================== */

function renderPayment() {

    paymentContainer.innerHTML = "";

    paymentData.forEach((item) => {

        const card = document.createElement("div");

        card.className = "payment-card";

        const name = document.createElement("span");

        name.textContent = item.name;

        const icon = document.createElement("span");

        icon.textContent = "›";

        card.appendChild(name);

        card.appendChild(icon);

        card.addEventListener("click", () => {

            document
                .querySelectorAll(".payment-card")
                .forEach(element => {

                    element.classList.remove("active");

                });

            card.classList.add("active");

            state.payment = item.name;

            updateSummary();

        });

        paymentContainer.appendChild(card);

    });

}

/* ==========================================================
   UPDATE RINGKASAN
========================================================== */

function updateSummary() {

    const userId = userIdInput.value.trim();

    summaryUser.textContent = userId || "-";

    summaryNominal.textContent = state.nominal
        ? state.nominal.name
        : "-";

    summaryPayment.textContent = state.payment
        ? state.payment
        : "-";

    summaryTotal.textContent = state.nominal
        ? formatRupiah(state.nominal.price)
        : "Rp0";

}

/* ==========================================================
   UPDATE USER ID OTOMATIS
========================================================== */

userIdInput.addEventListener("input", updateSummary);

serverIdInput.addEventListener("input", updateSummary);

/* ==========================================================
   INISIALISASI
========================================================== */

renderNominal();

renderPayment();

updateSummary();

/* ==========================================================
   BAGIAN 3
   - Validasi Form
   - Redirect WhatsApp
   - Event Submit
========================================================== */

/* ==========================================================
   VALIDASI FORM
========================================================== */

function validateForm() {

    const userId = userIdInput.value.trim();

    if (userId === "") {

        showToast("Silakan masukkan User ID.");

        userIdInput.focus();

        return false;

    }

    if (!state.nominal) {

        showToast("Silakan pilih nominal top up.");

        return false;

    }

    if (!state.payment) {

        showToast("Silakan pilih metode pembayaran.");

        return false;

    }

    return true;

}

/* ==========================================================
   GENERATE PESAN WHATSAPP
========================================================== */

function createWhatsAppMessage() {

    const userId = userIdInput.value.trim();

    const serverId = serverIdInput.value.trim();

    const serverText = serverId !== ""
        ? serverId
        : "-";

    const message =
`Halo Admin Dhanorix Market.

Saya ingin melakukan top up game dengan detail berikut:

🎮 Game : ${state.game}
🆔 User ID : ${userId}
🌐 Server : ${serverText}
💎 Nominal : ${state.nominal.name}
💳 Pembayaran : ${state.payment}
💰 Total : ${formatRupiah(state.nominal.price)}

Mohon diproses.
Terima kasih.`;

    return encodeURIComponent(message);

}

/* ==========================================================
   REDIRECT KE WHATSAPP
========================================================== */

function redirectWhatsApp() {

    const message = createWhatsAppMessage();

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

    buyButton.disabled = true;

    buyButton.textContent = "Mengalihkan...";

    document.body.style.transition = "opacity .35s ease";
    document.body.style.opacity = "0";

    setTimeout(() => {

        window.location.href = url;

    }, 350);

}

/* ==========================================================
   SUBMIT FORM
========================================================== */

const topupForm = document.getElementById("topupForm");

topupForm.addEventListener("submit", function(event) {

    event.preventDefault();

    if (!validateForm()) {

        return;

    }

    showToast("Menghubungkan ke WhatsApp...");

    setTimeout(() => {

        redirectWhatsApp();

    }, 700);

});

/* ==========================================================
   UPDATE RINGKASAN SAAT HALAMAN DIBUKA
========================================================== */

updateSummary();