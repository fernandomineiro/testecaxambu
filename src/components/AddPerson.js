import React, { useState } from "react";
import PersonDataService from "../services/PersonService";

const AddPerson = () => {
  const initialPersonState = {
    id: null,
    nome: "",
    idade: "",
    published: false,
  };
  const [Person, setPerson] = useState(initialPersonState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPerson({ ...Person, [name]: value });
  };

  const savePerson = () => {
    var data = {
      nome: Person.nome,
      idade: Person.idade,
    };

    PersonDataService.create(data)
      .then((response) => {
        setPerson({
          id: response.data.id,
          nome: response.data.nome,
          idade: response.data.idade,
          published: response.data.published,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newPerson = () => {
    setPerson(initialPersonState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newPerson}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              className="form-control"
              id="nome"
              required
              value={Person.nome}
              onChange={handleInputChange}
              name="nome"
            />
          </div>

          <div className="form-group">
            <label htmlFor="idade">idade</label>
            <input
              type="text"
              className="form-control"
              id="idade"
              required
              value={Person.idade}
              onChange={handleInputChange}
              name="idade"
            />
          </div>

          <button onClick={savePerson} className="btn btn-success">
            Enviar
          </button>
        </div>
      )}
    </div>
  );
};

export default AddPerson;
