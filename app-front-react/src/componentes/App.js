// Componente Raiz del proyecto
import React, { Component } from 'react';  // importamos mod React
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css'
import logo from '../assets/img/logo.jpg';
import Home from './Home';
import CrearUsuario from './CrearUsuario';
import ListarUsuarios from './ListarUsuarios';
import EditarUsuario from './EditarUsuario';

class App extends Component {
    render() {
        return (
            <Router>
                <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm justify-content-between">
                    <div className="brand">
                        <Link className="navbar-brand" to={"/home"}>
                            <img src={logo} width="60" height="60" alt="Logo"></img>
                        </Link>
                        <h1 className="brand-title">MERN</h1>
                    </div>
                    <div>
                        <ul className="nav navbar-nav navbar-left">
                            <li className="nav-item">
                                <a className="nav-link py-1 px-0 mx-2" href="/home">Inicio</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link py-1 px-0 mx-2" href="/registro">Crear Usuario</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link py-1 px-0 mx-2" href="/lista">Listar Usuarios</a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <Route path="/home" component={ Home } />
                <Route path="/registro" component={ CrearUsuario } />
                <Route path="/lista" exact component={ ListarUsuarios } />
                <Route path="/editar/:id" component={ EditarUsuario } />
                <Route path="/eliminar/:id" component={ ListarUsuarios } />
            </Router>
        );
    }
}
export default App;