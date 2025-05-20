const cartService = require("../services/cart.service")
const { successRes, catchRes, errorRes } = require("../utils/response.function")



const addToCart = async (req, res) => {
    try {
        const cartBody = req.body
        if (req.user.role !== 'buyer') {
            return errorRes(res, "only buyer add the product into the cart")
        }

        const findExistCartProduct = await cartService.findCart(cartBody)
        if (findExistCartProduct) {
            return errorRes(res, "user add this already into the cart")
        }
        const data = await cartService.addToCart(cartBody)
        return successRes(res, "Product Add into The Cart", data, 201)
    }
    catch (error) {
        console.log("Something want wrong!", error.message)
        return catchRes(res, error.message, 500)
    }
}


const getCurrentUserCart = async (req, res) => {
    try {
        const { user_id } = req.user.id

        if (req.user.role !== 'buyer') {
            return errorRes(res, "only buyer can get our cart")
        }

        const cartFound = await cartService.getAllCartItems(user_id)

        if (cartFound.length == 0) {
            return errorRes(res, "this user not add item in cart")
        }

        return successRes(res, "Get All Cart Data Successfully", cartFound, 200)
    }
    catch (error) {
        console.log("Something want wrong!", error.message)
        return catchRes(res, error.message, 500)
    }
}

const updateQuantity = async (req, res) => {
    try {
        const product_id = req.params.product_id
        const quantity = req.body

        if (req.user.role !== 'buyer') {
            return errorRes(res, "only buyer can update the quantity of the product")
        }

        const data = await cartService.updateQuantity(quantity, { product_id: product_id })
        return successRes(res, "update quantity of cart", data, 200)
    }
    catch (error) {
        console.log("Something want wrong!", error.message)
        return catchRes(res, error.message, 500)
    }
}

const removeProductFromCart = async (req, res) => {
    try {
        const product_id = req.params.product_id

        if (req.user.role !== 'buyer') {
            return errorRes(res, "only buyer product can remove product from the cart")
        }

        const data = await cartService.deleteProductFromCart({ product_id: product_id })
        return successRes(res, "remove product from cart", data, 200)
    }
    catch (error) {
        console.log("Something want wrong!", error.message)
        return catchRes(res, error.message, 500)
    }
}

const clearCartOfUser = async (req, res) => {
    try {
        const { user_id } = req.body;

        if (req.user.role !== 'buyer') {
            return errorRes(res, "only buyer clear our cart")
        }

        if (!user_id) {
            return errorRes(res, "user_id is required", 400);
        }

        const deletedCount = await cartService.clearCart({ user_id: user_id });

        return successRes(res, "Cart cleared", { deletedCount }, 200);
    } catch (error) {
        console.log("Something went wrong!", error.message);
        return catchRes(res, error.message, 500);
    }
};




module.exports = { addToCart, getCurrentUserCart, updateQuantity, removeProductFromCart, clearCartOfUser }