//Gerenciamento de Tabela de Campeonato Esportivo
const express = require('express');
const app = express();
app.use(express.json());
const port = 3000;

const clubes = [
  { id: 1, nome: 'Flamengo', vitorias: 5, empates: 2, derrotas: 1, golsMarcados: 12, golsSofridos: 5, pontos: 17 },
  { id: 2, nome: 'Palmeiras', vitorias: 4, empates: 3, derrotas: 1, golsMarcados: 10, golsSofridos: 6, pontos: 15 },
  { id: 3, nome: 'Botafogo', vitorias: 4, empates: 1, derrotas: 3, golsMarcados: 9, golsSofridos: 8, pontos: 13 },
  { id: 4, nome: 'Grêmio', vitorias: 3, empates: 2, derrotas: 3, golsMarcados: 7, golsSofridos: 9, pontos: 11 }
];

const partidas = [
  { id: 101, mandanteId: 1, visitanteId: 2, golsMandante: 2, golsVisitante: 1, data: '2026-03-15', status: 'finalizado' },
  { id: 102, mandanteId: 3, visitanteId: 4, golsMandante: 0, golsVisitante: 0, data: '2026-03-16', status: 'finalizado' },
  { id: 103, mandanteId: 2, visitanteId: 3, golsMandante: null, golsVisitante: null, data: '2026-03-22', status: 'agendado' }
];

const jogadores = [
  { id: 10, nome: 'Gabriel Barbosa', clubeId: 1, gols: 5, assistencias: 2, posicao: 'Atacante' },
  { id: 11, nome: 'Raphael Veiga', clubeId: 2, gols: 3, assistencias: 4, posicao: 'Meia' },
  { id: 12, nome: 'Tiquinho Soares', clubeId: 3, gols: 4, assistencias: 1, posicao: 'Atacante' }
];

const noticias = [
  { id: 1, titulo: 'Rodada 8 Finalizada', data: '2026-03-17', categoria: 'Resultado' },
  { id: 2, titulo: 'Flamengo assume a liderança', data: '2026-03-16', categoria: 'Classificação' },
  { id: 3, titulo: 'Suspensão de jogador do Grêmio', data: '2026-03-18', categoria: 'Disciplinar' }
];

//GET(Geral)
app.get('/', (req, res) => {
  res.status(200).json({
    clubes,
    partidas,
    jogadores,
    noticias
  });
});

//GET(POR ID)
app.get('/clubes/:id', (req, res) => {
  const time = clubes.find(el => el.id == req.params.id)
  
  if (!time) {
    return res.status(404).json({
      message: `Clubes com ID ${req.params.id} não foi encontrado`
    })
  }
  return res.status(200).json(time)
})

app.get('/partidas/:id', (req, res) => {
  const partida = partidas.find(el => el.id == req.params.id)
  
  if (!partida) {
    return res.status(404).json({
      message: `partida com ID ${req.params.id} não foi encontrado`
    })
  }
  return res.status(200).json(partida)
})

app.get('/jogadores/:id', (req, res) => {
  const jogador = jogadores.find(el => el.id == req.params.id)
  
  if (!jogador) {
    return res.status(404).json({
      message: `Jogador com ID ${req.params.id} não foi encontrado`
    })
  }
  return res.status(200).json(jogador)
})

app.get('/noticias/:id', (req, res) => {
  const noticia = noticias.find(el => el.id == req.params.id)
  
  if (!noticia) {
    return res.status(404).json({
      message: `Notícia com ID ${req.params.id} não foi encontrada`
    })
  }
  return res.status(200).json(noticia)
})

//POST
app.post('/clubes', (req, res) => {
  try {
    const { nome, vitorias, empates, derrotas, golsMarcados, golsSofridos, pontos} = req.body;
    const erros = [];
    const camposObrigatorios = [
      { campo: 'nome', valor: nome, tipo: 'string' },
      { campo: 'vitorias', valor: vitorias, tipo: 'number' },
      { campo: 'empates', valor: empates, tipo: 'number' },
      { campo: 'derrotas', valor: derrotas, tipo: 'number' },
      { campo: 'golsMarcados', valor: golsMarcados, tipo: 'number' },
      { campo: 'golsSofridos', valor: golsSofridos, tipo: 'number' },
      { campo: 'pontos', valor: pontos, tipo: 'number' }
    ];
    camposObrigatorios.forEach(item => {
      if (item.valor === undefined || item.valor === null) {
        erros.push(`O campo "${item.campo}" é obrigatório.`);
      } 
      else if (typeof item.valor !== item.tipo) {
        erros.push(`O campo "${item.campo}" deve ser do tipo ${item.tipo}.`);
      }
    });
    if (erros.length > 0) {
      return res.status(400).json({
        message: 'Falha na validação dos dados',
        erros: erros
      });
    }
    const novoId = clubes.length > 0 ? Math.max(...clubes.map(el => el.id)) + 1 : 1;
    const novoClube = { 
      id: novoId, 
      nome: nome.trim(), 
      vitorias, 
      empates, 
      derrotas, 
      golsMarcados, 
      golsSofridos, 
      pontos 
    };
    clubes.push(novoClube);
    return res.status(201).json({
      message: 'Clube criado com sucesso!', 
      clube: novoClube
    });
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno no servidor.' });
  }
});

app.post('/partidas', (req, res) => {
  try {
    const { mandanteId, visitanteId, golsMandante, golsVisitante, data, status} = req.body;
    const erros = [];
    const camposObrigatorios = [
      { campo: 'mandanteId', valor: mandanteId, tipo: 'number' },
      { campo: 'visitanteId', valor: visitanteId, tipo: 'number' },
      { campo: 'golsMandante', valor: golsMandante, tipo: 'number' },
      { campo: 'golsVisitante', valor: golsVisitante, tipo: 'number' },
      { campo: 'data', valor: data, tipo: 'string' },
      { campo: 'status', valor: status, tipo: 'string' }
    ];
    camposObrigatorios.forEach(item => {
      if (item.valor === undefined || item.valor === null) {
        erros.push(`O campo "${item.campo}" é obrigatório.`);
      } 
      else if (typeof item.valor !== item.tipo) {
        erros.push(`O campo "${item.campo}" deve ser do tipo ${item.tipo}.`);
      }
    });
    if (erros.length > 0) {
      return res.status(400).json({
        message: 'Falha na validação dos dados',
        erros: erros
      });
    }
    const novoId = partidas.length > 0 ? Math.max(...partidas.map(el => el.id)) + 1 : 1;
    const novaPartida = { 
      id: novoId, 
      mandanteId, 
      visitanteId, 
      golsMandante, 
      golsVisitante, 
      data, 
      status 
    };
    partidas.push(novaPartida);
    return res.status(201).json({
      message: 'Partida criada com sucesso!', 
      partida: novaPartida
    });
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno no servidor.' });
  }
});

app.post('/jogadores', (req, res) => {
  try {
    const { nome, clubeId, gols, assistencias, posicao } = req.body;
    const erros = [];
    const camposObrigatorios = [
      { campo: 'nome', valor: nome, tipo: 'string' },
      { campo: 'clubeId', valor: clubeId, tipo: 'number' },
      { campo: 'gols', valor: gols, tipo: 'number' },
      { campo: 'assistencias', valor: assistencias, tipo: 'number' },
      { campo: 'posicao', valor: posicao, tipo: 'string' }
    ];
    camposObrigatorios.forEach(item => {
      if (item.valor === undefined || item.valor === null) {
        erros.push(`O campo "${item.campo}" é obrigatório.`);
      } 
      else if (typeof item.valor !== item.tipo) {
        erros.push(`O campo "${item.campo}" deve ser do tipo ${item.tipo}.`);
      }
    });
    if (erros.length > 0) {
      return res.status(400).json({
        message: 'Falha na validação dos dados',
        erros: erros
      });
    }
    const novoId = jogadores.length > 0 ? Math.max(...jogadores.map(el => el.id)) + 1 : 1;
    const novoJogador = { 
      id: novoId, 
      nome: nome.trim(), 
      clubeId, 
      gols, 
      assistencias, 
      posicao 
    };
    jogadores.push(novoJogador);
    return res.status(201).json({
      message: 'Jogador criado com sucesso!', 
      jogador: novoJogador
    });
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno no servidor.' });
  }
});

app.post('/noticias', (req, res) => {
  try {
    const { titulo, data, categoria} = req.body;
    const erros = [];
    const camposObrigatorios = [
      { campo: 'titulo', valor: titulo, tipo: 'string' },
      { campo: 'data', valor: data, tipo: 'string' },
      { campo: 'categoria', valor: categoria, tipo: 'string' }
    ];
    camposObrigatorios.forEach(item => {
      if (item.valor === undefined || item.valor === null) {
        erros.push(`O campo "${item.campo}" é obrigatório.`);
      } 
      else if (typeof item.valor !== item.tipo) {
        erros.push(`O campo "${item.campo}" deve ser do tipo ${item.tipo}.`);
      }
    });
    if (erros.length > 0) {
      return res.status(400).json({
        message: 'Falha na validação dos dados',
        erros: erros
      });
    }
    const novoId = noticias.length > 0 ? Math.max(...noticias.map(el => el.id)) + 1 : 1;
    const novaNoticia = { 
      id: novoId, 
      titulo: titulo.trim(), 
      data, 
      categoria 
    };
    noticias.push(novaNoticia);
    return res.status(201).json({
      message: 'Notícia criada com sucesso!', 
      noticia: novaNoticia
    });
      } catch (error) {
    return res.status(500).json({ message: 'Erro interno no servidor.' });
  }
});

//PATCH
app.patch('/clubes/:id', (req, res) => {
  const clube = clubes.find(el => el.id == req.params.id);
  if (!clube) {
    return res.status(404).json({
      message: `Clube com ID ${req.params.id} não foi encontrado.`
    });
  }
  const { nome, vitorias, empates, derrotas, golsMarcados, golsSofridos, pontos } = req.body;
  const erros = [];
  const camposParaValidar = [
    { nome: 'nome', valor: nome, tipo: 'string' },
    { nome: 'vitorias', valor: vitorias, tipo: 'number' },
    { nome: 'empates', valor: empates, tipo: 'number' },
    { nome: 'derrotas', valor: derrotas, tipo: 'number' },
    { nome: 'golsMarcados', valor: golsMarcados, tipo: 'number' },
    { nome: 'golsSofridos', valor: golsSofridos, tipo: 'number' },
    { nome: 'pontos', valor: pontos, tipo: 'number' }
  ];
  camposParaValidar.forEach(item => {
    if (Object.hasOwn(req.body, item.nome)) {
      if (typeof item.valor !== item.tipo) {
        erros.push(`O campo "${item.nome}" deve ser do tipo ${item.tipo}.`);
      }
    }
  });
  if (erros.length > 0) {
    return res.status(400).json({
      message: 'Erro de tipo nos dados enviados',
      erros: erros
    });
  }
  if (!Object.hasOwn(req.body, 'nome') && !Object.hasOwn(req.body, 'vitorias') && !Object.hasOwn(req.body, 'empates') 
    && !Object.hasOwn(req.body, 'derrotas') && !Object.hasOwn(req.body, 'golsMarcados') && !Object.hasOwn(req.body, 'golsSofridos') 
    && !Object.hasOwn(req.body, 'pontos')) {
    return res.status(400).json({
      message: 'Deve ser informado pelo menos um campo: nome, vitorias, empates, derrotas ,golsMarcados, golsSofridos, pontos'
    })
  }
  if (Object.hasOwn(req.body, 'nome')) {
    clube.nome = req.body.nome
  }
  if (Object.hasOwn(req.body, 'vitorias')) {
    clube.vitorias = req.body.vitorias  
  }
  if (Object.hasOwn(req.body, 'empates')) {
    clube.empates = req.body.empates
  }
  if (Object.hasOwn(req.body, 'derrotas')) {
    clube.derrotas = req.body.derrotas
  }
  if (Object.hasOwn(req.body, 'golsMarcados')) {
    clube.golsMarcados = req.body.golsMarcados
  }
  if (Object.hasOwn(req.body, 'golsSofridos')) {
    clube.golsSofridos = req.body.golsSofridos
  }
  if (Object.hasOwn(req.body, 'pontos')) {
    clube.pontos = req.body.pontos
  }
  return res.status(200).json({
    message: 'Clube atualizado com sucesso',
    data: clube
  })
})

app.patch('/partidas/:id', (req, res) => {
  const partida = partidas.find(el => el.id == req.params.id);
  if (!partida) {
    return res.status(404).json({
      message: `Partida com ID ${req.params.id} não foi encontrada.`
    });
  }
  const { mandanteId, visitanteId, golsMandante, golsVisitante, data, status } = req.body;
  const erros = [];
  const camposParaValidar = [
    { nome: 'mandanteId', valor: mandanteId, tipo: 'string' },
    { nome: 'visitanteId', valor: visitanteId, tipo: 'string' },
    { nome: 'golsMandante', valor: golsMandante, tipo: 'number' },
    { nome: 'golsVisitante', valor: golsVisitante, tipo: 'number' },
    { nome: 'data', valor: data, tipo: 'string' },
    { nome: 'status', valor: status, tipo: 'string' } 
  ];
  camposParaValidar.forEach(item => {
    if (Object.hasOwn(req.body, item.nome)) {
      if (typeof item.valor !== item.tipo) {
        erros.push(`O campo "${item.nome}" deve ser do tipo ${item.tipo}.`);
      }
    }
  });
  if (erros.length > 0) {
    return res.status(400).json({
      message: 'Erro de tipo nos dados enviados',
      erros: erros
    });
  }
  if (!Object.hasOwn(req.body, 'mandanteId') && !Object.hasOwn(req.body, 'visitanteId') && !Object.hasOwn(req.body, 'golsMandante') 
    && !Object.hasOwn(req.body, 'golsVisitante') && !Object.hasOwn(req.body, 'data') && !Object.hasOwn(req.body, 'status')) {
    return res.status(400).json({
      message: 'Deve ser informado pelo menos um campo: mandanteId, visitanteId, golsMandante, golsVisitante, data, status'
    })
  }
  if (Object.hasOwn(req.body, 'mandanteId')) {
    partida.mandanteId = req.body.mandanteId
  }
  if (Object.hasOwn(req.body, 'visitanteId')) {
    partida.visitanteId = req.body.visitanteId
  }
  if (Object.hasOwn(req.body, 'golsMandante')) {
    partida.golsMandante = req.body.golsMandante
  }
  if (Object.hasOwn(req.body, 'golsVisitante')) {
    partida.golsVisitante = req.body.golsVisitante
  }
  if (Object.hasOwn(req.body, 'data')) {
    partida.data = req.body.data
  }
  if (Object.hasOwn(req.body, 'status')) {
    partida.status = req.body.status
  }
  return res.status(200).json({
    message: 'Partida atualizada com sucesso',
    data: partida
  })
})

app.patch('/jogadores/:id', (req, res) => {
  const jogadore = jogadores.find(el => el.id == req.params.id);
  if (!jogadore) {
    return res.status(404).json({
      message: `Jogador com ID ${req.params.id} não foi encontrado.`
    });
  }
  const { nome, vitorias, clubeId, gols, assistencias, posicao} = req.body;
  const erros = [];
  const camposParaValidar = [
    { nome: 'nome', valor: nome, tipo: 'string' },
    { nome: 'clubeId', valor: clubeId, tipo: 'number' },
    { nome: 'gols', valor: gols, tipo: 'number' },
    { nome: 'assistencias', valor: assistencias, tipo: 'number' },
    { nome: 'posicao', valor: posicao, tipo: 'string' }
  ];
  camposParaValidar.forEach(item => {
    if (Object.hasOwn(req.body, item.nome)) {
      if (typeof item.valor !== item.tipo) {
        erros.push(`O campo "${item.nome}" deve ser do tipo ${item.tipo}.`);
      }
    }
  });
  if (erros.length > 0) {
    return res.status(400).json({
      message: 'Erro de tipo nos dados enviados',
      erros: erros
    });
  }
  if (!Object.hasOwn(req.body, 'nome') && !Object.hasOwn(req.body, 'clubeId') && !Object.hasOwn(req.body, 'gols') 
    && !Object.hasOwn(req.body, 'assistencias') && !Object.hasOwn(req.body, 'posicao')) {
    return res.status(400).json({
      message: 'Deve ser informado pelo menos um campo: nome, clubeId, gols, assistencias, posicao'
    })
  }
  if (Object.hasOwn(req.body, 'nome')) {
    jogadore.nome = req.body.nome
  }
  if (Object.hasOwn(req.body, 'clubeId')) {
    jogadore.clubeId = req.body.clubeId
  }
  if (Object.hasOwn(req.body, 'gols')) {
    jogadore.gols = req.body.gols
  }
  if (Object.hasOwn(req.body, 'assistencias')) {
    jogadore.assistencias = req.body.assistencias
  }
  if (Object.hasOwn(req.body, 'posicao')) {
    jogadore.posicao = req.body.posicao
  }
  return res.status(200).json({
    message: 'Jogador atualizado com sucesso',
    data: jogadore
  })
})

app.patch('/noticias/:id', (req, res) => {
  const noticia = noticias.find(el => el.id == req.params.id);
  if (!noticia) {
    return res.status(404).json({
      message: `Notícia com ID ${req.params.id} não foi encontrada.`
    });
  }
  const {titulo, data, categoria} = req.body;
  const erros = [];
  const camposParaValidar = [
    { nome: 'titulo', valor: titulo, tipo: 'string' },
    { nome: 'data', valor: data, tipo: 'string' },
    { nome: 'categoria', valor: categoria, tipo: 'string' }
  ];
  camposParaValidar.forEach(item => {
    if (Object.hasOwn(req.body, item.nome)) {
      if (typeof item.valor !== item.tipo) {
        erros.push(`O campo "${item.nome}" deve ser do tipo ${item.tipo}.`);
      }
    }
  });
  if (erros.length > 0) {
    return res.status(400).json({
      message: 'Erro de tipo nos dados enviados',
      erros: erros
    });
  }
  if (!Object.hasOwn(req.body, 'titulo') && !Object.hasOwn(req.body, 'data') && !Object.hasOwn(req.body, 'categoria')) {
    return res.status(400).json({
      message: 'Deve ser informado pelo menos um campo: titulo, data, categoria'
    })
  }
  if (Object.hasOwn(req.body, 'titulo')) {
    noticia.titulo = req.body.titulo
  }
  if (Object.hasOwn(req.body, 'data')) {
    noticia.data = req.body.data
  }
  if (Object.hasOwn(req.body, 'categoria')) {
    noticia.categoria = req.body.categoria
  }
  return res.status(200).json({
    message: 'Notícia atualizada com sucesso',
    data: noticia
  })
})

//DELETE
app.delete('/clubes/:id', (req, res) => {
  const verificaClube = clubes.findIndex(el => el.id == req.params.id)

  if (verificaClube === -1) {
    return res.status(404).json({ message: "Clube não encontrado!" })
  }

  clubes.splice(verificaClube, 1)

  res.status(204).send()
})

app.delete('/partidas/:id', (req, res) => {
  const verificaPartidas = partidas.findIndex(el => el.id == req.params.id)

  if (verificaPartidas === -1) {
    return res.status(404).json({ message: "Partida não encontrada!" })
  }

  partidas.splice(verificaPartidas, 1)

  res.status(204).send()
})

app.delete('/jogadores/:id', (req, res) => {
  const verificaJogadores = jogadores.findIndex(el => el.id == req.params.id)

  if (verificaJogadores === -1) {
    return res.status(404).json({ message: "Jogador não encontrado!" })
  }

  jogadores.splice(verificaJogadores, 1)

  res.status(204).send()
})

app.delete('/noticias/:id', (req, res) => {
  const verificaNoticias = noticias.findIndex(el => el.id == req.params.id)

  if (verificaNoticias === -1) {
    return res.status(404).json({ message: "Noticia não encontrada!" })
  }

  noticias.splice(verificaNoticias, 1)

  res.status(204).send()
})
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
