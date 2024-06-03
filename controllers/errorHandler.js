const notFound = function (res) {
    res.writeHead(404,{'Content-Type':'application/json'})
    res.write(JSON.stringify({
        Error:"ROUTE NOT FOUND .."

    }));
    res.end();
}
const ErrorHandler = {
    notFound
}
module.exports = ErrorHandler;