import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

export async function getRestaurants(db, selectedCuisine = "all", selectedRegion = "all") {
    const container = document.getElementById("restaurants-container");

    container.classList.remove("visible");
    container.classList.add("hidden");

    setTimeout(async () => {
        container.innerHTML = "";

        const querySnapshot = await getDocs(collection(db, "restaurants"));
        querySnapshot.forEach((doc) => {
            const restaurantData = doc.data();
            const restaurantName = restaurantData.name;
            const restaurantDescription = restaurantData.description || "Без опису";
            const restaurantImages = restaurantData.images || ["placeholder.jpg"];
            const restaurantCuisine = restaurantData.cuisine || "";
            const restaurantRegion = restaurantData.city || "";
            const restaurantRating = restaurantData.rating || 0;
            const restaurantMenu = restaurantData.menu || {};

            if (selectedCuisine !== "all" && restaurantCuisine !== selectedCuisine) {
                return;
            }
            if (selectedRegion !== "all" && restaurantRegion !== selectedRegion) {
                return;
            }

            const restaurantCard = document.createElement("div");
            restaurantCard.classList.add("restaurant-card");

            const restaurantImg = document.createElement("img");
            restaurantImg.src = restaurantImages[0];
            restaurantImg.alt = `Image of ${restaurantName}`;
            restaurantImg.classList.add("restaurant-img");

            const restaurantText = document.createElement("div");
            restaurantText.classList.add("restaurant-info");

            const nameElement = document.createElement("h3");
            nameElement.textContent = restaurantName;
            restaurantText.appendChild(nameElement);

            const descriptionElement = document.createElement("p");
            descriptionElement.textContent = restaurantDescription;
            restaurantText.appendChild(descriptionElement);

            restaurantCard.appendChild(restaurantImg);
            restaurantCard.appendChild(restaurantText);

            restaurantCard.addEventListener("click", () => {
                localStorage.setItem("selectedRestaurant", JSON.stringify({
                    name: restaurantName,
                    description: restaurantDescription,
                    images: restaurantImages,
                    cuisine: restaurantCuisine,
                    city: restaurantRegion,
                    rating: restaurantRating,
                    menu: restaurantMenu
                }));
                window.location.href = "restaurant.html";
            });

            container.appendChild(restaurantCard);
        });

        container.classList.remove("hidden");
        container.classList.add("visible");
    }, 500);
}

function showRestaurantsState(selectedCuisine = "all", selectedRegion = "all") {
    document.getElementById("cuisine-select").value = "all";
    document.getElementById("regions-select").value = "all";

    document.body.style.overflow = 'auto';

    const filterPanel = document.getElementById("filter-panel");
    filterPanel.classList.remove("hidden");
    filterPanel.classList.add("visible");

    document.querySelector(".hero").classList.add("hidden");
    document.querySelector("header").classList.add("hidden");

    const db = getFirestore();
    getRestaurants(db, selectedCuisine, selectedRegion);
}

function showHomeState() {
    const filterPanel = document.getElementById("filter-panel");
    const restaurantsContainer = document.getElementById("restaurants-container");

    filterPanel.classList.remove("visible");
    restaurantsContainer.classList.remove("visible");
    restaurantsContainer.classList.add("hidden");

    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);

    setTimeout(() => {
        document.querySelector("header").classList.remove("hidden");
        document.querySelector(".hero").classList.remove("hidden");
        filterPanel.classList.add("hidden");
    }, 500);
}

document.getElementById("start-btn").addEventListener("click", function() {
    showRestaurantsState();
    window.history.pushState({ view: "restaurants", cuisine: "all", region: "all" }, "", "#restaurants");
});

document.getElementById("home-btn").addEventListener("click", function() {
    showHomeState();
    window.history.pushState({ view: "home" }, "", "#home");
});

document.getElementById("cuisine-select").addEventListener("change", function() {
    const selectedCuisine = this.value;
    const selectedRegion = document.getElementById("regions-select").value;
    const db = getFirestore();
    window.history.pushState({ view: "restaurants", cuisine: selectedCuisine, region: selectedRegion }, "", "#restaurants");
    getRestaurants(db, selectedCuisine, selectedRegion);
});

document.getElementById("regions-select").addEventListener("change", function() {
    const selectedRegion = this.value;
    const selectedCuisine = document.getElementById("cuisine-select").value;
    const db = getFirestore();
    window.history.pushState({ view: "restaurants", cuisine: selectedCuisine, region: selectedRegion }, "", "#restaurants");
    getRestaurants(db, selectedCuisine, selectedRegion);
});

window.addEventListener("popstate", function(event) {
    const state = event.state;
    if (!state || state.view === "home") {
        showHomeState();
    } else if (state.view === "restaurants") {
        showRestaurantsState(state.cuisine || "all", state.region || "all");
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    menuToggle.addEventListener("click", function () {
        if (navLinks.classList.contains("active")) {
            navLinks.classList.remove("active");
            setTimeout(() => {
                navLinks.style.display = "none";
            }, 300);
        } else {
            navLinks.style.display = "flex";
            setTimeout(() => {
                navLinks.classList.add("active");
            }, 10);
        }
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            setTimeout(() => {
                navLinks.style.display = "none";
            }, 300);
        });
    });
});
