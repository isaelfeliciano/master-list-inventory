const low = require('lowdb');

const db = low("db.json");

// db.defaults({data: {} });
db.set('data', {})
.value();

var jsonArray = [/*Insertar JSON*/];

var tempArray = [];
for (var i = 0; i < jsonArray.length; i++) {
	var item = jsonArray[i].item;
	// console.log(i);
	process.stdout.write(`Record ${i} saved of 12001 \r`);
	if (!db.has('data.' + item).value()) {
		db.set('data.' + item, [])
		.value();

		db.set('data.' + item, [jsonArray[i]])
		.value();
		tempArray = [1];
	} else {
		tempArray = db.get('data.' + item)
		.take(tempArray.length)
		.value();
		tempArray.push(jsonArray[i]);

		db.set('data.' + item, tempArray)
		.value();
	}


	if (i == (jsonArray.length) - 1) {
		console.log("Done!");
	}
}