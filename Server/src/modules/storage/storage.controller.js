// create storage
export const storageController = {
	createStorageFacility: async (req, res) => {
		try {
			await storageService.createStorageFacility(
				req.body.data
			);
			res.status(201).json({
				message: "Storage created successfully",
			});
		} catch (error) {
			res
				.status(409)
				.json({ message: error.message });
		}
	},

	getStorageFacility: async (req, res) => {
		try {
			const storage = await Storage.find();
			res.status(200).json(storage);
		} catch (error) {
			res
				.status(404)
				.json({ message: error.message });
		}
	},

	updateStorageFacility: async (req, res) => {
		const { id } = req.params;
		const { name } = req.body;
		try {
			const storage =
				await Storage.findByIdAndUpdate(id, {
					name,
				});
			res.status(200).json({
				message: "Storage updated successfully",
			});
		} catch (error) {
			res
				.status(404)
				.json({ message: error.message });
		}
	},

	deleteStorageFacility: async (req, res) => {
		const { id } = req.params;
		try {
			await Storage.findByIdAndDelete(id);
			res.status(200).json({
				message: "Storage deleted successfully",
			});
		} catch (error) {
			res
				.status(404)
				.json({ message: error.message });
		}
	},
};
