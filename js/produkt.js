// Retrieve the product ID from the URL
const productId = new URLSearchParams(window.location.search).get("id");
const productContainer = document.querySelector(".single_view");

let url = `https://dummyjson.com/products/${productId}`; // Modify the URL to include the product ID

function showProduct(data) {
  if (!data) {
    productContainer.innerHTML = "<p>Product not found!</p>";
    return;
  }

  // Create the product markup
  const markup = `<div class="product-page">
      <div class="product-container">
        <div class="product-image-wrapper">
          <img src="${data.thumbnail}" alt="Produktbillede" />
        </div>

        <!--Info omkring produktet-->
        <div class="product-info">
          <p class="breadcrumb"><span id="brand">${data.category}</span> → <span id="product-type">${data.brand}</span></p>
          <h1 id="product-title">${data.title}</h1>
          <p id="product-price">Price: kr. ${data.price}</p>

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
      </div>
    </div>
  `;

  productContainer.innerHTML = markup;
}

function getData() {
  // Only fetch if the productId exists
  if (!productId) {
    productContainer.innerHTML = "<p>No product ID found in the URL!</p>";
    return;
  }

  fetch(url)
    .then((response) => response.json())
    .then((data) => showProduct(data))
    .catch((error) => {
      productContainer.innerHTML = "<p>Error fetching product data.</p>";
      console.error("Error fetching product data:", error);
    });
}

getData();
