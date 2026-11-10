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
const siteHeader = menuToggle
    ? menuToggle.closest(".header")
    : null;

function closeNavigation() {
    if (!menuToggle || !navigation) return;

    navigation.classList.remove("is-open");
    menuToggle.classList.remove("is-active");

    if (siteHeader) {
        siteHeader.classList.remove("menu-open");
    }

    document.body.classList.remove("menu-open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
}

if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
        const isOpen = !navigation.classList.contains("is-open");

        if (isOpen) {
            navigation.classList.add("is-open");
            menuToggle.classList.add("is-active");

            if (siteHeader) {
                siteHeader.classList.add("menu-open");
            }

            document.body.classList.add("menu-open");
        } else {
            closeNavigation();
        }

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
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
    "#home, #apps, #tools, #submit, #feedback, #about"
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

/* REKANS FEEDBACK FEATURE V1 */

const feedbackForm = document.getElementById("feedback-form");

if (feedbackForm) {
    feedbackForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!feedbackForm.reportValidity()) return;

        const formData = new FormData(feedbackForm);

        const name = String(formData.get("name") || "").trim();
        const rating = String(formData.get("rating") || "");
        const category = String(formData.get("category") || "");
        const message = String(formData.get("message") || "").trim();

        const subject = "Website Feedback - rEKANS Lab's";

        const body = [
            "Hello rEKANS,",
            "",
            "I would like to share feedback about rEKANS Lab's.",
            "",
            "Name: " + (name || "Not provided"),
            "Rating: " + rating,
            "Category: " + category,
            "",
            "Feedback:",
            message,
            "",
            "Thank you."
        ].join("\n");

        const recipient = "amisiklvn@gmail.com";

        const query =
            "to=" + encodeURIComponent(recipient) +
            "&subject=" + encodeURIComponent(subject) +
            "&body=" + encodeURIComponent(body);

        const gmailIntent =
            "intent://compose?" + query +
            "#Intent;scheme=mailto;package=com.google.android.gm;end";

        const gmailWeb =
            "https://mail.google.com/mail/?view=cm&fs=1&" + query;

        const status = document.getElementById("feedback-status");

        if (status) {
            status.textContent =
                "Opening Gmail. If it does not open, use the fallback link below.";

            const fallback = document.createElement("a");
            fallback.href = gmailWeb;
            fallback.textContent = "Open Gmail in your browser";
            fallback.target = "_blank";
            fallback.rel = "noopener noreferrer";

            status.appendChild(document.createTextNode(" "));
            status.appendChild(fallback);
        }

        try {
            sessionStorage.setItem("rekans_feedback_waiting", "yes");
        } catch (error) {
            console.warn("Feedback session storage unavailable.");
        }

        window.location.href = gmailIntent;
    });
}


/* REKANS FEEDBACK RESET AFTER GMAIL RETURN */

function resetFeedbackAfterGmailReturn() {
    let waiting = false;

    try {
        waiting = sessionStorage.getItem("rekans_feedback_waiting") === "yes";
    } catch (error) {
        return;
    }

    if (!waiting || document.visibilityState !== "visible") return;

    sessionStorage.removeItem("rekans_feedback_waiting");

    const form = document.getElementById("feedback-form");
    const status = document.getElementById("feedback-status");

    if (form) form.reset();

    if (status) {
        status.textContent =
            "Welcome back. Your feedback form is ready for another message.";
    }
}

document.addEventListener(
    "visibilitychange",
    resetFeedbackAfterGmailReturn
);

window.addEventListener(
    "pageshow",
    resetFeedbackAfterGmailReturn
);



/* REKANS APP CATALOGUE SYSTEM V1 */

(() => {
    const container = document.getElementById("apps-container");

    if (!container) return;

    const cataloguePath = "apps/apps.json";

    function safeLocalPath(value, extension) {
        if (typeof value !== "string") return null;

        const path = value.trim();

        if (
            !path.startsWith("apps/") ||
            path.startsWith("//") ||
            path.includes("\\") ||
            path.includes("?") ||
            path.includes("#") ||
            path.split("/").some(part => part === "." || part === "..") ||
            !path.toLowerCase().endsWith(extension)
        ) {
            return null;
        }

        return path;
    }

    function createTextElement(tag, className, value) {
        const element = document.createElement(tag);

        if (className) element.className = className;

        element.textContent = String(value);

        return element;
    }

    function createAppCard(app) {
        if (
            !app ||
            typeof app.name !== "string" ||
            typeof app.version !== "string" ||
            typeof app.description !== "string" ||
            typeof app.fileSize !== "string"
        ) {
            return null;
        }

        const apkPath = safeLocalPath(app.apk, ".apk");

        if (!apkPath) return null;

        const card = document.createElement("article");
        card.className = "catalog-card app-catalog-card";

        const header = document.createElement("div");
        header.className = "app-card-header";

        const iconPath = safeLocalPath(app.icon, ".png");

        if (iconPath) {
            const icon = document.createElement("img");

            icon.className = "app-card-icon";
            icon.src = iconPath;
            icon.alt = "";
            icon.loading = "lazy";
            icon.width = 72;
            icon.height = 72;

            header.appendChild(icon);
        } else {
            const placeholder = createTextElement(
                "span",
                "app-card-icon app-card-icon-placeholder",
                app.name.trim().charAt(0).toUpperCase()
            );

            placeholder.setAttribute("aria-hidden", "true");
            header.appendChild(placeholder);
        }

        const heading = document.createElement("div");
        heading.className = "app-card-heading";

        heading.appendChild(
            createTextElement("h3", "", app.name.trim())
        );

        heading.appendChild(
            createTextElement(
                "p",
                "app-card-version",
                "Version " + app.version.trim()
            )
        );

        header.appendChild(heading);
        card.appendChild(header);

        card.appendChild(
            createTextElement(
                "p",
                "app-card-description",
                app.description.trim()
            )
        );

        const metadata = document.createElement("p");
        metadata.className = "app-card-metadata";

        const platform = typeof app.platform === "string"
            ? app.platform.trim()
            : "Android";

        metadata.textContent =
            platform + " · " + app.fileSize.trim();

        card.appendChild(metadata);

        const download = document.createElement("a");

        download.className = "app-download-button";
        download.href = apkPath;
        download.download = "";
        download.textContent = "Download APK";
        download.setAttribute(
            "aria-label",
            "Download " + app.name.trim() + " APK"
        );

        card.appendChild(download);

        return card;
    }

    async function loadApps() {
        try {
            const response = await fetch(cataloguePath, {
                cache: "no-cache"
            });

            if (!response.ok) {
                throw new Error("Catalogue request failed: " + response.status);
            }

            const catalogue = await response.json();

            if (!catalogue || !Array.isArray(catalogue.apps)) {
                throw new Error("Invalid app catalogue format.");
            }

            const cards = catalogue.apps
                .map(createAppCard)
                .filter(Boolean);

            if (cards.length === 0) {
                return;
            }

            container.replaceChildren(...cards);

            if (typeof filterCatalog === "function") {
                filterCatalog();
            }

        } catch (error) {
            console.error("rEKANS Labs app catalogue:", error);

            const status = createTextElement(
                "p",
                "app-catalog-error",
                "App listings could not be loaded. Please try again later."
            );

            status.setAttribute("role", "status");
            container.appendChild(status);
        }
    }

    loadApps();
})();
