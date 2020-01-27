import React, { Component } from 'react';
import './crearUsuario.css';

class EditarUsuario extends Component {
    // this.props es objeto con datos públicos de React
    // this.state objeto con datos privados de React, es decir,
    // el estado interno del componente. Como en Angular
    // las variables miembro de la clase privadas

    constructor(props) {
        super(props);   // Invocamos al constructor del padre
        // pasándole las propiedades públicas

        // Para el evitar el problema del this con JS
        // Con bind() hacemos que en el futuro, 
        // cuando se invoque al método,
        // this   sea realmente   this, es decir, el objeto instanciado
        // basado en clase, en estaso, cada uno de los componentes
        this.state = {
            _id: this.props._id,
            email: this.props.email,
            password: this.props.password,
            nombre: this.props.nombre
        };
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeNombre = this.onChangeNombre.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        const { id } = this.props.match.params; // Get id from url.
        this.obtenerUsuario(id);
    }

    obtenerUsuario(id) {
        window.fetch('http://127.0.0.1:4000/api/usuarios/' + id)
            .then(res => res.json())
            .then(obj => {
                console.log("User get from db:", obj);
                this.setState({
                    _id: obj._id,
                    email: obj.email,
                    password: obj.password,
                    nombre: obj.nombre
                });
            });
    }

    onSubmit(evt) {
        evt.preventDefault();

        // TODO: let isValid = isValidEmail(this.state.email) && ...

        let isValid = true;
        if (isValid) {
            // Invocaríamos al servicio cliente HTTP, Ajax, fetch...
            console.log(`Datos: ${this.state.email} , ${this.state.nombre}`);
            window.fetch('http://127.0.0.1:4000/api/usuarios/editar/' + this.state._id, {
                method: 'put',
                body: JSON.stringify({
                    "email": this.state.email,
                    "password": this.state.password,
                    "nombre": this.state.nombre
                }),
                headers: {
                    'Content-type': 'application/json'
                }
            }).then((res) => alert('El usuario se ha modificado correctamente'))
                .catch((err) => alert('No se ha podido modificar el usuario'));
        }
    }

    // Método invocado por React cada vez que se cambia el valor del <INPUT>
    // Se envia un objeto con la información del evento
    onChangeEmail(evt) {
        this.setState({
            email: evt.target.value
        });
    }
    onChangePassword(evt) {
        this.setState({
            password: evt.target.value
        });
    }
    onChangeNombre(evt) {
        this.setState({
            nombre: evt.target.value
        });
    }
    render() {
        return (
            <div>
                <h2 className="main-title">Editar usuario</h2>
                <form className="register-form" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Email: </label>
                        <input className="form-control" id="email" type="email"
                            placeholder="Introduzca su email"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                        />
                    </div>
                    <div className="form-group">
                        <label>Contraseña: </label>
                        <input className="form-control" id="password" type="password"
                            placeholder="Introduzca su contraseña"
                            onChange={this.onChangePassword}
                            value={this.state.password} />
                    </div>
                    <div className="form-group">
                        <label>Nombre: </label>
                        <input className="form-control" id="nombre" type="text"
                            placeholder="Introduzca su nombre"
                            onChange={this.onChangeNombre}
                            value={this.state.nombre} />
                    </div>
                    <button className="btn register-button" type="submit">Guardar</button>
                </form>
            </div>
        );
    }
}
export default EditarUsuario;
