document.addEventListener('DOMContentLoaded', function () {
    console.log('✅ script.js bien chargé');

    // Initialisation du lecteur MediaElement
    $('audio.fc-media').mediaelementplayer({
        features: ['playpause', 'current', 'duration', 'progress', 'volume', 'tracks'],
        audioHeight: 40,
        alwaysShowControls: true,
        timeAndDurationSeparator: '<span></span>',
        iPadUseNativeControls: true,
        iPhoneUseNativeControls: true,
        AndroidUseNativeControls: true,
        success: function (mediaElement, originalNode) {
            const audioPlayer = mediaElement;
            const container = document.querySelector('.music-player');
            const titleElem = container.querySelector('.titre h1');
            const artistElem = container.querySelector('.titre h3');
            const coverImg = container.querySelector('.cover img');

            document.querySelectorAll('.play-button').forEach(btn => {
                btn.addEventListener('click', () => {
                    const parent = btn.closest('.track-item');
                    const src = btn.dataset.url || btn.dataset.src;
                    const title = btn.dataset.title;
                    const artist = btn.dataset.artist;
                    const img = btn.dataset.img || coverImg?.src;

                    container.style.opacity = '0.2';
                    setTimeout(() => {
                        audioPlayer.setSrc(src);
                        audioPlayer.load();
                        audioPlayer.play();

                        if (img) coverImg.src = img;
                        titleElem.textContent = title;
                        artistElem.textContent = artist;

                        container.style.opacity = '1';
                    }, 300);

                    document.querySelectorAll('.track-item').forEach(e => e.classList.remove('playing'));
                    parent?.classList.add('playing');
                });
            });
        }
    });

    // Correction du sélecteur de titre
    const toggleBtn = document.getElementById('playlist-btn');
    const listContainer = document.getElementById('track-list-container');
    const listTitle = document.getElementById('track-list-title'); // <- Correct ID ici

    toggleBtn?.addEventListener('click', () => {
        const isVisible = listContainer.style.display === 'block';
        listContainer.style.display = isVisible ? 'none' : 'block';
        listTitle.style.display = isVisible ? 'none' : 'block';
        if (!isVisible) listTitle.scrollIntoView({ behavior: 'smooth' });
    });

    // Logs pour les clics (debug)
    document.querySelectorAll('.play-button').forEach(button => {
        button.addEventListener('click', () => {
            console.log('[Play] Bouton cliqué pour la lecture :', button.dataset.title);
        });
    });
});
