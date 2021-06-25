import copyImg from '../assets/images/copy.svg';
import '../styles/room-code.scss';

type RoomCodeProps = {
    code: string;
}

export function RoomCode(props: RoomCodeProps) {
    //este funcao é usada aqui para que ao clicar no botao seja copiado o conteudo (navigator clipboard nao funciona browsers antigos)
    function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code);
}

    return(
        <button className="room-code" onClick={copyRoomCodeToClipboard}>
            <div>
                <img src={copyImg} alt="imagem do button codigo" />
            </div>
                    <span>Sala #{props.code}</span>
        </button>
    );
}