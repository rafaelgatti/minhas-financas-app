import React from 'react'
import Card from '../components/card'
import FormGroup from '../components/form-group'
import { withRouter } from 'react-router-dom'

import UsuarioService from '../app/service/usuarioService'
import LocalStorageService from '../app/service/localStorageService'
import { mensagemErro } from '../components/toastr'

import { Button } from 'primereact/button'
import { AuthContext } from '../main/provedorAutenticacao'

class Login extends React.Component{
    state = {
        email: '',
        senha: '',
        mensagemErro: null
    }
    constructor(){
        super();
        this.service = new UsuarioService();
    }

    entrar = () => {
        this.service.autenticar({
                email: this.state.email,
                senha: this.state.senha
            
            }).then( response => {

                console.log(response)
                LocalStorageService.additem('_usuario_logado', response.data)
                //this.context.iniciarSessao(response.data)
                this.props.history.push('/home')
                
            }).catch( erro => {
                console.log(erro)


                mensagemErro(erro.response.data)           
            })
    }

    prepareCadastrar = () => {
        this.props.history.push('/cadastro-usuarios')
    }

    render(){
        return(
            <div className="row">
                <div className="col-md-6" style={{position: 'relative', left: '300px'}}>
                    <div className="bs-docs-section">
                        <Card title="Login">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <fieldset>
                                            <FormGroup label="Email: *" htmlFor="exampleInputEmail1">
                                            <input type="email" 
                                                value={this.state.email} 
                                                onChange={e => this.setState({email: e.target.value})}
                                                className="form-control" 
                                                id="exampleInputEmail1" 
                                                aria-describedby="emailHelp" 
                                                placeholder="Digite o Email" />
                                            </FormGroup>
                                            <FormGroup label="Senha: *" htmlFor="exampleInputPassword1">
                                            <input type="password" 
                                                value={this.state.senha} 
                                                onChange={e => this.setState({senha: e.target.value})}
                                                className="form-control" 
                                                id="exampleInputPassword1" 
                                                placeholder="Password" />
                                            </FormGroup>
                                            {/* <button onClick={this.entrar} className="btn btn-sm btn-success">Entrar</button> */}
                                            {/* <button onClick={this.prepareCadastrar} className="btn btn-sm btn-danger">Cadastrar</button> */}
                                            <Button label="Acessar" 
                                                    icon="pi pi-user" 
                                                    iconPos="left" 
                                                    className="p-button-success p-button-sm" 
                                                    onClick={this.entrar} />

                                            <Button label="Cadastrar" 
                                                    icon="pi pi-plus" 
                                                    iconPos="left" 
                                                    className="p-button-danger p-button-sm" 
                                                    onClick={this.prepareCadastrar} />
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

Login.contextType = AuthContext

export default withRouter ( Login )
