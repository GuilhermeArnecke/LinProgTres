//VARIAVEL E CONSTANTE

//______________________________________________________________________________

/*Crie duas variáveis: uma do tipo let e outra const , armazenando seu nome e
idade. Exiba os valores no console.*/

let nome = "Guilherme";
const idade = 19;

console.log(`\nMeu nome é ${nome} e tenho ${idade} anos de idade...\n`);
console.log(`______________________________________________________________________________\n`);

/*Tente alterar o valor da constante e veja o erro que ocorre.*/

const teste = 1;
console.log(`Comando usado: const teste = 1;`);
console.log(`Comando de erro: teste = 2;`);
console.log(`Mensagem de erro retornada: TypeError: Assignment to constant variable.\n`);

console.log(`______________________________________________________________________________\n`);

/*Concatene as variáveis para formar uma frase completa: "Meu nome é [nome] e
tenho [idade] anos."*/

console.log("Meu nome é " + nome + " e tenho " + idade + " anos..."); 
