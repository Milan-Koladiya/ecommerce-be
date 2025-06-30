import { DataTypes} from "sequelize";
const { Model,Sequelize} = require("sequelize")

export default(sequelize:typeof Sequelize, DataType:typeof DataTypes) => {
  class Category extends Model {
    static associate(db:any) {
        Category.belongsTo(db.User, { as: 'seller', foreignKey: 'seller_id' });
      
        Category.hasMany(db.Subcategory, { as: 'subcategory', foreignKey: 'category_id' }); 

        Category.hasMany(db.Product, { as: 'product', foreignKey: 'category_id'});

    }
  }

  Category.init({
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
      validate: { notNull: { msg: "Category name is required" } }
    },
    seller_id: {
      type: DataType.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Category',
    freezeTableName: true,
    tableName: 'category',
    timestamps: true,
    paranoid:true
  });

  return Category;
};
