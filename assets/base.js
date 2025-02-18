const burger = document.querySelector("button#burger");
const headercont = document.querySelector("header");
const categories = ["beauty", "fragrances", "skin-care", "home-decoration"];

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
  let brands = subCategories.brands;
  let tags = subCategories.tags;
  console.log(" Tags: " + tags + " Brands: " + brands);
  let listContent = `
    <div class="dropdown">
      <div class="dropdownheader">
          <p>${title}</p>
          <div class="arrow"></div>
      </div>
      <div class="navcontent">
            <div class="dropdown">
                <div class="dropdownheader">
                    <p>Brands</p>
                    <div class="arrow">
                    
                    </div>
                </div>
                <div class="navcontent">
                 ${seperate(brands)}                   
                </div>
            </div>
            <div class="dropdown">
                <div class="dropdownheader">
                    <p>Tags</p>
                    <div class="arrow">
                    
                    </div>
                </div>
                <div class="navcontent">
                 ${seperate(tags)}                   
                </div>
            </div> 
      </div></div>`;
  domSelector.innerHTML = listContent;
  const dropdowns = domSelector.querySelectorAll(".dropdown");
  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("click", function (event) {
      event.stopPropagation();
      dropdownToggle(dropdown);
    });

    function dropdownToggle(dropdown) {
      console.log("Dropdowntoggle");
      dropdown.classList.toggle("active");
      const content = dropdown.querySelector(".navcontent");

      if (dropdown.classList.contains("active")) {
        content.style.maxHeight = content.scrollHeight + "px";
        // expandParents(dropdown);
      } else {
        content.style.maxHeight = "0";
        // collapseParents(dropdown);
      }
    }
    
    
  });

  function seperate(arr) {
    return arr
      .map((item) => {
        return `<a href="">${item}</a>`;
      })
      .join("");
  }
}

burger.addEventListener("click", burgerToggle);

function burgerToggle() {
  console.log("Burgertoggle");
  burger.classList.toggle("active");
  headercont.classList.toggle("active");
}

// const dropdowns = headercont.querySelectorAll(".dropdown");
// dropdowns.forEach((dropdown) => {
//   dropdown.addEventListener("click", function (event) {
//     event.stopPropagation();
//     dropdownToggle(dropdown);
//   });

//   function dropdownToggle(dropdown) {
//     console.log("Dropdowntoggle");
//     dropdown.classList.toggle("active");
//     const content = dropdown.querySelector(".navcontent");

//     if (dropdown.classList.contains("active")) {
//       content.style.maxHeight = content.scrollHeight + "px";
//       expandParents(dropdown);
//     } else {
//       content.style.maxHeight = "0";
//       collapseParents(dropdown);
//     }
//   }

//   }
// });



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
