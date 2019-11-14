const db = require('../database/dbConfig');

module.exports = {
    find,
    findBy,
    add
};

function find() {
    return db('users')
        .select('id', 'username', 'department');
}

function findBy(criteria) {
    return db('users')
        .where(criteria)
        .select();
}

function add(user) {
    return db('users').insert(user);
}