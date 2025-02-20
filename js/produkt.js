const urlParams = new URLSearchParams(window.location.search);
let productID = urlParams.get("id");

let productContainer = document.querySelector(".product-page");

if (!productID) {
  console.error("Intet produkt-ID fundet i URL'en");
} else {
  fetch(`https://dummyjson.com/products/${productID}`)
    .then((response) => response.json())
    .then((data) => {
      const imageUrl = data.images && data.images.length > 0 ? data.images[0] : data.thumbnail;

      productContainer.innerHTML = `
        <div class="product-image-wrapper ${data.stock === 0 ? "soldout" : ""}">
          <div class="product-image">
            <img id="product-image" src="${imageUrl}" alt="${data.title}">
            ${data.stock === 0 ? `<div class="soldout-overlay">Udsolgt</div>` : ""}
          </div>
        </div>

        <div class="product-info">
          <p class="breadcrumb"><span id="brand">${data.brand}</span> → <span id="product-type">${data.category}</span></p>
          <h1 id="product-title">${data.title}</h1>
          <p id="product-price">${data.price} kr</p>

          <div class="dropdown">
            <label for="color">Color</label>
            <select id="color">
              <option>Green (eksempel)</option>
            </select>
          </div>

          <div class="dropdown">
            <label for="size">Size</label>
            <select id="size">
              <option>Small</option>
              <option>Medium</option>
              <option>Large</option>
              <option>X-Large</option>
            </select>
          </div>

          <div class="dropdown">
            <label for="quantity">Antal</label>
            <select id="quantity">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </div>

          <button class="add-to-cart-btn">🛒 Læg i kurv →</button>
        </div>
      `;
    })
    .catch((error) => console.error("Fejl ved hentning af produktdata:", error));
}
