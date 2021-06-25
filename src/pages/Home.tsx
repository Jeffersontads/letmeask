 
 
import {useHistory} from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';

import '../styles/auth.scss'
import { useAuth } from '../hooks/useAuth';
import { FormEvent } from 'react';
import { useState } from 'react';
import { database } from '../services/firebase';


export function Home() {
    const history = useHistory(); // toda funcao que comeca com use sao hooks do react e todo hook tem que estar dentro do componente para que possa usar seu contexto
    const {user, signWithGoogle} = useAuth();
    const [roomCode, setRoomCode] = useState('');

   async function handleCreateRoom() {
        //se o user nao estiver autenticado chama o metodo criando para autenticacao
        if (!user) {
            await signWithGoogle();
        }
            history.push('/rooms/new'); //se ele tiver autenticado basta redirecionar nesta rota
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if (roomCode.trim() === '') {
            return;
        }
// vamos verificar se a sala que o user esta tentando acessar realmente existe mas nao vamos buscar a lista inteira de salas
        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if (!roomRef.exists()) {
            alert('Room does not exists!');
            return;
        }

        history.push(`/rooms/${roomCode}`);
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
                <form onSubmit={handleJoinRoom}>
                    <input
                        type = "text"
                        placeholder = "digite o código da sala"
                        onChange={event => setRoomCode(event.target.value)}
                        value = {roomCode}
                    />
                    <Button type="submit"> Entrar na sala </Button>
                </form>
                </div>
            </main>
        </div>
    )
}