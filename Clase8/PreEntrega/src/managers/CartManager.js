import * as fs from 'fs'
import ProductManager from './ProductManager.js'


class CartManager {

    #path
    #carts
    #productManager
    constructor(fileName) {
        this.#path = fileName
        this.#carts = []
        this.#productManager = new ProductManager("./src/db/products.json")
    }

    loadData = async () => {
        try {
            if (fs.existsSync(this.#path)) {
                const carts = await fs.promises.readFile(this.#path, "utf-8")
                this.#carts = JSON.parse(carts)
            }
            else {
                await fs.promises.writeFile(this.#path, "[]")
            }
        } catch (error) {

            throw new Error(error.message)
        }
    }

    createCart = async () => {
        try {
            await this.loadData()
            const newCart = {
                products: []
            }
            if (this.#carts.length === 0) {
                newCart.id = 1
            }
            else {
                const lastId = this.#carts[this.#carts.length - 1].id
                newCart.id = lastId + 1
            }
            this.#carts.push(newCart)
            await fs.promises.writeFile(this.#path, JSON.stringify(this.#carts))
            return ({ message: "Cart created!" })
        } catch (error) {
            throw new Error(error.message)
        }
    }

    getCartById = async (cid) => {
        await this.loadData()
        const cart = this.#carts.find(cartById => cartById.id === Number(cid))
        if (!cart) {
            throw new Error(`Cart whith ID ${cid} not found`)
        }
        return cart
    }

    getProductsFromCart = async (cid) => {
        try {
            const cart = await this.getCartById(cid) 
            return ({ products: cart.products })
        } catch (error) {
            throw new Error(error.message)
        }
    }

    addProductToCart = async (cid, pid) => {
        try {
            const productToAdd = await this.#productManager.getProductById(pid)
            const cart = await this.getCartById(cid)
            if(cart.products.length === 0){
                cart.products.push({product: productToAdd.id, quantity: 1})
            }
            else{
                const productExist = cart.products.find(product => product.product === productToAdd.id)
                if(productExist){
                    productExist.quantity ++
                }
                else{
                    cart.products.push({product: productToAdd.id, quantity: 1})
                }
            }
            await fs.promises.writeFile(this.#path, JSON.stringify(this.#carts))
            return({payload: `Product with ID: ${pid} added succesfully in cart with ID: ${cid}`})
            
            

        } catch (error) {
            throw new Error(error.message)
        }
    }
}

export default CartManager