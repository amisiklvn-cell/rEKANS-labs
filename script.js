"use strict";

/* =========================================
   rEKANS lab's — MAIN JAVASCRIPT
   ========================================= */


/* FOOTER YEAR */

const currentYear = document.getElementById("current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* DAILY ROTATING VISITOR WELCOME SCREEN */

const welcomeScreen = document.getElementById("welcome-screen");
const welcomeTitle = document.getElementById("welcome-title");
const welcomeMessage = document.getElementById("welcome-message");
const welcomeButton = document.getElementById("welcome-continue");

const welcomeDateKey = "rekansLabsWelcomeDate";

const dailyWelcomes = [
    {
        title: "Welcome to rEKANS lab's!",
        message: "Explore digital creations from rEKANS and independent creators."
    },
    {
        title: "Discover Something New!",
        message: "Your next digital discovery could be waiting here."
    },
    {
        title: "Ideas Become Creations!",
        message: "Explore apps, software and useful digital products."
    },
    {
        title: "Welcome, Explorer!",
        message: "Discover digital products from different creators."
    },
    {
        title: "Create. Share. Discover.",
        message: "A place where digital creations can be explored and shared."
    },
    {
        title: "Technology Meets Creativity!",
        message: "Explore what developers and creators are building."
    },
    {
        title: "Your Digital Discovery Starts Here!",
        message: "Find useful digital products and interesting creations."
    },
    {
        title: "Keep Exploring!",
        message: "There is always something new to discover."
    },
    {
        title: "Welcome Back!",
        message: "Explore the latest creations featured on rEKANS lab's."
    },
    {
        title: "Discover Digital Possibilities!",
        message: "Explore products, tools and creations from independent developers."
    },
    {
        title: "A Place for Digital Creations!",
        message: "Discover ideas developed by creators."
    },
    {
        title: "Think. Build. Share.",
        message: "Every great digital product starts with an idea."
    },
    {
        title: "Explore New Creations!",
        message: "Find something useful, creative or interesting today."
    },
    {
        title: "Your Curiosity Matters!",
        message: "Explore digital products and discover new possibilities."
    },
    {
        title: "Welcome to Our Digital Space!",
        message: "Discover creations from rEKANS and the creator community."
    },
    {
        title: "Build Something Amazing!",
        message: "Every creation has a story and an idea behind it."
    },
    {
        title: "Digital Creativity Lives Here!",
        message: "Explore applications, software and other digital products."
    },
    {
        title: "Discover. Explore. Create.",
        message: "Find digital creations worth exploring."
    },
    {
        title: "New Ideas, New Possibilities!",
        message: "Explore the work of independent digital creators."
    },
    {
        title: "Thanks for Visiting!",
        message: "We appreciate your visit to rEKANS lab's."
    }
];


function getLocalDateKey() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}


function hasSeenWelcomeToday(today) {
    const savedDates = [];

    try {
        savedDates.push(localStorage.getItem(welcomeDateKey));
    } catch (error) {
        // Continue with cookie fallback.
    }

    try {
        const prefix = welcomeDateKey + "=";

        const cookie = document.cookie
            .split("; ")
            .find((item) => item.startsWith(prefix));

        if (cookie) {
            savedDates.push(
                decodeURIComponent(cookie.slice(prefix.length))
            );
        }
    } catch (error) {
        // Ignore unavailable or invalid cookies.
    }

    return savedDates.includes(today);
}


function saveWelcomeDate(today) {
    try {
        localStorage.setItem(welcomeDateKey, today);
    } catch (error) {
        // Cookie fallback below.
    }

    try {
        document.cookie =
            welcomeDateKey + "=" + encodeURIComponent(today) +
            "; max-age=31536000; path=/; SameSite=Lax";
    } catch (error) {
        // The welcome screen can still work without cookies.
    }
}


if (welcomeScreen && welcomeTitle && welcomeMessage && welcomeButton) {
    const today = getLocalDateKey();

    if (!hasSeenWelcomeToday(today)) {
        const now = new Date();

        const dayNumber = Math.floor(
            Date.UTC(
                now.getFullYear(),
                now.getMonth(),
                now.getDate()
            ) / 86400000
        );

        const messageIndex = dayNumber % dailyWelcomes.length;
        const welcome = dailyWelcomes[messageIndex];

        welcomeTitle.textContent = welcome.title;
        welcomeMessage.textContent = welcome.message;
        welcomeButton.textContent = "Start Exploring";

        welcomeScreen.hidden = false;
        document.body.classList.add("welcome-active");

        saveWelcomeDate(today);
    }
}


if (welcomeScreen && welcomeButton) {
    function closeWelcome() {
        welcomeScreen.hidden = true;
        document.body.classList.remove("welcome-active");
    }

    welcomeButton.addEventListener("click", closeWelcome);

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !welcomeScreen.hidden) {
            closeWelcome();
        }
    });
}


/* MOBILE NAVIGATION MENU */

const menuToggle = document.getElementById("menu-toggle");
const navigation = document.getElementById("site-navigation");


function closeNavigation() {
    if (!menuToggle || !navigation) return;

    navigation.classList.remove("is-open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute(
        "aria-label",
        "Open navigation menu"
    );
}


if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("is-open");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );
    });

    navigation.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeNavigation);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeNavigation();
        }
    });
}


/* LIVE PRODUCT SEARCH */

const searchForm = document.getElementById("site-search-form");
const searchInput = document.getElementById("site-search");
const clearButton = document.getElementById("clear-search");
const searchStatus = document.getElementById("search-status");
const noResults = document.getElementById("no-results");


function filterCatalog() {
    if (!searchInput || !searchStatus || !noResults) return;

    const query = searchInput.value.trim().toLowerCase();

    const cards = document.querySelectorAll(
        "#apps-container .catalog-card, #tools-container .catalog-card"
    );

    let matchCount = 0;

    cards.forEach((card) => {
        const content = card.textContent.toLowerCase();
        const matches = content.includes(query);

        card.hidden = query !== "" && !matches;

        if (matches) {
            matchCount++;
        }
    });

    if (query === "") {
        searchStatus.textContent = "";
        noResults.hidden = true;
        return;
    }

    searchStatus.textContent =
        `${matchCount} result${matchCount === 1 ? "" : "s"} found.`;

    noResults.hidden = matchCount !== 0;
}


if (searchInput) {
    searchInput.addEventListener("input", filterCatalog);
}


if (searchForm) {
    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        filterCatalog();
    });
}


if (clearButton && searchInput) {
    clearButton.addEventListener("click", () => {
        searchInput.value = "";

        filterCatalog();

        searchInput.focus();
    });
}


/* ACTIVE NAVIGATION SECTION */

const navigationLinks = document.querySelectorAll(".navigation a");

/* Includes the new Submit section. */
const sections = document.querySelectorAll(
    "#home, #apps, #tools, #submit, #about"
);


if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                navigationLinks.forEach((link) => {
                    const isActive =
                        link.getAttribute("href") ===
                        `#${entry.target.id}`;

                    if (isActive) {
                        link.setAttribute("aria-current", "location");
                    } else {
                        link.removeAttribute("aria-current");
                    }
                });
            });
        },
        {
            rootMargin: "-30% 0px -60% 0px"
        }
    );

    sections.forEach((section) => {
        observer.observe(section);
    });
}


/* VISITOR LOCAL CLOCK */

(() => {
    const clockElement = document.getElementById("kenya-clock");
    const dateElement = document.getElementById("kenya-date");

    if (!clockElement || !dateElement) return;

    function updateLocalClock() {
        const now = new Date();

        clockElement.textContent =
            new Intl.DateTimeFormat(undefined, {
                hour: "2-digit",
                minute: "2-digit",
                hourCycle: "h23"
            }).format(now);

        dateElement.textContent =
            new Intl.DateTimeFormat(undefined, {
                weekday: "short",
                day: "numeric",
                month: "short",
                year: "numeric"
            }).format(now);
    }

    updateLocalClock();

    setInterval(updateLocalClock, 1000);
})();
