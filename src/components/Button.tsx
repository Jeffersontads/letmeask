import { useState } from "react";

 
export function Button() {
// let counter = 0;
// O REACT ELE TEM UM FUNCIONAMENTO QUE ELE CONSEGUE PERCEBER QUE UMA INFO MUDOU ENTAO PRECISAMOS TRANSFORMAR EM UM ESTADO OU SEJA 
// PRECISAMOS TRANSFORMAR EM UMA CONSTANTE MESMO QUE SEU VALOR SEJA MUDADO. ASSIM O REACT VAI ENTENDER QUE ESTE ESTADO MUDOU.

const [counter, setCounter] = useState(0); //useState retorna um array com 2 posições alem de que useState é uma função nativa do REACT
// o colchetes em volta da counter significa que estou isolando as posições do Array retornadas quando uso o USESTATE
function increment() {
    setCounter(counter + 1);
    console.log(counter);
}

return (
    ////chaves sempre indica que estamos colocando uma propriedade ou um conteudo.
    <button onClick={increment}>
         {counter} 
    </button>
)
}
 