# 📋 Extraits
Les extraits, parfois appelés également "messages préenregistrés" ou "étiquettes", sont des messages couramment utilisés que vous pouvez envoyer dans les fils de modmail en une seule commande.

![Exemple d'extraits](snippets.gif)

## Voir les extraits disponibles
### `!extraits` / `!e <raccourci>`

Pour afficher tous les extraits disponibles, utilisez la commande `!extraits`.

Pour afficher le texte d'un extrait spécifique, utilisez la commande `!e <raccourci>`.
Par exemple, pour afficher le texte d'un extrait appelé "bonjour", exécutez `!e bonjour`.

## Création d'extraits
### `!e <raccourci> <texte>`

#### Exemple
Pour créer un extrait appelé "bonjour" avec le texte "Bonjour, comment pouvons-nous vous aider ?", utilisez la commande suivante :

`!e bonjour Bonjour, comment pouvons-nous vous aider ?`

## Utilisation des extraits
### `!!raccourci` / `!!!raccourci`
Dans un fil de modmail, utilisez `!!raccourci` pour envoyer un extrait à l'utilisateur, en remplaçant `raccourci` par le nom de l'extrait.

Pour envoyer un extrait de manière anonyme, utilisez `!!!raccourci`.

*Les préfixes `!!` et `!!!` peuvent être modifiés à l'aide des options du bot `snippetPrefix` et `snippetPrefixAnon` respectivement.*

#### Exemple
Pour envoyer un extrait appelé "bonjour", utilisez la commande suivante :

`!!bonjour`

Pour envoyer le même extrait de manière anonyme, utilisez la commande suivante :

`!!!bonjour`

## Modification des extraits
### `!éditer_extrait <raccourci> <texte>` / `!ee <raccourci> <texte>`

#### Exemple
Pour modifier un extrait appelé "bonjour" pour dire "Bonjour, comment ça va ?", utilisez la commande suivante :

`!ee bonjour Bonjour, comment ça va ?`

## Suppression des extraits
### `!supprimer_extrait <raccourci>` / `!se <raccourci>`

#### Exemple
Pour supprimer un extrait appelé "bonjour", utilisez la commande suivante :

`!se bonjour`