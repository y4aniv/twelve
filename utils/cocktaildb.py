# Importer les modules
import requests # Requests permet de faire des requêtes HTTP
import json # JSON permet de manipuler des fichiers JSON
import time # Time permet de manipuler le temps (attendre, etc.)
from deep_translator import GoogleTranslator # Deep Translator permet de traduire du texte

maxEmptyResponse = 10 # Initialiser le nombre maximum de réponses vides
emptyResponse = 0 # Initialiser le nombre de réponses vides
ingredients_list = []  # Créer une liste pour stocker les ingrédients

i = 0 # Initialiser le compteur
while emptyResponse < maxEmptyResponse: # Tant que le nombre de réponses vides est inférieur au nombre maximum de réponses vides
    req = requests.get(f'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid={i}') # Faire une requête pour obtenir les informations sur l'ingrédient
    data = req.json() # Obtenir les données de la requête

    if data['ingredients'] is not None: # Si les données ne sont pas vides
        if data['ingredients'][0]['strType'] is None: # Si le type de l'ingrédient est vide
            data['ingredients'][0]['strType'] = "Autre" # Remplacer le type par "Autre"

        ingredients_list.append({ # Ajouter les informations de l'ingrédient à la liste
            "name": GoogleTranslator(source='en', target='fr').translate(data['ingredients'][0]['strIngredient'], return_all=True).capitalize(), # Traduire le nom de l'ingrédient en français et le mettre en majuscules
            "type": GoogleTranslator(source='en', target='fr').translate(data['ingredients'][0]['strType'], return_all=True).capitalize() # Traduire le type de l'ingrédient en français et le mettre en majuscules
        })
        print(f"Ingrédient {i}: {data['ingredients'][0]['strIngredient']} ({data['ingredients'][0]['strType']})") # Afficher le nom et le type de l'ingrédient
    else: # Si les données sont vides
        emptyResponse += 1 # Ajouter 1 au nombre de réponses vides
        print(f"Ingrédient {i}: Aucune information") # Afficher qu'il n'y a pas d'informations

    i += 1 # Ajouter 1 au compteur

    time.sleep(0.2) # Attendre 0.2 seconde pour suivre les règles de l'API

with open('data/ingrediets.json', 'w') as outfile: # Ouvrir le fichier 'data/ingredients.json' en écriture quand la boucle est terminée
    json.dump(ingredients_list, outfile) # Écrire la liste des ingrédients dans le fichier
