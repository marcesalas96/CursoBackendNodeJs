import { Router } from "express";
import { addProduct, getProducts, getProductById, updateProduct, deleteProduct } from "../controller/productController.js";
const productsRoutes = Router()



productsRoutes.get("/", getProducts)
productsRoutes.post("/", addProduct)
productsRoutes.get("/:pid", getProductById)
productsRoutes.put("/:pid", updateProduct)
productsRoutes.delete("/:pid", deleteProduct)


export default productsRoutes