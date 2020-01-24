import React, { Component } from 'react';
import './listarUsuarios.css';

class ListarUsuarios extends Component{
    constructor(props) {
        super(props);
        this.state = {
            listaUsuarios: [],
        };
    }
    componentDidMount() {
        fetch('http://127.0.0.1:4000/api/usuarios/')
            .then(res => res.json())
            .then(obj => this.setState({listaUsuarios: obj}));
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
                <h2>Lista de usuarios</h2>
                <table className="users-table">
                    <thead>
                        <tr>
                            <th className="table-th">Email</th>
                            <th className="table-th">Password</th>
                            <th className="table-th">Nombre</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.listaUsuarios.map( usu =>
                        <tr key={usu._id}>
                            <React.Fragment>
                                <td className="table-td">{usu.email}</td>
                                <td className="table-td">{usu.password}</td>
                                <td className="table-td">{usu.nombre}</td>
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