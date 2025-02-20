// Henter produktlisten fra HTML-dokumentet
const productlist = document.querySelector("#produktliste");

// Henter den aktuelle URL
const linkedURL = window.location.href;

// Opretter et objekt til at håndtere URL-parametre
const params = new URL(linkedURL).searchParams;

// Kalder getData-funktionen med de hentede URL-parametre
getData(params);

function getData(params) {
  let category = ""; // Variabel til at gemme kategorien
  let subCategory = ""; // Variabel til at gemme underkategorien
  let type = ""; // Variabel til at gemme typen

  // Gennemgår alle parametre i URL'en og sorterer dem i de relevante variabler
  params.forEach((value, key) => {
    if (key === "category") {
      category = value; // Hvis nøgleordet er "category", gemmes værdien i category
    } else {
      subCategory = key; // Hvis det ikke er "category", gemmes nøgleordet som subCategory
      type = value; // Og værdien gemmes som type
    }
  });

  // Opretter API-URL'en baseret på den valgte kategori
  let url = `https://dummyjson.com/products/category/${category}`;

  // Udskriver URL og parametre til konsollen for fejlfinding
  console.log("URL: " + url);
  console.log("Category: " + category + ", Subcategory: " + subCategory + ", Type: " + type);

  // Henter data fra API'et
  fetch(url)
    .then((response) => response.json()) // Konverterer svaret til JSON-format
    .then((data) => {
      console.log("URL (fetch(url)): " + url);
      console.log("API Response:", data.products); // Udskriver API-svaret i konsollen
      showProducts(data.products, subCategory, type); // Kalder showProducts-funktionen med de hentede produkter
    });

  // Udskriver den linkede URL til konsollen for debugging
  console.log("Linked URL: " + linkedURL);
}

function showProducts(products, subCategory, type) {
  let desiredProducts = products; // Opretter en kopi af produkterne, der kan filtreres senere

  console.log("Products received:", products);
  console.log("(showProducts(products, subCategory, type)) Subcategory:", subCategory, "Type:", type);

  // Formaterer type-navnet, så det matcher API'ets dataformat
  const typeName = type
    .replace(/e_and_g/g, "e & g") // Erstatter "e_and_g" med "e & g"
    .replace(/_/g, " ") // Erstatter underscore (_) med mellemrum
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Gør første bogstav stort i hvert ord

  console.log("typeName", typeName);

  // Hvis der er angivet en underkategori og type, filtreres produkterne baseret på disse værdier
  if (subCategory && type) {
    desiredProducts = products.filter((product) => {
      return product[subCategory] === typeName; // Filtrerer produkterne ud fra den korrekte underkategori og type
    });
  }

  // Genererer HTML-markup til de filtrerede produkter
  const markup = desiredProducts
    .map(
      (product) =>
        `<div class="produkt">
          <a href="produkt.html?id=${product.id}">
            <img
              src="${product.thumbnail}"
              alt="${product.title}"
            />
          </a>
          <h3>${product.title}</h3>
          <span class="newPrice"> Now: kr. ${product.price}</span>
          <p>Pris: kr. ${product.price}</p>
        </div>`
    )
    .join("");

  // Indsætter den genererede HTML i produktlisten på siden
  productlist.innerHTML = markup;
}
