import React from 'react'
import { withRouter } from 'react-router-dom'
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

import LancamentoService from '../../app/service/lancamentoService';
import LocalStorageService from '../../app/service/localStorageService';

import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import SelectMenu from '../../components/selectMenu'
import { mensagemErro } from '../../components/toastr';
import TableLancamentos from './lancamentosTable'

import * as messages from '../../components/toastr'

class ConsultaLancamentos extends React.Component {

    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        showConfirmDialog: false,
        lancamentoDeletar: {},
        lancamentos: []
    }

    constructor() {
        super();
        this.service = new LancamentoService();
    }

    buscar = () => {
        if (!this.state.ano) {
            messages.mensagemErro('Informe o ano por favor!')
            return false
        }

        const usuarioLogado = LocalStorageService.getItem('_usuario_logado');

        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            descricao: this.state.descricao,
            usuario: usuarioLogado.id
        }

        this.service
            .consultar(lancamentoFiltro)
            .then(response => {
                const lista = response.data;

                if(lista.length < 1){
                    messages.mensagemAlerta('Nenhum resultado encontrado!')
                }
                this.setState({ lancamentos: lista })

            }).catch(error => {
                mensagemErro(error.data)
            })
    }

    editar = (id) => {
        this.props.history.push(`/cadastro-lancamentos/${id}`)
    }

    abrirConfirmacao = (lancamento) => {
        this.setState({showConfirmDialog: true, lancamentoDeletar: lancamento})
    }

    cancelaDelecao = () => {
        this.setState({showConfirmDialog: false, lancamentoDeletar: {} })
    }

    remover = () => {
        this.service
            .deletar(this.state.lancamentoDeletar.id)
            .then(response => {
                const lancamentos = this.state.lancamentos;
                const index = lancamentos.indexOf(this.state.lancamentoDeletar);
                lancamentos.splice(index, 1)
                this.setState({lancamentos: lancamentos, showConfirmDialog: false})

                messages.mensagemSucesso('Lançamento removido com sucesso!')
            }).catch(error => {
                messages.mensagemErro('Não foi possível remover o lançamento!')
            })
    }

    preparaFormCadastro = () => {
        this.props.history.push('/cadastro-lancamentos')
    }

    alterarStatus = (lancamento, status) => {
        this.service
            .modificaStatus(lancamento.id, status)
            .then( response => {
                const lancamentos = this.state.lancamentos;
                const index = lancamentos.indexOf(lancamento);

                if(index !== -1){
                    lancamento['status'] = status;
                    lancamentos[index] = lancamento;
                    this.setState({lancamento})
                }
                messages.mensagemSucesso('Status atualizado com sucesso!')
            }).catch(erro => {

            })
    }

    render() {
        const meses = this.service.montaListaMeses();
        const tipos = this.service.montaListaTipos();

        const confirmDialogFooter = (
            <div>
                <Button label="Sim" icon="pi pi-check" onClick={this.remover} />
                <Button label="Não" icon="pi pi-times" className="p-button-secondary" onClick={this.cancelaDelecao} />
            </div>
        );

        return (
            <Card title="Consulta Lançamentos">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="bs-component">
                            <FormGroup label="Ano: *" htmlFor="inputAno">
                                <input type="text"
                                    className="form-control"
                                    id="inputAno"
                                    name="ano"
                                    placeholder="Digite o Ano"
                                    value={this.state.ano}
                                    onChange={e => this.setState({ ano: e.target.value })} />
                            </FormGroup>

                            <FormGroup label="Mês: " htmlFor="inputMes">
                                <SelectMenu className="form-control"
                                    id="inputMes"
                                    value={this.state.mes}
                                    lista={meses}
                                    onChange={e => this.setState({ mes: e.target.value })} />
                            </FormGroup>

                            <FormGroup label="Descrição: " htmlFor="inputDescricao">
                                <input type="text"
                                    className="form-control"
                                    id="inputDescricao"
                                    name="ano"
                                    placeholder="Digite a descrição"
                                    value={this.state.descricao}
                                    onChange={e => this.setState({ descricao: e.target.value })} />
                            </FormGroup>

                            <FormGroup label="Tipo de Lançamento: " htmlFor="inputTipo">
                                <SelectMenu className="form-control"
                                    id="inputTipo"
                                    value={this.state.tipo}
                                    lista={tipos}
                                    onChange={e => this.setState({ tipo: e.target.value })} />
                            </FormGroup>

                            <button onClick={this.buscar} 
                                    type="button" 
                                    className="btn btn-sm btn-success">
                                    <i className="pi pi-search"></i> Buscar
                            </button>
                            
                            <button onClick={this.preparaFormCadastro} 
                                    type="button" 
                                    className="btn btn-sm btn-danger">
                                    <i className="pi pi-plus"></i> Cadastrar
                            </button>
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <TableLancamentos lancamentos={this.state.lancamentos}
                                deleteAction={this.abrirConfirmacao}
                                editAction={this.editar} 
                                alterarStatus={this.alterarStatus} />
                        </div>
                    </div>
                </div>
                <div>
                    <Dialog header="Header" 
                            visible={this.state.showConfirmDialog} 
                            style={{ width: '50vw' }} 
                            modal={true} 
                            footer={confirmDialogFooter} 
                            onHide={() => this.setState( {showConfirmDialog: false} )} >
                        <p>Confirmar a exclusão desse lançamento?</p>
                    </Dialog>
                </div>
            </Card>
        )
    }
}

export default ConsultaLancamentos;