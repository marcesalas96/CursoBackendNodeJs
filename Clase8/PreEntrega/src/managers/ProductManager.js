import * as fs from "fs"

class ProductManager {
    #products
    #path
    constructor(fileName) {
        this.#products = []
        this.#path = fileName
    }

    loadData = async () => {
        try {
            if (fs.existsSync(this.#path)) {
                const products = await fs.promises.readFile(this.#path, "utf-8")
                this.#products = JSON.parse(products)
            }
            else {
                await fs.promises.writeFile(this.#path, "[]")
            }
        } catch (error) {

            throw new Error({ message: error.message })
        }
    }

    addProduct = async (product) => {
        try {
            await this.loadData()
            if (product.title && product.description && product.price && product.code && product.stock && product.category) {
                const productWithRepeatedCode = this.#products.find(productCode => productCode.code === product.code)
                if (productWithRepeatedCode) {
                    throw new Error(`The code: ${product.code} is allready given to a product`)
                }
                const newProduct = {
                    ...product
                }
                if (this.#products.length === 0) {
                    newProduct.id = 1
                }
                else {
                    const lastId = this.#products[this.#products.length - 1].id
                    newProduct.id = lastId + 1
                }
                this.#products.push(newProduct)
                await fs.promises.writeFile(this.#path, JSON.stringify(this.#products))
                return ({product: newProduct})
            }
            else {
                throw new Error("All fields are required!")
            }
        } catch (error) {
            return error.message
        }
    }
    getProducts = async (limit) => {
        try {
            await this.loadData()
            if (limit) {
                const productsWithLimit = this.#products.slice(0, Number(limit))
                return productsWithLimit
            }
            else {
                return this.#products 
            }
        } catch (error) {
            return error.message 
        }
    }


    getProductById = async (pid) => {
        try {
            await this.loadData()
            const productById = this.#products.find(product => product.id === Number(pid))
            if (productById) {
                return productById
            }
            else {
                throw new Error( `Product whith ID ${pid} not found` )
            }
        } catch (error) {
            throw new Error(error.message )
        }
    }


    updateProduct = async (pid, newProps) => {
        try {
            await this.loadData()
            const productToUpdate = await this.getProductById(pid)
            const indexOfProduct = this.#products.findIndex(product => product.id === Number(pid))
            const updatedProduct = {
                ...productToUpdate,
                ...newProps
            }
            this.#products[indexOfProduct] = updatedProduct
            await fs.promises.writeFile(this.#path, JSON.stringify(this.#products))
            return ({message: "Product updated!",oldProduct: productToUpdate,productUpdated: updatedProduct})
        } catch (error) {
            throw new Error(error.message)
        }
    }

    deleteProduct = async (pid) => {
        try {
            await this.loadData()
            const indexOfProduct = this.#products.findIndex(product => product.id === Number(pid))
            if (indexOfProduct >= 0) {
                this.#products.splice(indexOfProduct, 1)
                await fs.promises.writeFile(this.#path, JSON.stringify(this.#products))
                return ({ message: "Product deleted"})
            }
            else {
                throw new Error( `Product with ID: ${pid} don't exist!` )
            }
        } catch (error) {
            throw new Error( error.message)
        }
    }
}
export default ProductManager