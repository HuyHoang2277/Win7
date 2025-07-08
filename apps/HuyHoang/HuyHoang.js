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
      <div class="window profile-window" id="profile-window">
      <div class="title-bar profile-bar">
        <span>My Profile</span>
        <button class="close-btn">✕</button>
      </div>
      <div class="profile-body">
        <img src="assets/abcd.jpg" alt="My Avatar" />
        <h3>Nguyễn Huy Hoàng</h3>

        <p class="bio">Hi! I’m a bla bla :))</p>

        <h4>Contact</h4>
        <ul class="link-list">
          <li><a href="#">Facebook</a></li>
          <li><a href="#">Instagram</a></li>
          <li><a href="#">GitHub</a></li>
        </ul>

        <h4>Học vấn</h4>
        <ul class="edu-list">
          <li>THPT Lê Hồng Phong</li>
          <li>Đại học Công nghiệp Hà Nội</li>
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