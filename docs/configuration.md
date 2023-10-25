# 🤖 Commandes

## Table des matières
* [À l'intérieur d'un thread de Modmail](#à-lintérieur-dun-thread-de-modmail)
* [Partout sur le serveur de la boîte de réception](#partout-sur-le-serveur-de-la-boîte-de-réception)
* [Fragments de code (messages pré-enregistrés)](#fragments-de-code-messages-pré-enregistrés)

## À l'intérieur d'un thread de Modmail
Ces commandes ne peuvent être utilisées qu'à l'intérieur d'un canal de thread de Modmail sur le serveur de la boîte de réception.

### `!reply <texte>` / `!r <texte>`
Envoyer une réponse à l'utilisateur.

**Exemple :** `!r Comment puis-je vous aider ?`

Pour répondre automatiquement sans utiliser `!reply`, activez l'option `alwaysReply` dans les paramètres du bot (voir configuration.md).

### `!anonreply <texte>` / `!ar <texte>`
Envoyer une réponse anonyme à l'utilisateur. Les réponses anonymes ne montrent que le rôle du modérateur dans la réponse.

**Exemple :** `!ar Utilisez Modmail uniquement pour les messages importants, s'il vous plaît`

### `!close`
Fermer le thread de Modmail.

### `!close <temps>`
Fermer le thread de Modmail après un certain délai. L'envoi d'un message à l'utilisateur ou la réception d'un message de l'utilisateur annulera la fermeture programmée.

**Exemple :** `!close 15m`

### `!close -s` / `!close -s <temps>`
Fermer le thread de Modmail sans informer l'utilisateur de la fermeture.

### `!close cancel`
Annuler une fermeture programmée.

### `!logs`
Lister les journaux de Modmail précédents avec l'utilisateur.

### `!block`
Bloquer l'utilisateur de l'utilisation de Modmail.

### `!block <temps>`
Bloquer l'utilisateur de l'utilisation de Modmail pour une durée spécifiée.

**Exemple :** `!block 7j`

### `!unblock`
Débloquer l'utilisateur, lui permettant d'utiliser à nouveau Modmail.

### `!move <catégorie>`
Déplacer le thread de Modmail vers une catégorie différente. Nécessite que l'option `allowMove` soit activée dans les paramètres du bot.

### `!suspend`
Suspendre le thread. Le thread se comportera comme s'il était fermé et ne recevra aucun message jusqu'à ce qu'il soit réactivé avec `!unsuspend`.

### `!unsuspend`
Réactiver le thread. Voir `!suspend` ci-dessus.

### `!alert`
Vous avertit lorsque le thread reçoit une nouvelle réponse.

### `!alert cancel`
Annuler l'alerte définie par `!alert`.

### `!edit <numéro> <nouveau texte>`
Modifier votre réponse précédente envoyée avec `!reply`.
`<numéro>` est le numéro de message affiché devant les réponses du personnel dans le canal du thread.

### `!delete <numéro>`
Supprimer votre réponse précédente envoyée avec `!reply`.
`<numéro>` est le numéro de message affiché devant les réponses du personnel dans le canal du thread.

### `!role`
Afficher votre rôle d'affichage pour le thread, c'est-à-dire le rôle affiché devant votre nom dans vos réponses.

### `!role reset`
Réinitialiser votre rôle d'affichage pour le thread à la valeur par défaut.

### `!role <nom du rôle>`
Changer votre rôle d'affichage pour le thread pour n'importe quel rôle que vous avez actuellement.

### `!loglink`
Obtenir un lien vers le journal du thread de Modmail ouvert.

### `!loglink -s`
Obtenir un lien vers le journal du thread de Modmail ouvert, montrant uniquement les messages vers/de l'utilisateur (ignore les discussions de modérateurs dans le thread).

### `!loglink -v`
Obtenir un lien vers le journal du thread de Modmail ouvert, montrant des détails supplémentaires sur les canaux et les ID de messages entre le bot et l'utilisateur. Cela est principalement utile lors de la déclaration de messages à l'équipe de confiance et de sécurité de Discord.

### `!id`
Affiche l'ID de l'utilisateur.

### `!note <texte>`
Ajoute une note pour l'utilisateur.

### `!notes <ID de l'utilisateur>`
Affiche toutes les notes pour l'utilisateur.

### `!delete_note <ID de la note>`
Supprime la note spécifiée. L'ID de la note est affiché lors de l'exécution de `!notes`.

### `!dm_channel_id`
Affiche l'ID du canal de DM actuel avec l'utilisateur.

### `!message <numéro>`
Affiche l'ID du canal de DM, l'ID du message de DM et le lien du message spécifié par l'utilisateur. `<numéro>` est le numéro de message affiché devant les réponses du personnel dans le canal du thread.

## Partout sur le serveur de la boîte de réception
Ces commandes peuvent être utilisées partout sur le serveur de la boîte de réception, même en dehors des threads de Modmail.

### `!newthread <ID de l'utilisateur>`
Ouvre un thread de Modmail avec un utilisateur.

**Exemple :** `!newthread 106391128718245888`

### `!logs <ID de l'utilisateur>`
Liste les journaux de Modmail précédents avec l'utilisateur spécifié.

**Exemple :** `!logs 106391128718245888`

### `!block <ID de l'utilisateur>`
Bloque l'utilisateur spécifié de Modmail.

**Exemple :** `!block 106391128718245888`

### `!block <ID de l'utilisateur> <temps>`
Bloque l'utilisateur spécifié de Modmail pour une durée spécifiée.

**Exemple :** `!block 106391128718245888 7j`

### `!unblock <ID de l'utilisateur>`
Débloque l'utilisateur spécifié, lui permettant d'utiliser à nouveau Modmail.

**Exemple :** `!unblock 106391128718245888`

### `!is_blocked <ID de l'utilisateur>`
Vérifie si l'utilisateur spécifié est bloqué.

**Exemple :** `!is_blocked 106391128718245888`

### `!role`
(En dehors d'un thread de Modmail) Affiche votre rôle d'affichage par défaut, c'est-à-dire le rôle affiché devant votre nom dans vos réponses.