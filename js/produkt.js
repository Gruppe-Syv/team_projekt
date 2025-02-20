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
                        <img src="${imageUrl}" alt="${data.title}">
                        ${data.stock === 0 ? `<div class="soldout-overlay">Udsolgt</div>` : ""}
                    </div>
                </div>

                <div class="product-info">
                    <h1 class="product-title">${data.title}</h1>

                    <div class="product-price">
                        ${data.stock === 0 ? `<span class="soldout-text">UDSOLGT</span>` : ""}
                        <span class="discounted-price">${data.price} kr</span>
                        ${data.discountPercentage ? `<span class="original-price">${(data.price / (1 - data.discountPercentage / 100)).toFixed(2)} kr</span>` : ""}
                    </div>

                    <div class="product-description">
                        <p><strong>Brand:</strong> ${data.brand || "N/A"}</p>
                        <p><strong>Category:</strong> ${data.category}</p>
                        <p><strong>Description:</strong> ${data.description}</p>
                    </div>

                    <!-- Size selector -->
                    <div class="size-selector">
                        <label for="size">Vælg størrelse:</label>
                        <select id="size" name="size" ${data.stock === 0 ? "disabled" : ""}>
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                            <option value="xlarge">X-Large</option>
                        </select>
                    </div>

                    <div class="add-to-cart">
                        <button class="add-to-cart-btn" ${data.stock === 0 ? "disabled" : ""}>Læg i kurv</button>
                    </div>
                </div>
            `;
    })
    .catch((error) => console.error("Fejl ved hentning af produktdata:", error));
}
