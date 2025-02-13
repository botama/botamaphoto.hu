// Véletlenszerű képarányok hozzáadása
var images = document.querySelectorAll('.gallery img');
var classes = ['portrait', 'landscape', 'portrait', 'landscape', 'portrait', 'landscape']; // Ismétlődő minta

images.forEach((img, index) => {
    var classIndex = index % classes.length; // A minta ismétlődik
    img.classList.add(classes[classIndex]);
});

// Masonry elrendezés beállítása
function setupMasonry() {
    const gallery = document.querySelector('.gallery');
    const columns = 3; // Oszlopok száma
    const gap = 5; // Képek közötti térköz (px)

    // Oszlopok létrehozása
    let columnWrapper = {};
    for (let i = 0; i < columns; i++) {
        columnWrapper[`column${i}`] = [];
    }

    // Képek szétosztása az oszlopok között
    gallery.querySelectorAll('img').forEach((img, index) => {
        const column = index % columns;
        columnWrapper[`column${column}`].push(img.outerHTML);
    });

    // Oszlopok tartalmának frissítése
    gallery.innerHTML = '';
    for (let i = 0; i < columns; i++) {
        const columnContent = columnWrapper[`column${i}`].join('');
        const columnDiv = document.createElement('div');
        columnDiv.classList.add('column');
        columnDiv.innerHTML = columnContent;
        gallery.appendChild(columnDiv);
    }

    // Képek újrarendezése a Masonry hatás érdekében
    gallery.style.display = 'flex';
    gallery.style.gap = `${gap}px`;

    // Galéria magasságának beállítása a görgetéshez
    const columnHeights = Array.from(gallery.querySelectorAll('.column')).map(column => column.offsetHeight);
    const maxHeight = Math.max(...columnHeights);
    gallery.style.height = `${maxHeight}px`;
}

// Masonry elrendezés inicializálása
setupMasonry();

// Modal megnyitása
var modal = document.getElementById("myModal");
var modalImg = document.getElementById("img01");
var images = document.querySelectorAll('.gallery img');
var currentIndex = 0;

images.forEach((img, index) => {
    img.onclick = function() {
        modal.style.display = "block";
        modalImg.src = this.src;
        currentIndex = index;
    }
});

// Modal bezárása
var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
    modal.style.display = "none";
}

// Képek lapozása
var prev = document.querySelector('.prev');
var next = document.querySelector('.next');

prev.onclick = function() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    modalImg.src = images[currentIndex].src;
}

next.onclick = function() {
    currentIndex = (currentIndex + 1) % images.length;
    modalImg.src = images[currentIndex].src;
}