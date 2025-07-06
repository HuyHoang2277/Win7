import {
  makeWindowDraggable,
  makeWindowResizable,
  addToTaskbar,
  bringToFront
} from '../../js/windowUtils.js';

export function initPaint() {
  const icon = document.getElementById('paint-icon');
  if (icon) {
    icon.addEventListener('dblclick', launchPaint);
  }
}

export function launchPaint() {
  const windowHTML = `
    <div id="paint-window" class="window paint-window">
      <div class="title-bar paint-bar">
        <span>Paint</span>
        <button class="close-btn">✕</button>
      </div>
      <div class="paint-body">
        <iframe src="https://paint.js.org/" style="width:100%; height:100%; border:none;"></iframe>
      </div>
    </div>
  `;

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = windowHTML;
  const windowEl = tempDiv.firstElementChild;

  document.getElementById('desktop').appendChild(windowEl);
  windowEl.style.display = 'flex';

  makeWindowDraggable(windowEl);
  makeWindowResizable(windowEl);
  addToTaskbar('paint', 'assets/icons/mspaint_2.ico', windowEl);

  const closeBtn = windowEl.querySelector('.close-btn');
  closeBtn?.addEventListener('click', () => {
    windowEl.remove();

    const taskIcon = document.querySelector(`.taskbar-icon[data-app="paint"]`);
    if (taskIcon) taskIcon.remove();
  });
}

