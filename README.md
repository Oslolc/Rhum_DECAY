DECAY Mathis

Base de données en local avec MongoDB Compass

Lancer le serveur :
 - lancer "C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe" --dbpath=c:\tmp          dans cmd

Lancer l'app : 
 - se mettre dans myapp/src
 - taper dans le terminal : node app.js -> marche si : Serveur lancé sur le port 5000 | MongoDB Connected

Créer un utilisateur (register) :
  - dans Postman : Post || http://localhost:5000/api/auth/register
  - dans body || raw, entrer : {
                                    "name": "Example User",
                                    "email": "test@example.com",
                                    "password": "password"
                                }

Se connecter en tant qu'utilisateur (login) :       (ERREUR : ne fonctionne pas pour l'instant)
   - dans Postman : Post || http://localhost:5000/api/auth/login
   - dans body || raw, entrer : {
                                    "email": "mathis.decay@gmail.com",
                                    "password": "Rsq536kc"
                                }
