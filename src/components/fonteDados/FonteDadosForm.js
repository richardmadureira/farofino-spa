import React, { Component } from 'react';

import { Panel } from 'primereact/components/panel/Panel';
import { InputText } from 'primereact/components/inputtext/InputText';
import { SelectButton } from 'primereact/components/selectbutton/SelectButton';
import { Dropdown } from 'primereact/components/dropdown/Dropdown';
import { Calendar } from 'primereact/components/calendar/Calendar';
import { Button } from 'primereact/components/button/Button';
import { Checkbox } from 'primereact/components/checkbox/Checkbox';
import { Password } from 'primereact/components/password/Password';
import { Tooltip } from 'primereact/components/tooltip/Tooltip';
import { DataTable } from 'primereact/components/datatable/DataTable';
import { Column } from 'primereact/components/column/Column';
import { Row } from 'primereact/components/row/Row';
import { ColumnGroup } from 'primereact/components/columngroup/ColumnGroup';
import { Growl } from 'primereact/components/growl/Growl';

import DetalheResultadoColetaSyndEntry from './DetalheResultadoColetaSyndEntry';

import * as Utils from '../../service/Utils';

import './FonteDados.css';

export default class FonteDadosForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resultadoColetaFonteDadosSelecionada: {},
            fonteDados: {
                nome: '',
                url: '',
                feedContemNoticiaCompleta: false,
                tagInicioNoticia: '',
                tagFimNoticia: '',
                statusFonteDados: 'NAO_INICIADO',
                unidadeIntervaloRepeticao: '',
                intervaloRepeticao: '',
                inicio: '',
                requerAutenticacao: false,
                login: '',
                senha: '',
                resultadosColetasFontesDados: [
                    {
                        id: 1,
                        tipoResultadoColeta: 'SUCESSO',
                        horarioInicio: '01/01/2018 00:00',
                        horarioTermino: '01/01/2018 00:03',
                        tempoExecucao: '3 minutos',
                        resultadosColetasSyndiesEntries: [
                            { id: 2, tipoResultadoColeta: '', horarioInicio: '', horarioTermino: '', tempoExecucao: '' }
                        ]
                    }
                ]
            },
            simOuNao: [
                { label: 'Sim', value: true, selected: true },
                { label: 'Não', value: false }
            ],
            tiposStatus: [
                { label: 'Não Iniciado', value: 'NAO_INICIADO'},
                { label: 'Iniciado', value: 'INICIADO' },
                { label: 'Pausado', value: 'PAUSADO' }
            ],
            unidadesIntervalosRepeticoes: [
                { label: 'Milisegundo', value: 'MILISEGUNDO' },
                { label: 'Segundo', value: 'SEGUNDO' },
                { label: 'Minuto', value: 'MINUTO' },
                { label: 'Hora', value: 'HORA' },
                { label: 'Dia', value: 'DIA' },
                { label: 'Semana', value: 'SEMANA' },
                { label: 'Quinzena', value: 'QUINZENA' },
                { label: 'Mês', value: 'MES' },
                { label: 'Ano', value: 'ANO' }
            ]
        };

        console.log(this.props.params);

        this.horarioInicioFormatadoTemplate = this.horarioInicioFormatadoTemplate.bind(this);
        this.horarioTerminoFormatadoTemplate = this.horarioTerminoFormatadoTemplate.bind(this);
        this.dataInicioTemplate = this.dataInicioTemplate.bind(this);
        this.resultadoColetaTemplate = this.resultadoColetaTemplate.bind(this);
        this.actionTemplate = this.actionTemplate.bind(this);
        this.detalharResultadoColetaFonteDados = this.detalharResultadoColetaFonteDados.bind(this);
        this.onSelectionChange = this.onSelectionChange.bind(this);

        this.totalProcessadosTemplate = this.totalProcessadosTemplate.bind(this);
        this.totalJaColetadosTemplate = this.totalJaColetadosTemplate.bind(this);
        this.totalSucessosTemplate = this.totalSucessosTemplate.bind(this);
        this.totalFalhasTemplate = this.totalFalhasTemplate.bind(this);

        this.salvarFonteDados = this.salvarFonteDados.bind(this);
    }

    render() {
        let headerGroupResultadoColetaFonteDados = (
            <ColumnGroup>
                <Row>
                    <Column header="ID" rowSpan={2} style={{ width: "50px", textAlign: 'center' }} />
                    <Column header="Horário de Execução" colSpan={4} style={{ width: "320px" }} />
                    <Column header="Resultado da Coleta" colSpan={5} style={{ width: "600px" }} />
                    <Column header="Ações" rowSpan={2} style={{ width: "60px" }} />
                </Row>
                <Row>
                    <Column header="Data" />
                    <Column header="Início" />
                    <Column header="Término" />
                    <Column header="Duração"/>
                    <Column header="Situação" />
                    <Column header="Processados" />
                    <Column header="Já Coletados" />
                    <Column header="Sucessos" />
                    <Column header="Falhas" />
                </Row>
            </ColumnGroup>
        );

        return [
            <Growl key="messagesFonteDadosForm" ref={(el) => { this.growl = el; }}/>,
            <Growl key="growlFonteDadosForm" ref={(el) => { this.growl = el; }}/>,
            <Panel header="Cadastro de Fonte de Dados" key="painelCadastroFonteDados" toggleable={true}>
                <Tooltip for="#nome" title="Informe aqui o nome da fonte de dados" />
                <div className="row">
                    <div className="col-lg-12 form-group">
                        <label id="labelNome" htmlFor="nome">Nome</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">N</span>
                            </div>
                            <InputText id="nome" value={this.state.fonteDados.nome} className="form-control form-control-sm" onChange={(e) => this.updatePropertyFonteDados("nome", e.target.value)} placeholder="Nome da Fonte de Dados" title="Informe aqui o nome da fonte de dados" required={true}/>
                        </div>
                    </div>
                    <div className="col-lg-12 form-group">
                        <label id="labelURL" htmlFor="url">URL</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1"><span className="fa fa-globe" /></span>
                            </div>
                            <InputText id="url" value={this.state.fonteDados.url} className="form-control form-control-sm" onChange={(e) => this.updatePropertyFonteDados("url", e.target.value)} placeholder="Nome da Fonte de Dados" title="Informe aqui o nome da fonte de dados" required={true}/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4">
                        <label id="labelFeedContemNoticiaCompleta" htmlFor="feedContemNoticiaCompleta">Feed contém a notícia completa</label>
                        <SelectButton id="feedContemNoticiaCompleta" value={this.state.fonteDados.feedContemNoticiaCompleta} options={this.state.simOuNao} onChange={(e) => this.updatePropertyFonteDados("feedContemNoticiaCompleta", e.value)}  required={true}/>
                    </div>
                    <div className="col-lg-4">
                        <label id="labelTagInicioNoticia" htmlFor="tagInicioNoticia">Tag de Início de Notícia</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1"><span className="fa fa-code" /></span>
                            </div>
                            <InputText id="tagInicioNoticia" value={this.state.fonteDados.tagInicioNoticia} className="form-control form-control-sm" onChange={(e) => this.updatePropertyFonteDados("tagInicioNoticia", e.target.value)} />
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <label id="labelTagFimNoticia" htmlFor="tagFimNoticia">Tag de Fim de Notícia</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon2"><span className="fa fa-code" /></span>
                            </div>
                            <InputText id="tagFimNoticia" value={this.state.fonteDados.tagFimNoticia} className="form-control form-control-sm" onChange={(e) => this.updatePropertyFonteDados("tagFimNoticia", e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-3 form-group">
                        <label id="labelStatusFonteDados" htmlFor="statusFonteDados">Status</label>
                        <Dropdown id="statusFonteDados" value={this.state.fonteDados.statusFonteDados} options={this.state.tiposStatus} className="form-control form-control-sm py-0" onChange={(e) => this.updatePropertyFonteDados("statusFonteDados", e.value)} required={true}/>
                    </div>
                    <div className="col-lg-3 form-group">
                        <label id="labelUnidadeIntervaloRepeticao" htmlFor="unidadeIntervaloRepeticao">Unidade de Intervalo de Repetição</label>
                        <Dropdown id="unidadeIntervaloRepeticao" value={this.state.fonteDados.unidadeIntervaloRepeticao} options={this.state.unidadesIntervalosRepeticoes} className="form-control form-control-sm py-0" onChange={(e) => this.updatePropertyFonteDados("unidadeIntervaloRepeticao", e.value)} required={true} />
                    </div>
                    <div className="col-lg-3 form-group">
                        <label id="labelIntervaloRepeticao" htmlFor="intervaloRepeticao">Intervalo de Repetição</label>
                        <InputText id="intervaloRepeticao" value={this.state.fonteDados.intervaloRepeticao} className="form-control form-control-sm" onChange={(e) => this.updatePropertyFonteDados("intervaloRepeticao", e.target.value)} required={true} />
                    </div>
                    <div className="col-lg-3 form-group">
                        <label id="labelHorarioInicio" htmlFor="horarioInicio">Início</label>
                        <Calendar id="inicio" value={this.state.fonteDados.horarioInicio} inputId="horarioInicio" placeholder="99/99/9999" className="form-control form-control-sm p-0" inputClassName="form-control form-control-sm" dateFormat="dd/mm/yy" showTime={true} hourFormat="24" onChange={(e) => { this.updatePropertyFonteDados('horarioInicio', e.value) }} title="Informe aqui o horário de início da primeira coleta" required={true} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 form-group">
                        <Checkbox inputId="requerAutenticacao" checked={this.state.fonteDados.requerAutenticacao} onChange={(e) => this.updatePropertyFonteDados("requerAutenticacao", e.checked)} />
                        <label id="labelRequerAutenticacao" htmlFor="requerAutenticacao" style={{ marginBottom: '0' }}>&nbsp;Requer Autenticação</label>
                    </div>
                    <div className="col-lg-4 form-group">
                        <label id="labelLogin" htmlFor="login">Login</label>
                        <InputText id="login" value={this.state.fonteDados.login} className="form-control form-control-sm" onChange={(e) => this.updatePropertyFonteDados("login", e.target.value)} required={this.state.fonteDados.requerAutenticacao}/>
                    </div>
                    <div className="col-lg-4 form-group">
                        <label id="labelSenha" htmlFor="senha">Senha</label>
                        <Password id="senha" value={this.state.fonteDados.senha} className="form-control form-control-sm" onChange={(e) => this.updatePropertyFonteDados("senha", e.target.value)} required={this.state.fonteDados.requerAutenticacao}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <Button id='btnConfirmar' label="Confirmar" icon="fa-check" className='ui-button-success' onClick={this.salvarFonteDados}/>
                        <Button id='btnCancelar' label="Cancelar" icon="fa-close" className='ui-button-secondary' />
                        <Button id='btnLimpar' label="Limpar" icon="fa-refresh" className='ui-button-secondary' />
                    </div>
                </div>
            </Panel>,
            <DataTable id="dataTableResultadoColetaFonteDados" key="dataTableResultadoColetaFonteDados" className='mt-2' value={this.state.fonteDados.listaResultadoColetaFonteDados} emptyMessage="Nenhum resultado de coleta de fonte de dados encontrada" responsive={true}
                rows={8} paginator={true} header="Histórico de Coletas" headerColumnGroup={headerGroupResultadoColetaFonteDados} onSelectionChange={this.onSelectionChange}>
                <Column field="id" style={{ textAlign: 'center' }} />
                <Column field="horarioInicio" body={this.dataInicioTemplate} style={{ textAlign: 'center' }} />
                <Column field="horarioInicio" body={this.horarioInicioFormatadoTemplate} style={{ textAlign: 'center' }} />
                <Column field="horarioTermino" body={this.horarioTerminoFormatadoTemplate} style={{ textAlign: 'center' }} />
                <Column field="tempoExecucao" style={{ textAlign: 'center' }} />
                <Column field="tipoResultadoColeta" body={this.resultadoColetaTemplate} style={{ textAlign: 'center' }} />
                <Column field="totalProcessados" style={{ textAlign: 'center' }} body={this.totalProcessadosTemplate} />
                <Column field="totalJaColetados" style={{ textAlign: 'center' }} body={this.totalJaColetadosTemplate} />
                <Column field="totalSucessos" style={{ textAlign: 'center' }} body={this.totalSucessosTemplate} />
                <Column field="totalFalhas" style={{ textAlign: 'center' }} body={this.totalFalhasTemplate} />
                <Column body={this.actionTemplate} />
            </DataTable>,
            <DetalheResultadoColetaSyndEntry key="detalheResultadoColetaSyndEntry" resultadoColetaFonteDados={this.state.resultadoColetaFonteDadosSelecionada} showDialog={this.state.showDialogDetalheResultadoColetaFonteDados}/>,
        ];
    }

    onSelectionChange(e){
        this.setState({resultadoColetaFonteDadosSelecionada: e.data});
    }

    horarioInicioFormatadoTemplate(rowData, column) {
        return Utils.getHoraMinutoSegundoFormatado(new Date(rowData.horarioInicio));
    }

    horarioTerminoFormatadoTemplate(rowData, column) {
        return Utils.getHoraMinutoSegundoFormatado(new Date(rowData.horarioTermino));
    }

    totalProcessadosTemplate(rowData, column) {
        return <span className="badge badge-pill badge-processado"><span className="fa fa-hand-paper-o"/>&nbsp;{rowData.totalProcessados}</span>
    }

    totalJaColetadosTemplate(rowData, column) {
        return <span className="badge badge-pill badge-ja-coletado"><span className="fa fa-hand-spock-o"/>&nbsp;{rowData.totalJaColetados}</span>
    }

    totalSucessosTemplate(rowData, column) {
        return <span className="badge badge-pill badge-sucesso"><span className="fa fa-thumbs-o-up"/>&nbsp;{rowData.totalSucessos}</span>
    }

    totalFalhasTemplate(rowData, column) {
        return <span className="badge badge-pill badge-falha"><span className="fa fa-thumbs-o-down"/>&nbsp;{rowData.totalFalhas}</span>
    }

    resultadoColetaTemplate(rowData, column) {
        switch (rowData.tipoResultadoColeta) {
            case 'SUCESSO': return <div className="badge badge-success" title={rowData.mensagem}>Sucesso</div>;
            case 'FALHA_INDEXACAO': return <div className="badge badge-danger" title={rowData.mensagem}>Falha na Indexação do Documento</div>;
            case 'JA_COLETADO': return <div className="badge badge-info" title={rowData.mensagem}>Site Já Coletado</div>;
            case 'FALHA': return <div className="badge badge-danger" title={rowData.falha}>Falha Desconhecida</div>;
            case 'FALHA_LER_SYND_ENTRY': return <div className="badge badge-danger" title={rowData.mensagem}>Falha ao ler FEED</div>;
            default: return "";
        }
    }

    dataInicioTemplate(rowData, column) {
        return Utils.getDiaMesAnoFormatado(new Date(rowData.horarioInicio));
    }

    statusTemplate(rowData, column) {
        if (rowData['statusFonteDados'] === 'NAO_INICIADO') {
            return "Não Iniciado";
        } else if (rowData['statusFonteDados'] === 'INICIADO') {
            return "Iniciado";
        } else if (rowData['statusFonteDados'] === 'PAUSADO') {
            return "Pausado";
        }
        return "";
    }

    unidadeIntervaloRepeticaoTemplate(rowData, column) {
        if (rowData['unidadeIntervaloRepeticao'] === 'MILISEGUNDO') {
            return "Milisegundo";
        } else if (rowData['unidadeIntervaloRepeticao'] === 'SEGUNDO') {
            return "Segundo";
        } else if (rowData['unidadeIntervaloRepeticao'] === 'MINUTO') {
            return "Minuto";
        } else if (rowData['unidadeIntervaloRepeticao'] === 'HORA') {
            return "Hora";
        } else if (rowData['unidadeIntervaloRepeticao'] === 'DIA') {
            return "Dia";
        } else if (rowData['unidadeIntervaloRepeticao'] === 'SEMANA') {
            return "Semana";
        } else if (rowData['unidadeIntervaloRepeticao'] === 'MES') {
            return "Mês";
        } else if (rowData['unidadeIntervaloRepeticao'] === 'ANO') {
            return "Ano";
        }
        return "";
    }

    actionTemplate(rowData, column) {
        return <div className="text-center">
            <Button icon="fa-eye" className="ui-button-default" title="Clique aqui para detalhar a fonte de dados" onClick={() => this.detalharResultadoColetaFonteDados(rowData)} />
            <Button icon="fa-trash-o" className="ui-button-danger" title="Clique aqui para excluir a fonte de dados" onClick={() => console.log("excluir")} />
        </div>;
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            fonteDados: nextProps.value,
        })
    }

    updatePropertyFonteDados(property, value) {
        let fonteDados = this.state.fonteDados;
        fonteDados[property] = value;
        this.setState({ fonteDados: fonteDados });
    }

    detalharResultadoColetaFonteDados(resultadoColetaFonteDados){
        let headers = new Headers();
        headers.append('Authorization', localStorage.getItem("authorization"));
        let fetchData = {
            method: 'GET',
            headers: headers,
            mod: 'cors'
        }        
        fetch(`http://localhost:8080/resultadoColetaFonteDados/${resultadoColetaFonteDados.id}`, fetchData)
            .then(resp => resp.json())
            .then(result => {
                this.setState({resultadoColetaFonteDadosSelecionada: result});
                this.setState({showDialogDetalheResultadoColetaFonteDados: true});
            }).catch(error => {
                console.error("Erro ao detalhar resultado da coleta de fonte de dados", error);
                this.growl.show({severity: 'error', summary: 'Erro ao detalhar Resultado da coleta de fonte de dados', detail: error});
            });
    }

    salvarFonteDados(){
        if(!this.isFonteDadosValida(this.state.fonteDados)){
            return;
        }
        let headers = new Headers();
        headers.append('Authorization', localStorage.getItem("authorization"));
        headers.append('Accept', 'application/json;charset=utf-8');
        headers.append('Content-Type', 'application/json;charset=utf-8');
        headers.append('Access-Control-Allow-Origin', '*');
        let fetchData = {
            method: 'put',
            headers: headers,
            body: JSON.stringify(this.state.fonteDados)
        }        
        fetch('http://localhost:8080/fonteDados', fetchData)
            .then(resp => resp.json())
            .then(result => {
                console.log(result);
                this.setState({fonteDados: {}});
            }).catch(error => {
                console.error("Erro ao salvar fonte de dados", error);
                this.growl.show({severity: 'error', summary: 'Erro ao detalhar Resultado da coleta de fonte de dados', detail: error});
            });
    }

    isFonteDadosValida(fonteDados){
        let msgs = [];
        if(fonteDados){
            if(!fonteDados.nome){
                msgs.push({severity: 'error', summary: 'Campo Obrigatório', detail: 'É necessário informar o nome'});
            }
            if(!fonteDados.url){
                msgs.push({severity: 'error', summary: 'Campo Obrigatório', detail: 'É necessário informar a url'});
            }
            if(!fonteDados.statusFonteDados){
                msgs.push({severity: 'error', summary: 'Campo Obrigatório', detail: 'É necessário informar o status da fonte de Dados'});
            }
            if(!fonteDados.unidadeIntervaloRepeticao){
                msgs.push({severity: 'error', summary: 'Campo Obrigatório', detail: 'É necessário informar a unidade de repetição'});
            }
            if(!fonteDados.intervaloRepeticao){
                msgs.push({severity: 'error', summary: 'Campo Obrigatório', detail: 'É necessário informar o intervalo de repetição'});
            }
            if(!fonteDados.horarioInicio){
                msgs.push({severity: 'error', summary: 'Campo Obrigatório', detail: 'É necessário informar o horário de início'});
            }
            if(fonteDados.requerAutenticacao){
                if(!fonteDados.login){
                    msgs.push({severity: 'error', summary: 'Campo Obrigatório', detail: 'É necessário informar o login'});
                }
                if(!fonteDados.senha){
                    msgs.push({severity: 'error', summary: 'Campo Obrigatório', detail: 'É necessário informar a senha'});
                }
            }
        }
        if(msgs.length>0){
            this.growl.show(msgs);
            return false
        }
        return true;
    }
    
}