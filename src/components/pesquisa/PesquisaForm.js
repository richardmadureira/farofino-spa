import React, { Component } from 'react';
import { InputText } from 'primereact/components/inputtext/InputText';
import { Button } from 'primereact/components/button/Button';
import { Growl } from 'primereact/components/growl/Growl';
import { Messages } from 'primereact/components/messages/Messages';

export default class PesquisaForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textoPesquisa: ''
        }

        this.iniciarPesquisa = this.iniciarPesquisa.bind(this);
        this.limparPesquisa = this.limparPesquisa.bind(this);
    }

    render() {
        return [
            <Growl key="growlPesquisa" ref={(el) => { this.growlPesquisa = el; }}/>,
            <Messages key="messagesPesquisa" ref={(el) => { this.messagesPesquisa = el; }}/>,
            <div key="linhaEntradaPesquisa" className="row justify-content-md-center">
                <div className="col-lg-6">
                    <div className="input-group mt-3">
                        <InputText id="textoPesquisa" value={this.state.textoPesquisa} className="form-control" placeholder="Texto a Ser Pesquisado" aria-label="Texto a ser pesquisado" aria-describedby="textoPesquisa" 
                                title="Informe aqui o texto a ser pesquisado" onChange={(e) => this.setState({textoPesquisa: e.target.value})} autoFocus="true"/>
                        <div className="input-group-append">
                            <Button id="btnPesquisa" label="Pesquisar" icon="fa-search" className="ui-button-success" onClick={this.iniciarPesquisa} />
                            <Button id="btnLimparPesquisa" label="Limpar" icon="fa-refresh" className="ui-button-secondary" onClick={this.limparPesquisa} />
                        </div>
                    </div>
                </div>
            </div>
        ];
    }

    iniciarPesquisa(){
        if(!this.state.textoPesquisa || this.state.textoPesquisa === ""){
            this.growlPesquisa.show({severity: 'error', summary: 'Campo Obrigatório', detail: 'É necessário informar o texto a ser pesquisado'});
            this.messagesPesquisa.show({severity: 'error', summary: 'Campo Obrigatório', detail: 'É necessário informar o texto a ser pesquisado'});
            return;
        }
        console.log("Pesquisando pelo texto: " + this.state.textoPesquisa);
        
    }

    limparPesquisa(){
        this.setState({textoPesquisa: ''});
        document.getElementById('textoPesquisa').focus();
    }  
}