$(() => ({
    var content = $('#content');
    var status = $('#status');
    var input = $('#input');

    var myName = false;

    window.WebSocket = window.WebSocket || window.MozWebSocket;

    if (!window.WebSocket) {
        content.html($('<p>', {text: 'Sorry, your browser doesn\'t support WebSockets.'}));
        input.hide();
        $('span').hide();
        return;
    }

    var connection = new WebSocket('ws://localhost:53211');

    connection.onopen = () => ({
        input.removeAttr('disabled');
        status.text('Choose name:');
    });

    connection.onerror = function (error) {
        content.html($('<p>', { text: 'Sorry, but there\'s some problem with your '
                                    + 'connection or the server is down.' } ));
    };

    connection.onmessage = (message) => ({
        
    });
}));
