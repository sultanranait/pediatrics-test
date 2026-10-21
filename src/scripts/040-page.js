// Retained page initialization; execution order is significant.
document.addEventListener("DOMContentLoaded", function () {

    function updateAuthorLink() {
        const authorLink = document.querySelector(".single-post span.author.vcard a");

        if (!authorLink) return;

        const authorName = (authorLink.textContent || authorLink.innerText).trim().toLowerCase();

        if (authorName.includes("ashish")) {
            authorLink.setAttribute("href", "https://www.pediatricsboardreview.com/author/ashish");
            console.log("Author link updated successfully");
        } else {
            console.log("Author name not matched:", authorName);
        }
    }

    // Run once after load + again after slight delay
    updateAuthorLink();
    setTimeout(updateAuthorLink, 1500);
});