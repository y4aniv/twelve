# Importer les modules 
import os # OS permet d'intéragir avec le système d'exploitation (les fichiers, les dossiers, etc.)
from PIL import Image # PIL permet de manipuler des images

def compress_images(directory):
    """
    Cette fonction permet de compresser toutes les images d'un dossier
    :param directory: le chemin du dossier contenant les images
    :return: None
    """
    total_compression = 0 # Initialiser la variable qui va contenir le pourcentage de compression total

    for root, dirs, files in os.walk(directory): # Parcourir tous les fichiers et dossiers du dossier
        for file in files: # Parcourir tous les fichiers du dossier
            if file.endswith(('.jpg', '.jpeg', '.png')): # Si le fichier est une image
                file_path = os.path.join(root, file) # Obtenir le chemin complet du fichier
                original_size = os.path.getsize(file_path) # Obtenir la taille du fichier

                image = Image.open(file_path) # Ouvrir l'image
                image.save(file_path, optimize=True, quality=85) # Compresser l'image

                compressed_size = os.path.getsize(file_path) # Obtenir la taille du fichier compressé
                compression_percentage = (original_size - compressed_size) / original_size * 100 # Calculer le pourcentage de compression
                total_compression += compression_percentage # Ajouter le pourcentage de compression total

                print(f"Compression de {file_path}: {compression_percentage:.2f}%") # Afficher le pourcentage de compression

    print(f"Compression totale: {total_compression:.2f}%") # Afficher le pourcentage de compression total

compress_images('public/img') # Appeler la fonction pour compresser les images du dossier 'public/img'