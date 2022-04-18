class Evento extends Model { }

Evento.init({
    idEvento: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    FechaHora: {
        type: DataTypes.DATE,
        allowNull: false
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    coverImg: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bolicheId: {
        type: DataTypes.INTEGER,
        references: {
            model: Boliche,
            key: 'id'
        }
    },
    cantidadTotal: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cantidadDisponible: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

Evento.hasOne(Boliche);