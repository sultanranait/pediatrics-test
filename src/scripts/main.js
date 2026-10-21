// This project contains only the homepage. Keep every destination on this page.
function normalizeLink(link) {
 const href = link.getAttribute('href') || '';
 const modal = link.matches('.modal-trigger, [data-modal-open], .kt-blocks-modal-link');
 if (!href.startsWith('#') || modal || href === '#get-started' || href === '#quizz') {
  if (href !== '#') link.setAttribute('href', '#');
 }
 link.removeAttribute('target');
}
document.querySelectorAll('a[href]').forEach(normalizeLink);
new MutationObserver(records => {
 for (const record of records) {
  if (record.type === 'attributes' && record.target.matches('a[href]')) normalizeLink(record.target);
  for (const node of record.addedNodes) {
   if (node.nodeType !== 1) continue;
   if (node.matches('a[href]')) normalizeLink(node);
   node.querySelectorAll('a[href]').forEach(normalizeLink);
  }
 }
}).observe(document.documentElement, {subtree:true, childList:true, attributes:true, attributeFilter:['href']});
// Block original popup handlers while allowing the # link to return to the page top.
window.addEventListener('click', event => {
 const target = event.target.closest('a, [data-modal-open], .modal-trigger, .kt-blocks-modal-link, .click-video__play');
 if (!target) return;
 if (target.matches('a')) {
  normalizeLink(target);
  if (target.getAttribute('href') === '#') event.stopImmediatePropagation();
 } else {
  event.preventDefault();
  event.stopImmediatePropagation();
  location.hash = '';
  window.scrollTo({top:0, behavior:'smooth'});
 }
}, true);
window.addEventListener('submit', event => { event.preventDefault(); event.stopImmediatePropagation(); }, true);
// Match the fixed announcement bar height at every breakpoint so it cannot cover navigation.
const announcement = document.getElementById('pbr-preorder-bar');
const wrapper = document.getElementById('wrapper');
if (announcement && wrapper) {
 const fitAnnouncement = () => {
  const height = announcement.getBoundingClientRect().height;
  wrapper.style.paddingTop = height + 'px';
  document.documentElement.style.scrollPaddingTop = (height + 12) + 'px';
 };
 new ResizeObserver(fitAnnouncement).observe(announcement);
 fitAnnouncement();
}
