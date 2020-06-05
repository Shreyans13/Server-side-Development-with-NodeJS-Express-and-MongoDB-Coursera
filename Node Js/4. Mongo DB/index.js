const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require("./operations");

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

	MongoClient.connect(url).then((client) => {
		
		console.log('Connected correctly to server');

		const db = client.db(dbname);

		dboper.insertDocument(db, {name: "Vadonut", description: 'Test'}, 'dishes')
		.then((result) => {
			console.log('Insert Document:\n', result.ops);

			return dboper.findDocument(db, 'dishes')
		})
		.then((docs) => {
			console.log('Found Documents:\n', docs);

			return dboper.updateDocument(db, {name: 'Vadonut'}, {description: 'Updated Test'}, 'dishes')
		})
		.then((result) => {

			console.log('Updated Document:\n', result.result)

			return dboper.findDocument(db, 'dishes') 
		})
		.then((docs) => {
			console.log('Found Documents:\n', docs);

			return db.dropCollection('dishes')
		})
		.then((result) => {
			console.log("Droped Collection: ", result);

			client.close();
		})
		.catch(err => {console.log(err)});
	})
	.catch(err => {console.log(err)});


// Callback hell
	// MongoClient.connect(url, (err, client) => {
		
	// 	assert.equal(err, null);
		
	// 	console.log('Connected correctly to server');

	// 	const db = client.db(dbname);

	// 	dboper.insertDocument(db, {name: "Vadonut", description: 'Test'}, 'dishes', (result) => {
	// 		console.log('Insert Document:\n', result.ops);

	// 		dboper.findDocument(db, 'dishes', (docs) => {
	// 			console.log('Found Documents:\n', docs);

	// 			dboper.updateDocument(db, {name: 'Vadonut'}, {description: 'Updated Test'}, 'dishes', (result) => {

	// 				console.log('Updated Document:\n', result.result)

	// 				dboper.findDocument(db, 'dishes', (docs) => {
	// 					console.log('Found Documents:\n', docs);

	// 					db.dropCollection('dishes', (result) => {
	// 						console.log("Droped Collection: ", result);

	// 						client.close();
	// 					})
	// 				})
	// 			})
	// 		})
	// 	});
	//	// Simple Operations
	// 		// const collection = db.collection('dishes');

	// 		// collection.insertOne({"name": "Uthappizza", "description": "test"}, (err, result) => {
	// 		// 	assert.equal(err, null);

	// 		// 	console.log('After Insert:\n');
	// 		// 	console.log(result.ops);

	// 		// 	collection.find({}).toArray((err, docs) => {
	// 		// 		assert.equal(err, null);

	// 		// 		console.log('Found:\n');
	// 		// 		console.log(docs);

	// 		// 		db.dropCollection('dishes', (err, result) => {
	// 		// 			assert.equal(err, null);

	// 		// 			client.close();
	// 		// 		});
	// 		// 	});
	// 		// });
	// });