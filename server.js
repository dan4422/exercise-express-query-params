const http = require('http');
const express = require('express')

const port = 3000
const hostname = 'localhost'

const app = express()
const server = http.createServer(app)

const productsService = require('./services/products')

app.get('/', (req, res) => res.send('Build the API!'))

// Build Routes
app.get('/api/v1/products', (req,res) => {
  const {sortBy, direction } = req.query
  res.send(productsService.findAll(sortBy,direction))
})

// app.get('/api/v1/products', (req, res) => {
//   // set sort property or default to 'id'
//   const sortBy = req.query.sort || 'id'
//   // set sort direction or default to 'ASC'
//   const order = req.query.order || 'ASC'
//   // use service to get all products with sort and order
//   const products = productsService.findAll(sortBy, order)
//   // send response
//   res.json(products)
// })

app.get('/api/v1/products', (req,res) => {
  res.send(productsService.findAll())
})

app.get('/api/v1/products/search' , (req,res) => {
  const {key,value,sortBy, direction} = req.query
  if (key && value) {
    res.send(productsService.search(key,value,sortBy,direction))
  } else {
    res.status(404)
    res.send("Error: Please enter both a key and value")
  }
})

app.get('/api/v1/products/:id', (req,res) => {
  const id = req.params.id
  if (productsService.findOneById(Number(id))) {
    res.send(productsService.findOneById(Number(id)))
  } else {
    res.status(404)
    res.send("There's an error, no product has an ID of " + id)
  }
})

app.get('*', (req, res) => res.status(404).send('Page not found'))

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})