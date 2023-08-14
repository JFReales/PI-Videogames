const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define(
		"videogame",
		{
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				defaultValue: DataTypes.UUIDV4,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			description: {
				type: DataTypes.TEXT,
			},
			platforms: {
				type: DataTypes.ARRAY(DataTypes.STRING),
				defaultValue: [],
			},
			background_image: {
				type: DataTypes.STRING,
				isUrl: true,
			},
			released: {
				type: DataTypes.STRING,
			},
			rating: {
				type: DataTypes.FLOAT,
			},
			createdBd: {
				type: DataTypes.BOOLEAN,
				defaultValue: true,
			},
		},
		{ timestamps: false }
	);
};
