import React, { useState, useEffect, useMemo, useRef } from "react";
import PersonDataService from "../services/PersonService";
import { useTable } from "react-table";

const PersonList = (props) => {
  const [Person, setPerson] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const PersonRef = useRef();

  PersonRef.current = Person;

  useEffect(() => {
    retrievePerson();
  }, []);

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrievePerson = () => {
    PersonDataService.getAll()
      .then((response) => {
        setPerson(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    PersonDataService.findByTitle(searchTitle)
      .then((response) => {
        setPerson(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const openPerson = (rowIndex) => {
    const id = PersonRef.current[rowIndex].id;

    props.history.push("/Person/" + id);
  };

  const deletePerson = (rowIndex) => {
    const id = PersonRef.current[rowIndex].id;

    PersonDataService.remove(id)
      .then((response) => {
        props.history.push("/Person");

        let newPerson = [...PersonRef.current];
        newPerson.splice(rowIndex, 1);

        setPerson(newPerson);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: "Nome",
        accessor: "nome",
      },
      {
        Header: "Idade",
        accessor: "idade",
      },
      {
        Header: "Status",
        accessor: "Publicado",
        Cell: (props) => {
          return props.value ? "Publicado" : "Pendente";
        },
      },
      {
        Header: "Ação",
        accessor: "ação",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => openPerson(rowIdx)}>
                <i className="far fa-edit action mr-2"></i>
              </span>

              <span onClick={() => deletePerson(rowIdx)}>
                <i className="fas fa-trash action"></i>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: Person,
    });

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Pesquise pelo nome"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Pesquisa
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-12 list">
        <table
          className="table table-striped table-bordered"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PersonList;
