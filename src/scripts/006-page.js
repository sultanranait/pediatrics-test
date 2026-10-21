// Retained page initialization; execution order is significant.
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && (href.includes("infusionsoft.app") || href.includes("infusionsoft.com"))) {
      a.setAttribute("target", "_self");
    }
  });
});
