class Persona extends Model { }

Persona.init({
    idBoliche: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nombres: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellidos: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fechaNacimiento: {
        type: DataTypes.DATEONLY,
    },
    tipoDni: {
        type: DataTypes.STRING,
    },
    numeroDni: {
        type: DataTypes.INTEGER,
    },
    cuit: {
        type: DataTypes.INTEGER,
    },
}, {
    sequelize,
    modelName: 'Persona'
})