const Sequelize = require('sequelize');

module.exports = class Basket extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            number: {
                type: Sequelize.INTEGER(),
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            }
        }, {
            sequelize,
            timestamps: false,
            modelName: 'Comment',
            tableName: 'comments',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        });
    }

    static associate(db) {
        db.Basket.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id' });
        db.Basket.belongsTo(db.Product, { foreignKey: 'productId', targetKey: 'id' });
    }
};
