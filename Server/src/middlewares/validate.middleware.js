export const validate =
	(schema) => (req, res, next) => {
		try {
			schema.parse({
				body: req.body,
				query: req.query,
				params: req.params,
			});
			next();
		} catch (error) {
			throw new Error(error);
		}
	};
