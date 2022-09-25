module.exports = {
    name: "My ip",
    description: "Returns your ip, obviously",
    func: async (req, res) => {
        return JSON.stringify({ip: req.headers["x-forwarded-for"]})
    }
}