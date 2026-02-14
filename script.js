// ===== Configuration =====
const CONFIG = {
    password: 'NurgulablaIPhOGold',
    songs: [
        {
            title: 'Out Of My League',
            artist: 'Fitz and The Tantrums',
            src: 'https://fizik2205.github.io/website/OutofMyLeague.mp3.mpeg'
        },
        {
            title: 'The Lost Song',
            artist: 'The Cat Empire',
            src: 'https://fizik2205.github.io/website/TheLostSong.mp3'
        },
        {
            title: 'Zhanbyr',
            artist: 'Kunzharyq',
            src: 'https://fizik2205.github.io/website/zhanbyr.mp3'
        },
        {
            title: 'Tulamaidy',
            artist: 'Kunzharyq',
            src: 'https://fizik2205.github.io/website/Tulamaidy.mp3'
        }
    ]
};

// ===== DOM Elements =====
const passwordScreen = document.getElementById('password-screen');
const passwordBox = document.getElementById('password-box');
const welcomeMessage = document.getElementById('welcome-message');
const mainContent = document.getElementById('main-content');
const passwordInput = document.getElementById('password-input');
const unlockBtn = document.getElementById('unlock-btn');
const passwordError = document.getElementById('password-error');

// Tab Navigation
const pillBtns = document.querySelectorAll('.pill-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Music Player
const audioPlayer = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const seekSlider = document.getElementById('seek-slider');
const progressFill = document.getElementById('progress-fill');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const currentSongTitle = document.getElementById('current-song-title');
const currentSongArtist = document.getElementById('current-song-artist');
const vinylDisc = document.querySelector('.vinyl-disc');
const songCards = document.querySelectorAll('.song-card');

// Animations
const rebuildCakeBtn = document.getElementById('rebuild-cake-btn');
const replayBouquetBtn = document.getElementById('replay-bouquet-btn');
const tulips = document.querySelectorAll('.tulip');
const bouquetBow = document.querySelector('.bouquet-bow');

// ===== State =====
let currentSongIndex = 0;
let isPlaying = false;

// ===== Password Transition =====
function unlockSite() {
    const enteredPassword = passwordInput.value.trim();
    if (enteredPassword === CONFIG.password) {
        passwordBox.classList.add('fade-out');
        setTimeout(() => {
            passwordBox.style.display = 'none';
            welcomeMessage.classList.remove('hidden');
            setTimeout(() => welcomeMessage.classList.add('show'), 100);
        }, 500);

        setTimeout(() => {
            passwordScreen.style.opacity = '0';
            setTimeout(() => {
                passwordScreen.classList.add('hidden');
                mainContent.classList.remove('hidden');
                // Auto-play cake animation if it's the default valid tab, 
                // but usually user clicks to see tabs.
            }, 1000);
        }, 3000);
    } else {
        passwordError.textContent = '❌ Try again, Nurgul abla!';
        passwordInput.value = '';
    }
}

unlockBtn.addEventListener('click', unlockSite);
passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') unlockSite();
});

// ===== Navigation =====
pillBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        pillBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const tabId = btn.dataset.tab;
        tabContents.forEach(content => content.classList.remove('active'));
        document.getElementById(`${tabId}-tab`).classList.add('active');

        if (tabId === 'cake') playVectorCake();
        if (tabId === 'flowers') playBouquet();
    });
});

// ===== Music Player Logic =====
function loadSong(index) {
    currentSongIndex = index;
    const song = CONFIG.songs[index];

    currentSongTitle.textContent = song.title;
    currentSongArtist.textContent = song.artist;
    audioPlayer.src = song.src;

    songCards.forEach(card => card.classList.remove('active'));
    songCards[index].classList.add('active');

    if (isPlaying) {
        audioPlayer.play();
        vinylDisc.classList.add('playing');
        playPauseBtn.textContent = '⏸';
    } else {
        playPauseBtn.textContent = '▶';
    }
}

function togglePlay() {
    if (isPlaying) {
        audioPlayer.pause();
        vinylDisc.classList.remove('playing');
        playPauseBtn.textContent = '▶';
    } else {
        audioPlayer.play();
        vinylDisc.classList.add('playing');
        playPauseBtn.textContent = '⏸';
    }
    isPlaying = !isPlaying;
}

playPauseBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + CONFIG.songs.length) % CONFIG.songs.length;
    loadSong(currentSongIndex);
});
nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % CONFIG.songs.length;
    loadSong(currentSongIndex);
});

songCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        loadSong(index);
        if (!isPlaying) togglePlay();
    });
});

audioPlayer.addEventListener('timeupdate', () => {
    const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressFill.style.width = `${percent}%`;
    seekSlider.value = percent;

    let mins = Math.floor(audioPlayer.currentTime / 60);
    let secs = Math.floor(audioPlayer.currentTime % 60);
    currentTimeEl.innerText = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
});

seekSlider.addEventListener('input', (e) => {
    const time = (audioPlayer.duration / 100) * e.target.value;
    audioPlayer.currentTime = time;
});

loadSong(0);

// ===== Vector Cake Animation (Match Image) =====
function playVectorCake() {
    // New logic: Just fade in the candle flame after a delay since the cake is static/vector built
    // Or if we want the "Falling" animation mentioned before, we can keep it?
    // User said "make the cake exactly like the one i attached".
    // Usually implies static visual structure, but earlier asked for falling.
    // I made the layers visually. Let's animate the Candle lighting up mainly.

    const candle = document.querySelector('.v-candle-container');
    candle.classList.remove('show', 'lit');

    // Reset any other anims if we added them?
    // Let's just make the candle appear and light up.
    setTimeout(() => {
        candle.classList.add('show');
        setTimeout(() => candle.classList.add('lit'), 500);
    }, 500);
}

rebuildCakeBtn.addEventListener('click', playVectorCake);

// ===== Bouquet Animation (3 Tulips + Bow) =====
function playBouquet() {
    // Reset
    tulips.forEach(t => t.classList.remove('grow'));
    if (bouquetBow) bouquetBow.classList.remove('show');

    // Play Sequence
    // Delays are handled in CSS var(--d) but we trigger the class here
    setTimeout(() => {
        tulips.forEach(t => t.classList.add('grow'));

        // Show bow after flowers are up (approx 2s max delay + duration)
        // t-right has 1.4s delay + 0.8s duration = 2.2s
        setTimeout(() => {
            if (bouquetBow) bouquetBow.classList.add('show');
        }, 2200);
    }, 100);
}

replayBouquetBtn.addEventListener('click', playBouquet);





