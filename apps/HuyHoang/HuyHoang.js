import { makeWindowDraggable, makeWindowResizable } from '../../js/windowUtils.js';


export function initComputer() {
  const icon = document.getElementById('Computer');
  if (icon) {
    icon.addEventListener('dblclick', launchComputer);
  }
}

export function launchComputer() {
  const windowHTML = `
    <div class="myself-window">
    <div class="title-bar">
        <span>Myself</span>
            <button class="close-btn">✕</button>
        </div>
        <div class="myself-body">
          <img id="img-myself" src="/assets/abc.jpg" alt="">
          <h3>Nguyễn Huy Hoàng</h3>
          <ul>
            <li>
              <a href="https://www.facebook.com/huyhoangisidiot/" target="_blank">Facebook</a>
            </li>
            <li>
              <a href="https://www.instagram.com/huy._.hoang._/" target="_blank">Instagram</a>
            </li>
          </ul>
        </div>
    </div>
  `;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = windowHTML;
  const windowEl = wrapper.firstElementChild;

  document.getElementById('desktop').appendChild(windowEl);
  windowEl.style.display = 'flex';

  makeWindowDraggable(windowEl);

  const closeBtn = windowEl.querySelector('.close-btn');
  closeBtn?.addEventListener('click', () => {
    windowEl.remove();
  });
}