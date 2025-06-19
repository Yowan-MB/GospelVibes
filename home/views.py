from django.shortcuts import render
from django.core.paginator import Paginator
from .models import Song

def index(request):
    # Récupère toutes les chansons, triées par ID (ordre d'ajout)
    all_music = Song.objects.all().order_by('id')

    # Pagination : 1 chanson par page pour ton lecteur
    paginator = Paginator(all_music, 1)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    # Contexte passé au template
    context = {
        'page_obj': page_obj,           # pour le lecteur
        'all_songs': all_music,         # pour afficher toute la bibliothèque dans la colonne droite
    }
    return render(request, "index.html", context)
