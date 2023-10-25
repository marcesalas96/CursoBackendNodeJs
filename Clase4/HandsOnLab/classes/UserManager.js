import fs from "node:fs"

export class UserManager{
    #users
    #fileName
    constructor(){
        this.#users = []
        this.#fileName = "./db/Usuarios.json"
    }

    async crearUsuario(nombre, apellido, edad, curso){
        try{
            this.#users =  await this.consultarUsuarios() 
            const user = {
                nombre, apellido, edad, curso
            }
            this.#users.push(user)
            await fs.promises.writeFile(this.#fileName, JSON.stringify(this.#users))
        }
        catch(error){
            console.error(error)
        }

    }
    async consultarUsuarios(){
        try {
            if(fs.existsSync(this.#fileName)){
                const users = JSON.parse (await fs.promises.readFile(this.#fileName)) 
                return users
            }
            else{
                return []
            }
        } catch (error) {
            console.error(error)
        }
    }
}