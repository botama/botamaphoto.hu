const images = [
    "./assets/wedding/VikiCsabi/IMG0874.JPG",
    "./assets/wedding/VikiCsabi/164.jpg",
    "./assets/wedding/VikiCsabi/622.jpg",
    "./assets/wedding/VikiCsabi/IMG_078.jpg",
    "./assets/wedding/VikiCsabi/796.jpg"
];

let currentIndex = 0;
const backgroundContainer = document.getElementById("background-container");

// **ELSŐ KÉP MEGJELENÍTÉSE AZONNAL**
function setupFirstImage() {
    backgroundContainer.innerHTML = ""; // Ürítés biztonság kedvéért
    
    const firstBg = document.createElement("div");
    firstBg.classList.add("background");
    firstBg.style.backgroundImage = `linear-gradient(to bottom, white 10%, rgba(255, 255, 255, 0) 40%), url(${images[currentIndex]})`;
    firstBg.style.transform = "translateX(0)";
    
    backgroundContainer.appendChild(firstBg);
}
setupFirstImage(); // Az első kép beállítása az oldal betöltésekor

function changeBackground() {
    currentIndex = (currentIndex + 1) % images.length;

    // **Régi kép kijelölése (ezt fogjuk balra mozgatni)**
    const oldBg = backgroundContainer.querySelector(".background:last-child");

    // **Új háttérréteg létrehozása**
    const newBg = document.createElement("div");
    newBg.classList.add("background");
    newBg.style.backgroundImage = `linear-gradient(to bottom, white 10%, rgba(255, 255, 255, 0) 40%), url(${images[currentIndex]})`;
    newBg.style.transform = "translateX(100%)"; // **Mindig jobbról indul**
    
    backgroundContainer.appendChild(newBg);

    setTimeout(() => {
        newBg.style.transition = "transform 1s ease-in-out";
        newBg.style.transform = "translateX(0)"; // **Új kép beúszik**
        
        // **Ha van régi kép, azt balra küldjük és töröljük**
        if (oldBg) {
            oldBg.style.transition = "transform 1s ease-in-out";
            oldBg.style.transform = "translateX(-100%)"; // **Régi kép kifut balra**

            setTimeout(() => {
                oldBg.remove(); // **Töröljük a régi képet, miután teljesen kiment**
            }, 1000);
        }
    }, 50);
}

// **Automatikus váltás 4 másodpercenként**
setInterval(changeBackground, 4000);


































