import {Link, useHistory} from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';

import {FormEvent} from 'react';

// import { useAuth } from '../hooks/useAuth';

import '../styles/auth.scss'
import { useState } from 'react';
import { database } from '../services/firebase';
import userEvent from '@testing-library/user-event';
import { useAuth } from '../hooks/useAuth';

export function NewRoom() {
     const {user} = useAuth();
     const history = useHistory();

    //aqui vou pegar o valor do input que esta sendo digitado, para isso basta criar um estado
    const [newRoom, setNewRoom] = useState('');

    //funcao que realmente vai criar as salas
    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();
        
        if (newRoom.trim() === '') { // verifica se algo foi digitado e se nao tem espacos
            return; //caso o valor seja vazio porque nao quero uma sla sem nome
        }

        const roomRef = database.ref('rooms'); //reference é uma referencia para um registro no banco. la dentro do meu banco eu vou ter uma categoria Rooms passo salvar qualquer coisa aqui
        // to pegando dentro do banco de dados de uma referencia chamada ROOMS e jogando dentro dela informacoes
        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        }); 

        //redireciona o user para a sala criada
        history.push(`/rooms/${firebaseRoom.key}`)
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Imagem de Ilustracao pagina home" />
                <strong>Crie salas de Q&amp;A ao vivo </strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="logotipo da empresa letmeask" />
                    
                    <h2>Cria uma nova sala</h2>
                <form onSubmit={handleCreateRoom}>
                    <input
                        type = "text"
                        placeholder = "Nome da sala"
                        onChange={event => setNewRoom(event.target.value)}
                        value = {newRoom}
                    />
                    <Button type="submit"> Criar sala </Button>
                </form>
                <p>Gostaria entrar em uma sala existente? <Link to="/">clique aqui</Link></p>
                </div>
            </main>
        </div>
    )
}