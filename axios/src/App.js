import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button, Container, Modal, ModalBody, ModalHeader, ModalFooter, FormGroup } from 'reactstrap';
import axios from 'axios';


class App extends React.Component {
  state = {
    data: [],
    form: {
      identificacion: '',
      nombres: '',
      apellidos: '',
    },
    modalInsertar: false,
    modalEditar: false,
  }

  componentDidMount () {
    this.obtenerPersona();
  }

  obtenerPersona = () => {
    axios.get("http://192.168.0.22:3000/person", { headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiUkZFUk5BTkRFWiIsImlhdCI6MTYwNTk4MDE0MywiZXhwIjoxNjA1OTgxMDQzfQ.b5M9HJm8rGjMog1yDoN60EYRDMXBFgsHBdTZyuVz-f8' } })
      .then(res => {
        const data = res.data; console.log(data)
        this.setState({ data });
      });
      
  }

  insertarPersona = (registro) => {
    axios.post("http://192.168.0.22:3000/person", registro)
      .then(res => {
        console.log(res.data);
        this.cerrarModalInsert();
        this.obtenerPersona();
      })
  }


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

  render () {
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
                <th>Telefono</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((element) => {
                if (element.id != null) {
                  return (
                    <tr>
                      <td>{element.id}</td>
                      <td>{element.email}</td>
                      <td>{element.name}</td>
                      <td>{element.phone}</td>
                      <td>
                        <Button color="primary" size="sm" onClick={() => this.mostrarModalEdit(element)}>
                          Editar
                        </Button>{" "}
                        <Button color="danger" size="sm" onClick={() => this.delete(element)}>
                          Borrar
                        </Button>
                      </td>
                    </tr>
                  );
                }
              })}
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
              <input className="form-control" type="text" name="id" onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
              <label>Nombre:</label>
              <input className="form-control" name="name" type="text" onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
              <label>Email:</label>
              <input className="form-control" name="email" type="text" onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
              <label>Celular:</label>
              <input className="form-control" name="phone" type="text" onChange={this.handleChange} />
            </FormGroup>        
            <ModalFooter>
              <Button color="primary" onClick={() => this.insertarPersona(this.state.form)}>
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
              <input className="form-control" type="text" onChange={this.handleChange} value={this.state.form.id} />
            </FormGroup>
            <FormGroup>
              <label>Nombre:</label>
              <input className="form-control" name="nombre" type="text" onChange={this.handleChange} value={this.state.form.name} />
            </FormGroup>
            <FormGroup>
              <label>Email:</label>
              <input className="form-control" name="direccion" type="text" onChange={this.handleChange} value={this.state.form.email} />
            </FormGroup>
            <FormGroup>
              <label>Celular:</label>
              <input className="form-control" name="direccion" type="text" onChange={this.handleChange} value={this.state.form.phone} />
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
