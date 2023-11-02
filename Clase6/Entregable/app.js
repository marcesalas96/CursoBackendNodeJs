import express from "express";
import ProductManager from "./classes/ProductManager.js";

const productManager = new ProductManager("./db/Products.json")
const app = express()
const PORT = 8080

app.use(express.urlencoded({extended : true}))


const product = {
    tittle: "producto prueba",
    description: "Esto es un producta prueba",
    price: 200,
    thumbnail: "sin imagen",
    code: "abc123",
    stock: 25
}
const product2 = {
    tittle: "producto prueba2",
    description: "Esto es un producta prueba",
    price: 200,
    thumbnail: "sin imagen",
    code: "abc124",
    stock: 25
}
const product3 = {
    tittle: "producto prueba3",
    description: "Esto es un producta prueba",
    price: 200,
    thumbnail: "sin imagen",
    code: "123",
    stock: 25
}


// const main = async () => {
//     await productManager.addProduct(product)
//     await productManager.addProduct(product2)
//     await productManager.addProduct(product3)
// }

// main()

app.get("/products", async (req, res) => {
    const {limit} = req.query
    const products = await productManager.getProducts()
    if(!limit) {
        return res.json({payload: products, message: "Ok!"})
    }
    else{
        const productsWithLimit = products.slice(0, Number(limit))
        return res.json({payload: productsWithLimit, message: "Ok!"})
    }
})

app.get("/products/:pid", async (req, res) => {
    const {pid} = req.params;

    const productById = await productManager.getProductById(pid)

    return res.json({payload: productById, message: "Ok!"})
})


app.listen(PORT, (err) => {
    err ? console.log(`Connection error : ${err}`) : console.log(`Server listening in port : ${PORT}`)
})