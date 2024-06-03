const http = require("http");
const TaskController = require("./controllers/taskController");
const ErrorHandler = require("./controllers/errorHandler");
const PORT = 3000;

// Point : if you want to search by id you will need _id for get task by id

const server = http.createServer((req, res) => {
    const apiRoute = "api";
    const tasksRoute = `/${apiRoute}/tasks`;
    const singleTaskRoute = /\/api\/tasks\/[0-9]+/;
    const { url, method } = req;

    if (url === tasksRoute && method === "GET") {
        TaskController.get(req, res);
    } else if (url.match(singleTaskRoute) && method === "GET") {
        TaskController.getById(req, res);
    } else if (url === tasksRoute && method === "POST") {
        TaskController.create(req, res);
    } else if (url.match(singleTaskRoute) && method === "PUT") {
        TaskController.update(req, res);
    } else if (url.match(singleTaskRoute) && method === "DELETE") {
        TaskController.remove(req, res);
    } else {
        ErrorHandler.notFound(res);
    }
});

server.listen(PORT);
console.log(`Server is running on port ${PORT}`);
