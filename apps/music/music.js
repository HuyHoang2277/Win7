import {
  makeWindowDraggable,
  makeWindowResizable,
  addToTaskbar,
  bringToFront
} from '../../js/windowUtils.js';

export function initMusic() {
  const icon = document.getElementById('Music');
  if (icon) {
    icon.addEventListener('dblclick', launchMusic);
  }
}

export function launchMusic() {
  let windowEl = document.getElementById('music-window');
  if (windowEl) {
    windowEl.style.display = 'flex';
    bringToFront(windowEl);
    return;
  }

  const windowHTML = `
    <div class="window music-window" id="music-window">
      <div class="title-bar music-bar">
        <span>Music</span>
        <button class="close-btn">✕</button>
      </div>
      <div class="music-body">
        <div class="song-header">
          <button class="toggle-playlist">&#9776;</button>
        </div>

        <div class="song">
          <img src="" alt="cover" class="cover">
          <div class="song-title">Chưa có bài</div>
          <div class="song-artist">--</div>
        </div>

        <div class="btn-controller">
          <input type="range" min="0" max="100" value="0" class="seek-bar">
          <div class="time-display">
            <span class="current-time">0:00</span> / <span class="duration">0:00</span>
          </div>
          <div class="buttons">
            <button id="back">⏮</button>
            <button id="play">▶</button>
            <button id="next">⏭</button>
          </div>
          <div class="volume-control">
            🔉 <input type="range" min="0" max="1" step="0.01" value="1" class="volume-bar">
          </div>
        </div>

        <div class="playlist" id="playlist-box">
          <ul class="playlist-list"></ul>
        </div>
      </div>
    </div>
  `;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = windowHTML;
  windowEl = wrapper.firstElementChild;
  document.getElementById('desktop').appendChild(windowEl);
  windowEl.style.display = 'flex';

  makeWindowDraggable(windowEl);
  makeWindowResizable(windowEl);
  addToTaskbar('music', 'assets/icons/music.ico', windowEl);

  const audio = new Audio();
  const closeBtn = windowEl.querySelector('.close-btn');
  const coverEl = windowEl.querySelector('.cover');
  const titleEl = windowEl.querySelector('.song-title');
  const artistEl = windowEl.querySelector('.song-artist');
  const playBtn = windowEl.querySelector('#play');
  const backBtn = windowEl.querySelector('#back');
  const nextBtn = windowEl.querySelector('#next');
  const playlistToggle = windowEl.querySelector('.toggle-playlist');
  const playlistBox = windowEl.querySelector('#playlist-box');
  const playlistUl = windowEl.querySelector('.playlist-list');
  const seekBar = windowEl.querySelector('.seek-bar');
  const currentTimeEl = windowEl.querySelector('.current-time');
  const durationEl = windowEl.querySelector('.duration');
  const volumeBar = windowEl.querySelector('.volume-bar');

  class Song {
    constructor(title, artist, src, cover) {
      this.title = title;
      this.artist = artist;
      this.src = src;
      this.cover = cover;
    }
  }

  const playlist = [
    new Song("Last Time", "Drt", "assets/audio/LasttimeDrt.mp3", "assets/imgMusic/drt.webp"),
    new Song("Let Go", "Beau Young Prince", "assets/audio/LetGoBeau.m4a", "assets/imgMusic/LetGo.jfif"),
    new Song("Nào biết đâu", "Lil Wuyn", "assets/audio/NaobietdauLil.mp3", "assets/imgMusic/lilwuyn.jfif"),
    new Song("Xuất phát điểm", "Obito", "assets/audio/Xuatphatdiem.mp3", "assets/imgMusic/obito.webp"),
    new Song("10 ngàn năm", "PC", "assets/audio/10ngannam.mp3", "assets/imgMusic/pc.jpg"),
    new Song("Rồi 1 ngày", "Dewie", "assets/audio/roi1ngay.mp3", "assets/imgMusic/dewie.webp"),
    new Song("Ai Mới Là Kẻ Xa", "MCK", "assets/audio/aimoilakexauxa.mp3", "assets/imgMusic/mck.jfif")
];

  playlist.sort((a, b) => a.title.localeCompare(b.title));
  let currentTrack = 0;

  function loadTrack(index) {
    const track = playlist[index];
    audio.src = track.src;
    coverEl.src = track.cover;
    titleEl.textContent = track.title;
    artistEl.textContent = track.artist;
    updatePlaylistHighlight();
    playBtn.textContent = '▶';
    coverEl.classList.remove('rotating');
  }

  function updatePlaylistHighlight() {
    playlistUl.querySelectorAll('li').forEach((li, i) => {
      li.classList.toggle('playing', i === currentTrack);
    });
  }

  playBtn.addEventListener('click', () => {
    if (!audio.src) loadTrack(currentTrack);
    if (audio.paused) {
      audio.play();
      playBtn.textContent = '⏸';
      coverEl.classList.add('rotating');
    } else {
      audio.pause();
      playBtn.textContent = '▶';
      coverEl.classList.remove('rotating');
    }
  });

  backBtn.addEventListener('click', () => {
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrack);
    audio.play();
    playBtn.textContent = '⏸';
    coverEl.classList.add('rotating');
  });

  nextBtn.addEventListener('click', () => {
    currentTrack = (currentTrack + 1) % playlist.length;
    loadTrack(currentTrack);
    audio.play();
    playBtn.textContent = '⏸';
    coverEl.classList.add('rotating');
  });

  playlistToggle.addEventListener('click', () => {
    playlistBox.classList.toggle('show');
  });

  playlist.forEach((song, index) => {
    const li = document.createElement('li');
    li.textContent = song.title;
    li.addEventListener('click', () => {
      currentTrack = index;
      loadTrack(currentTrack);
      audio.play();
      playBtn.textContent = '⏸';
      coverEl.classList.add('rotating');
    });
    playlistUl.appendChild(li);
  });

  audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
      seekBar.value = (audio.currentTime / audio.duration) * 100;
      currentTimeEl.textContent = formatTime(audio.currentTime);
      durationEl.textContent = formatTime(audio.duration);
    }
  });

  seekBar.addEventListener('input', () => {
    if (audio.duration) {
      audio.currentTime = (seekBar.value / 100) * audio.duration;
    }
  });

  volumeBar.addEventListener('input', () => {
    audio.volume = volumeBar.value;
  });

  audio.addEventListener('ended', () => {
    currentTrack = (currentTrack + 1) % playlist.length;
    loadTrack(currentTrack);
    audio.play();
    coverEl.classList.add('rotating');
  });

  closeBtn?.addEventListener('click', () => {
    audio.pause();
    audio.currentTime = 0;
    coverEl.classList.remove('rotating');
    windowEl.remove();
    const taskIcon = document.querySelector(`.taskbar-icon[data-app="music"]`);
    if (taskIcon) taskIcon.remove();
  });

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  loadTrack(currentTrack);
}
