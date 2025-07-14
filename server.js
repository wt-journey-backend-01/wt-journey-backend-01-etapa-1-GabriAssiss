const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
let bodyparser = require('body-parser');

app.use(express.json());

app.use(bodyparser.urlencoded({ extended: true }));

app.use(bodyparser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log(`Servidor da DevBurger rodando em localhost:${PORT}`));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/sugestao', (req, res) => {
  const name = req.query.nome;
  const ingredients = req.query.ingredientes;
  res.send(`<!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <title>Sugestão Recebida</title>
      <link rel="stylesheet" href="/css/style.css">
    </head>
    <body>
    <h1>Obrigado pela Sugestão</h1>
    <p>Nome do lanche: ${name}</p>
    <p>Ingredientes: ${ingredients}</p>
    <a href="/">Início</a>
    </body>`
   );
});

app.post('/contato', (req, res) => {

  const { nome, email, mensagem, assunto } = req.body;

  res.send(`<!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <title>Contato Recebido</title>
      <link rel="stylesheet" href="/css/style.css">
    </head>
    <body>
    <h1>Contato Recebido!</h1>
    <p>Nome: ${nome}</p>
    <p>Email: ${email}</p>
    <p>Nome do mensagem: ${mensagem}</p>
    <p>Assunto: ${assunto}</p>
    <a href="/">Início</a>
    </body>
    </html>
  `);
});

app.get('/contato', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'contato.html'));
});

app.get('/api/lanches', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'data', 'lanches.json'));
});

app.use((req, res) => {
  res.status(404).sendFile((path.join(__dirname, 'public', '404.html')));
});
