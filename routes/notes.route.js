const express = require("express");
const { NotesModel } = require("./../model/notes.model");

const notesrouter = express.Router();






//get notes

notesrouter.get("/",  async(req, res) => {
  const notes = await NotesModel.find()
  res.send(notes);

});

//create notes



notesrouter.post("/create", async (req, res) => {
  let data = req.body
  const notes = new NotesModel(data)
  await notes.save()
  res.send({ massege: "notes created" });

});

//delete notes



notesrouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id
  await NotesModel.findByIdAndDelete({_id:id})
  res.send({ massege: `notes ${id} has been deleted` });

});


//update notes



notesrouter.patch("/update/:id", async (req, res) => {
  const id = req.params.id
  const data=req.body
  await NotesModel.findByIdAndUpdate({_id:id},data)
  res.send({ massege: `notes ${id} has been update.` });

});


module.exports = {
  notesrouter,
};
