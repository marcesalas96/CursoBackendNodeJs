import ProductManager from "../managers/ProductManager.js"
const pm = new ProductManager("./src/db/products.json")
export const addProduct = async (req, res) => {
    try {
        const { title, description, code, price, status = true, stock, category, thumbnails } = req.body
        const product = { title, description, code, price, status, stock, category, thumbnails }
        const response = await pm.addProduct(product)
        return res.status(201).json(response)
    } catch (error) {
        return res.status(400).json({Error: error.message})
    }
}
export const getProducts = async (req, res) => {
    try {
        const {limit} = req.query
        const products = await pm.getProducts(limit) 
        return res.status(200).json({ products: products })
    } catch (error) {
        return res.status(400).json({Error: error.message})
    }
}
export const getProductById = async (req, res) => {
    try {
        const {pid} = req.params
        if(isNaN(pid)){
            throw new Error(`Product ID: ${pid} is not valid`)
        }
        const product = await pm.getProductById(pid)
        return res.status(200).json({product})
    } catch (error) {
       return res.status(400).json({Error: error.message})
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { pid } = req.params
            if(isNaN(pid)){
                throw new Error(`Product ID: ${pid} is not valid`)
            }
            const newProps = req.body
            const payload = await pm.updateProduct(pid, newProps)
            return res.status(200).json({payload})
            
    } catch (error) {
        res.status(400).json({Error: error.message})
        
    }
}

export const deleteProduct = async (req, res) => {

    try {
        const { pid } = req.params
            if(isNaN(pid)){
                throw new Error(`Product ID: ${pid} is not valid`)
            }
        const payload = await pm.deleteProduct(pid)
        return res.status(200).json({payload})
    } catch (error) {
        res.status(400).json({Error: error.message})
    }

}