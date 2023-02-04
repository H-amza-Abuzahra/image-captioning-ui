// let inputImage = document.getElementById("input--image");
// let displayImage = document.getElementById("display--image");

const inputImage = document.querySelector(".input--image");
const displayImage = document.querySelector(".display--image");
let navLinks = document.querySelectorAll("nav a");
const textInput = document.querySelector(".text");
const placeholder = document.querySelector(".place-holder");
//Displaying the image in the container
inputImage.addEventListener("change", function () {
  let file = inputImage.files[0];
  let reader = new FileReader();
  reader.onload = function (e) {
    displayImage.src = e.target.result;
    placeholder.style.display = "none"
    displayImage.style.display = "block";
    displayImage.style.overflow = "hidden"
    console.log(displayImage.width)
    console.log(displayImage.height)



  };
  reader.readAsDataURL(file);

  //Sending the image to the backend
  const formData = new FormData();

  formData.append("file", inputImage.files[0]);

  fetch("https://jellyfish-app-ciasp.ondigitalocean.app/get_caption", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((data) => textInput.value = data.slice(7, -5))
    .catch((error) => console.error(error));
    
});

//Scrolling smoothly to the section
navLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    let targetId = link.getAttribute("href");
    let target = document.querySelector(targetId);
    target.scrollIntoView({ behavior: "smooth" });
  });
});


