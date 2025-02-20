const productlist = document.querySelector("#produktliste");
const categories = ["beauty", "skin-care", "fragrances", "home-decoration"];

async function getData() {
  try {
    const responses = await Promise.all(
      categories.map((category) =>
        fetch(`https://dummyjson.com/products/category/${category}`).then((res) => res.json())
      )
    );

    const allProducts = responses.flatMap((res) => res.products); // Combine all products
    showProducts(allProducts);
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
          <span class="newPrice"> Now: kr. ${product.price}</span>
          <p>Pris: kr. ${product.price}</p>
        </div>`
    )
    .join(``);

  productlist.innerHTML = markup;
}

getData();
