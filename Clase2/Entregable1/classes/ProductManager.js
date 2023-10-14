
class ProductManager{

    #products
    constructor(){
        this.#products = []
    }

    addProduct(product){
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
                return console.log({
                    message: "Product added!",
                    product: newProduct
                })
            }
            else{
                const lastId = this.#products[this.#products.length - 1].id
                const newProduct = {
                    id: lastId + 1,
                    ...product
                }
                this.#products.push(newProduct)
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
    getProducts(){
        return this.#products
    }
    getProductById(productId){
        const productById = this.#products.find(product => product.id === Number(productId))
        if(productById){
            return productById
        }
        else{
            return console.error(`Product whith ID ${productId} not found`)
        }
    }
}
export default ProductManager