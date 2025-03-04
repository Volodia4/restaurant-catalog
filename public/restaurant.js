window.onload = () => {
    const restaurantData = JSON.parse(localStorage.getItem("selectedRestaurant"));

    if (restaurantData) {
        document.getElementById("restaurant-name").textContent = restaurantData.name;
        document.getElementById("restaurant-description").textContent = restaurantData.description;
        document.getElementById("restaurant-rating").textContent = `Рейтинг: ${restaurantData.rating}`;
        document.getElementById("restaurant-cuisine").textContent = `Кухня: ${restaurantData.cuisine}`;
        document.getElementById("restaurant-city").textContent = `Місто: ${restaurantData.city}`;

        const mainImage = document.getElementById("restaurant-image");
        let currentImageIndex = 0;
        if (restaurantData.images && restaurantData.images.length > 0) {
            mainImage.src = restaurantData.images[0];
        }

        mainImage.addEventListener("click", () => {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                if (mainImage.requestFullscreen) {
                    mainImage.requestFullscreen();
                } else if (mainImage.webkitRequestFullscreen) {
                    mainImage.webkitRequestFullscreen();
                } else if (mainImage.msRequestFullscreen) {
                    mainImage.msRequestFullscreen();
                }
            }
        });

        const thumbnailsList = document.getElementById("thumbnails-list");
        thumbnailsList.innerHTML = "";
        restaurantData.images.forEach((image, index) => {
            const li = document.createElement("li");
            const thumbnail = document.createElement("img");
            thumbnail.src = image;
            thumbnail.alt = `Thumbnail ${index + 1}`;
            li.appendChild(thumbnail);
            li.onclick = () => {
                currentImageIndex = index;
                mainImage.src = image;
            };
            thumbnailsList.appendChild(li);
        });

        document.getElementById("prev-btn").onclick = () => {
            currentImageIndex = (currentImageIndex === 0) ? restaurantData.images.length - 1 : currentImageIndex - 1;
            mainImage.src = restaurantData.images[currentImageIndex];
        };

        document.getElementById("next-btn").onclick = () => {
            currentImageIndex = (currentImageIndex === restaurantData.images.length - 1) ? 0 : currentImageIndex + 1;
            mainImage.src = restaurantData.images[currentImageIndex];
        };

        const menuContainer = document.getElementById("restaurant-menu");
        menuContainer.innerHTML = "<h2 class='menu-header'>Меню</h2>";
        Object.entries(restaurantData.menu).forEach(([_, dishValue]) => {
            if (Array.isArray(dishValue) && dishValue.length >= 2) {
                const dishElement = document.createElement("div");
                dishElement.classList.add("dish");
                dishElement.innerHTML = `<span class="dish-name">${dishValue[0]}</span> <span class="dish-price">$${dishValue[1]}</span>`;
                menuContainer.appendChild(dishElement);
            }
        });
    }
};
