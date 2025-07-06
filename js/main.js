import { initStartMenu } from './startMenu.js';
import { initClock } from './clock.js';
import { initNotepad } from '../apps/notepad/notepad.js';
import { initPaint } from '../apps/paint/paint.js';
import { initComputer } from '../apps/HuyHoang/HuyHoang.js';
import { makeIconDraggable } from './windowUtils.js';
import { initMusic } from '../apps/music/music.js';
const gap = 90;


document.querySelectorAll('.desktop-icon').forEach((icon, index) => {
  icon.style.position = 'absolute';
  icon.style.left = '5px';
  icon.style.top = `${5 + index * 80}px`;
  makeIconDraggable(icon);
});

initMusic();
initClock();
initStartMenu();
initNotepad();
initPaint();
initComputer();