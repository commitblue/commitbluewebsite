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
  fs.readdir("./views/pages/morePages", (err, files) => {
    if (!err){
      res.render("pages/pagesPage", {
        pages : files
      })
    } else {
      console.log(err)
    }
  })
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
app.get("/apis/detail/:name", (req, res) => {
  if (req.params.name){
    let condition = false
    let erro = null
    try {
      fs.readFileSync("./views/pages/apis/" + req.params.name + ".js")
      condition = true
    } catch(err) {
      erro = err
    }
    if (condition){
      const required = require("./views/pages/apis/" + req.params.name + ".js")
      required.filename = req.params.name + ".js"
      res.render("pages/apiDetails", {
        api : required
      })
    } else res.render("pages/404")
  }
})
app.get("/apis/", (req, res) => {
  let details = []
  fs.readdir("./views/pages/apis/", (err, files) => {
    details = files
  })
  for (let v in details){
    let i = v
    v = details[v]
    console.log(v)
    const required = require("./views/pages/apis/" + v)
    required.filename = v
    console.log(required.filename)
    details[i] = required
  }
  setTimeout(() => {
    console.log(details)
    res.render("pages/apisPage", {
      apis : details
    })
  }, 2000)
})
app.use((req, res) => res.status(404).render("pages/404", {
  reason: "Unknown error, unknown page"
}))
app.listen(8080, () => {
  console.log("ready")
})