var App = (new function() {
	this.onUserJoined = function(user) {
		var command	= '/mychatcommand';
		var channel = KnuddelsServer.getChannel().getChannelName();
		var name	= KnuddelsServer.getAppName();
		var text	= 'Hallo ' + user.getProfileLink() + ',°#°dies ist ein test von _°B°' + name + '_°r°:';
		
		/* Send from Channel */
		text		+= '°#>Link: Send from Channel|/sfc ' + channel + ':' + command + '<°';
		
		/* Public Command */
		text		+= '°#>Link: Public Command|/doubleaction /a\\|' + command + '<°';
		
		user.sendPrivateMessage(text);
	};
	
	this.chatCommands = {
		mychatcommand: function(user) {
			user.sendPrivateMessage('Du hast den Befehl erfolgreich ausgeführt.');
		}
	}
}());