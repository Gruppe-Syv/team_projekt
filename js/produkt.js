const urlParams = new URLSearchParams(window.location.search);
let productID = urlParams.get("id");

let productContainer = document.querySelector(".product-page");

if (!productID) {
    console.error("Intet produkt-ID fundet i URL'en");
} else {
    fetch(`https://dummyjson.com/products/${productID}`)
        .then((response) => response.json())
        .then((data) => {
            productContainer.innerHTML = `
                <div class="product-image-wrapper">
                    <div class="product-image">
                        <img src="${data.thumbnail}" alt="${data.title}">
                    </div>
                </div>

                <div class="product-info">
                    <p class="breadcrumb">${data.brand || "Brand"} → ${data.category}</p>
                    <h1 class="product-title">${data.title}</h1>

                    <div class="product-price">
                        <span class="discounted-price">kr. ${data.price}</span>
                        ${data.discountPercentage ? `<span class="original-price">kr. ${(data.price * (1 + data.discountPercentage / 100)).toFixed(2)}</span>` : ""}
                    </div>

                    <div class="product-description">
                        <p><strong>Beskrivelse:</strong> ${data.description}</p>
                        <p><strong>Brand:</strong> ${data.brand || "N/A"}</p>
                        <p><strong>Kategori:</strong> ${data.category}</p>
                    </div>

                    <div class="size-selector">
                        <label for="size">Vælg størrelse:</label>
                        <select id="size">
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                            <option value="xlarge">X-Large</option>
                        </select>
                    </div>

                    <div class="quantity-selector">
                        <label for="quantity">Antal:</label>
                        <select id="quantity">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </div>

                    <div class="add-to-cart">
                        <button class="add-to-cart-btn">🛒 Læg i kurv →</button>
                    </div>
                </div>
            `;
        })
        .catch((error) => console.error("Fejl ved hentning af produktdata:", error));
}

