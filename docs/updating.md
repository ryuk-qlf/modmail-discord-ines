# ✨ Mettre à jour le bot

**Avant de mettre à jour le bot, assurez-vous toujours de sauvegarder votre fichier `db/data.sqlite`.**

**⚠ Note sur la mise à jour vers v3.0.0:** Si vous utilisez actuellement une version *très* ancienne du bot, d'avant février 2018, vous devrez d'abord mettre à jour vers v2.30.1 et exécuter le bot une fois avant de mettre à jour vers v3.0.0.

## Pour mettre à jour le bot, suivez ces étapes :

1. Arrêtez le bot.
2. Sauvegardez votre fichier `db/data.sqlite`.
    * Si vous utilisez une autre base de données prise en charge, effectuez des sauvegardes de la base de données à partir de là.
3. Téléchargez la dernière version du bot depuis https://github.com/ines/modmailbot/releases/latest.
4. Extrayez les fichiers de la nouvelle version par-dessus les anciens fichiers.
5. Lisez le [journal des modifications (CHANGELOG)](https://github.com/ines/modmailbot/blob/master/CHANGELOG.md) pour voir s'il y a des modifications de configuration que vous devez apporter.
    * Notez en particulier les modifications apportées aux versions prises en charge de Node.js !
    * Si vous mettez à jour depuis une version antérieure à v3.0.0, assurez-vous d'activer l'intention **Membres du serveur** sur la page du portail de développement Discord du bot ([Image](https://raw.githubusercontent.com/Dragory/modmailbot/master/docs/server-members-intent-2.png)).
6. Démarrez le bot :
    * Si vous utilisez `start.bat` pour exécuter le bot, exécutez-le à nouveau.
    * Si vous exécutez le bot via la ligne de commande, exécutez d'abord `npm ci`, puis redémarrez le bot.

👉 Si vous rencontrez des problèmes, **[rejoignez le serveur de support pour obtenir de l'aide !](https://discord.gg/vRuhG9R)**