import React, { Component } from 'react';
import './crearUsuario.css';

class CrearUsuario extends Component{
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
            email: 'aaa@aaa.com',
            password: '1234',
            nombre: 'Mengano desde React'
        }
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeNombre = this.onChangeNombre.bind(this);
        this.onSubmit = this.onSubmit.bind(this);      
    }
    onSubmit(evt) {
        evt.preventDefault();

        // Invocaríamos al servicio cliente HTTP, Ajax, fetch...
        console.log(`Datos: ${this.state.email} , ${this.state.nombre}`);
        window.fetch('http://127.0.0.1:4000/api/usuarios/registro', {
            method: 'post',
            body: JSON.stringify({
                    "email": this.state.email,
                    "password": this.state.password,
                    "nombre": this.state.nombre
            }),
            headers: {
                'Content-type': 'application/json'
            }
        }).then((res) => alert('El usuario se ha registrado correctamente'))
          .catch((err) => alert('No se ha podido registrar el usuario'));
    }
    // Método invocado por React cada vez que se cambia el valor del <INPUT>
    // Se envia un objeto con la información del evento
    onChangeEmail(evt) {
        this.setState( {
            email: evt.target.value
        } );
    }
    onChangePassword(evt) {
        this.setState( {
            password: evt.target.value
        } );
    }
    onChangeNombre(evt) {
        this.setState( {
            nombre: evt.target.value
        } );
    }
    render() {
        return (
            <div>
                <h2>Formulario de registro</h2>
                <form onSubmit={ this.onSubmit }>
                    <div>
                        <label className="form-label">Email: </label>
                        <input id="email" type="email"
                                placeholder="ejemplo@email.com"
                                value = { this.state.email }
                                onChange = { this.onChangeEmail }
                                />
                    </div>
                    <div>
                        <label className="form-label">Password: </label>
                        <input id="password" type="password"
                                placeholder="L3tr4as y numeros"
                                onChange = { this.onChangePassword }
                               value={ this.state.password } />
                    </div>
                    <div>
                        <label className="form-label">Nombre: </label>
                        <input id="nombre" type="text"
                                placeholder="¿Quién carajo eres?"
                                onChange = { this.onChangeNombre }
                               value={ this.state.nombre } />
                    </div>
                    <div>
                        <input type="submit" value="Registrar"/>
                    </div>
                </form>
            </div>
        );
    }
}
export default CrearUsuario;