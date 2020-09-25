import ApiService from '../apiservice'
import ErroValidacao from './exception/ErroValidacao';

class UsuarioService extends ApiService{
    constructor(){
        super('/api/usuarios')
    }
    autenticar(credentials){
        return this.post('/autenticar', credentials)
    }

    obterSaldoporusuario(id){
        return this.get(`/${id}/saldo`)
    }

    cadastrar(usuario){
        return this.post('/', usuario);
    }

    validar(usuario) {
        const erros = []

        if(!usuario.nome){
            erros.push('Preencha o campo Nome por favor!')
        }

        if(!usuario.email){
            erros.push('Preencha o campo Email por favor!')
        
        } else if(!usuario.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)){
            erros.push('Preencha um Email válido por favor!')
        }

        if(!usuario.senha || !usuario.senhaRepeticao){
            erros.push('Preencha os dois campos de Senha por favor!')
        
        } else if(usuario.senha !== usuario.senhaRepeticao){
            erros.push('As senhas digitadas devem ser iguais!')
        }

        if(erros && erros.length > 0){
            throw new ErroValidacao(erros)
        }
    }
}

export default UsuarioService;
