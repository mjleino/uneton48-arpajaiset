var genres = [
	{imgurl: "genret/apina.jpg", ballots: 0},
	{imgurl: "genret/hitler.jpg", ballots: 0},
	{imgurl: "genret/kahvi.jpg", ballots: 0},
	{imgurl: "genret/kirves.jpg", ballots: 0},
	{imgurl: "genret/kuumailmapallo.jpg", ballots: 0},
	{imgurl: "genret/kuusnepa.jpg", ballots: 0},
	{imgurl: "genret/leivos.jpg", ballots: 0},
	{imgurl: "genret/muna.jpg", ballots: 0},
	{imgurl: "genret/pikkuhousut.jpg", ballots: 0},
	{imgurl: "genret/tuulipuku.jpg", ballots: 0}
]
var teams = [
	"ACHTUNG HUBSCHRAUBER",
	"ActI",
	"Aktivistit",
	"Al Dentertainment",
	"Apollo 14",
	"arabian beach",
	"Arduas",
	"Beaten for Less",
	"Chicago F",
	"Church hill productions",
	"Cinema Emanon",
	"Color television",
	"CtrlÖ",
	"DEGERÖ MAFIA",
	"Dino Ryderz",
	"Drippin' Kiwi",
	"Drum Roll",
	"EetuArtit",
	"Film Jong Un",
	"Filmi Films",
	"Finfinitum",
	"Frankie",
	"Haikun hienous",
	"Handheld Pictures",
	"Hansa Lovers",
	"Havoc Films",
	"Hilpeät Pojat Tuotanto",
	"Iloinen Vyötiäinen",
	"Intelligenzian elokuvajaosto",
	"J.J. Koski Productions",
	"Jalaton Apina",
	"Jam With Us",
	"Jo-Jo the Dog Films",
	"Juicelous",
	"Junkyard Films",
	"Katkennut sammakko esittää:",
	"Kierotie",
	"Korruptio",
	"Kylmä käki visio",
	"Le Grande Petit",
	"Lentävä Lehmä Films",
	"Like a Sir",
	"Lorvipaja",
	"Lumimiesfilmi",
	"Maa Films",
	"Mastur",
	"Maxim",
	"Modomo Films",
	"Möhköfantit",
	"Monadi-Filmi",
	"Montaasi",
	"Murtuma Pictures",
	"Nahkavankkurit",
	"Negatiivinen ioni",
	"NIIN-Elokuvat",
	"Njeh",
	"North Entertainment",
	"Nuotta.com",
	"Off Productions",
	"Orjakoulutus",
	"Ovenkahva Production",
	"Overreacted",
	"Päätön Rotta",
	"Patterit Loppu Productions",
	"Pelko48",
	"Perjantai 13.",
	"Pokkumi",
	"Porin Teatterinuoret",
	"Prime Bokeh",
	"Proud Way Productions",
	"Pupari Productions",
	"Pusihätä",
	"Raina Films",
	"Rakkauden Apostolit",
	"Rasti Productions",
	"Red Sofa Productions",
	"Reflecting pictures",
	"Reippaat ja Raikkaat",
	"Renny's Angels",
	"Routa - T.J.P.",
	"Ryhmävalaan rakkaus",
	"Same-eYes Production",
	"Samiel Productions",
	"Savage Streets",
	"Silent Paprika Films",
	"Sinerama",
	"Sisyphean Films",
	"SPRK Productions",
	"Stereotypia",
	"Stone Films",
	"SUPERYSTÄVÄT",
	"Team Ishpinku",
	"Team Nörtin Kosto",
	"Team Paha",
	"Titanic",
	"TR Productions",
	"Ukulele",
	"V.I.P.",
	"Valofilmi",
	"Valtikka Films",
	"Veitsenterä",
	"Veljeskunta",
	"Viidet Sakset",
	"Villilä Korporaatio",
	"Vinksin & Vonksin",
	"Viro Tuotanto",
	"Where's the Beef Productions",
	"Will Smithin Pojat",
	"Z-Koodi",
	"Zibali Productions",
	"Team U48"
]

$(function() {
	var genre4team = function() {
		semaphore = true
		var chosen = randomGenre()
		genres[chosen].ballots = genres[chosen].ballots > 0 ? genres[chosen].ballots - 1 : 0
		$random.css("background-image", "url('countdown__.gif')")
		setTimeout(function() {
			$random.css("background-image", "url("+genres[chosen].imgurl+")")
			semaphore = false
		}, 1100) /* 1200ms magic gif duration */
		console.log(teams[teamPointer], "⟹", /\/(.*)\./.exec(genres[chosen].imgurl)[1]) // for record keeping ^__^
		keydownfn = teamPointer + 1 == teams.length ? gameover : nextteam
	}
	var nextteam = function() {
		$random.css("background-image", "")
		$team.text(teams[++teamPointer])
		$progress.text(teamPointer+1+"/"+teams.length)
		keydownfn = genre4team
	}
	var gameover = function() {
		$random.css("background-image", "")
		$team.text("")
		$progress.text("")
	}
	var randomGenre = function() {
		var chosen = Math.floor(Math.random()*genres.length)
		while (genres[chosen].ballots === 0) {
			chosen = Math.floor(Math.random()*genres.length)
			if (genres.reduce(countBallots, 0) === 0) break
		}
		return chosen
	}
	var countBallots = function(prev, genre) {
		return prev + genre.ballots
	}

	var $body       = $("body"),
	    $random     = $("#random"),
	    $team       = $("#team"),
	    $progress   = $("#progress"),
	    teamPointer = 0,
	    semaphore   = false,
	    keydownfn   = genre4team

	for (var i = teams.length; i > 0; i--) genres[i % genres.length].ballots++

	$team.text(teams[teamPointer])
	$progress.text(teamPointer+1+"/"+teams.length)

	$("body").keydown(function(e) {
		if (e.keyCode != 13 && e.keyCode != 32 || semaphore) return // enter & space okay 
		keydownfn()
	})

	// preload genreimgs as a joke
	(new Image()).src = "countdown__.gif"
	$.each(genres, function(i, v) {	(new Image()).src = v.imgurl })
})