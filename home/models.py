from django.db import models

class Song(models.Model):
    title = models.TextField()
    artist = models.TextField()
    image = models.ImageField()
    audio_file = models.FileField(blank=True, null=True)
    audio_link = models.CharField(max_length=200, blank=True, null=True)
    duration = models.CharField(max_length=20)
    paginate_by = 2  # Cette ligne est probablement utilisée ailleurs, sinon à retirer

    def __str__(self):
        return self.title

    @property
    def audio_static_url(self):
        if self.audio_file:
            return f"/static/media/{self.audio_file.name}"
        elif self.audio_link:
            return self.audio_link
        return ""

    @property
    def image_static_url(self):
        if self.image:
            return f"/static/media/{self.image.name}"
        return ""