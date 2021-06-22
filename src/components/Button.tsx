import { ButtonHTMLAttributes } from 'react';
import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>
export function Button(props: ButtonProps) {
return (
    ////todas as propriedades que eu receber eu passo para este botao por isso o uso de PROPS estred operator {...props}
    <button className="button" {...props} />
)
}
 