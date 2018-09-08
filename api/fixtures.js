const mongoose = require('mongoose');
const moment = require('moment');
const config = require('./config');

const Users = require('./models/Users');
const Categories = require('./models/Categories');
const Tasks = require('./models/Tasks');

mongoose.connect(config.db.url + '/' + config.db.name);

const db = mongoose.connection;

db.once('open', async () => {
    try {
        await db.dropCollection('users');
        await db.dropCollection('categories');
        await db.dropCollection('tasks');
    } catch (e) {
        console.log('Collections were not present, skipping drop...');
    }


    const [cat1, cat2] = await Categories.create({
	    categoryName: 'Механизованный труд',
    }, {
	    categoryName: 'Ручной труд'
    });

    const [Admin, User1, User2] = await Users.create({
        username: 'admin',
        password: 'admin',
        role: 'admin',
        description: 'Main user'
    }, {
        username: 'user1',
        password: '123',
        role: 'user',
        description: 'ОРП'
    }, {
        username: 'user2',
        password: '123',
        role: 'user',
        description: 'Транспорт'
    });

    await Tasks.create({
        title: 'Выдать зарплату',
        description: 'Выдать всем работникам зарплату.',
        startDate: moment(),
        endDate: moment().add(3,'d'),
        categoryName: cat2._id,
        priority: false,
        user: Admin._id,
        status: 'new'
    }, {
        title: 'Task 2',
        description: 'Task 2 description',
        startDate: moment(),
        endDate: moment().add(3,'d'),
        categoryName: cat1._id,
        priority: false,
        user: Admin._id,
        status: 'new'
    }, {
        title: 'Task 3',
        description: 'Task 3 description',
        startDate: moment(),
        endDate: moment().add(3,'d'),
        categoryName: cat1._id,
        priority: true,
        user: Admin._id,
        status: 'finished'
    }, {
        title: 'Task 4',
        description: 'Task 4 description',
        startDate: moment(),
        endDate: moment().add(3,'d'),
        categoryName: cat2._id,
        priority: true,
        user: User1._id,
        status: 'finished'
    }, {
        title: 'Task 5',
        description: 'Task 5 description',
        startDate: moment(),
        endDate: moment().add(3,'d'),
        categoryName: cat1._id,
        priority: true,
        user: User2._id,
        status: 'overdue'
    }, {
        title: 'Task 6',
        description: 'Task 6 description',
        startDate: moment(),
        endDate: moment().add(3,'d'),
        categoryName: cat1._id,
        priority: false,
        user: Admin._id,
        status: 'overdue'
    }, {
        title: 'Task 6',
        description: 'Task 6 description',
        startDate: moment(),
        endDate: moment().add(3,'d'),
        categoryName: cat1._id,
        priority: false,
        user: Admin._id,
        status: 'new'
    }, {
        title: 'Task 6',
        description: 'Task 6 description',
        startDate: moment(),
        endDate: moment().add(3,'d'),
        categoryName: cat1._id,
        priority: false,
        user: Admin._id,
        status: 'new'
    });

    db.close();
});