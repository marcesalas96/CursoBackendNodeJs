import ProductManager from "./classes/ProductManager.js";

const productManager = new ProductManager()

const productsFirstCall = productManager.getProducts()
console.log(productsFirstCall)
const product = {
    tittle: "producto prueba",
    description: "Esto es un producta prueba",
    price: 200,
    thumbnail: "sin imagen",
    code: "abc123",
    stock: 25
}
const product2 = {
    tittle: "producto prueba",
    description: "Esto es un producta prueba",
    price: 200,
    thumbnail: "sin imagen",
    code: "abc123",
    stock: 25
}
const product3 = {
    tittle: "producto prueba",
    description: "Esto es un producta prueba",
    price: 200,
    code: "123",
    stock: 25
}

productManager.addProduct(product)
productManager.addProduct(product2)
productManager.addProduct(product3)

const products = productManager.getProducts()
const productById = productManager.getProductById(0)

console.log(products)
console.log(productById)