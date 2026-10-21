// Retained page initialization; execution order is significant.

(function () {
  // Prevent double initialization if block is duplicated
  if (window.pbrClickVideoInit) return;
  window.pbrClickVideoInit = true;

  document.addEventListener('click', function (event) {
    var wrapper = event.target.closest('.click-video');
    if (!wrapper) return;

    if (wrapper.dataset.played === '1') return;

    var embedUrl = wrapper.getAttribute('data-embed');
    if (!embedUrl) return;

    var iframe = document.createElement('iframe');
    iframe.className = 'click-video__layer click-video__iframe';
    iframe.src = embedUrl;
    iframe.setAttribute(
      'allow',
      'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
    );
    iframe.setAttribute('allowfullscreen', 'true');
    iframe.setAttribute('loading', 'lazy');
    iframe.title = 'Embedded video';

    wrapper.innerHTML = '';
    wrapper.appendChild(iframe);
    wrapper.dataset.played = '1';
  });
})();
