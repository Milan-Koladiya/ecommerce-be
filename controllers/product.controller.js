const productService = require("../services/product.service")
const categoryService = require("../services/category.service")
const subcategoryService = require("../services/subcategories.service")
const userService = require("../services/user.service")
const { successRes, catchRes, errorRes } = require("../utils/response.function")
const { Op, where } = require("sequelize");


const createProduct = async (req, res) => {
    try {
        const seller_id = req.user.id
        const productBody = req.body

        if (req.user.role !== 'seller' && req.user.role !== 'admin') {
            return errorRes(res, "only seller and admin can create product")
        }
        if (!req.file) {
            return errorRes(res, "image is required")

        }

        const sellerExist = await userService.findUser({ id: seller_id })
        if (!sellerExist) {
            return errorRes(res, "Seller not Found!")
        }

        const catagoryExist = await categoryService.findCategory({ id: productBody.category_id })
        if (!catagoryExist) {
            return errorRes(res, "Category not found!")
        }

        const subcategoryexist = await subcategoryService.findSubcategory({ id: productBody.subcategory_id })
        if (!subcategoryexist) {
            return errorRes(res, "Suncategory not found!")
        }


        const productExist = await productService.findProduct({ name: productBody.name, category_id: productBody.category_id, subcategory_id: productBody.subcategory_id })
        if (productExist) {
            return errorRes(res, "This product already add in this category!")
        }
        const file = req.file

        const data = {
            seller_id,
            ...productBody,
            image_url: file.path
        }
        console.log(data)

        const product = await productService.createProduct(data);
        return successRes(res, "Product Add successfully", product, 201)
    }
    catch (error) {
        console.log("Something want wrong add product!", error)
        return catchRes(res, error.message, 500)
    }
}

const getSingleProduct = async (req, res) => {
    try {
        const id = req.params.id

        // if (req.user.role !== 'seller' && req.user.role !== 'admin') {
        //     return errorRes(res, "only seller and admin can get product")
        // }

        const product = await productService.findProduct({ id })
        if (!product) {
            return errorRes(res, "Product Not Found!")
        }
        return successRes(res, "Get Single Product Successfully", product, 201)

    }
    catch (error) {
        console.log("Something want wrong!", error)
        return catchRes(res, error.message, 500)
    }
}

const updateProduct = async (req, res) => {
    try {
        const productBody = req.body
        const { id } = req.params
        console.log(id.productBody)
        if (req.user.role !== 'seller' && req.user.role !== 'admin') {
            return errorRes(res, "only seller and admin can update the product")
        }

        const product = await productService.findProduct(req.params)
        if (!product) {
            return errorRes(res, "Product Not Found!")
        }

        const updatedata = await productService.updateProduct(productBody, { id: id })
        return successRes(res, "product Update Successfully!", updatedata, 200)
    }
    catch (error) {
        console.log("Something want wrong!", error)
        return catchRes(res, error.message, 500)
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params

        if (req.user.role !== 'seller' && req.user.role !== 'admin') {
            return errorRes(res, "only seller and admin can delete product")
        }

        const product = await productService.findProduct({ id: id })
        if (!product) {
            return errorRes(res, "Product Not Found!")
        }

        const deletedProduct = await productService.deleteProduct({ id: id })
        return successRes(res, "Product Deleted Successfully", deletedProduct)
    }
    catch (error) {
        console.log("Something want wrong!", error)
        return catchRes(res, error.message, 500)
    }
}

const filterProduct = async (req, res) => {
    try {
        const { search, ...filter } = req.body;

        const whereCondition = {};

        if (filter.id) {
            whereCondition.id = filter.id;
        }
        if (filter.category_id) {
            whereCondition.category_id = filter.category_id;
        }
        if (filter.subcategory_id) {
            whereCondition.subcategory_id = filter.subcategory_id;
        }
        if (filter.price) {
            whereCondition.price = { [Op.eq]: Number(filter.price) };
        }
        if (filter.min_price && filter.max_price) {
            whereCondition.price = {
                [Op.between]: [Number(filter.min_price), Number(filter.max_price)]
            };
        } else if (filter.min_price) {
            whereCondition.price = {
                [Op.gte]: Number(filter.min_price)
            };
        } else if (filter.max_price) {
            whereCondition.price = {
                [Op.lte]: Number(filter.max_price)
            };
        }

        let searchCondition = [];
        if (search) {
            searchCondition = [
                { name: { [Op.iLike]: `%${search}%` } },
                { description: { [Op.iLike]: `%${search}%` } },
                { '$subcategory.category.name$': { [Op.iLike]: `%${search}%` } },
                { '$subcategory.name$': { [Op.iLike]: `%${search}%` } }
            ];
            whereCondition[Op.or] = searchCondition;
        }

        console.dir(whereCondition, { depth: null })
        const filterdata = await productService.filter(whereCondition);

        if (filterdata.length === 0) {
            return errorRes(res, "No data found");
        }
        return successRes(res, "Product Get Successfully", filterdata);

    }
    catch (error) {
        console.log("Something want wrong!", error)
        return catchRes(res, error.message, 500)
    }
}

const getAllProduct = async (req, res) => {
    try {

        // if (req.user.role !== 'seller' && req.user.role !== 'admin') {
        //     return errorRes(res, "only seller and admin can get product details")
        // }
        const allProduct = await productService.getAllProduct()
        return successRes(res, "Get All Product Successfully", allProduct, 200)
    }
    catch (error) {
        console.log("Something want wrong!", error)
        return catchRes(res, error.message, 500)
    }


}

module.exports = { createProduct, getSingleProduct, updateProduct, deleteProduct, filterProduct, getAllProduct }





        // const { search, ...filter } = req.body;

        // const whereCondition = {};
        // if (filter.id) {
        //     whereCondition.id = filter.id;
        // }
        // if (filter.category_id) {
        //     whereCondition.category_id = filter.category_id;
        // }
        // if (filter.subcategory_id) {
        //     whereCondition.subcategory_id = filter.subcategory_id;
        // }
        // if (filter.price) {
        //     whereCondition.price = { [Op.eq]: Number(filter.price) };
        // }
        // if (filter.min_price && filter.max_price) {
        //     whereCondition.price = {
        //         [Op.between]: [Number(filter.min_price), Number(filter.max_price)]
        //     };
        // } else if (filter.min_price) {
        //     whereCondition.price = {
        //         [Op.gte]: Number(filter.min_price)
        //     };
        // } else if (filter.max_price) {
        //     whereCondition.price = {
        //         [Op.lte]: Number(filter.max_price)
        //     };
        // }

        // if (search) {
        //     whereCondition[Op.or] = [
        //         { name: { [Op.iLike]: `%${search}%` } },
        //         { description: { [Op.iLike]: `%${search}%` } }

        //     ];
        // }