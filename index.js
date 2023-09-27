const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
// for updation
app.use(methodOverride('_method'))

const { v4: uuid } = require('uuid');

let comments = [
    {
        id: uuid(),
        username: "Roli",
        comment: "Baby"
    },
    {
        id: uuid(),
        username: "Punnet",
        comment: "Dalle"
    },
    {
        id: uuid(),
        username: "Priy",
        comment: "Bacha"
    },
    {
        id: uuid(),
        username: "Happy",
        comment: "Baby"
    }
]
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.send('<h1>Root Route</h1>');
})


// Restful Routing
// Read -> Displaying all the comments

app.get('/comments', (req, res) => {
    res.render('index', { comments })
})

// Displaying form to add new
app.get('/comments/new', (req, res) => {
    res.render('new');
})

// To ACtually add the Comment
app.post('/comments', (req, res) => {
    // res.send('post req send');
    // console.log(req.body);
    let { username, comment } = req.body;
    comments.push({ username, comment, id: uuid() })
    res.redirect('/comments');
})

// To Show Content
app.get('/comments/:commentId', (req, res) => {
    // console.log(req.params);
    let { commentId } = req.params;
    let foundcomment = comments.find((item) => {
        return item.id == commentId
    })
    res.render('show', { foundcomment });

    // res.send("showing particular comments");
})

// To Edit a Particular Comment
app.get('/comments/:commentId/edit', (req, res) => {
    let { commentId } = req.params;
    let foundcomment = comments.find((item) => {
        return item.id == commentId
    })
    res.render('edit', { foundcomment });

})

// To Update or to actually edit the comment
app.patch('/comments/:commentId', (req, res) => {
    let { commentId } = req.params;
    let foundcomment = comments.find((item) => {
        return item.id == commentId
    })
    // console.log(req.body);
    let { comment } = req.body;
    foundcomment.comment = comment;

    // res.send("Edited Successfully")
    res.redirect('/comments');

})

// Deleting a Command
app.delete('/comments/:commentId', (req, res) => {
    let { commentId } = req.params;
    let newArray = comments.filter((item) => {
        return item.id != commentId
    })
    comments = newArray;
    res.redirect('/comments');

})

app.listen(8080, () => {
    console.log("Server is Connected at 8080");
});

