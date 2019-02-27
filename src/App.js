import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import FonteDadosForm from './components/fonteDados/FonteDadosForm';
import FonteDadosLista from './components/fonteDados/FonteDadosLista';
import Home from './components/Home';
import Header from './components/layout/Header';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      fonteDados: {}
    };
    let headers = new Headers();
    headers.append('Authorization', localStorage.getItem("authorization"));
    let fetchData = {
      method: 'get',
      headers: headers,
      mod: 'cors'
    }
    fetch('http://localhost:8080/fonteDados/1', fetchData)
      .then(resp => resp.json())
      .then(result => { 
        this.setState({ fonteDados: result }) })
      .catch(error => { console.error("Erro ao obter fonte de dados", error) })
  }

  render() {
    return (
      <Router>
        <div>
          <Header/>
          <div className="container-fluid">
            <Route exact path="/" component={Home}/>
            <Route path={"/fonte-dados/:idFonteDados"} component={FonteDadosForm} />
            <Route path={"/fonte-dados"} component={FonteDadosLista} />
          </div>
        </div>
      </Router>
    );
  }
}