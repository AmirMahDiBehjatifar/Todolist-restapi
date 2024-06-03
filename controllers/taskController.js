const ToDoModel = require("../model/todoModel");

async function get(req, res) {
    try {
        const tasks = await ToDoModel.find()
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.write(JSON.stringify(tasks));
        res.end();
    } catch (error) {
        console.log(error);
    }
}

async function create(req, res) {
    try {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            const task = {...JSON.parse(body), createdAt: new Date()};
            const result = await ToDoModel.create(task);
            res.writeHead(201, {
                'Content-Type': 'application/json'
            });
            res.write(JSON.stringify(result));
            res.end();
        });
    } catch (error) {
        console.log(error);
    }
}

async function update(req, res) {
    try {
        let body = '';
        const id = req.url.split("/")[3];
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            const parsedBody = {...JSON.parse(body)};
            const task = await ToDoModel.findById(id);
            if (!task) {
                res.writeHead(404, {
                    'Content-Type': 'application/json'
                });
                res.write(JSON.stringify({
                    message: "Not Found any Task"
                }));
                res.end();
            } else {
                const result = await ToDoModel.update(id, parsedBody);
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                res.write(JSON.stringify(result));
                res.end();
            }
        });
    } catch (error) {
        console.log(error);
    }
}

async function getById(req, res) {
    try {
        const id = req.url.split("/")[3];
        const task = await ToDoModel.findById(id);
        if (!task) {
            res.writeHead(404, {
                'Content-Type': 'application/json'
            });
            res.write(JSON.stringify({
                message: "Not Found any Task"
            }));
            res.end();
        } else {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.write(JSON.stringify(task));
            res.end();
        }
    } catch (error) {
        console.log(error);
    }
}

async function remove(req, res) {
    try {
        const id = req.url.split("/")[3];
        const task = await ToDoModel.findById(id);
        if (!task) {
            res.writeHead(404, {
                'Content-Type': 'application/json'
            });
            res.write(JSON.stringify({
                message: "Not Found any Task"
            }));
            res.end();
        } else {
            const result = await ToDoModel.remove(id);
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.write(JSON.stringify(result));
            res.end();
        }
    } catch (error) {
        console.log(error);
    }
}

const TaskController = {
    get,
    getById,
    update,
    create,
    remove
};

module.exports = TaskController;
