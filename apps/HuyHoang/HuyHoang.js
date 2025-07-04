import { 
  makeWindowDraggable, 
  makeWindowResizable,
  addToTaskbar,
  bringToFront
} from '../../js/windowUtils.js';


export function initComputer() {
  const icon = document.getElementById('Computer');
  if (icon) {
    icon.addEventListener('dblclick', launchComputer);
  }
}

export function launchComputer() {
  const windowHTML = `
    <div class="myself-window window">
      <div class="title-bar myself-bar">
        <span>Myself</span>
        <button class="close-btn">✕</button>
      </div>
      <div class="myself-body">
        <img id="img-myself" src="/assets/abc.jpg" alt="My Avatar" />
        <h3>Nguyễn Huy Hoàng</h3>

        <p class="bio">
          Hi! I’m a bla bla :))
        </p>

        <h4>Contact</h4>
        <ul class="link-list">
          <li><a href="https://www.facebook.com/huyhoangisidiot/" target="_blank">Facebook</a></li>
          <li><a href="https://www.instagram.com/huy._.hoang._/" target="_blank">Instagram</a></li>
          <li><a href="https://github.com/HuyHoang2277" target="_blank">Github</a></li>
        </ul>

        <h4>Học vấn</h4>
        <ul class="edu-list">
          <li>THPT Lê Hồng Phong - Thái Nguyên</li>
          <li>Đại học công nghiệp Hà Nội</li>
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
  addToTaskbar('computer', 'assets/icons/computer.ico', windowEl);

  const closeBtn = windowEl.querySelector('.close-btn');
  closeBtn?.addEventListener('click', () => {
  windowEl.remove();

  const taskIcon = document.querySelector(`.taskbar-icon[data-app="computer"]`);
  if (taskIcon) taskIcon.remove();
  });
}