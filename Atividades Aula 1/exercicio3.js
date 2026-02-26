//METODOS DE ARRAY

//______________________________________________________________________________

/* Crie um array com 5 nomes e:
Use .push() para adicionar um novo nome ao final.
Use .pop() para remover o último nome.
Use .unshift() para adicionar um nome no início.
Use .shift() para remover o primeiro nome. */

let nomes = ["Guilherme", "Giovanni", "Erivelton", "Enzo", "Maria"];
console.log(nomes);

nomes.push("Jair");
console.log(nomes);

nomes.pop();
console.log(nomes);

nomes.unshift("Ivan");
console.log(nomes);

nomes.shift();
console.log(nomes);

console.log(`______________________________________________________________________________\n`);

/* Utilize .map() para criar um novo array onde todos os nomes estejam em
maiúsculas. */

let nomesGrandes;
nomesGrandes = nomes.map(nomes => nomes.toUpperCase());
console.log(nomesGrandes);

console.log(`______________________________________________________________________________\n`);

/* Utilize .filter() para criar um novo array apenas com nomes que tenham mais de
5 letras. */

let nomesFiltrados;
nomesFiltrados = nomes.filter(nomes => nomes.length > 5);
console.log(nomesFiltrados);

console.log(`______________________________________________________________________________\n`);

/* Utilize .find() para buscar um nome específico dentro do array. */

let nomeBuscado;
nomeBuscado = nomes.find(nomes => nomes == "Erivelton");
console.log(nomeBuscado);

console.log(`______________________________________________________________________________\n`);

/* Utilize .reduce() para contar o número total de caracteres de todos os nomes do
array. */

let nomesNumeroLetras;
nomesNumeroLetras = nomes.reduce((acc, nomes) => acc + nomes.length, 0);
console.log(nomesNumeroLetras);

console.log(`______________________________________________________________________________\n`);