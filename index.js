var app = require( 'express' )();
var http = require( 'http' ).createServer( app );
var io = require( 'socket.io' )( http );
const {sequelize} = require('./database/index');
const { DataTypes } = require('@sequelize/core');
const Device = require( './models/device')(sequelize,DataTypes);


const PORT = 3000;

app.get( '/', function( req, res ) {
res.sendFile( __dirname + '/public/index.html' );
});

http.listen( PORT, function() {
console.log( 'listening on *:' + PORT );
});

io.on( 'connection', ( socket ) => {
    console.log( "An IoT device has connected!" );

    socket.on('deviceInfoUpdate',(data) => {
        try{
            const [
            imei,
            latitude,
            longitude,
            cell1,
            cell2,
            cell3,
            cell4,
            cell5,
            cell6,
            cell7,
            cell8,
            cell9,
            cell10,
            cell11,
            cell12,
            cell13,
            cell14,
            avgcellvoltage,
            packvoltage,
            current,
            batterypercent,...others] = data.tdata.split(',');
            
            const deviceInfo = {
                vid: data.vid,
                datavia: data.datavia,
                latitude: latitude,
                longitude: longitude,
                imei: imei,
                cell1:cell1,
                cell2:cell2,
                cell3:cell3,
                cell4:cell4,
                cell5:cell5,
                cell6:cell6,
                cell7:cell7,
                cell8:cell8,
                cell9:cell9,
                cell10:cell10,
                cell11:cell11,
                cell12:cell12,
                cell13:cell13,
                cell14:cell14,
                avgcellvoltage:avgcellvoltage,
                packvoltage:packvoltage,
                current:current,
                batterypercent:batterypercent
            };

            // TODO logger here.
            // console.log("deviceInfo = ",deviceInfo);
            // console.log("keys = ",Object.keys(deviceInfo).length);
            // console.log("Sequelize Model: ", sequelize.models);

            Device.create(deviceInfo).then((res) => {
                // TODO log device inserted (with device Id).
                console.log("Inserted device info in database.");
            }).catch((e) =>  {
                
                // TODO log device inserted (with device Id).
                console.log(e);
            });
        }catch(e){
            // TODO log error
            console.log("Catch error:", e);
        }
    })
    
    socket.on( 'disconnect', () => {
        console.log("An IoT Device has disconnected");
    });
});