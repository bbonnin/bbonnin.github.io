/*
 * 00001016-d102-11e1-9b23-00025b00a5a5,
 * 00001800-0000-1000-8000-00805f9b34fb,
 * 00001801-0000-1000-8000-00805f9b34fb,
 * 0000180a-0000-1000-8000-00805f9b34fb,
 * 0000180f-0000-1000-8000-00805f9b34fb,
 * 22bb746f-2ba0-7554-2d6f-726568705327, //ollie robot control service
 * 22bb746f-2bb0-7554-2d6f-726568705327, //ollie service id 
 * 22bb746f-2bc0-7554-2d6f-726568705327
 */

var ollieServiceId = '22bb746f-2bb0-7554-2d6f-726568705327';
var wakeCharacteristicId = '22bb746f-2bbf-7554-2d6f-726568705327';
var antidosCharacteristicId = '22bb746f-2bbd-7554-2d6f-726568705327';
var ollieRobotControlServiceId = '22bb746f-2ba0-7554-2d6f-726568705327';
var ollieServer, ollieService;

/*
 AntiDOSCharacteristic = 22bb746f-2bbd-7554-2D6F-726568705327
AntiDOSTimeoutCharacteristic = 22bb746f-2bbe-7554-2D6F-726568705327
BleRadioService = 22bb746f-2bb0-7554-2D6F-726568705327
CommandCharacteristic = 22bb746F-2ba1-7554-2D6F-726568705327
ConnectionIntervalCharacterisic = 22BB746F-2BB9-7554-2D6F-726568705327
CrystalTrimCharacteristic = 22BB746F-2BB8-7554-2D6F-726568705327
DeepSleepCharacteristic = 22BB746F-2BB7-7554-2D6F-726568705327
DeviceInfoService = 0000180a-0000-1000-8000-00805f9b34fb
EnableAdvertiseCharacteristic = 22BB746F-2BB3-7554-2D6F-726568705327
EnableHandshakeCharacteristic = 22BB746F-2BB1-7554-2D6F-726568705327
RSSINotifyCharacteristic = 22BB746F-2BB6-7554-2D6F-726568705327
ResponseCharacteristic = 22bb746F-2ba6-7554-2D6F-726568705327
RobotControlService = 22bb746f-2ba0-7554-2d6f-726568705327
SISModelNumberCharacteristic = 00002A24-0000-1000-8000-00805f9b34fb
SISRadioFirmwareVersion = 00002A26-0000-1000-8000-00805f9b34fb
SerialNumCharacteristic = 00002A25-0000-1000-8000-00805f9b34fb
TxPowerCharacteristic = 22bb746f-2bb2-7554-2D6F-726568705327
WakeCharacteristic = 22bb746f-2bbf-7554-2D6F-726568705327
 */

/*---------------------------------------------------------------------------*/
/*                            ALL IN ONE                                     */
/*---------------------------------------------------------------------------*/

function stopOllie() {
    
}

function requestAndConnectAndGetServiceAndWriteCharacteristic() {
    console.log('Go !');
    console.log('Requesting device...');
    navigator.bluetooth.requestDevice({ filters: [{ services: ['0000180f-0000-1000-8000-00805f9b34fb'] }] })
        .then(device => { 
            console.log('Device name : ' + device.name);
            console.log('UUIDS : ' + device.uuids);
            return device.connectGATT();
        })
        .then(server => {
            console.log('Connected !');
            console.log('Get ollie service...');
            //return server.getPrimaryService('battery_service');
            return server.getPrimaryService(ollieServiceId);
        })
        .then(service => {
            console.log('Get characteristic...');
            //return service.getCharacteristic('battery_level');
            return service.getCharacteristic(wakeCharacteristicId);
        })
        .then(characteristic => {
            console.log('Writing value (to wake Ollie)...');
            return characteristic.writeValue(new Uint8Array([1]));
        })
        .then(res => {
            console.log("Write ok, Ollie should awaken !");
        })
        .catch(error => { 
            console.log(error);
            console.log(error.name);
        });
}


/*---------------------------------------------------------------------------*/
/*                            STEP BY STEP                                   */
/*---------------------------------------------------------------------------*/

function requestDevice() {
    console.log("Connecting to device...");

    navigator.bluetooth.requestDevice({ filters: [{ services: [ollieServiceId] }] })
        .then(device => {
            console.log("Device : " + device.name);
            $('#device').html('<strong>' + device.name + '</strong><br>');
            device.uuids.forEach(function(uuid) {
                $('#uuids').html($('#uuids').html() + '<br>' + uuid);
            });
        })
        .catch(error => { 
            console.log("Error : " + error.message + " (" + error.name + ")");
        });
}

function connectToOllie() {
    console.log("Requesting device...");

    navigator.bluetooth.requestDevice({ filters: [{ services: [ollieServiceId] }] })
        .then(device => {
            console.log("Device : " + device.name);
            return device.connectGATT();
        })
        .then(server => {
            console.log("Connected to ollie !");
            ollieServer = server;
        })
        .catch(error => { 
            console.log("Error : " + error.message + " (" + error.name + ")");
        });
}

function getOllieService() {
    
    if (ollieServer) {
        console.log('Get service ' + ollieServiceId + '...');
        ollieServer.getPrimaryService(ollieServiceId)
            .then(service => {
                ollieService = service;
                console.log("Service ok!");
            })
            .catch(error => { 
                console.log("Error : " + error.meesage + "(" + error.name + ")");
            });
    }
    else {
        console.log("Argh ! ollieServer unavailable");
    }
}

function wakeOllie() {
    
    if (ollieService) {
        console.log('Get characteristic ' + antidosCharacteristicId + '...');
        ollieService.getCharacteristic(antidosCharacteristicId)
            .then(characteristic => {
                console.log("Writing value (antidos)...");
                var str = "011i3";
                var bytes = [];
                for (var i = 0; i < str.length; ++i) 
                    bytes.push(str.charCodeAt(i));
                return characteristic.writeValue(new Uint8Array(bytes));
            })
            .then(res => {
                console.log("write ok !");
                console.log('Get characteristic ' + wakeCharacteristicId + '...');
                return ollieService.getCharacteristic(wakeCharacteristicId);
            })
            .then(characteristic => {
                console.log('Writing value 1 to wake Ollie...');
                return characteristic.writeValue(new Uint8Array([1]));
            })
            .then(res => {
                console.log("Ollie should be awaken!");
            })
            .catch(error => { 
                console.log("Error : " + error.message + " (" + error.name + ")");
            });
    }
    else {
        console.log("Argh ! ollieService unavailable");
    }
}

var DID = 0x02;
var COLORS = {
  BLACK:  0x000000,
  BLUE:   0x0000ff,
  GREEN:  0x00ff00,
  ORANGE: 0xff4500,
  PINK:   0xff1444,
  PURPLE: 0xff00ff,
  RED:    0xff0000,
  WHITE:  0xffffff,
  YELLOW: 0xffff00
};

var randomColor = function() {
  var r = Math.random()*255;
  var g = Math.random()*255;
  var b = Math.random()*255;
  var color = (r << 16) | (g << 8) | b;
  return color;
};

var _createPacket = function(did, cid, options) {
  var _packet = {};
  for (var _i in options) {
    if (options.hasOwnProperty(_i)) {
      _packet[_i] = options[_i];
    }
  }
  _packet.DID = did;
  _packet.CID = cid;

  return _packet;
};

var createPacket = function(cid, options) {
  return _createPacket(DID, cid, options);
};

function setColor(color, persist, options) {
    var packet = createPacket(0x20, options);

    packet.DATA = new Uint8Array([
        (color >> 16) & 0xFF,
        (color >> 8)  & 0xFF,
        color & 0xFF,
        persist?0x01:0x00
    ]);
  
    var result = packetBuilder(packet);
    return result;
}

function testColor() {
  var packet = setColor(randomColor(), undefined, {resetTimeout:true});
  var roll = '22bb746f-2ba1-7554-2d6f-726568705327';
  
  if (ollieServer) {
        console.log('Get service ' + ollieRobotControlServiceId + '...');
        ollieServer.getPrimaryService(ollieRobotControlServiceId)
            .then(service => {
                console.log("Service ok!");
          		return service.getCharacteristic(roll);
            })
            .then(characteristic => {
                console.log('Writing value...');
                return characteristic.writeValue(new Uint8Array(packet.buffer));
            })
            .then(res => {
                console.log("Ollie should change its color!");
            })
            .catch(error => { 
                console.log("Error : " + error.message + "(" + error.name + ")");
            });
    }
    else {
        console.log("Argh ! ollieServer unavailable");
    }
  
}

function testOllie() {
    var charId = $('#char_id').val();
    var charVal = $('#char_value').val();
  
    if (ollieService) {
        console.log('Get characteristic ' + charId + '...');
        ollieService.getCharacteristic(charId)
            .then(characteristic => {
                console.log('Writing value ' + charVal + ' ...');
                return characteristic.writeValue(new Uint8Array([parseInt(charVal)]));
            })
            .then(res => {
                console.log("Ollie should do something!");
            })
            .catch(error => { 
                console.log("Error : " + error.message + " (" + error.name + ")");
            });
    }
    else {
        console.log("Argh ! ollieService unavailable");
    }
}

/* OLD CODE
          .then(characteristic => {
            console.log("Reading value...");
            return characteristic.readValue();
          })
          .then(buffer => {
            var data = new DataView(buffer);
            console.log('Battery percentage is ' + data.getUint8(0));
          })*/
          
          /*.then(characteristic => {
            console.log("Writing value (antidos)...");
            var str = "011i3";
            var bytes = [];
            for (var i = 0; i < str.length; ++i) 
              bytes.push(str.charCodeAt(i));
            return characteristic.writeValue(new Uint8Array(bytes));
          })
          .then(res => {
            console.log("write ok !");
            return ollieService.getCharacteristic('22bb746f-2bb2-7554-2d6f-726568705327');
          })
          .then(characteristic => {
            console.log("Writing value (tx)...");
            return characteristic.writeValue(new Uint8Array([7]));
          })
*/

var calculateChecksum = function(aBuffer, start, end) {
  var calculatedChecksum = 0;
  for (var _i = start; _i < end; _i++) {
    calculatedChecksum += aBuffer.readUint8(_i);
  }
  calculatedChecksum = calculatedChecksum & 0xFF ^ 0xFF;
  return calculatedChecksum;
};

var minimumCommandPacketSize = 7; //Smallest command packets are 7 bytes long
var spheroCommandTemplate = {
  SOP1: 0,
  SOP2: 1,
  DID:  2,
  CID:  3,
  SEQ:  4,
  DLEN: 5, //Two Bytes
  DATA: 6,
  CHK:  6 //The checksum offset must be adjusted if DLEN > 1
};

/**
 *
 * @param packet.DID
 * @param packet.CID
 * @param packet.SEQ
 * @param packet.DATA
 * @returns {Buffer}
 */
var packetBuilder = function(packet) {
  packet.DID = packet.DID || 0x00;
  packet.CID = packet.CID || 0x00;
  packet.SEQ = packet.SEQ || 0x00;
  packet.DATA = packet.DATA || new Uint8Array(0);
  packet.resetTimeout = packet.resetTimeout || false;
  packet.requestAcknowledgement = packet.requestAcknowledgement || false;
  var SOP2 = 0xFC | (packet.resetTimeout && 0x02) | (packet.requestAcknowledgement && 0x01);
//[255, 254, 2, 32, 0, 5, 0, 0, 0, 0, 255]
  var arraybuffer = new ArrayBuffer(packet.DATA.length + minimumCommandPacketSize);
  var buffer = new DataView(arraybuffer);
  buffer.setUint8(spheroCommandTemplate.SOP1, 0xff); //255
  buffer.setUint8(spheroCommandTemplate.SOP2, SOP2); //254
  buffer.setUint8(spheroCommandTemplate.DID, packet.DID);//2
  buffer.setUint8(spheroCommandTemplate.CID, packet.CID);//32
  buffer.setUint8(spheroCommandTemplate.SEQ, packet.SEQ);//0
  buffer.setUint8(spheroCommandTemplate.DLEN, packet.DATA.length+1);//5
  //packet.DATA.copyWithin(buffer, spheroCommandTemplate.DATA);
  packet.DATA.forEach(function(d, i) {
    buffer.setUint8(spheroCommandTemplate.DATA + i, d);
  });
  //var checksum = calculateChecksum(arraybuffer.slice(spheroCommandTemplate.DID, minimumCommandPacketSize + packet.DATA.length - 1));
  var checksum = calculateChecksum(buffer, spheroCommandTemplate.DID, minimumCommandPacketSize + packet.DATA.length - 1);
  buffer.setUint8(spheroCommandTemplate.CHK + packet.DATA.length, checksum);
  return buffer;

};