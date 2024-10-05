const router = require("express").Router()

const Event = require("../models/Event.js")
 
//create
router.post("/criar", async (req,res)=>{
    //req.body
    const{NomeEvento, Data, Horario,NomeOrg,Descricao,Progamacao,Local}=req.body
    if(!NomeEvento){
        res.status(422).json({error: "o nome e obrigatorio" })
    }
    const event={
        NomeEvento,
        Data,
        Horario,
        NomeOrg,
        Descricao,
        Progamacao,
        Local
    }


try{
    //criado dados
    await Event.create(event)
    res.status(201 ).json({message: "pessoa inserida com sucesso"})

}catch(error){
    res.status(500).json({error:error})
}



})
//read

router.get("/mostrar", async (req,res) =>{
    try{
        const people= await Event.find()

        res.status(200).json(people)
    }catch(error){
    res.status(500).json({error:error})
}

})
 //id

router.get("/:id",async (req,res) =>{

    const id = req.params.id
    
    try {
const event = await Event.findOne({_id: id })
         if(!event){
            res.status(422).json({message:"usuario nao encontrado"})
            return
         }
        res.status(200).json(event)
        
    } catch (error) {
        res.status(500).json({error:error})
    }
})

// update

router.patch("/:id", async (req,res) =>{
    const id = req.params.id

    const{NomeEvento, Data, Horario,NomeOrg,Descricao,Progamacao,Local}=req.body
    
    const event={
        NomeEvento,
        Data,
        Horario,
        NomeOrg,
        Descricao,
        Progamacao,
        Local
    }
try {


    const updateEvent = await Event.updateOne({_id:id},event)
    if(updateEvent.matchedCount===0){
        res.status(422).json({message:"usuario nao encontrado"})
    }
res.status(200).json(event)

} catch (error) {
    res.status(500).json({error:error})
}
})

//
//delete

router.delete("/:id", async (req,res) =>{
    const id = req.params.id
    if(!Event){
        res.status(422).json({message:"usuario nao encontrado"})
        return
     }

try {
    await Event.deleteOne({_id:id})
    res.status(200).json({message: "usuario removido"})
} catch (error) {
    
}


})




module.exports=router