import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
export default class Header extends Component {

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-info text-white py-0">
      <Link className="navbar-brand" to="/">Navbar</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink exact activeClassName="active" className="nav-link" to="/fonte-dados">Listagem de Fonte de Dados<span className="sr-only">(current)</span></NavLink>
          </li>
          <li className="nav-item">
            <NavLink exact activeClassName="active"  className="nav-link" to="/fonte-dados/1">Nova Fonte de Dados</NavLink>
          </li>
        </ul>
      </div>
    </nav>
    );
  }
}