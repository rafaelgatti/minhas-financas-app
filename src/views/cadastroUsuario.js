import React from 'react'
import { withRouter } from 'react-router-dom'

import Card from '../components/card'
import FormGroup from '../components/form-group'

import UsuarioService from '../app/service/usuarioService'
import { mensagemErro, mensagemSucesso } from '../components/toastr'

class CadastroUsuario extends React.Component{
    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }

    constructor(){
        super();
        this.service = new UsuarioService();
    }

    cadastrar = () => {
        const {nome, email, senha, senhaRepeticao} = this.state;
        const usuario = {nome, email, senha, senhaRepeticao}

        try{
            this.service.validar(usuario)

        } catch (error){
            const msgs = error.mensagens
            msgs.forEach(msg => {
                mensagemErro(msg)
            })
            return false
        }

        this.service.cadastrar(usuario)
            .then(response => {
                mensagemSucesso('Usuário cadastrado com sucesso. Faça login para acessar o sistema.')
                this.props.history.push('/login')
            }).catch( error => {
                mensagemErro(error.response.data)
            })
    }

    cancelar = () => {
        this.props.history.push('/login')
    }

    render(){
        return(
            <Card title="Cadastro de usuário">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup label="Nome: *" htmlFor="inputNome">
                                <input type="text"  
                                        className="form-control" 
                                        id="inputNome" 
                                        name="nome" 
                                        onChange={e => this.setState({nome: e.target.value})} />
                            </FormGroup>

                            <FormGroup label="Email: *" htmlFor="inputEmail">
                                <input type="email"  
                                        className="form-control"
                                        id="inputEmail" 
                                        name="email" 
                                        onChange={e => this.setState({email: e.target.value})} />
                            </FormGroup>

                            <FormGroup label="Senha: *" htmlFor="inputSenha">
                                <input type="password"  
                                        className="form-control"
                                        id="inputSenha" 
                                        name="senha" 
                                        onChange={e => this.setState({senha: e.target.value})} />
                            </FormGroup>

                            <FormGroup label="Repita a Senha: *" htmlFor="inputRepitaSenha">
                                <input type="password"  
                                        className="form-control"
                                        id="inputRepitaSenha" 
                                        name="senha" 
                                        onChange={e => this.setState({senhaRepeticao: e.target.value})} />
                            </FormGroup>

                            <button onClick={this.cadastrar} 
                                    type="button" 
                                    className="btn btn-sm btn-success">
                                    <i className="pi pi-save"></i> Salvar</button>
                            
                            <button onClick={this.cancelar} 
                                    type="button" 
                                    className="btn btn-sm btn-danger">
                                    <i className="pi pi-times"></i> Cancelar</button>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter (CadastroUsuario)
