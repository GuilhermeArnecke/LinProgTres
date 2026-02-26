// Manipulação de Objetos

//______________________________________________________________________________

/* Crie um objeto carro com as propriedades: marca , modelo , ano e cor . */

let carro = {
  marca: "Chevrolet",
  modelo: "Spin",
  ano: 2014,
  cor: "branca"
}
console.log(carro);

console.log(`______________________________________________________________________________\n`);

/* Adicione dinamicamente a propriedade dono ao objeto e atribua um nome. */

carro.dono = "Guilherme";
console.log(carro);

console.log(`______________________________________________________________________________\n`);

/* Remova a propriedade cor do objeto. */

delete carro.cor;
console.log(carro);

console.log(`______________________________________________________________________________\n`);

/* Crie um método dentro do objeto carro chamado detalhes() que retorna uma
string com todas as informações do carro. */

carro.detalhes = function() { return `Esse carro é da marca ${carro.marca}, modelo ${carro.modelo}, do ano ${carro.ano}, e o dono se chama ${carro.dono}.`};
console.log(carro.detalhes());

console.log(`______________________________________________________________________________\n`);

/* Utilize Object.keys() , Object.values() e Object.entries() para exibir as
chaves, valores e pares chave-valor do objeto. */

const chaves = Object.keys(carro);
console.log(chaves);

const valores = Object.values(carro);
console.log(valores);

const entradas = Object.entries(carro);
console.log(entradas);

console.log(`______________________________________________________________________________\n`);