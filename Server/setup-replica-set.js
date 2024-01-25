// setup-replica-set.js

rs.initiate({
	_id: "rs0",
	members: [{ _id: 0, host: "harbor:27017" }],
});
