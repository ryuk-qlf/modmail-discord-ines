# 🏃 Démarrer le bot
Vous n'avez pas encore configuré le bot ? Consultez d'abord la section [Configuration du bot](setup.md) !

## Windows
* Pour démarrer le bot, double-cliquez sur `start.bat` dans le dossier du bot.
* Pour arrêter le bot, fermez la fenêtre de la console.
* Pour redémarrer le bot, fermez la fenêtre de la console, puis double-cliquez à nouveau sur `start.bat`.

## Linux / macOS / Options avancées sous Windows
Les instructions suivantes supposent une connaissance de base de l'utilisation des outils en ligne de commande.
1. Avant la première mise en route et après chaque mise à jour, exécutez `npm ci` dans le dossier du bot.
2. Exécutez `npm start` dans le dossier du bot pour démarrer le bot.

## Gestionnaires de processus
Si vous utilisez un gestionnaire de processus comme PM2, la commande à exécuter est `npm start`.
Un fichier de processus PM2, `modmailbot-pm2.json`, est inclus dans le référentiel.