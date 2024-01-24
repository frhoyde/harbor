// Initialize the replica set
rs.initiate({
    _id: 'rs0',
    members: [
        { _id: 0, host: 'localhost:27017' }
        // Add more members here if you want to set up additional nodes
    ]
});

// Use admin then create user root
var adminDB = db.getSiblingDB('admin');
adminDB.createUser({
    user: 'omor',
    pwd: 'Omor2402',
    roles: [{ role: 'root', db: 'admin' }]
});

// Authenticate as the root user
adminDB.auth('omor', 'Omor2402');

var dbName = 'sample';
// Create a new user in the target database
adminDB.createUser({
    user: 'farhan',
    pwd: 'farhanTestPass',
    roles: [{ role: 'readWrite', db: dbName }]
});