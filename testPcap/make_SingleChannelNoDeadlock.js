/*
var toInsert = [];
for (var j = 0; j < 10000; j++) {
    toInsert.push({
        x: j
    });
}

for (var i = 0; i < 100; i++) {
    db.test.insert(toInsert);
}

*/
db1 = (new Mongo()).getDB("mongotape");

var c = db1.runCommand({
    aggregate: "test",
    cursor: {
        batchSize: 5
    }
});

cursorId = c.cursor.id;

print("got cursor fron cxn1: ", cursorId);

var cursor1 = db1.getMongo().cursorFromId("mongotape.test", cursorId);

while (cursor1.hasNext()) {
    printjson(cursor1.next());
}

for (var i = 0; i < 100; i++) {
    db1.test.insert({
        y: i
    });
    sleep(50);
}
var cursor2 = db1.test.find();
printjson(cursor2.next());
