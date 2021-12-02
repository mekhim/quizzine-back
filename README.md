## Description

Quizzine est un site de quiz pour tester ses connaissances sur la cuisine et tout ce qui s'en rapproche.
Réalisé en 6 jours dans le cadre de l'UE NWT à la fac de Nancy par : 
- Emanuel Gady
- Maxime Choné

API de l'application Quizzine

Documentation à l'adresse : http://localhost:3000/documentation une fois le serveur lancé

Tous les endpoints sont gardés par une JWT Guard, sauf auth/login et auth/register





```bash
-nest info
 _   _             _      ___  _____  _____  _     _____
| \ | |           | |    |_  |/  ___|/  __ \| |   |_   _|
|  \| |  ___  ___ | |_     | |\ `--. | /  \/| |     | |
| . ` | / _ \/ __|| __|    | | `--. \| |    | |     | |
| |\  ||  __/\__ \| |_ /\__/ //\__/ /| \__/\| |_____| |_
\_| \_/ \___||___/ \__|\____/ \____/  \____/\_____/\___/

[Nest CLI]
Nest CLI Version : 8.1.5 

[Nest Platform Information]
platform-express version : 8.2.3
schematics version       : 8.0.5
mongoose version         : 9.0.1
passport version         : 8.0.1
swagger version          : 5.1.5
testing version          : 8.2.3
common version           : 8.2.3
core version             : 8.2.3
jwt version              : 8.0.0
cli version              : 8.1.5


```

## Liens

- Partie front : https://github.com/mekhim/quizzine
- Partie back : https://github.com/mekhim/quizzine-back


## Installation 

Pour commencer, il faut un conteneur Docker Mongodb sur votre machine et un gestionnaire de bdd comme Robo3t.


```bash
# Clonage du repo git du back
$ git clone https://github.com/mekhim/quizzine-back
$ cd quizzine-back
# Installation des dépendances
$ yarn install
```

À l'aide de Robo3t, une fois connecté à mongo, il vous faut:
- créer une base de données "quizzine"
- exécuter le script suivant : https://github.com/mekhim/quizzine-back/blob/master/scripts/init.mongo.js dans la console de Robo3t afin de peupler la base de données



## Lancement

```bash
# Lancement de l'API
$ nest start
```

