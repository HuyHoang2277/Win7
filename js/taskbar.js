export function createTaskbar() {
  const taskbar = document.getElementById('taskbar');

  const startButton = document.createElement('button');
  startButton.id = 'start-button';

  startButton.addEventListener('click', () => {
    const startMenu = document.getElementById('start-menu');
    if (startMenu) {
      startMenu.classList.toggle('visible');
    }
  });

  document.addEventListener('click', (e) => {
    const startMenu = document.getElementById('start-menu');
    if (
      startMenu &&
      !startMenu.contains(e.target) &&
      !startButton.contains(e.target)
    ) {
      startMenu.classList.remove('visible');
    }
  });

  taskbar.appendChild(startButton);
}
