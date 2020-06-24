import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    api.post('repositories',
      {
        title: `Novo repositório ${Date.now()}`,
        url: "https://github.com/Drarkors/desafio-conceitos-reactjs",
        techs: ["ReactJS"]
      }
    ).then(response => {
      setRepositories([...repositories, response.data]);
    });
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(response => {
      if (response.status !== '400') {
        const repositoryIndex = repositories.findIndex(repository => repository.id === id);

        if (repositoryIndex < 0) {
          return;
        }

        repositories.splice(repositoryIndex, 1);

        setRepositories([...repositories]);
      }
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
