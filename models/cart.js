const Sequelize = require('sequelize');

module.exports = class Cart extends Sequelize.Model {
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
            modelName: 'Cart',
            tableName: 'carts',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        });
    }

    static associate(db) {
        db.Cart.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id' });
        db.Cart.belongsTo(db.Product, { foreignKey: 'productNum', targetKey: 'productID' });
    }
};
