// Retained page initialization; execution order is significant.
let compareExpander = document.querySelector('.reaveal-hide-ht');
if (compareExpander) {
    compareExpander.addEventListener('click', function () {
        document.querySelectorAll('.hide-st').forEach((hideSt)=>{
            hideSt.classList.remove('hide-st');
        });
		compareExpander.classList.add('reveald-st');
		document.querySelector('.compare-secc').classList.add('reveald-more-features');
        compareExpander.classList.remove('hide-st');
    })
}