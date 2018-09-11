var fs = require('fs');
var http = require('http');

var PORT = 8081;

createHttpServer();

/*
 * Create http server.
 */
function createHttpServer() {
    http.createServer(function (req, res) {
        downloadFile(res);
    }).listen(PORT, '127.0.0.1');
    console.log('Server running at http://127.0.0.1:' + PORT + '...');
}

/*
 * Output the download file.
 */
function downloadFile(res) {
    // The must headers.
    res.setHeader('Content-type', 'application/octet-stream');
    res.setHeader('Content-Disposition', 'attachment;filename=aaa.txt');    // 'aaa.txt' can be customized.
    var fileStream = fs.createReadStream('./download/aaa.txt');
    fileStream.on('data', function (data) {
        res.write(data, 'binary');
    });
    fileStream.on('end', function () {
        res.end();
        console.log('The file has been downloaded successfully!');
    });
}
