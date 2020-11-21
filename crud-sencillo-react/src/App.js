import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from "reactstrap";

const data = [
  { id: 1, nombre: "Ana Arias", direccion: "Calle 12" },
  { id: 2, nombre: "Emilio Casabuena", direccion: "Carrera 25" },
  { id: 3, nombre: "Rick Smith", direccion: "Carrera 52" },
  { id: 4, nombre: "Sara Reales", direccion: "Calle 97" },
  { id: 5, nombre: "Edward Santos", direccion: "Calle 34" },
  { id: 6, nombre: "Dayana Marquez", direccion: "Calle 32" },
];

class App extends React.Component {
  state = {
    data: data,
    form: {
      id: "",
      nombre: "",
      direccion: "",
    },
    modalInsertar: false,
    modalEditar: false,
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  mostrarModalInsert = () => {
    this.setState({ modalInsertar: true });
  };

  cerrarModalInsert = () => {
    this.setState({ modalInsertar: false });
  };

  mostrarModalEdit = (dato) => {
    this.setState({ modalEditar: true, form: dato });
  };

  cerrarModalEdit = () => {
    this.setState({ modalEditar: false });
  };

  insert = () => {
    var valorNuevo = { ...this.state.form };
    valorNuevo.id = this.state.data.length + 1;
    var lista = this.state.data;
    lista.push(valorNuevo);
    this.setState({ data: lista, modalInsertar: false });
  };

  edit = (dato) => {
    var i = 0;
    var lista = this.state.data;
    lista.map((registro) => {
      if (dato.id == registro.id) {
        lista[i].nombre = dato.nombre;
        lista[i].direccion = dato.direccion;
        console.log(dato.nombre);
      }
      i++;
    });
    this.setState({ data: lista, modalEditar: false });
  };

  delete = (dato) => {
    var op = window.confirm("¿Desea eliminar el registro " + dato.id + "?");
    if (op) {
      var i = 0;
      var lista = this.state.data;
      lista.map((registro) => {
        if (registro.id == dato.id) {
          lista.splice(i, 1);
        }
        i++;
      });
      this.setState({ data: lista });
    }
  };

  render() {
    return (
      <div>
        <Container>
          <br></br>
          <Button onClick={() => this.mostrarModalInsert()} color="success">
            Insertar nuevo elemento
          </Button>
          <br></br>
          <br></br>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Dirección</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((element) => (
                <tr>
                  <td>{element.id}</td>
                  <td>{element.nombre}</td>
                  <td>{element.direccion}</td>
                  <td>
                    <Button color="primary" size="sm" onClick={() => this.mostrarModalEdit(element)}>
                      Editar
                    </Button>{" "}
                    <Button color="danger" size="sm" onClick={() => this.delete(element)}>
                      Borrar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div>
              <h3>Insertar registro</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>ID:</label>
              <input className="form-control" readOnly type="text" value={this.state.data.length + 1} />
            </FormGroup>
            <FormGroup>
              <label>Nombre:</label>
              <input className="form-control" name="nombre" type="text" onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
              <label>Dirección:</label>
              <input className="form-control" name="direccion" type="text" onChange={this.handleChange} />
            </FormGroup>
            <ModalFooter>
              <Button color="primary" onClick={() => this.insert()}>
                Insertar
              </Button>{" "}
              <Button color="danger" onClick={() => this.cerrarModalInsert()}>
                Cancelar
              </Button>
            </ModalFooter>
          </ModalBody>
        </Modal>

        <Modal isOpen={this.state.modalEditar}>
          <ModalHeader>
            <div>
              <h3>Editar registro</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>ID:</label>
              <input className="form-control" readOnly type="text" onChange={this.handleChange} defaultValue={this.state.form.id} />
            </FormGroup>
            <FormGroup>
              <label>Nombre:</label>
              <input className="form-control" name="nombre" type="text" onChange={this.handleChange} defaultValue={this.state.form.nombre} />
            </FormGroup>
            <FormGroup>
              <label>Dirección:</label>
              <input className="form-control" name="direccion" type="text" onChange={this.handleChange} defaultValue={this.state.form.direccion} />
            </FormGroup>
            <ModalFooter>
              <Button color="primary" onClick={() => this.edit(this.state.form)}>
                Editar
              </Button>{" "}
              <Button color="danger" onClick={() => this.cerrarModalEdit()}>
                Cancelar
              </Button>
            </ModalFooter>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default App;
