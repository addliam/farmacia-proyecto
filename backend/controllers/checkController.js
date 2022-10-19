const check = (req, res) => {
    res.status(200).json({message: "Products API running successfully!"})
}
module.exports = {check}