export function initStartMenu() {
  const startButton = document.getElementById('start-button');
  const startMenu = document.getElementById('start-menu');

  startButton.addEventListener('click', () => {
    startMenu.classList.toggle('visible');
    startMenu.style.display = startMenu.classList.contains('visible') ? 'flex' : 'none';
  });

  const shutdownBtn = document.getElementById('shutdown-btn');
  shutdownBtn.addEventListener('click', () => {
    alert("Shutting down...");
  });
}
