import db from "../models"
const { User, Category, Subcategory, Product, Order } = db;
// import User from "../models"
// import Category from "../models"
// import Subcategory from "../models"
// import Product from "../models"
// import Order from "../models"

const getBuyer = async () => {
    const buyer = await User.findAll({
        where: { role: 'buyer' },
        include: [
            {
                model: Order,
                as: "order",
                attributes: ['id', 'total_amount', 'status', 'createdAt'],
            }
        ],
        attributes: ['id', 'role', 'email'],
    });
    return buyer;
};



const getSeller = async() => {
    const buyer = await User.findAll({
        where: { role: 'seller' },
        include: [
            {
                model: Product,
                as: "product",
                attributes: ['id','name'],
            }
        ],
        attributes: ['id', 'role', 'email'],
    });
    return buyer;
};


const getDashboardSummery=async()=>{
    const totalUsers = await User.count();
    const totalCategories = await Category.count();
    const totalSubcategories = await Subcategory.count();
    const totalProducts = await Product.count();
    const totalOrders = await Order.count();
    
    return ({
      totalUsers,
      totalCategories,
      totalSubcategories,
      totalProducts,
      totalOrders,
    });
}



module.exports = { getBuyer, getSeller,getDashboardSummery };
