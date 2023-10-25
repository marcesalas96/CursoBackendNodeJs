import ProductManager from "./classes/ProductManager.js"

const productManager = new ProductManager("./db/Products.json")

const main = async () => {

    const productsFirstCall = await productManager.getProducts()
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
        code: "abc124",
        stock: 25
    }
    const product3 = {
        tittle: "producto prueba",
        description: "Esto es un producta prueba",
        price: 200,
        code: "123",
        stock: 25
    }
    
    await productManager.addProduct(product)
    await productManager.addProduct(product2)
    await productManager.addProduct(product3)
    
    const products = await productManager.getProducts()
    const productById = await productManager.getProductById(0)
    
    console.log(products)
    console.log(productById)

    await productManager.updateProduct(1, {tittle: "Producto actualizado!!!", price: 20})
    await productManager.deleteProduct(2)
    console.log(await productManager.getProducts())
}

main()