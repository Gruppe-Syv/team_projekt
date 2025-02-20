const knapper = document.querySelector(".knapper");
let url = "https://dummyjson.com/products/categories";

function showCategories(data) {
  // Select specific indexes and extract the category name
  const selectedCategories = [0, 12, 1, 4]
    .map((index) => data[index]?.name) // Use optional chaining to prevent errors
    .filter(Boolean); // Remove undefined values if any index is out of bounds

  const markUp = selectedCategories
    .map(
      (category) =>
        // Pass category as a URL parameter when clicking on a button
        `<a class="desktop-knap" href="produktliste.html?category=${encodeURIComponent(category)}">${category}</a>`
    )
    .join("");

  knapper.innerHTML = markUp;
}

function hentData() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => showCategories(data));
}

hentData();

// const browseknap = document.querySelector(".mobile-knap");
// browseknap.addEventListener("mousedown", burgerToggle);
