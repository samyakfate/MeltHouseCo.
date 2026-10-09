
"use strict";

// EDIT PRODUCT DETAILS HERE. Add a product by copying an object below,
// changing its details, and using an image filename from the ../img folder.
// Keep the image path relative to this website folder.
const products = [
    {
        name: "Small Flower",
        price: "₹49",
        description: "A hand-finished floral candle with delicate petal details.",
        image: "../img/WhatsApp Image 2026-10-09 at 12.55.24 PM (1).jpeg",
        category: "Floral favourite"
    },
    {
        name: "Floral Tealights",
        price: "Pack of 5 · ₹75",
        description: "Flower-shaped tealights, made for a little moment of warmth.",
        image: "../img/WhatsApp Image 2026-10-09 at 12.55.24 PM.jpeg",
        category: "Made to gift"
    },
    {
        name: "Large Flower",
        price: "₹99",
        description: "Sunny sculpted blooms gathered in a golden keepsake tin.",
        image: "../img/WhatsApp Image 2026-10-09 at 12.55.25 PM (1).jpeg",
        category: "Brighten their day"
    },
    {
        name: "Flower Jar",
        price: "₹99",
        description: "A soft rose design, poured in a glass vessel.",
        image: "../img/WhatsApp Image 2026-10-09 at 12.55.31 PM (2).jpeg",
        category: "Hand-poured"
    },
    {
        name: "Modak Candle",
        price: "₹25 each · packs from ₹99",
        description: "Festive modak-shaped candles for thoughtful celebrations.",
        image: "../img/WhatsApp Image 2026-10-09 at 12.55.32 PM (1).jpeg",
        category: "Festive collection"
    },
    {
        name: "Laddu Candle",
        price: "₹25 each · packs from ₹99",
        description: "A joyful festive-inspired candle finished with gold accents.",
        image: "../img/WhatsApp Image 2026-10-09 at 12.55.33 PM (1).jpeg",
        category: "Festive collection"
    },
    {
        name: "Heart Tealights",
        price: "Pack of 5 · ₹59",
        description: "Little heart-shaped lights for a lovely evening in.",
        image: "../img/WhatsApp Image 2026-10-09 at 12.55.30 PM.jpeg"
    },
    {
        name: "Mini Bouquet",
        price: "₹75",
        description: "Sculpted flower candles in a palette of soft, happy colours.",
        image: "../img/WhatsApp Image 2026-10-09 at 12.55.31 PM.jpeg"
    },
    {
        name: "Diya Candle",
        price: "₹20 each · packs from ₹69",
        description: "A warm, festive set of handmade diya candles for gifting.",
        image: "../img/WhatsApp Image 2026-10-09 at 12.55.25 PM.jpeg",
        category: "Festive favourite"
    }
    // ADD NEW PRODUCTS HERE: copy one object, add a comma above it,
    // then update name, price, description, image, and optional category.
];

document.addEventListener("DOMContentLoaded", () => {
    // Render all product cards from the array above; no HTML edits needed.
    const productGrid = document.querySelector("#product-grid");
    if (productGrid) {
        if (products.length === 0) {
            productGrid.innerHTML = '<p class="empty-products">Our collection is being refreshed. Please check back soon.</p>';
        } else {
            productGrid.innerHTML = products.map((product) => `
                <article class="product-card">
                    <a class="product-image" href="#contact" aria-label="Enquire about ${escapeHTML(product.name)}">
                        <img src="${escapeHTML(product.image)}" alt="${escapeHTML(product.name)}" loading="lazy">
                        ${product.category ? `<span class="product-tag">${escapeHTML(product.category)}</span>` : ""}
                    </a>
                    <div class="product-details">
                        <div><p class="product-category">HANDMADE CANDLE</p><h3>${escapeHTML(product.name)}</h3></div>
                        <p class="product-price">${escapeHTML(product.price)}</p>
                    </div>
                    <p class="product-description">${escapeHTML(product.description)}</p>
                    <a class="product-link" href="#contact">Enquire to order <span aria-hidden="true">↗</span></a>
                </article>`).join("");
        }
    }

    // Mobile navigation
    const menuToggle = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".navigation");

    function closeMenu() {
        if (!menuToggle || !navigation) return;

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        navigation.classList.remove("is-open");
    }

    if (menuToggle && navigation) {
        menuToggle.addEventListener("click", () => {
            const isOpen =
                menuToggle.getAttribute("aria-expanded") === "true";

            menuToggle.setAttribute("aria-expanded", String(!isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Open navigation" : "Close navigation"
            );

            navigation.classList.toggle("is-open", !isOpen);
        });

        navigation.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMenu();
            }
        });

        // Close the menu if the viewport changes to desktop.
        window.matchMedia("(min-width: 900px)")
            .addEventListener("change", closeMenu);
    }

    // Dynamic copyright year
    const yearElement = document.querySelector("#year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Contact form: prepare a WhatsApp enquiry
    const contactForm = document.querySelector("#contact-form");
    const formStatus = document.querySelector("#form-status");

    if (contactForm && formStatus) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();

            if (!contactForm.reportValidity()) {
                return;
            }

            const formData = new FormData(contactForm);

            const name = String(formData.get("name") || "").trim();
            const email = String(formData.get("email") || "").trim();
            const interest = String(formData.get("interest") || "").trim();
            const message = String(formData.get("message") || "").trim();

            const enquiry = [
                "Hello Melt House Co.! I'd love to enquire about your candles.",
                "",
                `Name: ${name}`,
                `Email: ${email}`,
                `Interested in: ${interest}`,
                `Message: ${message}`
            ].join("\n");

            const whatsappUrl =
                "https://wa.me/917387474287?text=" +
                encodeURIComponent(enquiry);

            formStatus.textContent =
                "Opening WhatsApp with your enquiry. Please review and send your message there.";

            const whatsappWindow = window.open(
                whatsappUrl,
                "_blank",
                "noopener,noreferrer"
            );

            if (!whatsappWindow) {
                formStatus.textContent =
                    "If WhatsApp did not open, use the WhatsApp link above to contact us.";
            }
        });
    }
});

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[character]);
}
