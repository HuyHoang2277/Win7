import {
  makeWindowDraggable,
  makeWindowResizable,
  addToTaskbar,
  bringToFront
} from '../../js/windowUtils.js';


export function initNotepad() {
  const icon = document.getElementById('notepad-icon');
  if (icon) {
    icon.addEventListener('dblclick', launchNotepad);
  }
}

export function launchNotepad() {
  let windowEl = document.getElementById('notepad-window');

  if (windowEl) {
    windowEl.style.display = 'flex';
    bringToFront(windowEl);
    return;
  }

  const windowHTML = `
    <div class="window notepad-window" id="notepad-window">
      <div class="title-bar notepad-bar">
        <span>Notepad</span>
        <button class="close-btn">✕</button>
      </div>
      <div class="notepad_bar">
        <ul>
          <li>File</li>
          <li>Edit</li>
          <li>Format</li>
          <li>View</li>
          <li>Help</li>
        </ul>
      </div>
      <div class="notepad-body">
        <textarea placeholder="Start typing..." autofocus></textarea>
      </div>
    </div>
  `;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = windowHTML;
  windowEl = wrapper.firstElementChild;

  document.getElementById('desktop').appendChild(windowEl);
  windowEl.style.display = 'flex';

  makeWindowDraggable(windowEl);
  makeWindowResizable(windowEl);
  addToTaskbar('notepad', 'assets/icons/notepad_2.ico', windowEl);

  const closeBtn = windowEl.querySelector('.close-btn');
  closeBtn?.addEventListener('click', () => {
    windowEl.remove();

    const taskIcon = document.querySelector(`.taskbar-icon[data-app="notepad"]`);
    if (taskIcon) taskIcon.remove();
  });
}
