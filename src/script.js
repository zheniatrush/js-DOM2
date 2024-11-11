const gallery = document.getElementById("gallery");
const loadMoreBtn = document.getElementById("loadMore");
const clearGalleryBtn = document.getElementById("clearGallery");
const deleteLastBtn = document.getElementById("deleteLast");
const reverseGalleryBtn = document.getElementById("reverseGallery");

let currentPage = 1;
const imagesPerPage = 4;
let displayedImages = [];

async function loadImages() {
    try {
        const response = await fetch(`https://picsum.photos/v2/list?page=${currentPage}&limit=${imagesPerPage}`);
        const data = await response.json();
        displayImages(data);
        displayedImages = [...displayedImages, ...data];
        currentPage++;
    } catch (error) {
        console.error("Помилка завантаження картинок:", error);
    }
}

function displayImages(images) {
    images.forEach(image => {
        const img = document.createElement("img");
        img.src = image.download_url;
        img.alt = "Random Image";
        gallery.appendChild(img);
    });
}

function clearGallery() {
    gallery.innerHTML = "";
    displayedImages = [];
    currentPage = 1;
}

function deleteLastImage() {
    if (gallery.lastChild) {
        gallery.removeChild(gallery.lastChild);
        displayedImages.pop();
    }
}

function reverseGallery() {
    displayedImages.reverse();
    gallery.innerHTML = "";
    displayImages(displayedImages);
}

loadMoreBtn.addEventListener("click", loadImages);
clearGalleryBtn.addEventListener("click", clearGallery);
deleteLastBtn.addEventListener("click", deleteLastImage);
reverseGalleryBtn.addEventListener("click", reverseGallery);

const darkenImagesBtn = document.getElementById("darkenImages");
let isDarkened = false;

function toggleDarkenImages() {
    isDarkened = !isDarkened;
    const images = gallery.querySelectorAll("img");
    images.forEach(img => {
        if (isDarkened) {
            img.classList.add("darkened");
        } else {
            img.classList.remove("darkened");
        }
    });
}

darkenImagesBtn.addEventListener("click", toggleDarkenImages);

loadImages();
