const burger = document.querySelector("button#burger");
const headercont = document.querySelector("header");
const categories = ["beauty", "fragrances", "skin-care", "home-decoration"];
const cartbutton = document.querySelectorAll("button.cart")

let domSelector;

let baseUrl = `https://dummyjson.com/products`;

categories.forEach((category) => {
  domSelector = document.querySelector(
    "#" + category.replace(/-decoration|-/g, "")
  );
  console.log("Category: " + category);
  console.log(domSelector);
  getData(category, domSelector);
});

function makeList(data, domSelector, url, subCategories, sentCat) {
  console.log("makeList(data, domSelector, url, subCategories, sentCat):");
  console.log(data);
  console.log(domSelector);
  console.log(url);
  console.log(sentCat);
  let title = sentCat
    .split("-") // Split the string at each hyphen
    .map(
      (
        word,
        index // For each word
      ) =>
        index === 0 // Capitalize the first word only
          ? word.charAt(0).toUpperCase() + word.slice(1)
          : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(" ");
  console.log(title);

  const { brands, tags, ...rest } = subCategories;

  //   function getActiveStatus(subCategories) {
  //     return Object.fromEntries(
  //       Object.entries(subCategories).map(([key, value]) => [
  //         key, Array.isArray(value) && value.length > 0
  //       ])
  //     );
  //   }
  console.log("Tags:", tags);
  console.log("Brands:", brands);
  console.log("Rest:", rest);

  //   let brands = subCategories.brands;
  //   let tags = subCategories.tags; 
  console.log(" Tags: " + tags + " Brands: " + brands);
  let subListContent = Object.entries(subCategories)
    .filter(([key, value]) => Array.isArray(value) && value.length > 1) // Ensure valid arrays
    .map(
      ([key, value]) => `<div class="dropdown">
      <div class="dropdownheader">
          <p>${key.charAt(0).toUpperCase() + key.slice(1)}</p> 
          <div class="arrow"></div>
      </div>
      <div class="navcontent">
          ${seperate(value)}
      </div>
    </div>`
    )
    .join("");

  let listContent = `
    <div class="dropdown">
      <div class="dropdownheader">
          <p>${title}</p>
          <div class="arrow"></div>
      </div>
      <div class="navcontent">
      ${subListContent}
      </div></div>`;
  domSelector.innerHTML = listContent;
  const dropdowns = domSelector.querySelectorAll(".dropdown");
dropdowns.forEach((dropdown) => {
  const dropdownHeader = dropdown.querySelector(".dropdownheader");
  dropdownHeader.addEventListener("click", function () {
    dropdownToggle(dropdown); // Pass event here
    //   dropdown.addEventListener("click", dropdownToggle)
  });

  function dropdownToggle(dropdown) {
    console.log("Dropdowntoggle");
    //   dropdown.classList.toggle("active");
    const content = dropdown.querySelector(".navcontent");
    let heightValue = headercont.scrollHeight;

    if (dropdown.classList.contains("active")) {
      retractDropdown(dropdown, content, heightValue);
    } else {
      expandDropdown(dropdown, content, heightValue);
    }
  }
  function retractDropdown(dropdown, content, heightValue) {
    content.style.maxHeight = 0;
    dropdown.classList.remove("active");
  }
  function expandDropdown(dropdown, content, heightValue) {
    dropdown.classList.add("active");
    content.style.maxHeight = heightValue + "px";
  }
});
}

//   <div class="dropdown">
//             <div class="dropdownheader">
//                 <p>Brands</p>
//                 <div class="arrow">

//                 </div>
//             </div>
//             <div class="navcontent">
//              ${seperate(brands)}
//             </div>
//         </div>
//         <div class="dropdown">
//             <div class="dropdownheader">
//                 <p>Tags</p>
//                 <div class="arrow">

//                 </div>
//             </div>
//             <div class="navcontent">
//              ${seperate(tags)}
//             </div>
//         </div>



function seperate(arr) {
  return arr
    .map((item) => {
      return `<a href="#">${item}</a>`; /* Side link her */
    })
    .join("");
}

burger.addEventListener("click", burgerToggle);

function burgerToggle() {
  console.log("Burgertoggle");
  burger.classList.toggle("active");
  headercont.classList.toggle("active");
}

function getData(sentCat, domSelector) {
  let url = `${baseUrl}/category/${sentCat}`;
  console.log(`function getData(${url})`);

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const filteredProducts = data.products.filter(
        (product) => product.category === sentCat
      );
      let subCategories = {
        brands: [...new Set(filteredProducts.map((product) => product.brand))],
        tags: [...new Set(filteredProducts.flatMap((product) => product.tags))],
      };
      makeList(data, domSelector, url, subCategories, sentCat);
    });
}
