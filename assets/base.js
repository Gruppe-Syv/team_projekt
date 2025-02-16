

const burger = document.querySelector("button#burger")
const headercont = document.querySelector("#headercontent")

burger.addEventListener("mousedown", burgerToggle)

function burgerToggle() {
    console.log("Burgertoggle")
    burger.classList.toggle("active")
    headercont.classList.toggle("active")
}


