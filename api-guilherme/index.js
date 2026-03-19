const express = require('express')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.get('/', (req, res) => {
  res.send('Olá Mundo!')
})

// app.get('/usuario/:nome', (rec, res) => {
//   res.json({ mensagem: `Olá, seja bem-viado ${rec.params.nome}!` })
// })

// app.get('/soma/:numeroUm/:numeroDois', (req, res) => {
//   const numeroUm = +req.params.numeroUm
//   const numeroDois = +req.params.numeroDois
//   const soma = numeroUm + numeroDois
//   return res.json({ soma: soma })
// })

// app.get('/produto', (req, res) => {
//   return res.json(req.query)
// })

const produtos = [
  { codigo: 1, nome: 'Arroz', preco: 19.90 },
  { codigo: 2, nome: 'Feijao', preco: 29.90 },
  { codigo: 3, nome: 'Carne', preco: 899999999.00 },
]

app.get('/prod', (req, res) => {
  return res.json(produtos)
})

app.get('/prod/:id', (req, res) => {
  const produto = produtos.find((el) => el.codigo == req.params.id)
  return res.json(produto)
})

app.listen(port, () => {
  console.log(`App de exemplo rodando na porta ${port}`)
})

//----

app.post('/produtos', (req, res) => {
  if (!req.body.nome || !req.body.preco) {
    return res.status(400).json({
      message: 'Faltando campos obrigatórios: nome, preco'
    })
  }

  const codigo = Math.max(...produtos.map(el => el.codigo)) + 1

  const novoProduto = {
    codigo: codigo,
    nome: req.body.nome,
    preco: req.body.preco
  }
})