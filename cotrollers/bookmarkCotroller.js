const { model } = require("mongoose");
const Bookmark = require("../models/bookmark");


module.exports = {
    crateBookmark: async (req,res) => {
        const jobId = new Bookmark(req.body);
        try {
            const job = await Job.findById(jobId);
            if(!job) {
                return res.status(404).job({error : "Không tìm thấy công việc"})
            }

            const newBook =  await Bookmark({job:job,userId:req.user.id});
            const saveBookmark = await newBook.save();
            const {__v,updateAt,...newBookMarkInfo} = saveBookmark._doc;
            res.status(201).json(newBookMarkInfo)
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