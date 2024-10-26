const { model } = require("mongoose");
const Bookmark = require("../models/bookmark");


module.exports = {
    crateBookmark: async (req,res) => {
        const newBook = new Bookmark(req.body);
        try {

            const book =  await newBook.save();
            res.status(201).json(book)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    deleteBookmark: async (req,res) => {
        try {
            await Bookmark.findByIdAndDelete(req.params.id);

            res.status(201).json("Bookmark successfully Deleted")
        } catch (error) {
            res.status(500).json(error)
        }
    },

    getBookmark: async (req,res) => {
        try {
            const bookmarks = await Bookmark.find( {userId: req.params.userId});

            res.status(201).json(bookmarks)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}