import React, {useState,useEffect} from "react";
// O useEffect é um Hook do React que permite executar efeitos colaterais em componentes funcionais.
// Neste caso, ele é usado para atualizar o localStorage sempre que a lista de tarefas for modificada.
import './TodoList.css'
import Icone from './assets/Icone.png';

function TodoList(){
    const listaStorange = localStorage.getItem('lista')
    {/* local storange é uma maneira de gravar uma informação localmente no proprio 
       navegador , como se fosse um banco de dados que o prprio navegador tem.
       
       nesse caso eu criei uma variavel e usei o  localStorage pra gravar as informaçoes
       e usei o metodo .getItem pra pegar o item e o item que eu quis pegar e o item que chamei de lista.
       então dentro dessa variavel eu estou verificando se tem uma lista ou não /*/}



    const [lista, setLista] = useState(listaStorange ? JSON.parse(listaStorange) : []);
    {/* esse matriz irá começar zerada e vai ser essa que vai armazenar os itens que forem adicionados 
        
    
    o useState inicial de lista que começava zerado, agora ele vai começar com uma validação pra ver 
    se tem algo savo ou não. no  useState verifiquei se a variavel listaStorange se ele existe, então
    se for ture "?" vamos pedir pro listaStorange ser mostrado como inicial mas como os itens no 
    localStorage não tem os itens como objeto, la fica salvo como string,  entao primeiro eu converto pra objeto,
    em seguida continuo com a validação do se não ":", se não existir o nosso localStorage ele vai começar vazio
    o estado de lista
       /*/}
    const [NovoItem, setNovoItem] = useState("")
    {/* novoItem vai ser o item que vai está escrito no campo input que sera nada "" e iremps criar um evento de digitação onChnge para que conforme for digitando é alimentando o estado novo item, quando der um add ela vai pro estado lista e vai limpar o novoItem pra podermos colocar mais item  /*/}
 

     {/* chamada do metodo  useEffect /*/}
    useEffect(()=>{
 {/*t  dentro do metodo passei uma arow function, depois da arrow function virgula e colchetes
           pra dizer qual o estado que quero monitorar, no caso o estado lista /*/}
        


        // toda vez que tiver uma mudança na lista, o efeito sera oque estiver abaixo:

        localStorage.setItem('lista', JSON.stringify(lista))
        // passei que quero salvar um item no local  localStorage e a chave chamada lista, 
        // virgula e o estado lista que sera salvo, mas antes disso eu covertir o estado lista de objeto para texto
    },[lista])
  
    
    function adicionaItem(form){
        form.preventDefault(); {/* esse preventDeFault e pra não disparar o formulario se não ele atualiza a pagina, então o form não sera disparado no padrão normal /*/} 
        if(!NovoItem){
            return

         {/* se não tiver nada em NovoItem quero que retorne nada  /*/}    
        }
        setLista([...lista, {text: NovoItem, isCompleted: false}]);
        // Aqui estamos usando o operador spread (...) para manter todos os itens antigos da lista,
        // e adicionando um novo objeto no final pra dizqe oque quero que acresente nela.
        // Esse objeto { text: NovoItem, isCompleted: false } representa uma nova tarefa da lista:
        // - text: NovoItem → puxei NovoItem pro atributo text: e é o texto que o usuário digitou no input (ex: "Estudar")
       // - isCompleted: false →  indica que essa tarefa ainda não foi concluída (ela começa como "pendente") isCompleted: é um campo pra verificar se a tarefa foi completa ou não, e
       
      // Esse formato com chave e valor ajuda a gente depois a controlar a tarefa (como riscar, excluir etc)
       setNovoItem("");
        // setNovoItem é o estado que armaezena os valores digitados no input e quero que fique vazia 
        document.getElementById("input-entrada").focus()
        // peguei o id do input e especifiquei que ele fique focado com .focus()

        // ate aqui ja estamos adicionando na lista os valores
        
    }
 

    /* funão clicou do onclick do span */
    function clicou(indice){
     /* esse indice é segundo parametro, o indce da arrow function do operador ternario*/   
        const listaAux = [...lista];
    /* basicamente to copiando o estado de lista atual dentro da variavel listaAux*/
    listaAux[indice].isCompleted = !listaAux[indice].isCompleted
     /* peguei a listaAux , ver a posição do indice que foi passado pelo função, .isCompleted
     eu pego o campo do objeto isCompleted e digo que agora ele vai receber o valor contrario dele, se era falso vai virar true operador que faz isso é o !, listaAux[index].isCompleted e aqui eu estou invertendo, se for true vira false e se for false vira tru */
     setLista(listaAux)
    /* e agora eu peguei o novo atributo do estado lista que vai receber essa variavel listaAux
    (lemrbando que fiz com que ela copie o estado de lista atual e que revertta o valor com a propriedade
    isCompleted do objeto text )*/
    }


    /* function deleta do função de click do botão */
    function deleta(indice){
         /* esse indice é segundo parametro, o indce da arrow function do operador ternario*/   
        const listaAux = [...lista];
        /* tambem to copiando o valor atual que temos no estado de lista dentro da variavel listaAux*/
        listaAux.splice(indice, 1);
         /* eu to pegando listaAux e pedindo pra remover o item que estiver exatamente no ponto do indice.
         faço isso com o metodo splace e passo no splace qual é o indice que vou ta pegando , quando o item vou tirar
         que é 1 */
         setLista(listaAux)
          /* to alimentando o estado da lista verdadeiro com essa listaAux.
          ele vai remover da listaAux e depois colocar na lista de verdade*/
    }
    /* function deletaTudo do função de click do botão */
    function deletaTudo(){
        setLista([])
        // aqui eu so passei que o seLista vai receber vazio, então quando for clicado o valor do evento lista vai receber nada tendo o resultado de nada aparecer
    }
    return(
        <div>
            <h1>Lista de tarafas</h1>
            <form onSubmit={adicionaItem}>
              {/*onSubmit é um evento de disparo, então quando formulario for disparado vai chamar a função adicionaItem /*/}   

                <input id="input-entrada"
                value={NovoItem} onChange={(e)=>{setNovoItem(e.target.value)}} type="text" placeholder="Adicione uma tarefa" />
                {/* Dessa forma eu to especificando que o valor inicial sera nada e criando um evento de digitação com uma arrow function e dentro colocando o novo item com o setNovoItem e dentro dele estou pegando o valor dos caracteres do evento digitado como o novo valor de setNovoItem  /*/}
                
                <button type="submit" className="add">Adicionarr</button>
            </form>

            <div className="lista-tarefas">
                {/* esse item é o item novo /*/}
                <div style={{textAlign:'center'}}>
                 {/* usei css textAlign:'center' pra centralizar toda essa div do operador ternario /*/}
                {
                 lista.length < 1 
                 ? 
                 <img className="icon-central" src={Icone} />
                 :
                 lista.map((item, indice)=>(
                   // recurso map() pecorre a lista, mepeia a matriz.
                   //criei uma arrow function e dentro dela passei dois parametros, e será cada item pego da lista e o indice. e dentro da arrow function eu retorno a div item para que cada vez que tiver um item dentro da lista 
                     /* esse item é o item novo /*/
                    <div key={indice} className={item.isCompleted ? "item completo" : "item"}>
                    {/* no className dessa div item eu criei um operador ternario pra colocar as classes e passei que se o atributo item for true (isCompleted no objeto e false), eu quero que mostre a classe item completo, se não, mostra so item */}
                        
                    <span onClick={()=>{clicou(indice)}}>{item.text}</span>
                    {/* nesse span eu to pegando o parametro item e o objeto texto la da função fazendo com que pegue o texto digitado e apareça como um novo item abaixo */}
                    <button onClick={()=>{deleta(indice)}} className="del">Deletar</button>
                     {/* o mesmo evento que fiz no span estou fazendo no botão, to pegando o indice, mas agora vou usar a função deleta */}
                    </div>
                 ))
                 // nesse operador ternario eu passei o seguinte comando: se o tamanho da lista for menor que um vai mostrar imagem, se não vai mostrar a div item. so que o item vou ter que fazer vim da nossa lista, e pra pecorrer isso eu crio um laço de repetição for it pra pecorrer toda a lista e pegar todos os dados
               }
               
             
             
               { lista.length > 0 && 
                <button  onClick={()=>{deletaTudo()}}  className="deleteAll">Deletar todos</button>
               }
              {/* dentro de chaves eu passei que se o tamanho da lista for maior que 0,
                e se for verdadeiro irá aparecer o botão de deletar  /*/}
                
                 </div>
            </div>
        </div>
    )
}
export default TodoList