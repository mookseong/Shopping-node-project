const Sequelize = require('sequelize');

module.exports = class Product extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            productID:{
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            productName: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            productPrice: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            productDescription: {
                type: Sequelize.TEXT,
                allowNull: true
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Product',
            tableName: 'products',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.Product.hasMany(db.Basket, { foreignKey: 'productNum', sourceKey: 'productID' });
        db.Product.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id' });
    }
}