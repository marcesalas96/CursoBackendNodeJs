import { Router } from "express";
import { addProductToCart, createCart, getProductsFromCart } from "../controller/cartController.js";

const cartsRoutes = Router()

cartsRoutes.post("/", createCart)
cartsRoutes.get("/:cid", getProductsFromCart)
cartsRoutes.post("/:cid/product/:pid", addProductToCart)


export default cartsRoutes