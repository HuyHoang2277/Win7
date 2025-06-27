export function openNotepad() {
  const windowDiv = document.createElement('div');
  windowDiv.classList.add('window');

  windowDiv.innerHTML = `
    <div class="title-bar">
      <span>Notepad</span>
      <button onclick="this.parentElement.parentElement.remove()">X</button>
    </div>
    <textarea style="width: 100%; height: 300px;"></textarea>
  `;

  document.body.appendChild(windowDiv);
}
