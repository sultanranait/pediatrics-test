// Retained page initialization; execution order is significant.
function activateOnView(sectionId, buttonId) {
    const section = document.getElementById(sectionId);
    const button = document.getElementById(buttonId);

    let options = {
        root: null,
        threshold: 0.3  
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                button.classList.add("active");
            } else {
                button.classList.remove("active");
            }
        });
    }, options);

    if (section) observer.observe(section);
}

activateOnView("mocaSection", "mocaBtn");
activateOnView("iceSection", "iceBtn");