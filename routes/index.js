var express = require('express');
var router = express.Router();
const todo = require('../models/todo')
/* GET home page. */
router.get('/', async function (req, res, next) {
  todo.find({ status: false }).then((todos) => {
    const newTodos = todos.map((todo, index) => {
      const todoDate = String(todo.date)
      const date = todoDate.split(' ')[1];
      const month = todoDate.split(' ')[2];
      const year = todoDate.split(' ')[3];
      const modifiedDate = String(date + "/" + month + "/" + year)
      return { ...todo._doc, date: modifiedDate }
    })
    res.render('index', { newTodos });
  })
});

router.post('/add-todo', async (req, res) => {
  try {
    if (req.body != '') {
      const updateTodo = await new todo({ todo: req.body.to_do })
      updateTodo.save()
      res.redirect("/")
    } else {
      throw ("enter the data properly")
    }
  } catch (err) {
    res.send(err)
    res.end()
  }
})

router.get('/completed/:id', (req, res) => {
  try {
    todo.findByIdAndUpdate({ _id: req.params.id }, { $set: { status: true } }).then((results) => {
      res.redirect('/')
    })
  } catch (err) {
    res.send('error')
  }
})



router.get('/delete/:id', (req, res) => {
  try {
    todo.findByIdAndDelete({ _id: req.params.id }).then((response) => {
      res.redirect('/');
    })
  } catch (err) {
    res.send("something went wrong")
  }
})


router.get('/showcompletedtask/completed/:id', (req, res) => {
  try {
    todo.findByIdAndUpdate({ _id: req.params.id }, { $set: { status: true } }).then((results) => {
      res.redirect('/showcompletedtask')
    })
  } catch (err) {
    res.send('error')
  }
})


router.get('/showcompletedtask/delete/:id', (req, res) => {
  try {
    todo.findByIdAndDelete({ _id: req.params.id }).then((response) => {
      res.redirect('/showcompletedtask');
    })
  } catch (err) {
    res.send("something went wrong")
  }
})



router.get('/showcompletedtask', async function (req, res, next) {
  todo.find({ status: true }).then((todos) => {
    const newTodos = todos.map((todo, index) => {
      const todoDate = String(todo.date)
      const date = todoDate.split(' ')[1];
      const month = todoDate.split(' ')[2];
      const year = todoDate.split(' ')[3];
      const modifiedDate = String(date + "/" + month + "/" + year)
      return { ...todo._doc, date: modifiedDate }
    })
    res.render('completed', { newTodos });
  })
});


module.exports = router;
