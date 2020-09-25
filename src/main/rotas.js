import React from 'react'

import { Route, Switch, HashRouter, Redirect} from 'react-router-dom'
import CadastroUsuario from '../views/cadastroUsuario'
import ConsultaLancamentos from '../views/lancamentos/consultaLancamentos'
import CadastroLancamentos from '../views/lancamentos/cadastroLancamentos'

import Home from '../views/home'
import Login from '../views/login'
import AuthService from '../app/service/authService'
import { AuthConsumer } from './provedorAutenticacao'

function RotaAutenticada ( {component: Component, isUsuarioAutenticado, ...props}) {
    return (
        <Route {...props} render={ (componentProps) => {
            
            if(AuthService.isUsuarioAutenticado()){
            //if(isUsuarioAutenticado){
                return (
                    <Component {...componentProps} />
                )
            } else{
                return (
                    <Redirect to={ { pathname: "/login", state: { from: componentProps.location } } } />
                )
            }
        }} />
    )
}

function Rotas(props){
    return(
        <HashRouter>
            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuarios" component={CadastroUsuario} />
                
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/consulta-lancamentos" component={ConsultaLancamentos} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastro-lancamentos/:id?" component={CadastroLancamentos} />
            </Switch>
        </HashRouter>
    )
}

export default () => (
    <AuthConsumer>
        { (context) => (<Rotas isUsuarioAutenticado={context.isAutenticado} />) }
    </AuthConsumer>
)