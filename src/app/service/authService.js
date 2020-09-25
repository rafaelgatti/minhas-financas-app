import LocalStorageService from "./localStorageService";

export const USUARIO_LOGADO = '_usuario_logado'

export default class AuthService {
    
    static isUsuarioAutenticado (){
        const usuarioLogado = LocalStorageService.getItem(USUARIO_LOGADO)

        return usuarioLogado && usuarioLogado.id;
    }

    static removerUsuarioAutenticado () {
        LocalStorageService.removerItem(USUARIO_LOGADO)
    }

    static logar(usuario) {
        LocalStorageService.additem(USUARIO_LOGADO, usuario)
    }

    static obterUsuarioAutenticado() {
        return LocalStorageService.getItem(USUARIO_LOGADO)
    }
}