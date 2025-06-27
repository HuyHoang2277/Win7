import { createTaskbar } from './taskbar.js';
import { createStartMenu } from './startMenu.js';
import { createDesktop } from './desktop.js';

window.addEventListener('DOMContentLoaded', () => {
  createTaskbar();
  createStartMenu();
  createDesktop();
});
