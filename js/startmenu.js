export function initStartMenu() {
  const startButton = document.getElementById('start-button');
  const startMenu = document.getElementById('start-menu');

  startMenu.innerHTML = `
    <div class="start-body">
      <div class="start-left">
        <ul class="start-apps">
          <li><img src="assets/icons/snipping.png" /> Snipping Tool</li>
          <li><img src="assets/icons/gettingstarted.png" /> Getting Started</li>
          <li><img src="assets/icons/wmc.png" /> Windows Media Center</li>
          <li><img src="assets/icons/calculator.png" /> Calculator</li>
          <li><img src="assets/icons/sticky.png" /> Sticky Notes</li>
        </ul>

        <div class="start-footer">
          <input type="text" placeholder="Search programs and files..." />
        </div>
      </div>

      <div class="start-right">
        <ul>
          <li>Documents</li>
          <li>Pictures</li>
          <li>Music</li>
          <li>Games</li>
          <li>Computer</li>
          <li>Control Panel</li>
          <li>Devices and Printers</li>
          <li>Default Programs</li>
          <li>Help and Support</li>
        </ul>
        <div class="shutdown-wrapper">
          <button id="shutdown-btn">Shut down</button>
        </div>
      </div>

    </div>
  `;

  startButton.addEventListener('click', (e) => {
    e.stopPropagation();
    startMenu.classList.toggle('visible');
  });

  document.addEventListener('click', (e) => {
    if (!startMenu.contains(e.target) && !startButton.contains(e.target)) {
      startMenu.classList.remove('visible');
    }
  });
}
