## Que représentent ces numéros devant les réponses du personnel dans les fils de modmail ?
Chaque réponse du personnel reçoit un numéro interne. Ce numéro peut être utilisé avec
les commandes `!edit`, `!delete`, `!message` et éventuellement d'autres commandes à l'avenir.

## Dans une [configuration monoserveur](setup.md#single-server-setup), comment puis-je masquer les modmails aux utilisateurs réguliers ?
1. Créez une catégorie privée pour les fils de modmail que seuls le personnel de votre serveur et le bot peuvent voir, puis définissez l'option
`categoryAutomation.newThread` sur 1234 (remplacez 1234 par l'ID de la catégorie).
2. Configurez l'option `inboxServerPermission` pour limiter qui peut utiliser les commandes du bot. [Cliquez ici pour plus d'informations.](configuration.md#inboxserverpermission)

## Mes journaux ne se chargent pas !
Étant donné que les journaux sont stockés et envoyés directement depuis la machine exécutant le bot, assurez-vous que la machine n'a pas de pare-feu bloquant le bot et que les redirections de port appropriées sont configurées. [Vous pouvez trouver plus d'informations et des instructions pour la redirection de port ici.](https://portforward.com/) Par défaut, le bot utilise le port **8890**.

## Je veux catégoriser mes fils de modmail dans plusieurs catégories
Définissez `allowMove = on` pour permettre à votre personnel de déplacer les fils vers d'autres catégories avec `!move`.