// Retained page initialization; execution order is significant.
document.addEventListener('DOMContentLoaded', function() {
  function initCompareScript() {
    const select1 = document.getElementById('compareSelect1');
    const select2 = document.getElementById('compareSelect2');
    const allCols = ['vip', 'no-brainer', 'all-access-package', 'bundle'];

    if (!select1 || !select2) return; // safety

    // Default selections
    select1.value = 'vip';
    select2.value = 'no-brainer';

    updateDropdownOptions();
    updateVisibleColumns();

    function updateDropdownOptions() {
      const v1 = select1.value;
      const v2 = select2.value;

      [...select1.options].forEach(opt => {
        opt.style.display = (opt.value === v2) ? 'none' : '';
      });

      [...select2.options].forEach(opt => {
        opt.style.display = (opt.value === v1) ? 'none' : '';
      });
    }

    function updateVisibleColumns() {
      const val1 = select1.value;
      const val2 = select2.value;

      allCols.forEach(col => {
        const colEl = document.querySelector('.' + col);
        if (!colEl) return;

        if (col === val1) {
          colEl.classList.remove('hidden');
          colEl.style.order = '2';
        } else if (col === val2) {
          colEl.classList.remove('hidden');
          colEl.style.order = '3';
        } else {
          colEl.classList.add('hidden');
          colEl.style.order = '';
        }
      });

      const infoCol = document.querySelector('.info');
      if (infoCol) infoCol.classList.remove('hidden');
    }

    select1.addEventListener('change', () => {
      if (select1.value === select2.value) {
        for (let opt of select2.options) {
          if (opt.value !== select1.value && opt.style.display !== 'none') {
            select2.value = opt.value;
            break;
          }
        }
      }
      updateDropdownOptions();
      updateVisibleColumns();
    });

    select2.addEventListener('change', () => {
      if (select2.value === select1.value) {
        for (let opt of select1.options) {
          if (opt.value !== select2.value && opt.style.display !== 'none') {
            select1.value = opt.value;
            break;
          }
        }
      }
      updateDropdownOptions();
      updateVisibleColumns();
    });
  }

  // ✅ Only run below or equal to 1024px
  function handleResponsiveCompare() {
    if (window.innerWidth <= 5000) {
      initCompareScript();
    } else {
      // Remove hidden/order styles when screen > 1024px
      const cols = document.querySelectorAll('.vip, .no-brainer, .all-access-package, .bundle, .info');
      cols.forEach(el => {
        el.classList.remove('hidden');
        el.style.order = '';
      });
    }
  }

  // Initial check
  handleResponsiveCompare();

  // Recheck on resize (optional)
  window.addEventListener('resize', function() {
    handleResponsiveCompare();
  });

});
