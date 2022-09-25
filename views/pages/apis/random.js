module.exports = {
    name: "random",
    description: "nothing special. this is a test and returns a random number",
    func: async (req, res) => {
        return JSON.stringify({Number: Math.random()})
    }
}