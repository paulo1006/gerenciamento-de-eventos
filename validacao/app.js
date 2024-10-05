require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const User = require("./models/User");
 
mongoose.connect("mongodb+srv://paulomatheussousa1006:zs7lxXQw1AFDDRgW@users.fwjqpsx.mongodb.net/?retryWrites=true&w=majority&appName=users").then(()=>{
    app.listen(3001)
    console.log("conectou ao db")
}).catch((err)=> console.log(err))


app.get("/auth/usuario/:id",async (req,res) =>{
    const  id=req.params.id
    const user = await User.findById(id, "-senha")

    if(!user){
        return res.status(404).json({msg: "usuario nao encontrado"})
    }
    res.status(200).json({user})
})
app.get("/auth/mostrar", async (req,res) =>{
    try{
        const dadosUser= await User.find()

        res.status(200).json(dadosUser)
    }catch(error){
    res.status(500).json({error:error})
}

})




//registrar o usuario
app.get("/",(req,res) =>{
    res.status(200).json({msg:"ok"})
})
app.post("/auth/registro", async(req,res) =>{
   
    const {nome,email,senha,confirmarSenha}=req.body
        //validacao

        if(!nome){
            return res.status(422).json({msg : "nome e obrigatorio"})
        }
        if(!email){
            return res.status(422).json({msg : "email e obrigatorio"})
        }
        if(!senha){
            return res.status(422).json({msg : "senha e obrigatorio"})
        }
        if(!confirmarSenha){
            return res.status(422).json({msg : "confirmar senha e obrigatorio"})
        }

        if(senha!==confirmarSenha){
            return res.status(422).json({msg : "senha diferentes"})
        }
        
        const registroExistente = await User.findOne({email:email})
        if(registroExistente){
            return res.status(422).json({msg : "usuario ja existe"})
        }


        const salt = await bcrypt.genSalt(9)
        const senhaHash= await bcrypt.hash(senha,salt)

        const user = new User({
            nome,
            email,
            senha:senhaHash,
        })
            try {
               await user.save()
               res.status(201).json({msg:"usuario criado com sucesso"})
            } catch (error) {
                console.log(error)
                 res.status(500).json({msg:"erro interno"})
            }
})

//LOGIN

app.post("/auth/usuario", async(req,res) =>{
    const {email,senha} = req.body
    if(!email){
        return res.status(422).json({msg : "email e obrigatorio"})
    }
    if(!senha){
        return res.status(422).json({msg : "senha e obrigatorio"})}



        const userExistente = await User.findOne({email:email})
        if(!userExistente){
            return res.status(422).json({msg : "usuario nao existe"})
        }

        const verificarSenha= await bcrypt.compare(senha,userExistente.senha)
        
        if(!verificarSenha){
            return res.status(422).json({msg : "senha invalida"})
        }
           

        try {
             const secret =  process.env.SECRET

             const  token = jwt.sign({
                id : userExistente._id,


             },secret)
             res.status(200).json({msg:"atutenticaco sucesso",token})
         } catch (error) {
             console.log(error)
              res.status(500).json({msg:"erro interno"})
         }
        
})