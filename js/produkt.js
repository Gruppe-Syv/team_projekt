// Henter produkt-ID fra URL'en
const productId = new URLSearchParams(window.location.search).get("id");
const productContainer = document.querySelector(".single_view");

// Definerer API URL'en med det specifikke produkt-ID
let url = `https://dummyjson.com/products/${productId}`;

// Funktion til at vise produktets detaljer på siden
function showProduct(data) {
  // Hvis der ikke findes nogen data, vises en fejlmeddelelse
  if (!data) {
    productContainer.innerHTML = "<p>Produkt ikke fundet!</p>";
    return;
  }

  // Opretter HTML-markup for produktet
  const markup = `<div class="product-page">
      <div class="product-container">
        <div class="product-image-wrapper">
          <img src="${data.thumbnail}" alt="Produktbillede" />
        </div>

        <!-- Info omkring produktet -->
        <div class="product-info">
          <p class="breadcrumb"><span id="brand">${data.category}</span> → <span id="product-type">${data.brand}</span></p>
          <h1 id="product-title">${data.title}</h1>
          <p id="product-price">Pris: kr. ${data.price}</p>

          <!-- Dropdown-menu til valg af størrelse -->
          <div class="dropdown">
            <label for="size">Størrelse</label>
            <select id="size">
              <option>Small</option>
              <option>Medium</option>
              <option>Large</option>
              <option>X-Large</option>
            </select>
          </div>

          <!-- Dropdown-menu til valg af antal -->
          <div class="dropdown">
            <label for="quantity">Antal</label>
            <select id="quantity">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </div>

          <!-- Knappen til at tilføje produktet til kurven -->
          <button class="add-to-cart-btn">🛒 Læg i kurv →</button>
        </div>
      </div>
    </div>
  `;

  // Indsætter HTML-markuppen i produktcontaineren
  productContainer.innerHTML = markup;
}

// Funktion til at hente data fra API'et
function getData() {
  // Hvis der ikke findes et produkt-ID, vises en fejlmeddelelse
  if (!productId) {
    productContainer.innerHTML = "<p>Intet produkt-ID fundet i URL'en!</p>";
    return;
  }

  // Henter produktdata fra API'et og viser det på siden
  fetch(url)
    .then((response) => response.json()) // Konverterer svaret til JSON
    .then((data) => showProduct(data)) // Sender dataene videre til showProduct-funktionen
    .catch((error) => {
      // Hvis der opstår en fejl, vises en fejlmeddelelse på siden og i konsollen
      productContainer.innerHTML = "<p>Fejl ved hentning af produktdata.</p>";
      console.error("Fejl ved hentning af produktdata:", error);
    });
}

// Kalder funktionen for at hente og vise produktdata
getData();
