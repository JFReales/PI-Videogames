const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define("videogame", {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		platforms: {
			type: DataTypes.ARRAY(DataTypes.STRING),
			defaultValue: [],
			allowNull: false,
		},
		background_image: {
			type: DataTypes.STRING,
			isUrl: true,
			allowNull: false,
		},
		released: {
			type: DataTypes.DATEONLY,
			allowNull: false,
		},
		rating: {
			type: DataTypes.DECIMAL,
			defaultValue: 0,
			allowNull: false,
		},
	});
};
