import express from "express";
import bodyParser from "body-parser";

let day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
let itemList = [];
let workItems = [];

const app = express();
const port = 3000;
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    };
    const today = new Date().toLocaleDateString("en-US", options);
    res.render("list", {
        listTitle: today,
        listItems: itemList,
    });
});

app.get("/work", (req, res) => {
    res.render("list", {
        listTitle: "Work List",
        listItems: workItems
    });
});

app.post("/add", function (req, res) {

    if (req.body.listSubmit === "Work") {
        workItems.push(req.body.newItem);
        res.redirect("/work");
    } else {
        itemList.push(req.body.newItem);
        res.redirect("/");
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
