import CartManager from "../managers/CartManager.js";

const cm = new CartManager("./src/db/carts.json")

export const createCart = async (req, res) => {
    try {
        const payload = await cm.createCart()
        res.status(201).json({ payload })
    } catch (error) {
        res.status(400).json({ Error: error.message })
    }
}

export const getProductsFromCart = async (req, res) => {
    try {
        const { cid } = req.params
        if (isNaN(cid)) {
            return res.status(400).json({ Error: `Cart ID: ${cid} is not valid` })
        }
        const payload = await cm.getProductsFromCart(cid)
        res.status(200).json({ payload })

    } catch (error) {
        res.status(400).json({ Error: error.message })
    }
}

export const addProductToCart = async (req, res) => {
    try {
        const { cid, pid } = req.params
        if (isNaN(cid) || isNaN(pid)) {
            return res.status(400).json({ Error: `Cart ID: ${cid} or/and Product ID: ${pid} is/are not valid` })
        }
        const payload = await cm.addProductToCart(cid, pid)
        res.status(200).json({payload})
    } catch (error) {
        res.status(400).json({ Error: error.message })
    }
}