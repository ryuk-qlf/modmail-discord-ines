# 🧩 Plugins
Le bot prend en charge le chargement de plugins externes.

## Spécification des plugins à charger
Les plugins peuvent être chargés à partir de fichiers locaux ou de NPM. Exemples :
```ini
# Fichier local
plugins[] = ./chemin/vers/plugin.js
# Package NPM
plugins[] = npm:paquet-plugin-quelconque
```
Les chemins des fichiers locaux sont toujours relatifs au dossier du bot. Les plugins NPM sont automatiquement installés au démarrage du bot.

## Création d'un plugin
Les plugins sont simplement des fichiers `.js` qui exportent une fonction appelée lorsque le plugin est chargé.

Pour plus de détails sur les arguments de la fonction, consultez [l'API du Plugin](#api-du-plugin) ci-dessous.

### Exemple de plugin
Cet exemple ajoute une commande `!macommande` qui répond avec `"Réponse de mon plugin personnalisé !"` lorsque la commande est utilisée dans un canal de fil de modération.
```js
module.exports = function({ bot, knex, config, commands }) {
  commands.addInboxThreadCommand('macommande', [], (msg, args, thread) => {
    thread.replyToUser(msg.member, 'Réponse de mon plugin personnalisé !');
  });
}
```

(Remarquez l'utilisation de [la désagrégation d'objets](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Unpacking_fields_from_objects_passed_as_function_parameter) dans les paramètres de la fonction)

### Exemple d'un type de stockage de pièce jointe personnalisé
Cet exemple ajoute un type personnalisé pour l'option `attachmentStorage` appelé `"original"` qui renvoie simplement l'URL de la pièce jointe d'origine sans la ré-héberger de quelque manière que ce soit.
```js
module.exports = function({ attachments }) {
  attachments.addStorageType('original', attachment => {
    return { url: attachment.url };
  });
};
```
Pour utiliser ce type de stockage de pièce jointe personnalisé, vous devez définir l'option de configuration `attachmentStorage` sur `"original"`.

### Exemple d'un type de stockage de journal personnalisé
Cet exemple ajoute un type personnalisé pour l'option `logStorage` appelé `"pastebin"` qui télécharge les journaux sur Pastebin.

```js
module.exports = function({ logs, formatters }) {
  logs.addStorageType('pastebin', {
    async save(thread, threadMessages) {
      const formatLogResult = await formatters.formatLog(thread, threadMessages);
      const pastebinUrl = await saveToPastebin(formatLogResult); 
      return { url: pastebinUrl };
    },

    getUrl(thread) {
      return thread.log_storage_data.url;
    }
  });
};
```

### API du Plugin
Le premier et unique argument de la fonction du plugin est un objet contenant les propriétés suivantes :

| Propriété | Description |
| -------- | ----------- |
| `bot` | [Instance du client Eris](https://abal.moe/Eris/docs/Client) |
| `knex` | [Objet de base de données Knex](https://knexjs.org/#Builder) |
| `config` | La configuration chargée |
| `commands` | Un objet avec des fonctions pour ajouter et gérer les commandes |
| `attachments` | Un objet avec des fonctions pour enregistrer les pièces jointes et gérer les types de stockage de pièces jointes |
| `logs` | Un objet avec des fonctions pour obtenir des URL/fichiers de pièces jointes et gérer les types de stockage de journaux |
| `hooks` | Un objet avec des fonctions pour ajouter des *crochets* qui sont appelés à des moments spécifiques, par exemple avant la création d'un nouveau fil |
| `formats` | Un objet avec des fonctions vous permettant de remplacer les fonctions par défaut utilisées pour formater les messages et les journaux |
| `webserver` | Un objet [Application Express](https://expressjs.com/en/api.html#app) qui sert de serveur web pour le bot |
| `threads` | Un objet avec des fonctions pour rechercher et créer des fils |
| `displayRoles` | Un objet avec des fonctions pour définir et obtenir les rôles d'affichage des modérateurs |

Consultez la page auto-générée de l'[API du Plugin](plugin-api.md) pour plus de détails.

## Stabilité de l'API du Plugin
Les versions du bot peuvent comporter des modifications de l'API du plugin. Assurez-vous de consulter le [CHANGELOG](../CHANGELOG.md) avant de mettre à jour !

Veuillez envoyer vos suggestions de fonctionnalités au [système de suivi des problèmes (issue tracker)](https://github.com/ines/modmailbot/issues) !