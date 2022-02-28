var app = require( 'express' )();
var http = require( 'http' ).createServer( app );
var io = require( 'socket.io' )( http ,{
    cors: {
        origin: "*",
        // TODO: restrict the origin policy to IoT device and webpage.
        // origins: ["domaina.com","domainb.com"],
        methods: ["GET", "POST"],
    }
});

const logger = require('logger').createLogger('logfile.log'); 
const {sequelize} = require('./database/index');
const { DataTypes } = require('@sequelize/core');
const device = require('./models/device');
const { default: Constants } = require('./constants');
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
    // * IoT Device info listeners.
    socket.on('deviceInfoUpdate',(data) => {
        socket.join('DEVICES'); // * Set of IoT devices. 
        console.log( "An IoT device has connected!");
        logger.info("An IoT device has connected!");

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

            // const info = JSON.stringify(deviceInfo);
            // console.log("******** INFO *******");
            // console.log(info);
            // logger.info("******* INFO *******");
            // logger.info(info);

            console.log("Storing the IoT device IMEI: + ",imei," info in database...");
            logger.info("Storing the IoT device IMEI: + ",imei," info in database...");

            // * Update particular imei device info in database.
            Device.create(deviceInfo).then((res) => {
                console.log("Successfully: Stored the IoT device IMEI: ",imei," info  in database.");
                logger.info("Successfully: Stored the IoT device IMEI: ",imei," info in database.");
            }).catch((e) =>  {
                console.log("Error: ",e);
                logger.fatal("Error: ",e);
            });

            // TODO  Send Notification if required.
            // 1. Check if particular device is connected 

            
        }catch(e){
            console.log("Error: ",e);
            logger.fatal("Error: ",e);
        }
    })

    // * Web User event listerners.
    try{
        var userId;
        var interval;
        socket.on('FROM_WEB_USER',() => {
            console.log('A web user connected.');
            logger.info('A web user connected.');
        });

        socket.on('GET_DEVICE_LATEST_INFO_EVENT',(deviceId) => {
            socket.join('USERS'); // * Set of webpage users.

            // * SELECT fields FROM table ORDER BY id DESC LIMIT 1;
            console.log("Fetching device imei: ",deviceId," info from database");

            // * Send the latest info.
            const sendLatestInfoToWebPage = (deviceId,socket) => {
                Device.findOne({
                    raw:true,
                    order: [
                        ['imei', 'DESC'],
                    ],
                    where: {
                        imei: deviceId
                    },
                    limit: 1,
                    }).then((res) => {
                        try{
                            console.log("res",res);
                            socket.emit('DEVICE_LATEST_INFO',res);
                        }
                        catch(e){
                            console.log(e);
                        }
                    });
            }

            interval = setInterval(sendLatestInfoToWebPage,10000,deviceId,socket);
        });

    }catch(e){
        console.log("Error : ",e);
    }

    socket.on( 'disconnect', () => {
        var deleted = false;
        const userSet = io.sockets.adapter.rooms.get("USERS");
        const clientSet = io.sockets.adapter.rooms.get("DEVICES");
        const users = userSet ? Array.from(userSet) : [];
        const clients = clientSet ? Array.from(clientSet) : [];
        var index = users.indexOf(socket.id);
        if(interval!=null){
            // TODO: also clear interval when the client server is down.
            clearInterval(interval);
        }
        else{
            console.log("Webpage socket interval found null.");
            logger.fatal("Webpage socket interval found null.");
        }
        if(index!=-1){
            socket.leave("USERS");
            console.log('A web user disconnected!');
            logger.info('A web user disconnected!');
            deleted = true;
        }
        index = clients.indexOf(socket.id);
        if(index!=-1){
            socket.leave("DEVICES");
            console.log("An IoT Device has disconnected");
            logger.info("An IoT Device has disconnected");
            deleted = true;
        }

        if(!deleted){
            console.log("Socket disconnected but was not present in room.");
            logger.info("Socket disconnected but was not present in room.");
        }
    });
});
