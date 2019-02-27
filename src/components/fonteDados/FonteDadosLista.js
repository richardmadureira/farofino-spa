import React, { Component } from 'react';

import { DataTable } from 'primereact/components/datatable/DataTable';
import { Column } from 'primereact/components/column/Column';
import { Button } from 'primereact/components/button/Button';
import { Dropdown } from 'primereact/components/dropdown/Dropdown';
import { InputText } from 'primereact/components/inputtext/InputText';
import { Growl } from 'primereact/components/growl/Growl';

import * as Utils from '../../service/Utils';

export default class FonteDadosLista extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fontesDados: [],
            totalRecords: 5,
            filters: {},
            page: 0,
            size: 5,
            loading: false,
            tiposStatusFonteDados: [
                { label: 'Não Iniciado', value: 'NAO_INICIADO' },
                { label: 'Iniciado', value: 'INICIADO' },
                { label: 'Pausado', value: 'PAUSADO' }
            ],
            fonteDadosSelecionada: {
                nome: ''
            },
            showDialogDetalheResultadoColetaFonteDados: false
        };
        this.iniciarFonteDados = this.iniciarFonteDados.bind(this);
        this.pararFonteDados = this.pararFonteDados.bind(this);
        this.detalharFonteDados = this.detalharFonteDados.bind(this);
        this.iniciarEdicaoFonteDados = this.iniciarEdicaoFonteDados.bind(this);
        this.excluirFonteDados = this.excluirFonteDados.bind(this);
        this.onStatusFonteDadosChange = this.onStatusFonteDadosChange.bind(this);
        this.onSelectionChange = this.onSelectionChange.bind(this);
        this.adicionarNovaFonteDados = this.adicionarNovaFonteDados.bind(this);
        this.onLazyLoad = this.onLazyLoad.bind(this);
        this.criarFonteDados = this.criarFonteDados.bind(this);
        this.unidadeIntervaloRepeticaoTemplate = this.unidadeIntervaloRepeticaoTemplate.bind(this);
        this.statusTemplate = this.statusTemplate.bind(this);
        this.publishedDateTemplate = this.publishedDateTemplate.bind(this);
        this.urlTemplate = this.urlTemplate.bind(this);
        this.actionTemplateFonteDados = this.actionTemplateFonteDados.bind(this);
    }

    criarFonteDados(event) {
        let fonteDadosRequest = {
            "page": 0,
            "size": 5,
            "fonteDados": {
                "nome": null,
                "url": null,
                "unidadeIntervaloRepeticao": null,
                "intervaloRepeticao": null,
                "statusFonteDados": null
            },
            "sortField": "nome",
            "sortOrder": 1
        };
        if (event && event.filters) {
            for (const key of Object.keys(event.filters)) {
                fonteDadosRequest.fonteDados[key] = event.filters[key].value;
            }
        }
        fonteDadosRequest.page = event.first / event.rows;
        fonteDadosRequest.size = event.rows;
        fonteDadosRequest.sortField = event.sortField ? event.sortField : 'nome';
        fonteDadosRequest.sortOrder = event.sortOrder ? event.sortOrder : '1';
        this.setState({ size: event.rows });
        this.setState({ filters: event.filters });
        return fonteDadosRequest;
    }

    onLazyLoad(event) {
        this.setState({ loading: true });
        let fonteDadosRequest = {
            "page": 0,
            "size": 5,
            "fonteDados": {
                "nome": null,
                "url": null,
                "unidadeIntervaloRepeticao": null,
                "intervaloRepeticao": null,
                "statusFonteDados": null
            },
            "sortField": "nome",
            "sortOrder": 1,
        };
        fonteDadosRequest = this.criarFonteDados(event);
        let headers = new Headers();
        headers.append("Accept", "application/json");
        headers.append("Content-Type", "application/json");
        headers.append('Authorization', localStorage.getItem("authorization"));
        let fetchData = {
            method: 'post',
            headers: headers,
            body: JSON.stringify(fonteDadosRequest)
        }
        console.log()
        fetch('http://localhost:8080/fonteDados', fetchData)
            .then(resp => resp.json())
            .then(result => {
                let fontesDados = result.content;
                this.setState({ fontesDados: fontesDados });
                this.setState({ size: event.rows });
                this.setState({ totalRecords: result.totalElements })
                this.setState({ loading: false });
            }).catch(error => {
                console.error("Erro ao consultar fonte de dados", error);
                let msg = { severity: 'error', summary: 'Erro ao pesquisar pela fonte de dados', detail: error };
                this.growlFonteDados.show(msg);
                this.setState({ loading: false });
            });
    }

    onStatusFonteDadosChange(event) {
        this.dt.filter(event.value, 'statusFonteDados', 'equals');
        let filters = this.state.filters;
        filters['statusFonteDados'] = event.value
        this.setState({ filters: filters });
    }

    render() {
        var header = (
            <div className="row">
                <div className="col-lg-4 float-left">
                    <i className="fa fa-search mr-2" /><InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })} placeholder="Pesquisa Global" size="50" />
                </div>
                <div className="col-lg-8 text-center">Fonte de Dados Encontradas</div>
            </div>
        );
        let paginatorRight = <Button id="btnNovaFonte" label="Nova Fonte de Dados" icon="fa-plus-circle" className="ui-button-default" title="Clique aqui para iniciar o cadastro de uma nova fonte de Dados" onClick={this.adicionarNovaFonteDados} />;
        let filterElementStatus = <Dropdown id="dropDownFilterStatus" options={this.state.tiposStatusFonteDados} style={{ width: '100%' }} onChange={this.onStatusFonteDadosChange} />
        let paginatorLeft = <div>Total de Fontes de Dados Encontradas: {this.state.totalRecords}</div>;
        return [
            <Growl key="growlFonteDadosLista" ref={(el) => { this.growlFonteDados = el; }} />,
            <DataTable id="dataTableFontesDadosLista" key="dataTableFontesDadosLista" ref={(el) => this.dt = el} value={this.state.fontesDados} header={header} paginatorLeft={paginatorLeft} responsive={true} autoLayout={true} paginator={true} alwaysShowPaginator={false}
                rows={this.state.size} paginatorRight={paginatorRight} globalFilter={this.state.globalFilter} emptyMessage="Nenhuma Fonte de Dados Encontrada"
                totalRecords={this.state.totalRecords} filters={this.state.filters} lazy={true} onLazyLoad={this.onLazyLoad} loading={this.state.loading} onSelectionChange={this.onSelectionChange}>
                <Column columnKey="id" header="ID" field="id" style={{ width: '80px' }} className="text-center" sortable={true} filter={true} filterMatchMode="equals" />
                <Column columnKey="nome" header="Nome" field="nome" sortable={true} filter={true} filterMatchMode="contains" style={{ width: '300px' }} />
                <Column columnKey="url" header="URL" field="url" sortable={true} filter={true} filterMatchMode="contains" body={this.urlTemplate} />
                <Column columnKey="unidadeIntervaloRepeticao" header="Unid. de Intevalo de Repetição" field="unidadeIntervaloRepeticao" body={this.unidadeIntervaloRepeticaoTemplate} className="text-center" sortable={true} style={{ width: '250px' }} />
                <Column columnKey="intervaloRepeticao" header="Intevalo de Repetição" field="intervaloRepeticao" className="text-center" sortable={true} style={{ width: '100px' }} />
                <Column columnKey="statusFonteDados" header="Status" field="statusFonteDados" style={{ width: '150px' }} className="text-center" body={this.statusTemplate} sortable={true} filter={true} filterElement={filterElementStatus} />
                <Column columnKey="horarioInicio" header="Início" field="horarioInicio" style={{ width: '150px' }} className="text-center" body={this.horarioInicioTemplate} sortable={true} filter={true} />
                <Column columnKey="publishedDate" header="Publicação" field="publishedDate" style={{ width: '160px' }} className="text-center" body={this.publishedDateTemplate} sortable={true} filter={true} />
                <Column columnKey="actionTemplateFonteDados" header="Ações" body={this.actionTemplateFonteDados} style={{ width: "150px" }} />
            </DataTable>
        ];
    }

    onSelectionChange(e) {
        this.setState({ fonteDadosSelecionada: e.data });
    }

    urlTemplate(rowData, column) {
        return <a href={rowData.url} target="_blank">{rowData.url}</a>
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

    horarioInicioTemplate(rowData, column) {
        if (rowData.horarioInicio) {
            return Utils.getDiaMesAnoHoraMinutoFormatado(new Date(rowData.horarioInicio));
        }
        return '';
    }

    publishedDateTemplate(rowData, column) {
        if (rowData.publishedDate) {
            return Utils.getDiaMesAnoHoraMinutoSegundoFormatado(new Date(rowData.publishedDate));
        }
        return '';
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

    iniciarFonteDados(fonteDados) {
        let headers = new Headers();
        headers.append("Authorization", localStorage.getItem("authorization"));
        let fetchData = {
            method: 'get',
            headers: headers
        }
        fetch(`http://localhost:8080/fonteDados/inicioFonteDados/${fonteDados.id}`, fetchData)
            .then(result => {
                console.log(result);
                if (result.ok) {
                    let msg = { severity: 'success', summary: 'Fonte de Dados Iniciada', detail: 'A Coleta de fonte de dados foi iniciada e executará de acordo com o horário de inicio e intervalo de repetição' };
                    this.growlFonteDados.show(msg);
                } else {
                    let msg = { severity: 'error', summary: 'Fonte de Dados Não Iniciada', detail: 'Não foi possível iniciar a fonte de dados. Por favor, tente novamente' }
                    this.growlFonteDados.show(msg);
                }
            })
            .catch(error => {
                let msg = { severity: 'error', summary: 'Erro ao iniciar fonte de dados', detail: error };
                this.growlFonteDados.show(msg);
            });
    }

    pararFonteDados(fonteDados) {
        let headers = new Headers();
        headers.append("Authorization", localStorage.getItem("authorization"));
        let fetchData = {
            method: 'get',
            headers: headers
        }
        fetch(`http://localhost:8080/fonteDados/fimFonteDados/${fonteDados.id}`, fetchData)
            .then(result => {
                console.log(result);
                if (result.ok) {
                    let msg = { severity: 'success', summary: 'Fonte de Dados Parada', detail: 'A Coleta de fonte de dados foi parada com sucesso' };
                    this.growlFonteDados.show(msg);
                } else {
                    let msg = { severity: 'error', summary: 'Fonte de Dados ainda Iniciada', detail: 'Não foi possível parar a fonte de dados. Por favor, tente novamente' };
                    this.growlFonteDados.show(msg);
                }
            })
            .catch(error => {
                let msg = { severity: 'error', summary: 'Erro ao parar fonte de dados', detail: error };
                this.growlFonteDados.show(msg);
            });
    }

    detalharFonteDados(fonteDados) {
        let headers = new Headers();
        headers.append("Authorization", localStorage.getItem("authorization"));
        let fetchData = {
            method: 'get',
            headers: headers
        }
        fetch(`http://localhost:8080/fonteDados/${fonteDados.id}`, fetchData)
            .then(resp => resp.json())
            .then(result => {
                let fd = result;
                this.setState({ fonteDadosSelecionada: fd });
                let msg = { severity: 'success', summary: 'Fonte de Dados Encontrada', detail: 'A Coleta de fonte de dados encontrada' };
                this.growlFonteDados.show(msg);
                this.setState({ showDialogDetalheResultadoColetaFonteDados: true });
            })
            .catch(error => {
                let msg = { severity: 'error', summary: 'Erro ao detalhar fonte de dados', detail: JSON.stringify(error) };
                this.growlFonteDados.show(msg);
            });
    }

    iniciarEdicaoFonteDados(fonteDados) {
        this.growlFonteDados.show({ severity: 'info', summary: 'Editar FonteDados', detail: fonteDados.nome });
    }

    excluirFonteDados(fonteDados) {
        let headers = new Headers();
        headers.append('Authorization', localStorage.getItem("authorization"));
        headers.append('Accept', 'application/json;charset=utf-8');
        headers.append('Content-Type', 'application/json;charset=utf-8');
        headers.append('Access-Control-Allow-Origin', '*');
        let fetchData = {
            method: 'delete',
            headers: headers
        }
        fetch(`http://localhost:8080/fonteDados/${fonteDados.id}`, fetchData)
            .then(result => {
                this.growlFonteDados.show({ severity: 'success', summary: 'Exclusão OK', detail: 'Fonte de Dados Excluída com sucesso' });
                let listaTmp = this.state.fontesDados;
                listaTmp.splice(fonteDados, 1);
                this.setState({fontesDados: listaTmp});
            }).catch(error => {
                console.log("Erro ao excluir fonte de dados pelo id " + fonteDados.id, error);
                this.growl.show({ severity: 'error', summary: 'Erro ao excluir fonte de dados', detail: error });
            });
    }

    adicionarNovaFonteDados() {
        this.props.history.push("/fonte-dados/nova");
    }

    actionTemplateFonteDados(rowData, column) {
        let botaoIniciarParar = rowData['statusFonteDados'] === 'NAO_INICIADO' ? <Button icon="fa-play" className="ui-button-success" title="Clique aqui para Iniciar a coleta da fonte" onClick={(e) => this.iniciarFonteDados(rowData)} /> :
            <Button icon="fa-stop" className="ui-button-success" title="Clique aqui para Parar a coleta da fonte" onClick={(e) => this.pararFonteDados(rowData)} />;
        return <div className="text-center">
            {botaoIniciarParar}
            <Button icon="fa-eye"  className="ui-button-default" title="Clique aqui para detalhar a fonte de dados" onClick={(e) => this.detalharFonteDados(rowData)} />
            <Button icon="fa-edit" className="ui-button-warning" title="Clique aqui para alterar a fonte de dados" onClick={(e) => this.iniciarEdicaoFonteDados(rowData)} />
            <Button icon="fa-trash-o" className="ui-button-danger" title="Clique aqui para excluir a fonte de dados" onClick={(e) => this.excluirFonteDados(rowData)} />
        </div>;
    }
}