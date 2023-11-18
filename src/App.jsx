import React from "react";
import "./App.css";
import search from "./assets/search.svg";

// Criado uma função chamada fetchData que faz uma requisição para a API e retorna os dados. O async é usado para esperar os await dentro da função.
async function fetchData() {
  // O try vai tentar executar o código dentro dele, caso ocorra algum erro, o catch é executado.
  try {
    // O await faz com que a função espere a requisição ser concluída para continuar a execução do código.
    const response = await fetch("https://jsonplaceholder.typicode.com/posts"); // Faz uma requisição para a API e guarda a resposta na variável response.
    const json = await response.json(); // Converte a resposta em JSON e guarda na variável json.
    return json.slice(0, 10); // Retorna os 10 primeiros itens do array json.
  } catch (error) {
    throw new Error("Erro ao buscar os dados da API"); // Caso ocorra algum erro, lança uma exceção com a mensagem "Erro ao buscar os dados da API".
  }
}

function App() {
  const [data, setData] = React.useState(null); // Criado um estado chamado data e a função atualizadora setData. O estado inicia com o valor null

  // O useEffect é um hook que executa uma função sempre que o componente é renderizado, no caso como o segundo parâmetro é um array vazio, a função é executada apenas uma vez.
  React.useEffect(() => {
    // Chama a função fetchData e usa o then que é usado para executar uma função quando a promise é resolvida.
    fetchData()
      // Se a promise for resolvida, então executa a função dentro do then e cria uma variável chamada json com o valor retornado pela função fetchData.
      .then((json) => {
        // Se json for verdadeiro, então executa o if.
        if (json) {
          setData(json); // Atualiza o estado data com o valor de json.
        }
      });
  }, []);

  return (
    <>
      <header className="introduction">
        <div className="introduction-container">
          <div>
            <a href="#campinhoblog">CampinhoBlog</a>
            <span>Recem lançado</span>
          </div>

          <form>
            <input type="text" placeholder="Pesquise aqui" required />
            <button>
              <img src={search} alt="Lupa de pesquisa" />
            </button>
          </form>
        </div>
      </header>

      <main>
        <section className="posts-container">
          {/* Se data for verdadeiro então executa o map, caso contrário não executa nada */}
          {data &&
            data.map((data) => {
              // Retorna um elemento com as informações do post para cada item do array data.
              return (
                <div key={data.id} className="post">
                  <span className="post-user">Post {data.id}</span>
                  <h1 className="post-title">{data.title}</h1>
                  <p className="post-body">{data.body}</p>
                </div>
              );
            })}
        </section>
      </main>

      <footer>
        <p>
          Feito com ❤️ por{" "}
          <a
            href="https://github.com/luizfelipe9627"
            target="_blank"
            rel="noreferrer"
          >
            Luiz Felipe Silva
          </a>
        </p>
      </footer>
    </>
  );
}

export default App; // Exporta o componente App para ser usado em outros arquivos.
