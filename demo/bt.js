

var ollieServiceId = '22bb746f-2bb0-7554-2d6f-726568705327';
var wakeCharacteristicId = '22bb746f-2bbf-7554-2d6f-726568705327';
var ollieServer, ollieService;


/*---------------------------------------------------------------------------*/
/*                            ALL IN ONE                                     */
/*---------------------------------------------------------------------------*/

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

function connectToOllie() {
    console.log("Connecting to device...");

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
            console.log("Error : " + error.meesage + "(" + error.name + ")");
        });
}

function getOllieService() {
    
    if (ollieServer) {
        console.log('Get service ' + ollieServiceId + '...');
        ollieServer.getPrimaryService(ollieServiceId)
            .then(service => {
                ollieService = service;
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
        console.log('Get characteristic ' + wakeCharacteristicId + '...');
        ollieService.getCharacteristic(wakeCharacteristicId)
            .then(characteristic => {
                console.log('Writing value 1 to wake Ollie...');
                return characteristic.writeValue(new Uint8Array([1]));
            })
            .then(res => {
                console.log("Ollie should be awaken!");
            })
            .catch(error => { 
                console.log("Error : " + error.meesage + "(" + error.name + ")");
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