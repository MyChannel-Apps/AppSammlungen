require('questions.js');
require('quiz.js');

var App = (new function() {
	/* Einstellungen
	 * Ist von außen "sichtbar" damit man von bestehenden Spielen
	 * die Konfiguration abfragen kann.
	 */
	this._settings = {
		questions:		20,	// Maximale Anzahl der Fragen
		max_errors:		5,	// Wieviele Fehler darf man machen?
		time:			2,	// Zeit in Minuten
	};
	
	/* Storage - Hier werden alle offenen Spiele gespeichert.
	 * Ist von außen "sichtbar" damit man bestehende Spiele von
	 * einer Quiz-Instanz löschen kann.
	 */
	this._games_opened = {};
	
	this.onAppStart = function() {
		/* Wenn es weniger Fragen gibt als für den Test abgefragt werden sollen, setze diese */
		var question_length = questions.length;
		
		if(App._settings.questions > question_length) {
			App._settings.questions = question_length;
		}
		
		/* Wenn es weniger Fragen als maximale Fehleranzahl gibt, dann setze 50% */
		if(App._settings.questions >= App._settings.max_errors) {
			App._settings.max_errors = parseInt(App._settings.questions / 2);
		}
	};
	
	this.chatCommands = {
		/* Startet den AppTest */
		AppTest: function(user, params) {
			/* Versucht eine Quiz-Instanz zu holen, sofern der Spieler bereits ein Test gestartet hat */
			var game = App._games_opened[user.getUserId()];
			
			/* Hat der Nutzer bereits ein Spiel offen? */
			if(game != undefined) {
				if(params.indexOf(':') > -1) {
					var index	= -1;
					var command	= params.split(':');
					if(command.length == 2) {
						params	= command[0];
						index	= parseInt(command[1]);
					}
					
					if(params == 'answer') {
						game.doAnswer(index);
						return;
					}
				}
				
				user.sendPrivateMessage('Du hast den AppTest bereits gestartet. Beantworte die letze Frage oder warte bis die nächste erscheint.');
				return;
			}
			
			/* Wenn der AppTest gestartet wird */
			if(params == 'start') {
				/* Erstellt eine neue Quiz-Instanz */
				var game = new Quiz(user);
				
				/* Speichert das Spiel */
				App._games_opened[user.getUserId()] = game;
				
				/* Startet das Spiel */
				game.start();
				return;
			}
			
			/* Ansonsten gebe "Welcome Message" aus */
			var text	= 'Bevor du mit den Apps starten kannst, solltest du deine Fähigkeiten mit bestehen diesen Tests beweisen.';
			text		+= '°#°';
			text		+= '°#°- Studiere vor den Test die API-Doku: °B>http://developer.knuddels.de/docs/|http://developer.knuddels.de/docs/<r°';
			text		+= '°#°- Schaue dir diverse Beispiele in der Wiki an: °B>https://bitbucket.org/knuddels/user-apps/wiki/Home|https://bitbucket.org/knuddels/user-apps/wiki/Home<r°';
			text		+= '°#°- Der Test besteht aus _' + App._settings.questions + ' Multiple-Choice Fragen_';
			text		+= '°#°- Du hast _pro Frage ' + App._settings.time + ' Minuten_ Zeit, danach öffnet sich die nächste Frage';
			text		+= '°#°- Der Test ist bestanden, wenn Du _weniger als ' + App._settings.max_errors + ' Fehler_ machst';
			text		+= '°#>{button}AppTest starten||call|/apptest start|mx|100|my|10<°';
			user.sendPrivateMessage(text);
		}
	};
}());