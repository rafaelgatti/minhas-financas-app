import React from 'react'
import AuthService from '../app/service/authService';
import NavbarItem from './navbarItem'
import { AuthConsumer } from '../main/provedorAutenticacao'

const deslogar = () => {
    AuthService.removerUsuarioAutenticado();
}

const isUsuarioAutenticado = () => {
    return AuthService.isUsuarioAutenticado();
}

function Navbar(props) {

    return (
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
            <div className="container">
                <a href="https://bootswatch.com/" className="navbar-brand">Minhas Finanças</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav">
                        <NavbarItem render={props.isUsuarioAutenticado} href="#/home" label="Home" />
                        <NavbarItem render={isUsuarioAutenticado()} href="#/cadastro-usuarios" label="Usuários" />
                        <NavbarItem render={isUsuarioAutenticado()} href="#/consulta-lancamentos" label="Lançamentos" />
                        <NavbarItem render={isUsuarioAutenticado()} href="#/login" label="Sair" onClick={props.deslogar} />
                    </ul>

                </div>
            </div>
        </div>
    )
}

export default () => (
    <AuthConsumer>
        { (context) => (
            <Navbar isUsuarioAutenticado={context.isAutenticado} deslogar={context.encerrarSessao} />
        )}
    </AuthConsumer>
)