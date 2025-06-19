var audio = {
    init: function () {
        var $that = this;
        $(function () {
            $that.components.media();
        });
    },
    components: {
        media: function (target) {
            var media = $('audio.fc-media', (target !== undefined) ? target : 'body');
            if (media.length) {
                media.mediaelementplayer({
                    audioHeight: 40,
                    features: ['playpause', 'current', 'duration', 'progress', 'volume', 'tracks', 'fullscreen'],
                    alwaysShowControls: true,
                    timeAndDurationSeparator: '<span></span>',
                    iPadUseNativeControls: true,
                    iPhoneUseNativeControls: true,
                    AndroidUseNativeControls: true
                });
            }
        },

    },
};

audio.init();

$(document).ready(function () {
    // Initialisation du lecteur MediaElement.js
    $('audio.fc-media').mediaelementplayer({
        features: ['playpause', 'current', 'progress', 'duration', 'tracks', 'volume', 'fullscreen']
    });

    // Gestion des clics sur les éléments de la playlist
    $('.playlist-item').on('click', function () {
        // Supprimer la classe 'active' de tous les éléments
        $('.playlist-item').removeClass('active');
        // Ajouter la classe 'active' à l'élément cliqué
        $(this).addClass('active');

        // Récupérer les données du morceau cliqué
        var audioSrc = $(this).data('src');
        var imgSrc = $(this).data('img');
        var title = $(this).data('title');
        var artist = $(this).data('artist');

        // Mettre à jour le lecteur principal
        var player = $('audio.fc-media')[0].player; // Accéder à l'instance du lecteur MediaElement.js

        // Vérifier si le lecteur est bien initialisé
        if (player) {
            player.setSrc(audioSrc); // Changer la source audio
            player.load();           // Charger le nouveau morceau
            player.play();           // Lancer la lecture

            // Mettre à jour les informations du morceau dans le lecteur
            $('.music-player .cover img').attr('src', imgSrc);
            $('.music-player .titre h3').text(artist);
            $('.music-player .titre h1').text(title);
        } else {
            console.error("MediaElement.js player not initialized.");
            // Si le player n'est pas trouvé, vous pourriez re-initialiser ou montrer un message d'erreur
            // $('audio.fc-media').mediaelementplayer({...});
        }
    });

    // Mettre en surbrillance le morceau actuellement chargé au démarrage
    // Ceci est un peu plus complexe car page_obj ne renvoie qu'un seul élément.
    // Vous devrez peut-être extraire l'ID du morceau courant ou une autre donnée unique.
    // Pour l'instant, on se base sur le premier élément de page_obj si présent.
    var current_title = $('.music-player .titre h1').text().trim();
    $('.playlist-item').each(function () {
        if ($(this).data('title') === current_title) {
            $(this).addClass('active');
            // Optionnel: faire défiler la playlist pour que l'élément actif soit visible
            // $(this)[0].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            return false; // Sortir de la boucle each
        }
    });

});