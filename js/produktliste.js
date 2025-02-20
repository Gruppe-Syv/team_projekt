


const productlist = document.querySelector("#produktliste");
const linkedURL = window.location.href;
const params = new URL(linkedURL).searchParams;
getData(params);

function getData(params) {
  let category = "";
  let subCategory = "";
  let type = "";

  params.forEach((value, key) => {
    if (key === "category") {
      category = value;
    } else {
      subCategory = key;
      type = value;
    }
  });

  let url = `https://dummyjson.com/products/category/${category}`;
  
  console.log("URL: " + url);
  console.log(
    "Category: " +
      category +
      ", Subcategory: " +
      subCategory +
      ", Type: " +
      type
  );
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log("URL (fetch(url)): " + url);
      console.log("API Response:", data.products);
      showProducts(data.products, subCategory, type);
    });
  console.log("Linked URL: " + linkedURL);
}


function showProducts(products, subCategory, type) {
  let desiredProducts = products

  console.log("Products received:", products);
  console.log(
    "(showProducts(products, subCategory, type)) Subcategory:",
    subCategory,
    "Type:",
    type
  );
  const typeName = type
    .replace(/e_and_g/g, "e & g")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
  console.log("typeName", typeName);
  if (subCategory && type) {
    desiredProducts = products.filter(product => {
      return product[subCategory] === typeName;
    });
  }
  



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

  productlist.innerHTML = markup;
}
