const burger = document.querySelector("button#burger");
const headercont = document.querySelector("header");
burger.addEventListener("click", burgerToggle);

function burgerToggle() {
  console.log("Burgertoggle");
  burger.classList.toggle("active");
  headercont.classList.toggle("active");
}

const dropdowns = headercont.querySelectorAll(".dropdown");
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
      expandParents(dropdown);
    } else {
      content.style.maxHeight = "0";
      collapseParents(dropdown);
    }
  }

  // Expands parent dropdowns so they contain all children
  function expandParents(dropdown) {
    let parent = dropdown.closest(".navcontent");
    while (parent) {
      parent.style.maxHeight = parent.scrollHeight + "px";
      parent = parent.parentElement.closest(".navcontent");
    }
  }

  // Shrinks parent dropdowns if no active children exist
  function collapseParents(dropdown) {
    let parent = dropdown.closest(".navcontent");
    while (parent) {
      let activeChildren = parent.querySelector(".dropdown.active");
      if (!activeChildren) {
        parent.style.maxHeight = "0";
      }
      parent = parent.parentElement.closest(".navcontent");
    }
  }
});
