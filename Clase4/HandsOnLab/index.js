import { UserManager } from "./classes/UserManager.js";

const userManager = new UserManager()

const main = async() => {
    await userManager.crearUsuario("Marce", "Salas", 27, "Backend")
    const users = await userManager.consultarUsuarios()
    console.log(users)

}
main()