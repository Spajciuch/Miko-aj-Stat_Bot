var Discord = require('discord.js')
var client =  new Discord.Client()
var moment = require("moment")
var firebase = require('firebase')
  var config = {
    apiKey: "AIzaSyBfMC79FxBn6tOaWNymWSP-rWdgjHwLw94",
    authDomain: "mikolajbot1234.firebaseapp.com",
    databaseURL: "https://mikolajbot1234.firebaseio.com",
    projectId: "mikolajbot1234",
    storageBucket: "mikolajbot1234.appspot.com",
    messagingSenderId: "759257802287"
  };
  firebase.initializeApp(config);
  var database = firebase.database()
client.on("ready", () => {
	console.log(`[client] Zalogowano jako ${client.user.tag}`)
		database.ref(`/staty/online`).once("value")
	.then(async dbo => {
	var high = dbo.val()
	var ytspeak = client.guilds.get("472782700277923845")
	
	setInterval(function(){
		
	
		let online = ytspeak.members.filter(member => member.user.presence.status !== 'offline');
	var hr = new Date().getHours() +2
	if(hr == 25) hr = 1
		
		if(high<online.size-ytspeak.members.filter(m => m.user.bot).size) {
			high = online.size-ytspeak.members.filter(m => m.user.bot).size
			database.ref(`/staty/`).set({ 
				online:high
			})
		}
	client.channels.get("490439258851770370").edit({name: `Osoby online: ${online.size-ytspeak.members.filter(m => m.user.bot).size}`});
   	client.channels.get("490439303395278851").edit({name: `Liczba Członków: ${ytspeak.memberCount - ytspeak.members.filter(m => m.user.bot).size}`});
   	client.channels.get("490439345824595978").edit({name: `Data: ${moment.utc(new Date()).format('DD.MM.YYYY')}`})
   	client.channels.get("490439596027543562").edit({name: `Godzina: ${hr}:${moment.utc(new Date()).format('mm:ss')}`})
   	client.channels.get("490439634732449792").edit({name:`Rekord Online: ${high}`})
  },1000)
})
})
client.login("NDkwNDI5NzQ0ODY5OTMzMDY2.Dn5MCw.JHCvEwppBo_6ttfXF2xykpi9N0Y")