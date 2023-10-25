## API du Plugin
**REMARQUE :** Ce fichier est généré automatiquement.

Faites défiler jusqu'à [PluginAPI](#PluginAPI) pour voir la liste des propriétés disponibles pour les plugins.

## Types définis

<dl>
<dt><a href="#PluginAPI">PluginAPI</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#PluginCommandsAPI">API des Commandes de Plugin</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#PluginAttachmentsAPI">API des Pièces Jointes de Plugin</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#PluginLogsAPI">API des Journaux de Plugin</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#PluginHooksAPI">API des Crochets de Plugin</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#API des Rôles d'Affichage de Plugin">API des Rôles d'Affichage de Plugin</a> : <code>displayRoles</code></dt>
<dd></dd>
<dt><a href="#API des Fils de Plugin">API des Fils de Plugin</a> : <code>threads</code></dt>
<dd></dd>
<dt><a href="#API du Serveur Web de Plugin">API du Serveur Web de Plugin</a> : <code>express.Application</code></dt>
<dd></dd>
<dt><a href="#API des Formateurs de Plugin">API des Formateurs de Plugin</a> : <code>FormattersExport</code></dt>
<dd></dd>
</dl>

<a name="PluginAPI"></a>

## PluginAPI : <code>object</code>
**Type**: typedef  
**Propriétés**

| Nom | Type |
| --- | --- |
| bot | <code>Client</code> | 
| knex | <code>Knex</code> | 
| config | <code>ModmailConfig</code> | 
| commands | [<code>API des Commandes de Plugin</code>](#PluginCommandsAPI) | 
| attachments | [<code>API des Pièces Jointes de Plugin</code>](#PluginAttachmentsAPI) | 
| logs | [<code>API des Journaux de Plugin</code>](#PluginLogsAPI) | 
| hooks | [<code>API des Crochets de Plugin</code>](#PluginHooksAPI) | 
| formats | [<code>API des Formateurs de Plugin</code>](#PluginFormattersAPI) | 
| webserver | [<code>API du Serveur Web de Plugin</code>](#PluginWebServerAPI) | 
| threads | [<code>API des Fils de Plugin</code>](#PluginThreadsAPI) | 
| displayRoles | [<code>API des Rôles d'Affichage de Plugin</code>](#PluginDisplayRolesAPI) | 

<a name="API des Commandes de Plugin"></a>

## API des Commandes de Plugin : <code>object</code>
**Type**: typedef  
**Propriétés**

| Nom | Type |
| --- | --- |
| manager | <code>CommandManager</code> | 
| addGlobalCommand | <code>FonctionAjouterCommandeGlobale</code> | 
| addInboxServerCommand | <code>FonctionAjouterCommandeServeurBoîteDeRéception</code> | 
| addInboxThreadCommand | <code>FonctionAjouterCommandeFilBoîteDeRéception</code> | 
| addAlias | <code>FonctionAjouterAlias</code> | 

<a name="API des Pièces Jointes de Plugin"></a>

## API des Pièces Jointes de Plugin : <code>object</code>
**Type**: typedef  
**Propriétés**

| Nom | Type |
| --- | --- |
| addStorageType | <code>FonctionAjouterTypeDeStockagePièceJointe</code> | 
| downloadAttachment | <code>FonctionTéléchargerPièceJointe</code> | 
| saveAttachment | <code>FonctionEnregistrerPièceJointe</code> | 

<a name="API des Journaux de Plugin"></a>

## API des Journaux de Plugin : <code>object</code>
**Type**: typedef  
**Propriétés**

| Nom | Type |
| --- | --- |
| addStorageType | <code>FonctionAjouterTypeDeStockageJournal</code> | 
| saveLogToStorage | <code>FonctionEnregistrerJournalDansLeStockage</code> | 
| getLogUrl | <code>FonctionObtenirURLJournal</code> | 
| getLogFile | <code>FonctionObtenirFichierJournal</code> | 
| getLogCustomResponse | <code>FonctionObtenirRéponsePersonnaliséeJournal</code> | 

<a name="API des Crochets de Plugin"></a>

## API des Crochets de Plugin : <code>object</code>
**Type**: typedef  
**Propriétés**

| Nom | Type |
| --- | --- |
| beforeNewThread | <code>FonctionAjouterCrochetAvantNouveauFil</code> | 
| afterThreadClose | <code>FonctionAjouterCrochetAprèsFermetureFil</code> | 

<a name="API des Rôles d'Affichage de Plugin"></a>

## API des Rôles d'Affichage de Plugin : <code>displayRoles</code>
**Type**: typedef  
**Voir**: https://github.com/ines/modmailbot/blob/master/src/data/displayRoles.js  

<a name="API des Fils de Plugin"></a>

## API des Fils de Plugin : <code>threads</code>
**Type**: typedef  
**Voir**: https://github.com/ines/modmailbot/blob/master/src/data/threads.js  

<a name="API du Serveur Web de Plugin"></a>

## API du Serveur Web de Plugin : <code>express.Application</code>
**Type**: typedef  
**Voir**: https://expressjs.com/en/api.html#app  

<a name="API des Formateurs de Plugin"></a>

## API des Formateurs de Plugin : <code>FormattersExport</code>
**Type**: typedef  
**Voir**: https://github.com/ines/modmailbot/blob/master/src/formatters.js  