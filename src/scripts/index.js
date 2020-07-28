var connection = $.hubConnection("https://kioskserver-qa.azurewebsites.net/signalr", { useDefaultPath: false });
connection.qs = { 'sessionID': '123123123' };
var deviceHubProxy = connection.createHubProxy('DeviceHub');

connection.start()
    .done(function (evt) {
        //successful connection – send registerConnection
        console.log('Connected to the server', evt);
        deviceHubProxy.invoke('deviceId', 1234);
        deviceHubProxy.on('registerConnection', function(evt) {
            console.log('------registerConnection----', evt);
        });
    })
    .fail(function () {
        if (isReconnect) {
            alert('Lost connection to server. Check internet connection')
        } else {
            alert('Cannot connect to server. Check internet connection')
        }
    });
