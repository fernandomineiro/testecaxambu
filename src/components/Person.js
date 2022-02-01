import React, { useState, useEffect } from "react";
import PersonDataService from "../services/PersonService";

const Person = (props) => {
  const initialPersonState = {
    id: null,
    nome: "",
    idade: "",
    published: false,
  };
  const [currentPerson, setCurrentPerson] = useState(initialPersonState);
  const [message, setMessage] = useState("");

  const getPerson = (id) => {
    PersonDataService.get(id)
      .then((response) => {
        setCurrentPerson(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getPerson(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentPerson({ ...currentPerson, [name]: value });
  };

  const updatePublished = (status) => {
    var data = {
      id: currentPerson.id,
      nome: currentPerson.nome,
      idade: currentPerson.idade,
      published: status,
    };

    PersonDataService.update(currentPerson.id, data)
      .then((response) => {
        setCurrentPerson({ ...currentPerson, published: status });
        console.log(response.data);
        setMessage("The status was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updatePerson = () => {
    PersonDataService.update(currentPerson.id, currentPerson)
      .then((response) => {
        console.log(response.data);
        setMessage("Pessoa foi add com suceso!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deletePerson = () => {
    PersonDataService.remove(currentPerson.id)
      .then((response) => {
        console.log(response.data);
        props.history.push("/pessoa");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentPerson ? (
        <div className="edit-form">
          <h4>Pessoa</h4>
          <form>
            <div className="form-group">
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                className="form-control"
                id="nome"
                name="nome"
                value={currentPerson.nome}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="idade">Idade</label>
              <input
                type="text"
                className="form-control"
                id="idade"
                name="idade"
                value={currentPerson.idade}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentPerson.published ? "Publicado" : "Pendente"}
            </div>
          </form>

          {currentPerson.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              Não Publicar
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publicar
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deletePerson}>
            Deletar
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updatePerson}
          >
            Atualizar
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Por favor click em uma pessoa...</p>
        </div>
      )}
    </div>
  );
};

export default Person;
