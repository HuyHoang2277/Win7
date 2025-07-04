import { makeWindowDraggable, makeWindowResizable } from '../../js/windowUtils.js';

export function initNotepad() {
  const icon = document.getElementById('notepad-icon');
  if (icon) {
    icon.addEventListener('dblclick', launchNotepad);
  }
}

export function launchNotepad() {
  const windowHTML = `
    <div class="window">
      <div class="title-bar">
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
      <div class="window-body">
        <textarea placeholder="Start typing..." autofocus></textarea>
      </div>
    </div>
  `;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = windowHTML;
  const windowEl = wrapper.firstElementChild;

  document.getElementById('desktop').appendChild(windowEl);
  windowEl.style.display = 'flex';

  makeWindowDraggable(windowEl);
  makeWindowResizable(windowEl);

  const closeBtn = windowEl.querySelector('.close-btn');
  closeBtn?.addEventListener('click', () => {
    windowEl.remove();
  });
}
