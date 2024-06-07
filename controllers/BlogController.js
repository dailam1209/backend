const Blog = require("../modules/BlogModule");

exports.create = async (req, res) => {
    const { title, des, img } = req.body;
    console.log(title, des, img )
    try {
        if( title && des && img) {
            await Blog.create({
                title,
                des, 
                img
            });

            return res.status(200).json({
                message: "Create blog success"
            });
        } else {
            return res.status(400).json({
                message: "Please enter full"
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
};

exports.allBlog = async (req, res) => {
    try {
        const blogs = await Blog.find();
        if(blogs) {
            return res.status(200).json({
                data: blogs
            });
        } 
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}