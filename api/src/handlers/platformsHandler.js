const { getPlatforms } = require("../controllers/getPlatforms");

const platformsHandler = async (req, res) => {
	try {
		const response = await getPlatforms();
		res.status(200).json(response);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = { platformsHandler };
