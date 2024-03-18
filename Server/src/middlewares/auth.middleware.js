import jwt from "jsonwebtoken";

function verifyUser(req, res, next) {
	const token = req.headers["authorization"];
	if (!token) {
		return res
			.status(401)
			.json({ message: "No token provided" });
	}

	jwt.verify(
		token.split(" ")[1],
		"secret_key",
		(err, decoded) => {
			if (err) {
				return res
					.status(401)
					.json({ message: "Invalid token" });
			}
			req.user = decoded;
			next();
		}
	);
}

module.exports = verifyUser;
