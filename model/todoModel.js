const ConnectToMongoDB = require("../utils/mongodb");
const { ObjectId } = require("mongodb");
const ToDoCollection = "todo";

async function find() {
    const db = await new ConnectToMongoDB().Get();
    return new Promise(async (resolve, reject) => {
        const todos = await db.collection(ToDoCollection).find({}, {
            sort: {
                _id: -1
            }
        }).toArray();
        resolve(todos);
    });
}

async function findById(id) {
    const db = await new ConnectToMongoDB().Get();
    return new Promise(async (resolve, reject) => {
        const todo = await db.collection(ToDoCollection).findOne({_id: new ObjectId(id)});
        // const todo = await db.collection(ToDoCollection).findOne({_id: new ObjectId(id)})
        resolve(todo);
    });
}

async function create(todo) {
    const db = await new ConnectToMongoDB().Get();
    return new Promise(async (resolve, reject) => {
        const result = await db.collection(ToDoCollection).insertOne(todo);
        resolve(result);
    });
}

async function update(id, payload) {
    const db = await new ConnectToMongoDB().Get();
    return new Promise(async (resolve, reject) => {
        const result = await db.collection(ToDoCollection).updateOne({_id: new ObjectId(id)}, {
            $set: {...payload}
        });
        resolve(result);
    });
}

async function remove(id) {
    const db = await new ConnectToMongoDB().Get();
    return new Promise(async (resolve, reject) => {
        const result = await db.collection(ToDoCollection).deleteOne({_id: new ObjectId(id)});
        resolve(result);
    });
}

const ToDoModel = {
    find,
    findById,
    create,
    update,
    remove
};

module.exports = ToDoModel;
