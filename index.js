const express = require("express")
const fs = require("fs")
const app = express()
app.use(express.static("public"))
app.set("view engine", "ejs")
app.get("/", (req, res) => {
  res.render("pages/mainsite")
})
app.get("/pages/:page/", (req, res) => {
  if (req.params.page){
    let condition = false
    let erro = null
    try {
      fs.readFileSync("./views/pages/morePages/" + req.params.page + ".ejs")
      condition = true
    } catch(err) {
      erro = err
    }
    if (condition === true){
      res.render("pages/morePages/" + req.params.page, {
        views : fs.realpathSync("./views"),
        req: req,
        res: res
      })
    } else {
      res.render("pages/404", {
        reason: erro
      })
    }
  }
})
app.get("/pages/", (req, res) => {
  res.render("pages/pagesPage")
})
app.get("/apis/:api", (req, res) => {
  let condition = false
  let errored = ""
  try {
    fs.readFileSync("./views/pages/apis/" + req.params.api + ".js")
    condition = true
  } catch(err) {
    errored = err
  }
  if (condition){
    require("./views/pages/apis/" + req.params.api + ".js").func(req, res)
    .then(result => res.send(result))
  } else {
    res.render("pages/404")
  }
})
app.get("/apis/", (req, res) => {
  res.render("pages/apisPage")
})
app.use((req, res) => res.status(404).render("pages/404", {
  reason: "Unknown error, unknown page"
}))
app.listen(8080, () => {
  console.log("ready")
})