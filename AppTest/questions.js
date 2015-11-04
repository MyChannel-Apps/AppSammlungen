/* Definiert alle Fragen des Quiz */
var questions = [
	/* Frage */
	{
		/* Eine Frage kann unterschiedliche "Fragen" haben */
		questions: [
			'Apps können mit /app gestartet werden',
			'Eine App wird mit /appstart gestartet',
			'Die App wird über /restart gestartet',
			'Eine App kann über /application gestartet werden'
		],
		/* Richtige Antworten starten mit "*" */
		answers: [
			'*Nein - Es gibt einen /apps Befehl',
			'Ja, weil der Befehl so vorgegeben ist.',
			'Es kommt drauf an was man genau vor hat.',
			'*Den Befehl gibt es gar nicht.',
			'Da nur eine App im Channel installiert werden kann, Ja.'
		]
	},
	{
		questions: [
			'Ich kann einen Nutzer über den AppBot anschreiben, wenn...',
			'Einen Nutzer kann ich über den AppBot anschreiben, wenn...',
			'Der AppBot kann den Nutzer anschreiben, wenn...'
		],
		answers: [
			'*...dieser den Channel einmalig betreten hat',
			'...dieser den AppBot eine Nachricht schreibt',
			'...dieser den Entwickler darum bittet',
			'...dieser einen SysAdmin kennt'
		]
	},
	{
		questions: [
			'Jede App hat eine eigene Datenbank, die...',
			'Eine App besitzt eine Datenbank, die...'
		],
		answers: [
			'...ich via SQL-Queries ansteuern kann',
			'*...über das Persistence-Objekt genutzt wird',
			'...ich über meinem FTP-Zugang herunterladen kann',
			'...ich mit einem seperaten Zugang betreten kann'
		]
	},
	{
		questions: [
			'Wenn ein Nutzer den Channel betritt, was wird dann ausgelöst?',
			'Was passiert mit dem AppServer, wenn der Nutzer den Channel betritt?',
			'Was löst der AppServer aus, wenn ein Nutzer den Channel betritt?'
		],
		answers: [
			'Eine Datenbankabfrage',
			'Das onUserLeft Event in meiner App',
			'*Das Event onUserJoined',
			'Den Callback onUserJoin von meiner App',
			'Das Event onUserJoin'
		]
	},
	{
		questions: [
			'Wieviele Zeichen kann eine öffentliche Chatnachricht vom AppBot enthalten?',
			'Aus wievielen Zeichen kann eine öffentliche Nachricht bestehen?'
		],
		answers: [
			'100.000',
			'*10.000',
			'1.000.000',
			'500.000',
			'1.000'
		]
	},
	{
		questions: [
			'Welchen User-Typ gibt es nicht?',
			'Welcher User-Typ passt nicht hier her?'
		],
		answers: [
			'*DiceBot',
			'SystemBot',
			'Human',
			'AppBot'
		]
	},
	{
		questions: [
			'Welchen UserStatus gibt es nicht?',
			'Welcher User-Status passt nicht hier her?'
		],
		answers: [
			'Admin',
			'*Ehrenz',
			'Family',
			'Stammi',
			'SysAdmin'
		]
	},
	{
		questions: [
			'Ein zusätzlicher AppManager kann...'
		],
		answers: [
			'Apps löschen',
			'*Eine App neustarten',
			'Alle Apps einsehen',
			'Den Nutzer kicken'
		]
	},
	{
		questions: [
			'Wie lange darf eine Funktion maximal laufen?'
		],
		answers: [
			'Unbegrenzt',
			'Bis diese von mir beendet wird',
			'*Maximal zehn Sekunden',
			'Nur 5 Sekunden'
		]
	}
];