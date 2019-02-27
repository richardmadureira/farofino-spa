import React, { Component } from 'react';
import { Dialog } from 'primereact/components/dialog/Dialog';
import { DataTable } from 'primereact/components/datatable/DataTable';
import { Column } from 'primereact/components/column/Column';
import { ColumnGroup } from 'primereact/components/columngroup/ColumnGroup';
import { Row } from 'primereact/components/row/Row';

import * as Utils from '../../service/Utils';

import './FonteDados.css';

export default class DetalheResultadoColetaSyndEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDialog: false
        }
        this.onHideDialog = this.onHideDialog.bind(this);

        this.urlTemplate = this.urlTemplate.bind(this);
        this.resultadoColetaTemplate = this.resultadoColetaTemplate.bind(this);
        this.horarioInicioFormatadoTemplate = this.horarioInicioFormatadoTemplate.bind(this);
        this.horarioTerminoFormatadoTemplate = this.horarioTerminoFormatadoTemplate.bind(this);
        this.dataInicioTemplate = this.dataInicioTemplate.bind(this);
    }

    componentWillReceiveProps(nextProps){
        this.setState({showDialog: nextProps.showDialog});
    }

    render() {
        let headerColumGroup = (
            <ColumnGroup>
            <Row>
                <Column header="URL" rowSpan={2}/>
                <Column header="Resultado da Coleta" colSpan={5} style={{ width: "600px" }} />
            </Row>
            <Row>
                <Column header="Resultado"/>
                <Column header="Data" />
                <Column header="Início"/>
                <Column header="Término"/>
                <Column header="Tempo de Execução"/>
            </Row>
        </ColumnGroup>
        );
        return [
            <Dialog id="dlgDetalheResultadoColetaSyndEntry" key="dlgDetalheResultadoColetaSyndEntry" header="Resultado da Coleta de Fonte de Dados" modal={true} visible={this.state.showDialog} onHide={this.onHideDialog}
                    style={{width: '80%'}} responsive={true}>
                <DataTable id="dataTableResultadoColetaSyndEntry" value={this.props.resultadoColetaFonteDados.listaResultadoColetaSyndEntry} emptyMessage="Nenhum resultado de coleta de Synd Entries encontrado"
                    headerColumnGroup={headerColumGroup} rows={10} paginator={true} responsive={true} autoLayout={true} sortField="horarioInicio" sortOrder={-1}>
                    <Column field="url" header="URL" body={this.urlTemplate}/>
                    <Column field="tipoResultadoColeta" body={this.resultadoColetaTemplate} style={{ textAlign: 'center' }}/>
                    <Column field="horarioInicio" body={this.dataInicioTemplate} style={{ textAlign: 'center' }}/>
                    <Column field="horarioInicio" body={this.horarioInicioFormatadoTemplate} style={{ textAlign: 'center' }}/>
                    <Column field="horarioTermino" body={this.horarioTerminoFormatadoTemplate} style={{ textAlign: 'center' }}/>
                    <Column field="tempoExecucao" style={{ textAlign: 'center' }}/>
                </DataTable>
            </Dialog>
        ];
    }

    urlTemplate(rowData, column){
        return <a href={rowData.url} target="_blank">{rowData.url}</a>
    }

    dataInicioTemplate(rowData, column) {
        return Utils.getDiaMesAnoFormatado(new Date(rowData.horarioInicio));
    }

    horarioInicioFormatadoTemplate(rowData, column) {
        return Utils.getHoraMinutoSegundoFormatado(new Date(rowData.horarioInicio));
    }

    horarioTerminoFormatadoTemplate(rowData, column) {
        return Utils.getHoraMinutoSegundoFormatado(new Date(rowData.horarioTermino));
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

    onHideDialog(event) {
        this.setState({ showDialog: false });
    }
}