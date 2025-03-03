import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

export async function getRestaurants(db) {
    const querySnapshot = await getDocs(collection(db, "restaurants"));
    const container = document.getElementById("restaurants-container");
    container.innerHTML = "";

    querySnapshot.forEach((doc) => {
        const restaurantName = doc.data().name;
        const restaurantDescription = doc.data().description || "Без опису";
        const restaurantImages = doc.data().images || ["placeholder.jpg"];

        const restaurantCard = document.createElement("div");
        restaurantCard.classList.add("restaurant-card");

        const restaurantImg = document.createElement("img");
        restaurantImg.src = restaurantImages[0];
        restaurantImg.alt = `Image of ${restaurantName}`;
        restaurantImg.classList.add("restaurant-img");

        const restaurantInfo = document.createElement("div");
        restaurantInfo.classList.add("restaurant-info");

        const nameElement = document.createElement("h3");
        nameElement.textContent = restaurantName;
        restaurantInfo.appendChild(nameElement);

        const descriptionElement = document.createElement("p");
        descriptionElement.textContent = restaurantDescription;
        restaurantInfo.appendChild(descriptionElement);

        restaurantCard.appendChild(restaurantImg);
        restaurantCard.appendChild(restaurantInfo);

        container.appendChild(restaurantCard);
    });

    container.classList.remove("hidden");
}

document.getElementById("start-btn").addEventListener("click", function() {
    document.body.style.overflow = 'auto';

    const filterPanel = document.getElementById("filter-panel");
    filterPanel.classList.remove("hidden");
    filterPanel.classList.add("visible");

    document.querySelector(".hero").classList.add("hidden");
    document.querySelector("header").classList.add("hidden");

    getRestaurants(db);
});

document.getElementById("home-btn").addEventListener("click", function() {
    const filterPanel = document.getElementById("filter-panel");
    const restaurantsContainer = document.getElementById("restaurants-container");

    filterPanel.classList.remove("visible");
    restaurantsContainer.classList.add("hidden");

    setTimeout(() => {
        document.querySelector("header").classList.remove("hidden");
        document.querySelector(".hero").classList.remove("hidden");
        filterPanel.classList.add("hidden");

        document.body.style.overflow = 'hidden';
        window.scrollTo(0, 0);
    }, 500);
});

document.getElementById("cuisine-select").addEventListener("change", function() {
    const selectedCuisine = this.value;
    console.log("Вибрано тип кухні:", selectedCuisine);
});

document.getElementById("regions-select").addEventListener("change", function() {
    const selectedRegion = this.value;
    console.log("Вибрано регіон:", selectedRegion);
});
