var app = require( 'express' )();
var http = require( 'http' ).createServer( app );
var io = require( 'socket.io' )( http );
const logger = require('logger').createLogger('logfile.log'); 
const {sequelize} = require('./database/index');
const { DataTypes } = require('@sequelize/core');
const device = require('./models/device');
const Device = require( './models/device')(sequelize,DataTypes);


const PORT = process.env.PORT || 3000;

// * Root route.
app.get( '/', function( req, res ) {
    res.sendFile( __dirname + '/public/index.html' );
});

http.listen( PORT, function() {
    console.log( 'listening on *:' + PORT );
    logger.info( 'listening on *:' + PORT );
});

io.on( 'connection', ( socket ) => {
    console.log( "An IoT device has connected!" );
    logger.info("An IoT device has connected!");
    socket.on('deviceInfoUpdate',(data) => {
        console.log("Recieved update from device.");
        logger.log("Recieved update from device.");
        try{

            console.log("Parsing IoT device info...");
            logger.info("Parsing IoT device info...");
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
            
            console.log("Parsed IoT device info.");
            logger.info("Parsed IoT device info.");
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

            const info = JSON.stringify(deviceInfo);
            console.log("******** INFO *******");
            console.log(info);
            logger.info("******* INFO *******");
            logger.info(info);

            console.log("Storing the IoT device IMEI: + ",imei," in database...");
            logger.info("Storing the IoT device IMEI: + ",imei," in database...");
            Device.create(deviceInfo).then((res) => {
                console.log("Successfully: Stored the IoT device IMEI: + ",imei," in database.");x 
                logger.info("Successfully: Stored the IoT device IMEI: + ",imei," in database.");
            }).catch((e) =>  {
                console.log(e);
                logger.fatal(e);
            });
        }catch(e){
            console.log(e);
            logger.fatal(e);
        }
    })
    
    socket.on( 'disconnect', () => {
        console.log("An IoT Device has disconnected");
        logger.info("An IoT Device has disconnected");
    });
});