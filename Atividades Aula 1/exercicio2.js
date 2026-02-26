//Estruturas de Repetição (Loops)

//______________________________________________________________________________

/* Crie um loop for que exiba os números de 1 a 10 no console. */

for (let i = 1; i <= 10; i++) {
  console.log(i);
}

console.log(`\n______________________________________________________________________________\n`);

/* Crie um loop while que exiba os números pares de 2 a 20. */

for (let i = 1; i <= 20; i++) {
  i++;
  console.log(i);
}

console.log(`\n______________________________________________________________________________\n`);

/* Utilize um loop for...of para percorrer um array de nomes e imprimir cada nome
no console. */

let nomes = ["Guilherme", "Giovanni", "Erivelton"];

for (let nome of nomes) {
  console.log(nome);
}