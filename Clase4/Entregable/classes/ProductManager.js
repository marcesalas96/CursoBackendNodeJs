import * as fs from "fs"


class ProductManager{

    #products
    #path
    constructor(fileName){
        this.#products = []
        this.#path = fileName
    }

    async addProduct(product){
        if(product.tittle && product.description && product.price && product.thumbnail && product.code && product.stock){
            const productWithRepeatedCode = this.#products.find(productCode => productCode.code === product.code)
            if(productWithRepeatedCode){
                return console.error(`The code:  ${product.code} is allready given to a product`)
            }
            if(this.#products.length === 0){
                const newProduct = {
                    id: 1,
                    ...product
                }
                this.#products.push(newProduct)
                await fs.promises.writeFile(this.#path, JSON.stringify(this.#products))
                return console.log({
                    message: "Product added!",
                    product: newProduct
                })
            }
            else{
                this.#products = await this.getProducts()
                const lastId = this.#products[this.#products.length - 1].id
                const newProduct = {
                    id: lastId + 1,
                    ...product
                }
                this.#products.push(newProduct)
                await fs.promises.writeFile(this.#path, JSON.stringify(this.#products))
                return console.log({
                    message: "Product added!",
                    product: newProduct
                }) 
            }
        }
        else{
            return console.error("All fields are required!")
        }
    }
    async getProducts(){
        if(fs.existsSync(this.#path)){
            const products = await fs.promises.readFile(this.#path, "utf-8")
            if(products.length < 1 ){
                return []
            }
            else {
                return JSON.parse(products)
            }
        }
        else{
            return []
        }
    }
    async getProductById(productId){
        const products = await this.getProducts()
        const productById = products.find(product => product.id === Number(productId))
        if(productById){
            return productById
        }
        else{
            return console.error(`Product whith ID ${productId} not found`)
        }
    }
    async updateProduct(productId, fieldToUpdate){

        try {
            const products = await this.getProducts()
            const productToUpdate = await this.getProductById(productId)
            const newProps = fieldToUpdate
            const indexOfProduct = products.findIndex(product => product.id === Number(productId))
            for (const newProp in newProps){
                if(productToUpdate.prop !== newProp){
                    productToUpdate[newProp] = newProps[newProp]
                }
            }
            const updatedProduct = {
                ...productToUpdate
            }
            console.log("acaaaaa", updatedProduct)
            products[indexOfProduct] = updatedProduct
            
            fs.promises.writeFile(this.#path, JSON.stringify(products))
            return (
                console.log({
                    message: "Product updated!",
                    product: updatedProduct
                }) 
            )
            
        } catch (error) {
            
        }
    }
    async deleteProduct(productId){
        const products = await this.getProducts()
        const indexOfProduct = products.findIndex(product => product.id === Number(productId))
        if(indexOfProduct>=0){
            products.splice(indexOfProduct, 1)
            fs.promises.writeFile(this.#path, JSON.stringify(products))
            return (
                console.log({
                    message: "Product deleted"
                }) 
            )
        }
        else{
            return (
                console.log({
                    message: `Product with ID: ${productId} didn´t exist!`
                }
                )
            )
        }
    }
}
export default ProductManager