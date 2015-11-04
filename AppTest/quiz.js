/* Repräsentiert ein aktuelles Quiz-Spiel eines Spielers */
function Quiz(user) {
	/* Speichert den aktuellen Kontext da im Timeout kein Scope mehr auf die Instanz "this" besteht */
	var _instance = this;
	
	/* Hält die aktuell ausgeloste Frage bereit */
	var _current_question;
	
	/* Cache bereits vorhandene Fragen damit diese sich nicht wiederholen */
	var _used_question = [];
	
	/* Damit der Timer auch vorzeitig gestoppt werden kann sollten wir diese referenzieren */
	var _timer;
	
	/* Speichert ab, wieviele Fragen korrekt oder falsch beantwortet wurden */
	var _data = {
		failure:	0,
		succeed:	0
	};
	
	/* Errechnet, wieviele Fragen bereits beantwortet wurden */
	this.countQuestions = function() {
		return _data.failure + _data.succeed;
	};
	
	/* Gibt das Objekt wieder frei */
	this.remove = function() {
		delete App._games_opened[user.getUserId()];		
	};
	
	this.start = function() {
		/* Stoppe einen möglichen vorhandenen Timer*/
		if(_timer != undefined) {
			clearTimeout(_timer);
		}
		
		/* Ist bereits die maximale Fehleranzahl überschritten? */
		if(_data.failure >= App._settings.max_errors) {
			KnuddelsServer.getDefaultBotUser().sendPublicMessage('°BB°_' + user.getProfileLink() + '_°r° hat den AppTest leider vermurkst und dabei _' + _data.succeed + ' Frage' + (_data.succeed == 1 ? '' : 'n') + ' richtig_ beantwortet!');
			_instance.remove();
			return;
		}
		
		/* Prüfe ob bereits maximale Anzahl an Fragen beantwortet wurden */
		if(_instance.countQuestions() >= App._settings.questions) {
			KnuddelsServer.getDefaultBotUser().sendPublicMessage('Glückstrumpf - °BB°_' + user.getProfileLink() + '_°r° hat den AppTest zu _' + parseInt(_data.succeed / (App._settings.questions / 100)) + '% richtig_ beantwortet.');
			_instance.remove();
			return;
		}
		
		/* Hole eine neue Frage */
		_instance.createNewQuestion();
		
		_instance.questionLoop();
	};
	
	/* Wenn der Nutzer die Frage beantwortet */
	this.doAnswer = function(index) {
		var answer = _current_question.answers[index];
		
		/* Wenn die Antwort korrekt war */
		if(answer != undefined && answer.startsWith('*')) {
			++_data.succeed;
			
		/* Ansonsten war die Frage falsch */
		} else {
			++_data.failure;
		}
		
		/* Eine Neue Frage starten */
		_instance.start();
	};
	
	/* Erstellt ein Bild-Link um die Frage zu beantworten */
	this.createImage = function(index) {
		var image_default	= KnuddelsServer.getFullImagePath('radiobutton...nopush.clickchange.clicktoggleonce.png');
		var image_hover		= KnuddelsServer.getFullImagePath('radiobutton_checked...nopush.png');
		
		return '°>' + image_default + '|' + image_hover + '<>--<>|/apptest answer:' + index + '<°';
	};
	
	this.createNewQuestion = function() {
		_current_question = RandomOperations.getRandomObject(questions);
		
		/* Prüfe ob die Frage bereits schon einmal beantwortet wurde */
		if(_used_question.indexOf(JSON.stringify(_current_question)) > -1) {
			_instance.createNewQuestion();
			return;
		}
		
		_used_question.push(JSON.stringify(_current_question));
	};
	
	this.getRandomCorrectAnswer = function() {
		var answer_index	= RandomOperations.nextInt(_current_question.answers.length);
		var answer			= _current_question.answers[answer_index];
		
		/* Wenn die Antwort nicht "wahr" ist, rekursion */
		if(!answer.startsWith('*')) {
			return _instance.getRandomCorrectAnswer();
		}
		
		return {
			index:	answer_index,
			answer: answer
		};
	};
	
	this.sendQuestion = function() {
		/* Wählt eine Zufällige Frage aus */
		var question			= RandomOperations.getRandomObject(_current_question.questions);
		
		/* Holt 4 zufällige Antworten */
		var question_indexes	= RandomOperations.nextInts(_current_question.answers.length, 4, true);
		
		var text				= 'AppTest - Frage ' + (_instance.countQuestions() + 1) + '/' + App._settings.questions + ':';
		text					+= '°##°_' + question + '_°#°';
		
		var question_array			= [];
		var has_correct_answer		= false;
		
		for(var index in question_indexes) {
			var answer_index	= question_indexes[index];
			var answer			= _current_question.answers[answer_index];
			
			/* Entferne das Anfangszeichen, sofern verfügbar. Man soll ja nicht schummeln können ;) */
			if(answer.startsWith('*')) {
				answer					= answer.substring(1);
				has_correct_answer		= true;
			}
			
			question_array.push('°#°' + _instance.createImage(answer_index) + ' ' + answer);			
		}
		
		/* Überprüft ob eine korrekte Antwort existiert, wenn nicht ersetze eine zufällige Antwort mit dieser */
		if(!has_correct_answer) {
			var random_answer_index				= RandomOperations.nextInt(question_array.length);
			var answer							= _instance.getRandomCorrectAnswer();
			
			/* Entferne das Anfangszeichen, sofern verfügbar. Man soll ja nicht schummeln können ;) */
			if(answer.answer.startsWith('*')) {
				answer.answer					= answer.answer.substring(1);
			}
			
			question_array[random_answer_index] = '°#°' + _instance.createImage(answer.index) + ' ' + answer.answer;
		}
		
		/* Fügt die Fragen zum Text hinzu */
		text += question_array.join('');
		
		
		user.sendPrivateMessage(text);
	};
	
	this.questionLoop = function() {
		/* Sendet die neue Frage */
		_instance.sendQuestion();
		
		/* Startet einen Timeout für die nächste Frage */
		_timer = setTimeout(function() {
			++_data.failure;
			_instance.start();	
		}, 60 * App._settings.time * 1000);
	};
};