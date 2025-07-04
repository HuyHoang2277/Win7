let currentZIndex = 300;

export function makeWindowDraggable(windowEl) {
  const titleBar = windowEl.querySelector('.title-bar');
  let isDragging = false, offsetX = 0, offsetY = 0;

  titleBar?.addEventListener('mousedown', (e) => {
    isDragging = true;
    const rect = windowEl.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    bringToFront(windowEl);
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      windowEl.style.left = `${e.clientX - offsetX}px`;
      windowEl.style.top = `${e.clientY - offsetY}px`;
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });

  windowEl.addEventListener('mousedown', () => bringToFront(windowEl));
}

export function makeWindowResizable(windowEl) {
  const resizer = document.createElement('div');
  resizer.style.width = '12px';
  resizer.style.height = '12px';
  resizer.style.position = 'absolute';
  resizer.style.right = '0';
  resizer.style.bottom = '0';
  resizer.style.cursor = 'se-resize';
  resizer.style.zIndex = '10';
  windowEl.appendChild(resizer);

  let isResizing = false;

  resizer.addEventListener('mousedown', (e) => {
    isResizing = true;
    e.preventDefault();
    e.stopPropagation();
  });

  document.addEventListener('mousemove', (e) => {
    if (isResizing) {
      const rect = windowEl.getBoundingClientRect();
      windowEl.style.width = `${e.clientX - rect.left}px`;
      windowEl.style.height = `${e.clientY - rect.top}px`;
    }
  });

  document.addEventListener('mouseup', () => {
    isResizing = false;
  });
}

function bringToFront(windowEl) {
  document.querySelectorAll('.window').forEach(w => w.classList.remove('active'));
  windowEl.classList.add('active');
  windowEl.style.zIndex = ++currentZIndex;
}

export function makeIconDraggable(iconEl) {
  let isDragging = false, offsetX = 0, offsetY = 0;

  iconEl.style.position = 'absolute';

  iconEl.addEventListener('mousedown', (e) => {
    isDragging = true;
    const rect = iconEl.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      iconEl.style.left = `${e.clientX - offsetX}px`;
      iconEl.style.top = `${e.clientY - offsetY}px`;
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });
}