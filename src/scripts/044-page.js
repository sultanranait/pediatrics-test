// Retained page initialization; execution order is significant.
// document.addEventListener("DOMContentLoaded", function() {

//     const params = new URLSearchParams(window.location.search);
//     const firstname = params.get("firstname") || "";
//     const lastname = params.get("lastname") || "";
//     const email = params.get("email") || "";


//     function fillForms() {
//         document.querySelectorAll("form").forEach(form => {
            
//             const nameInputs = form.querySelectorAll(".ginput_container_name input[type='text']");
//             if (nameInputs.length > 0 && (firstname || lastname)) {
//                 const fullName = firstname + (lastname ? " " + lastname : "");
//                 nameInputs.forEach(input => {
//                     if (!input.value && fullName.trim() !== "") {
//                         input.value = fullName.trim();
//                     }
//                 });
//             }

            
//             const emailInputs = form.querySelectorAll(".ginput_container_email input[type='email']");
//             if (emailInputs.length > 0 && email) {
//                 emailInputs.forEach(input => {
//                     if (!input.value && email.trim() !== "") {
//                         input.value = email.trim();
//                     }
//                 });
//             }
//         });
//     }

//     fillForms();

//     const observer = new MutationObserver(fillForms);
//     observer.observe(document.body, { childList: true, subtree: true });
// });

document.addEventListener("DOMContentLoaded", function() {

    const params = new URLSearchParams(window.location.search);
    const firstname = params.get("inf_field_FirstName") || "";
    const lastname = params.get("inf_field_LastName") || "";
    const email = params.get("inf_field_Email") || "";
	const order_id = params.get("orderId") || "";


    function fillForms() {
        document.querySelectorAll("form").forEach(form => {
            
            const nameInputs = form.querySelectorAll(".ginput_container_name input[type='text']");
            if (nameInputs.length > 0 && (firstname || lastname)) {
                const fullName = firstname + (lastname ? " " + lastname : "");
                nameInputs.forEach(input => {
                    if (!input.value && fullName.trim() !== "") {
                        input.value = fullName.trim();
                    }
                });
            }

            
            const emailInputs = form.querySelectorAll(".ginput_container_email input[type='email']");
            if (emailInputs.length > 0 && email) {
                emailInputs.forEach(input => {
                    if (!input.value && email.trim() !== "") {
                        input.value = email.trim();
                    }
                });
            }

			const orderInput = form.querySelectorAll("div.gfield--type-hidden input[type='hidden']");
            if (orderInput.length > 0 && order_id) {
                orderInput.forEach(input => {
                    if (!input.value && order_id.trim() !== "") {
                        input.value = order_id.trim();
                    }
                });
            }
        });
    }

    fillForms();

    const observer = new MutationObserver(fillForms);
    observer.observe(document.body, { childList: true, subtree: true });
});
