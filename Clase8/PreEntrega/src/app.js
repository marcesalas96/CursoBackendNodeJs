import express from "express";
import productsRoutes from "./routes/products.routes.js"
import cartsRoutes from "./routes/carts.routes.js"
const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/products", productsRoutes)
app.use("/api/carts", cartsRoutes)



const server = app.listen(PORT, (err) =>{
    err ? console.log(`Error with server: ${err}`) : console.log(`Server listening PORT: ${PORT}`)
})