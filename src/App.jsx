import React from "react";
import "./App.css";
import search from "./assets/search.svg";

async function fetchData() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const json = await response.json();
    return json.slice(0, 10);
  } catch (error) {
    throw new Error(error);
  }
}

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetchData().then((json) => {
      if (json) {
        setData(json);
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
          {data &&
            data.map((data) => {
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

export default App;
