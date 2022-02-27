var app = require( 'express' )();
var http = require( 'http' ).createServer( app );
var io = require( 'socket.io' )( http );

const PORT = 3000;

app.get( '/', function( req, res ) {
res.sendFile( __dirname + '/public/index.html' );
});

http.listen( PORT, function() {
console.log( 'listening on *:' + PORT );
});

io.on( 'connection', ( socket ) => {
    console.log( "a user has connected!" );
    
    socket.on('deviceInfoUpdate',(data) => {
        console.log(data);
    })
    
    socket.on( 'disconnect', () => {
        console.log("a user has disconnected");
    });
});