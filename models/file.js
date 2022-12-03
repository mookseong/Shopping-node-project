const Sequelize = require('sequelize');

module.exports = class file extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            url: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            file: {
                type: Sequelize.STRING(),
                allowNull: false,
            }


        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'File',
            tableName: 'files',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.File.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id' });
    }
};
