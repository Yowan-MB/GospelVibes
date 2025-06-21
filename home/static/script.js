document.addEventListener('DOMContentLoaded', function () {
    console.log('🎶 script.js chargé');

    const player = new Audio();
    let currentButton = null;

    // Éléments principaux
    const titleElem = document.querySelector('.titre h1');
    const artistElem = document.querySelector('.titre h3');
    const coverImg = document.querySelector('.cover img');
    const container = document.querySelector('.music-player');

    const playBtn = document.getElementById('main-play-btn');
    const progressBar = document.getElementById('progress-bar');
    const currentTime = document.getElementById('current-time');
    const totalDuration = document.getElementById('total-duration');

    const volumeControl = document.getElementById('volume-control');
    const volumeIcon = document.getElementById('volume-icon');

    const nextBtn = document.getElementById('next-track');
    const prevBtn = document.getElementById('prev-track');

    const playlist = Array.from(document.querySelectorAll('.play-button'));

    // Volume initial
    player.volume = volumeControl?.value || 1;

    volumeControl?.addEventListener('input', () => {
        const vol = volumeControl.value;
        player.volume = vol;
        if (vol == 0) volumeIcon.className = 'fa fa-volume-mute';
        else if (vol < 0.5) volumeIcon.className = 'fa fa-volume-down';
        else volumeIcon.className = 'fa fa-volume-up';
    });

    // Met à jour le visuel
    function updateDisplay(title, artist, img) {
        if (titleElem) titleElem.textContent = title;
        if (artistElem) artistElem.textContent = artist;
        if (coverImg && img) coverImg.src = img;
    }

    // Lecture à partir d’un bouton
    function loadAndPlay(button) {
        if (!button) return;
        const icon = button.querySelector('i');
        const src = button.dataset.url;
        const title = button.dataset.title;
        const artist = button.dataset.artist;
        const img = button.dataset.img;
        if (!src) return;

        document.querySelectorAll('.play-button').forEach(btn => {
            const i = btn.querySelector('i');
            btn.classList.remove('active');
            i?.classList.remove('fa-pause', 'rotate');
            i?.classList.add('fa-play');
        });

        player.src = src;
        player.load();
        player.play().then(() => {
            icon.classList.remove('fa-play');
            icon.classList.add('fa-pause', 'rotate');
            playBtn?.querySelector('i')?.classList.replace('fa-play', 'fa-pause');
            button.classList.add('active');
            currentButton = button;
            updateDisplay(title, artist, img);
        });

        container.style.opacity = '0.2';
        setTimeout(() => container.style.opacity = '1', 250);
    }

    // Bouton suivant
    nextBtn?.addEventListener('click', () => {
        if (!currentButton) return loadAndPlay(playlist[0]);
        const i = playlist.indexOf(currentButton);
        const next = playlist[i + 1] || playlist[0];
        loadAndPlay(next);
    });

    // Bouton précédent
    prevBtn?.addEventListener('click', () => {
        if (!currentButton) return loadAndPlay(playlist[0]);
        const i = playlist.indexOf(currentButton);
        const prev = playlist[i - 1] || playlist[playlist.length - 1];
        loadAndPlay(prev);
    });

    // Lecture via boutons playlist
    playlist.forEach(button => {
        button.addEventListener('click', () => {
            const isSame = button === currentButton;
            const icon = button.querySelector('i');
            if (isSame && !player.paused) {
                player.pause();
                icon.classList.remove('fa-pause', 'rotate');
                icon.classList.add('fa-play');
                playBtn?.querySelector('i')?.classList.replace('fa-pause', 'fa-play');
                return;
            }
            loadAndPlay(button);
        });
    });

    // Contrôle principal
    playBtn?.addEventListener('click', () => {
        if (!player.src) return loadAndPlay(playlist[0]);

        if (player.paused) {
            player.play();
            playBtn.querySelector('i')?.classList.replace('fa-play', 'fa-pause');
            const icon = currentButton?.querySelector('i');
            icon?.classList.replace('fa-play', 'fa-pause');
            icon?.classList.add('rotate');
        } else {
            player.pause();
            playBtn.querySelector('i')?.classList.replace('fa-pause', 'fa-play');
            const icon = currentButton?.querySelector('i');
            icon?.classList.replace('fa-pause', 'fa-play');
            icon?.classList.remove('rotate');
        }
    });

    // Barre de progression & temps
    player.addEventListener('loadedmetadata', () => {
        progressBar.max = Math.floor(player.duration);
        totalDuration.textContent = formatTime(player.duration);
    });

    player.addEventListener('timeupdate', () => {
        progressBar.value = Math.floor(player.currentTime);
        currentTime.textContent = formatTime(player.currentTime);
    });

    progressBar?.addEventListener('input', () => {
        player.currentTime = progressBar.value;
    });

    // Fin automatique
    player.addEventListener('ended', () => {
        currentButton?.querySelector('i')?.classList.remove('fa-pause', 'rotate');
        currentButton?.querySelector('i')?.classList.add('fa-play');
        playBtn?.querySelector('i')?.classList.replace('fa-pause', 'fa-play');
        currentButton?.classList.remove('active');
        currentButton = null;
    });

    function formatTime(secs) {
        const min = Math.floor(secs / 60);
        const sec = Math.floor(secs % 60).toString().padStart(2, '0');
        return `${min}:${sec}`;
    }

    // Playlist toggle
    const toggleBtn = document.getElementById('playlist-btn');
    const trackList = document.getElementById('track-list');
    const trackTitle = document.getElementById('track-list-title');

    toggleBtn?.addEventListener('click', () => {
        if (!trackList || !trackTitle) return;
        const isVisible = trackList.style.display === 'block';
        trackList.style.display = isVisible ? 'none' : 'block';
        trackTitle.style.display = isVisible ? 'none' : 'block';
        if (!isVisible) trackTitle.scrollIntoView({ behavior: 'smooth' });
    });

    // 🍔 Menu mobile sidebar
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    menuToggle?.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        document.body.classList.toggle('sidebar-open');
    });

    document.body.addEventListener('click', (e) => {
        if (
            document.body.classList.contains('sidebar-open') &&
            !e.target.closest('.sidebar') &&
            !e.target.closest('#menu-toggle')
        ) {
            sidebar.classList.remove('open');
            document.body.classList.remove('sidebar-open');
        }
    });
});