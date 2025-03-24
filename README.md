DECAY Mathis

Base de données en local avec MongoDB Compass

Lancer le serveur :
 - lancer "C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe" --dbpath=c:\tmp          dans cmd

Lancer l'app : 
 - taper dans le terminal : node src/app.js -> marche si log : Serveur lancé sur le port 5000 | MongoDB Connected

Créer un utilisateur (register) :
 - dans Postman : Post || http://localhost:5000/api/auth/register
 - dans body || raw, entrer : {
                                    "name": "nom de l'utilisateur",
                                    "email": "mail de l'utilisateur",
                                    "password": "mot de passe de l'utilisateur"
                                }

Se connecter en tant qu'utilisateur (login) :
 - dans Postman : Post || http://localhost:5000/api/auth/login
 - dans body || raw, entrer : {
                                "email": "mail de l'utilisateur", 
                                "password": "mot de passe de l'utilisateur"
                            }

Ajouter un ingrédient :
  - dans Postman : Post || http://localhost:5000/api/ingredients || Authorization, Bearer Token, {Token} (obtenu avec le login)
  - dans body ||raw, entrer : {
                                "name": "nom de l'ingrédient",
                                "type": "type d'ingrédient",
                                "storeAddress": "adresse d'un magasin",
                                "price": {prix}
                                }

Lister les ingrédients :
  - dans Postman : Get || http://localhost:5000/api/ingredients?page=1&limit=10

Rechercher un ingrédient par nom :
  - dans Postman : Get || http://localhost:5000/api/ingredients/search?name={nom de l'ingrédient}

Rechercher un ingrédient par type :
  - dans Postman : Get || http://localhost:5000/api/ingredients/search?type={type d'ingrédient}

Lister les rhums :
  - dans Postman : Get || http://localhost:5000/api/rhums?page=1&limit=5

Rechercher un rhum :
  - dans Postman : Get || http://localhost:5000/api/rhums/search?name={nom du rhum}&type=Rhum&pays={pays}
  après search? : mettre les filtres que vous voulez pour votre recherche (exemple : vintage=2006)

Ajouter une recette :
  - dans Postman : Post || http://localhost:5000/api/recipes || Authorization, Bearer Token, {Token} (obtenu avec le login)
  - dans body ||raw, entrer : {
                                "name": "nom de la recette",
                                "rum": "id du rhum",  
                                "ingredients": [
                                    { "ingredient": "id du 1er ingrédient", "quantity": "quantité" },
                                    { "ingredient": "id du 2ème ingrédient", "quantity": "quantité" }
                                ],
                                "instructions": "explication de la préparation de la recette",
                                "visibility": "public || private"
                                }