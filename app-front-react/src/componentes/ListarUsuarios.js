import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import editIcon from '../assets/img/user-edit-solid.svg';
import deleteIcom from '../assets/img/user-times-solid.svg';
import './listarUsuarios.css';
import EditarUsuario from './EditarUsuario';

class ListarUsuarios extends Component{
    constructor(props) {
        super(props);
        this.state = {
            listaUsuarios: [],
        };
        this.eliminarUsuario = this.eliminarUsuario.bind(this);
    }
    componentDidMount() {
        this.obtenerUsuarios();
    }

    obtenerUsuarios() {
        window.fetch('http://127.0.0.1:4000/api/usuarios')
            .then(res => res.json())
            .then(obj => this.setState({listaUsuarios: obj}));
    }

    editarUsuario(evt, id) {
        evt.preventDefault();
        window.fetch('http://127.0.0.1:4000/api/usuarios/editar/' + id, {
            method: 'put',
            body: JSON.stringify({
                "email": this.state.email,
                "password": this.state.password,
                "nombre": this.state.nombre
            }),
            headers: {
                'Content-type': 'application/json'
            }
        });
    }

    eliminarUsuario (evt, id) {
        evt.preventDefault();
        window.fetch('http://127.0.0.1:4000/api/usuarios/eliminar/' + id, {
            method: 'delete'
        });
        this.obtenerUsuarios();
    }


    render() {
        /*let promesaHTTP = window.fetch('http://127.0.0.1:4000/api/usuarios/');
            
            //En las funciones flecha, no es necesario bind()
            promesaHTTP.then((res) => {
                let promesaJSON = res.json();
                promesaJSON.then((obj) =>{
                    this.setState({
                        listarUsuarios: obj
                    })
                })
            });*/
        return (
            <div>
                <h2 className="main-title">Listado de usuarios</h2>
                <table className="users-table">
                    <thead>
                        <tr>
                            <th className="table-th">Email</th>
                            <th className="table-th">Password</th>
                            <th className="table-th">Nombre</th>
                            <th className="table-th">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.listaUsuarios.map( usu =>
                        <tr key={usu._id} className="table-tr">
                            <React.Fragment>
                                <td className="table-td">{usu.email}</td>
                                <td className="table-td">{usu.password}</td>
                                <td className="table-td">{usu.nombre}</td>
                                <td className="table-td content-center">
                                    <Link className="action-link" to={`/editar/${usu._id}`}>
                                        <img className="actions-buttons" src = { editIcon } title="Editar" alt="Editar"/>
                                    </Link>
                                    <Link onClick={(evt) => this.eliminarUsuario(evt, usu._id)} className="action-link" to={"/lista"}>
                                        <img className="actions-buttons" src = { deleteIcom } title="Eliminar" alt="Eliminar"/>
                                    </Link>
                                </td>
                            </React.Fragment>
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}
export default ListarUsuarios;