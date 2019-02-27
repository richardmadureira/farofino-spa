import React, { Component } from 'react';
import { InputText } from 'primereact/components/inputtext/InputText';
import { Button } from 'primereact/components/button/Button';
import { Growl } from 'primereact/components/growl/Growl';
import { Messages } from 'primereact/components/messages/Messages';
import axios from 'axios';

const HTTP_PROXY = "http.proxy";
const HTTPS_PROXY = "https.proxy";
const FTP_PROXY = "ftp.proxy";
const SOCKS_PROXY = "socks.proxy";

export default class ProxyConfig extends Component {

    constructor() {
        super();
        this.state = {
            httpProxy: this.getHttpProxy(),
            httpsProxy: this.getHttpsProxy(),
            ftpProxy: this.getFtpProxy(),
            socksProxy: this.getSocksProxy()
        }
        this.confirmar = this.confirmar.bind(this);
        this.limpar = this.limpar.bind(this);
    }
    render() {
        return [
            <Growl key="growlProxy" ref={(el) => { this.growl = el; }} />,
            <Messages key="messagesProxy" ref={(el) => { this.messages = el; }} />,
            <div key="rowHttpProxy" className="row">
                <div className="col-lg-3 form-group">
                    <label id="labelHttpProxy" htmlFor="httpProxy">Proxy HTTP</label>
                    <InputText id="httpProxy" value={this.state.httpProxy} title="Informe aqui o proxy http" className="form-control" onChange={(e) => this.setState({ httpProxy: e.target.value })} />
                </div>
                <div className="col-lg-3 form-group">
                    <label id="labelHttpsProxy" htmlFor="httpsProxy">Proxy HTTPS</label>
                    <InputText id="httpsProxy" value={this.state.httpsProxy} title="Informe aqui o proxy https" className="form-control" onChange={(e) => this.setState({ httpsProxy: e.target.value })} />
                </div>
                <div className="col-lg-3 form-group">
                    <label id="labelFtpProxy" htmlFor="ftpProxy">Proxy FTP</label>
                    <InputText id="ftpProxy" value={this.state.ftpProxy} title="Informe aqui o proxy ftp" className="form-control" onChange={(e) => this.setState({ ftpProxy: e.target.value })} />
                </div>
                <div className="col-lg-3 form-group">
                    <label id="labelSocksProxy" htmlFor="socksProxy">Proxy SOCKS</label>
                    <InputText id="socksProxy" value={this.state.socksProxy} title="Informe aqui o proxy socks" className="form-control" onChange={(e) => this.setState({ socksProxy: e.target.value })} />
                </div>
            </div>,
            <div key="rowButtons" className="row">
                <div className="col-lg-12 text-center">
                    <Button id="btnConfirmar" label="Confirmar" icon="fa-check" className="ui-button-success" onClick={this.confirmar} title="Clique aqui para confirmar a configuração do proxy" />
                    <Button id="btnLimpar" label="Limpar" icon="fa-refresh" className="ui-button-danger" onClick={this.limpar} title="Clique aqu para limpara configuração de proxy" />
                </div>
            </div>
        ];
    }

    confirmar() {
        axios.get(`http://localhost:8080/proxy?httpProxy=${this.state.httpProxy}&httpsProxy=${this.state.httpsProxy}&ftpProxy=${this.state.ftpProxy}&socksProxy=${this.state.socksProxy}`)
            .then(resp => {
                console.log(resp.data);
                let severity = '';
                if (resp.status === 200) {
                    severity = 'success';
                    this.setHttpProxy(this.state.httpProxy)
                    this.setHttpsProxy(this.state.httpsProxy);
                    this.setFtpProxy(this.state.ftpProxy);
                    this.setSocksProxy(this.state.socksProxy);
                }
                let msg = { severity: severity, summary: "OK", detail: resp.data };
                this.messages.show(msg);
                this.growl.show(msg);
            }).catch(error => {
                console.log(error.data);
                let msg = { severity: 'error', summary: "Erro", detail: error.data };
                this.messages.show(msg);
                this.growl.show(msg);
            });
    }

    limpar() {
        this.setHttpProxy('');
        this.setHttpsProxy('');
        this.setFtpProxy('');
        this.setSocksProxy('');
    }

    setHttpProxy(proxy) {
        this.setState({ httpProxy: proxy });
        localStorage.setItem(HTTP_PROXY, proxy);
    }

    setHttpsProxy(proxy) {
        this.setState({ httpsProxy: proxy });
        localStorage.setItem(HTTPS_PROXY, proxy);
    }

    setFtpProxy(proxy) {
        this.setState({ ftpProxy: proxy });
        localStorage.setItem(FTP_PROXY, proxy);
    }

    setSocksProxy(proxy) {
        this.setState({ socksProxy: proxy });
        localStorage.setItem(SOCKS_PROXY, proxy);
    }

    getHttpProxy() {
        return localStorage.getItem(HTTP_PROXY);
    }

    getHttpsProxy() {
        return localStorage.getItem(HTTPS_PROXY);
    }

    getFtpProxy() {
        return localStorage.getItem(FTP_PROXY);
    }

    getSocksProxy() {
        return localStorage.getItem(SOCKS_PROXY);
    }
}