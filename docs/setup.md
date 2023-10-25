# 🛠️ Configuration du bot
**Remarque :** Ce bot est exécuté sur votre propre machine ou serveur.  
Pour le maintenir en ligne, vous devez maintenir le processus du bot en cours d'exécution.

## Terminologie
* Le **serveur principal** (ou serveur principal) est le serveur depuis lequel les utilisateurs contacteront le modmail.
* Le **serveur de boîte de réception** (ou serveur de boîte de réception) est le serveur où les fils de modmail seront créés.
  Dans une "configuration à un seul serveur", il s'agit du même serveur que le serveur principal.
* Un **fil de modmail** est un canal sur le **serveur de boîte de réception** qui contient l'échange actuel avec l'**utilisateur**.
  Ces fils peuvent être fermés pour les archiver. Un **utilisateur** ne peut avoir qu'un seul fil de modmail ouvert à la fois.
* Un **modérateur**, dans le contexte du modmail, est un membre du personnel du serveur qui répond aux fils de modmail et les gère.
* Un **utilisateur**, dans le contexte du modmail, est un utilisateur Discord qui contacte le modmail en envoyant un message direct au bot.

## Prérequis
1. Créez un bot sur le [Portail des développeurs Discord](https://discord.com/developers/)
2. Activez les **Intentions des membres du serveur** et **Intentions du contenu des messages** dans les paramètres du bot sur la page du développeur ([Image](intents.png))
3. Installez Node.js 16 (LTS)
   * Les anciennes versions LTS 12 et 14 sont également prises en charge.
4. [Téléchargez la dernière version du bot ici](https://github.com/ines/modmailbot/releases/latest) (cliquez sur "Code source (zip)")
5. Extrayez le fichier Zip téléchargé dans un nouveau dossier
6. Dans le dossier du bot (que vous avez extrait du fichier zip), faites une copie du fichier `config.example.ini` et renommez la copie en `config.ini`
    * Si vous êtes sous Windows, le fichier peut être nommé `config.example` (sans `.ini` à la fin)

## Configuration à un seul serveur
Dans cette configuration, les fils de modmail sont ouverts sur le serveur principal dans une catégorie spéciale.
C'est la configuration recommandée pour les serveurs de petite et moyenne taille.

1. **Suivez d'abord les [prérequis](#prerequisites) ci-dessus !**
2. Ouvrez `config.ini` dans un éditeur de texte et remplissez les valeurs requises. `mainServerId` et `inboxServerId` doivent tous deux être définis sur l'ID de votre serveur.
3. Invitez le bot sur le serveur
4. Sur une nouvelle ligne à la fin de `config.ini`, ajoutez `categoryAutomation.newThread = ID_CATEGORIE_ICI`
    * Remplacez `ID_CATEGORIE_ICI` par l'ID de la catégorie où les nouveaux fils de modmail doivent être dirigés
5. Assurez-vous que le bot a les autorisations `Gérer les canaux`, `Gérer les messages` et `Joindre des fichiers` dans la catégorie
    * Il n'est pas recommandé de donner au bot des autorisations d'administrateur dans *aucune* circonstance.
6. **[🏃 Lancez le bot !](starting-the-bot.md)**
7. Vous souhaitez changer d'autres options du bot ? Consultez **[📝 Configuration](configuration.md)**
8. Vous avez d'autres questions ? Consultez les **[🙋 Questions fréquemment posées](faq.md)** ou
   **[rejoignez le serveur de support !](../README.md#support-server)**

## Configuration à deux serveurs
Dans cette configuration, les fils de modmail sont ouverts sur un serveur de boîte de réception séparé.
C'est la configuration recommandée pour les grands serveurs qui reçoivent beaucoup de modmails, où une configuration à un seul serveur pourrait devenir confuse.
Vous pourriez également préférer cette configuration pour des raisons de confidentialité*.

1. **Suivez d'abord les [prérequis](#prerequisites) ci-dessus !**
2. Créez un serveur de boîte de réception sur Discord
3. Ouvrez `config.ini` dans un éditeur de texte et remplissez les valeurs requises.
    * Définissez `mainServerId` sur l'ID du serveur principal depuis lequel les utilisateurs enverront des messages au bot
    * Définissez `inboxServerId` sur l'ID du serveur de boîte de réception créé à l'étape 2
4. Invitez le bot à la fois sur le serveur principal et sur le serveur de boîte de réception nouvellement créé
5. Ouvrez `config.ini` dans un éditeur de texte et remplissez les valeurs
6. Assurez-vous que le bot a les autorisations `Gérer les canaux`, `Gérer les messages` et `Joindre des fichiers` sur le serveur de **boîte de réception**
    * Le bot n'a besoin d'aucune autorisation sur le serveur principal
7. **[🏃 Lancez le bot !](starting-the-bot.md)**
8. Vous souhaitez changer d'autres options du bot ? Consultez **[📝 Configuration](configuration.md)**
9. Vous avez d'autres questions ? Consultez les **[🙋 Questions fréquemment posées](faq.md)** ou
   **[rejoignez le serveur de support !](../README.md#support-server)**

*\* Étant donné que tous les noms de canaux, même pour les canaux que vous ne pouvez pas voir, sont des informations publiques via l'API, un utilisateur avec un client modifié pourrait voir les noms de tous les utilisateurs contactant le modmail à travers les noms de canaux de modmail.*