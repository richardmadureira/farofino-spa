import React, { Component } from 'react';

import { InputText } from 'primereact/components/inputtext/InputText';
import { Password } from 'primereact/components/password/Password';
import { Button } from 'primereact/components/button/Button';
import { Checkbox } from 'primereact/components/checkbox/Checkbox';

import './Login.css';

export default class Login extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      lembrar: false
    };
    this.entrar = this.entrar.bind(this);
  }

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-lg-3">
          <form className="form-signin">
            <img className="mb-4" src="./favicon-96x96.png" alt="" width="96" height="96" />
            <h1 className="h3 mb-3 font-weight-normal">Login no Sistema</h1>
            <label htmlFor="username" className="sr-only">Login</label>
            <InputText id="username" value={this.state.username} className="form-control" placeholder="Login" required onChange={(e) => this.setState({username: e.target.value})}/>
            <label htmlFor="password" className="sr-only">Senha</label>
            <Password id="password" value={this.state.password} className="form-control" placeholder="Senha" required  onChange={(e) => this.setState({password: e.target.value})}/>
            <div className="checkbox mb-3">
              <label><Checkbox id="checkboxLembrar" value="remember-me" checked={this.state.lembrar} onChange={(e) => this.setState({lembrar: e.checked})} /> Lembrar-me</label>
            </div>
            <Button label="Entrar" icon="fa-check" className="btn btn-lg btn-primary btn-block" onClick={this.entrar}/>
            <p className="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
          </form>
        </div>
      </div>
    );
  }

  entrar(){
    console.log("Entrar");
    console.log(this.state);
  }
}