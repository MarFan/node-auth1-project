const db = require('../data/dbConfig');

module.exports = {
    find,
    addUser,
    findUser,
    findUserBy,
    removeUser
}

function find() {
    return db('users').select('id','username');
}

function findUser(id) {
    return db('users')
        .select('id', 'username', 'password')
        .where({ id })
        .first();
}

function findUserBy(filter) {
    return db('users').select('id','username','password').where(filter);
}

function addUser(user) {
    return db('users').insert(user, 'id')
        .then(ids => {
            const [id] = ids;
            return findUser(id);
        });
}

function removeUser(id){
    return db('users').where({id}).del()
}