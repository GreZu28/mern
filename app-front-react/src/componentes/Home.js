import React, { Component } from 'react';
import './home.css';
import createIcon from '../assets/img/user-plus-solid.svg';
import readIcon from '../assets/img/users-solid.svg';
import updateIcon from '../assets/img/user-edit-solid.svg';
import deleteIcon from '../assets/img/user-times-solid.svg';


class Home extends Component {
    render () {
        return (
            <div className="home-container">
                <h1 className="home-title">Bienvenido a la web de operaciones CRUD con MERN</h1>
                <div className="home-icons">
                    <div className="section-icon">
                        <img src={createIcon} className="icon-img" alt="Crear"/>
                        <p className="icon-text">create</p>
                    </div>
                    <div className="section-icon">
                        <img src={readIcon} className="icon-img" alt="Leer"/>
                        <p className="icon-text">read</p>
                    </div>
                    <div className="section-icon">
                        <img src={updateIcon} className="icon-img" alt="Modificar"/>
                        <p className="icon-text">update</p>
                    </div>
                    <div className="section-icon">
                        <img src={deleteIcon} className="icon-img" alt="Eliminar"/>
                        <p className="icon-text">delete</p>
                    </div>
                </div>
            </div>
        );
    }
    
}

export default Home;