var Connect = require('connect');


var server = Connect.createServer(
    Connect.logger(),
    Connect.staticProvider(__dirname),
    Connect.errorHandler({ dumpExceptions: true, showStack: true })
);
server.listen(8080);

var players = [];

var io = require('socket.io');
var socketServer = io.listen(server, {
				 //transports: ['websocket', 'htmlfile', 'xhr-multipart', 'xhr-polling']
			     });
socketServer.on('connection', function(socket){
    var hasJoined = false, playerId;
    var relay = function(info) {
	for(var i in players) {
	    if (i != playerId)
		players[i].socket.send(JSON.stringify(info));
	}
    };

    socket.on('message', function(message) {
	var data;
	if (message.indexOf('~j~') === 0)
	    data = JSON.parse(message.substr(3));
	else
	    return;
	console.log({data:data});

	if (!hasJoined) {  // joining now
	    hasJoined = true;
	    playerId = players.length;
	    players[playerId] = { socket: socket, nick: data.nick };
	    // push all other players to new one
	    for(var i in players) {
		if (i != playerId)
		    socket.send(JSON.stringify({ id: i, nick: players[i].nick, pos: players[i].pos }));
	    }
	}

	players[playerId].pos = data.pos;
	// broadcastplayer data to all others
	relay({ id: playerId, nick: players[playerId].nick, pos: data.pos });
    });
    socket.on('disconnect', function() {
	console.log('disconnect');

	if (hasJoined) {
	    delete players[playerId];
	    relay({ id: playerId, status: 'disconnected' });
	}
    });
});
