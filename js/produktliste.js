const productlist = document.querySelector("#produktliste");

// Function to retrieve the category from the URL and format it
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  let category = urlParams.get(param);

  // Convert spaces to dashes for the proper category format
  if (category) {
    category = category.replace(/\s+/g, "-").toLowerCase(); // Replace spaces with dashes and make it lowercase
  }

  return category;
}

// Get the category from the URL
const category = getQueryParam("category");

async function getData() {
  try {
    // If a category is specified, fetch only that category's products
    const categoryToFetch = category || "beauty"; // Default to "beauty" if no category is specified

    const response = await fetch(`https://dummyjson.com/products/category/${categoryToFetch}`);
    const data = await response.json();

    showProducts(data.products); // Show products for the specific category
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function showProducts(products) {
  const markup = products
    .map(
      (product) => `<div class="produkt">
          <a href="produkt.html">
            <img
              src="${product.thumbnail}"
              alt="${product.title}"
            />
          </a>
          <h3>${product.title}</h3>
          <p>Pris: ${product.price} DKK</p>
        </div>`
    )
    .join("");

  productlist.innerHTML = markup;
}

getData();
