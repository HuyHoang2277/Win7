export function createWindow(title, content) {
  const win = document.createElement('div');
  win.className = 'window';
  win.innerHTML = `
    <div class="title-bar">
      <span>${title}</span>
      <button class="close-btn">×</button>
    </div>
    <div class="window-body">${content}</div>
  `;
  document.body.appendChild(win);
}
