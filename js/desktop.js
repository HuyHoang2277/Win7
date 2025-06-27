export function createDesktop() {
  const desktop = document.createElement('div');
  desktop.id = 'desktop';
  desktop.style.position = 'absolute';
  desktop.style.top = '0';
  desktop.style.left = '0';
  desktop.style.right = '0';
  desktop.style.bottom = '40px';
  document.body.appendChild(desktop);
}

export function addDesktopIcon({ icon, label, onClick }) {
  const desktop = document.getElementById('desktop');

  const iconDiv = document.createElement('div');
  iconDiv.classList.add('desktop-icon');

  iconDiv.innerHTML = `
    <img src="${icon}" alt="${label}" style="width: 48px; height: 48px;"><br>
    <span>${label}</span>
  `;

  iconDiv.addEventListener('dblclick', onClick);

  desktop.appendChild(iconDiv);
}