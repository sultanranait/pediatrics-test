// Retained page initialization; execution order is significant.
// document.addEventListener("DOMContentLoaded", function () {
//   const options = document.querySelectorAll(".opt-popup");
//   const button = document.querySelector(".home-quizz-footeer .opt-btnn");
//   const altButton = document.querySelector(".home-quizz-footeer a.quiz-btnn");

//   const links = {
//     "opt-ice": "javascript:;", // first option
//     "opt-moca": "/moca-peds-study-guide/",
//     "opt-ib": "/residency-discounts/",
//     "opt-sg": "/group-discount/",
//     "opt-ecm": "/preorder-now/",
//   };

//   let selectedKey = null;

//   options.forEach(opt => {
//     opt.addEventListener("click", function () {
//       options.forEach(o => o.classList.remove("selected"));
//       this.classList.add("selected");

//       for (let key in links) {
//         if (this.classList.contains(key)) {
//           selectedKey = key;
//           button.setAttribute("href", links[key]);
//           break;
//         }
//       }
//     });
//   });

//   // Handle button click behavior
//   button.addEventListener("click", function (e) {
//     if (selectedKey === "opt-ice") {
//       e.preventDefault(); // stop normal link
//       if (altButton) altButton.click(); // trigger alternate button
//     }
//   });
// });

document.addEventListener("DOMContentLoaded", function () {
  const options = document.querySelectorAll(".opt-popup");
  const button = document.querySelector(".home-quizz-footeer a.footer-opt-btnn");
  const altButton = document.querySelector(".home-quizz-footeer a.quiz-btnn");

  const links = {
    "opt-ice": "javascript:;",
    "opt-moca": "/moca-peds-study-guide/",
    "opt-ib": "/residency-discounts/",
    "opt-sg": "/group-discount/",
    "opt-ecm": "/preorder-now/",
  };

  let selectedKey = null;

  options.forEach(opt => {
    opt.addEventListener("click", function () {

      options.forEach(o => o.classList.remove("selected"));
      this.classList.add("selected");

      const thisClasses = [...this.classList];
      selectedKey = Object.keys(links).find(key => thisClasses.includes(key));

      if (selectedKey) {
        button.href = links[selectedKey];
      }
    });
  });

  button.addEventListener("click", function (e) {
    if (selectedKey === "opt-ice") {
      e.preventDefault();

      if (altButton) altButton.click();
    }
  });

});
