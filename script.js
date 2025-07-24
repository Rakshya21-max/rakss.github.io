// Page navigation
const pages = document.querySelectorAll('.page');
const nextBtn1 = document.getElementById('nextBtn1');
const nextBtn2 = document.getElementById('nextBtn2');
const manualModal = document.getElementById('manualModal');
const openManualBtn = document.getElementById('openManualBtn');
const closeManualBtn = document.getElementById('closeManualBtn');

function showPage(index) {
  pages.forEach((page, i) => {
    page.classList.toggle('active', i === index);
  });
}

nextBtn1.addEventListener('click', () => {
  showPage(1);
});

nextBtn2.addEventListener('click', () => {
  showPage(2);
});

// Open manual modal
openManualBtn.addEventListener('click', () => {
  manualModal.style.display = 'block';
});

// Close manual modal
closeManualBtn.addEventListener('click', () => {
  manualModal.style.display = 'none';
});

// Close modal if clicked outside content
window.addEventListener('click', (e) => {
  if (e.target === manualModal) {
    manualModal.style.display = 'none';
  }
});
