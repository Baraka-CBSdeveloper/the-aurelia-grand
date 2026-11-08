
const menuToggle = document.querySelector("#menu-toggle");
const navbar = document.querySelector("#navbar");

// Open and close the mobile navigation
menuToggle.addEventListener("click", function () {
    navbar.classList.toggle("active");

    // Update the accessibility state
    const isOpen = navbar.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", isOpen);
});


const navLinks = document.querySelectorAll(".navbar a");

navLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
        const targetId = link.getAttribute("href");

        if (targetId.startsWith("#")) {
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                event.preventDefault();

                targetSection.scrollIntoView({
                    behavior: "smooth"
                });

                // Close the mobile menu after clicking a link
                navbar.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            }
        }
    });
});



const roomButtons = document.querySelectorAll(".room-inquire-button");
const roomType = document.querySelector("#room-type");
const bookingSection = document.querySelector("#reservations");

roomButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const selectedRoom = button.dataset.room;

        roomType.value = selectedRoom;

        bookingSection.scrollIntoView({
            behavior: "smooth"
        });
    });
});



// GALLERY LIGHTBOX

const galleryImages = document.querySelectorAll("#gallery img");

// Create the lightbox
const lightbox = document.createElement("div");
lightbox.classList.add("lightbox");

lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Close gallery">&times;</button>
    <img src="" alt="Enlarged gallery image">
`;

document.body.appendChild(lightbox);

const lightboxImage = lightbox.querySelector("img");
const closeButton = lightbox.querySelector(".lightbox-close");

// Open image when clicked
galleryImages.forEach(function (image) {
    image.addEventListener("click", function () {
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";
    });
});

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
}

closeButton.addEventListener("click", closeLightbox);

// Close when clicking outside the image
lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

// Close with Escape key
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeLightbox();
    }
});



 // BOOKING FORM VALIDATION AND WHATSAPP

const bookingForm = document.querySelector("#booking-form");

bookingForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.querySelector("#guest-name").value.trim();
    const email = document.querySelector("#guest-email").value.trim();
    const phone = document.querySelector("#guest-phone").value.trim();
    const room = document.querySelector("#room-type").value;
    const checkIn = document.querySelector("#check-in").value;
    const checkOut = document.querySelector("#check-out").value;
    const guests = document.querySelector("#guests").value;
    const requests = document.querySelector("#special-requests").value.trim();

    // Validate required fields
    if (!name || !email || !phone || !room || !checkIn || !checkOut || !guests) {
        alert("Please complete all required fields.");
        return;
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Validate dates
    if (checkOut <= checkIn) {
        alert("Check-out date must be after check-in date.");
        return;
    }

    // Prepare WhatsApp message
    const hotelWhatsApp = "254700024206";

    const message = `Hello The Aurelia Grand!

I would like to make a booking inquiry.

Guest Name: ${name}
Email: ${email}
Phone: ${phone}
Room Type: ${room}
Check-in: ${checkIn}
Check-out: ${checkOut}
Guests: ${guests}
Special Requests: ${requests || "None"}

Please contact me regarding availability and pricing.

Thank you!`;

    const whatsappURL = `https://wa.me/${hotelWhatsApp}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank");
});

// =========================================
// SCROLL REVEAL ANIMATIONS
// =========================================

const revealElements = document.querySelectorAll(`
    .section-heading,
    .about-content,
    .room-card,
    .experience-card,
    .dining-content,
    .gallery-grid img,
    .testimonial-card,
    .reservation-content,
    .contact-item,
    .footer-content
`);

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("is-visible");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.15
        }
    );

    revealElements.forEach(function (element, index) {

        element.classList.add("reveal");

        // Slight delay for a staggered appearance
        element.style.transitionDelay =
            `${(index % 4) * 100}ms`;

        revealObserver.observe(element);

    });

} else {

    // Fallback for older browsers
    revealElements.forEach(function (element) {
        element.classList.add("is-visible");
    });

}