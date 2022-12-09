const fs = require("fs/promises");
const path = require("path")


const getAll = async (req, res) => {
    const {userCategories} = req.user
    const data= await fs.readFile(path.join(__dirname ,"../../","models", "baseCategories.json"));
    const baseCategories = JSON.parse(data)
    res.json({
    baseCategories, userCategories,
    });
};
module.exports = getAll;
