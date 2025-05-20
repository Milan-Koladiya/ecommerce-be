

const createPayment = async (req, res) => {
    try {

        return successRes(res, "User profile get successfully", user, 200)

    }
    catch (error) {
        console.log("Something want wrong!", error.message)
        return catchRes(res, error.message, 500)

    }
}

const getStatus = () => {

}


module.exports = { createPayment, getStatus }