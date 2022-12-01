const Sequelize = require('sequelize');

module.exports = class Bord extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      content: {    // 게시글
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      img: {
        type: Sequelize.STRING(200),    // 경로로 저장 DB용량 문제
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Bord',
      tableName: 'bords',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    db.Bord.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id' });
  }
};
