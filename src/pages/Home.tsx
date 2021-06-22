import {useHistory} from 'react-router-dom';

import { auth, firebase } from '../services/firebase';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';

import '../styles/auth.scss'

export function Home() {
    const history = useHistory(); // toda funcao que comeca com use sao hooks do react e todo hook tem que estar dentro do componente para que possa usar seu contexto
    
    function handleCreateRoom() {

        const provider = new firebase.auth.GoogleAuthProvider();

        auth.signInWithPopup(provider).then(result => { //quero que abra como um popup para fazer o login do google e nao redirecione para o google e depois volte para a aplicacao
            console.log(result);

            history.push('/rooms/new');
            
        })

    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Imagem de Ilustracao pagina home" />
                <strong>Crie salas de Q&amp;A ao-vivo </strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="logotipo da empresa letmeask" />
                <button onClick={handleCreateRoom} className="create-room"> 
                <img src={googleIconImg} alt="Logo do Google" /> 
                Crie sua sala com o Google
                </button>

                <div className="separator">ou entre em uma sala</div>
                <form>
                    <input
                        type = "text"
                        placeholder = "digite o código da sala"
                    />
                    <Button type="submit"> Entrar na sala </Button>
                </form>
                </div>
            </main>
        </div>
    )
}