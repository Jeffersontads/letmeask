import firebase from "firebase";
import { createContext, ReactNode, useEffect, useState } from "react"
import { auth } from "../services/firebase";
//precisamos criar as tipagens tipos de informacoes que teremos em nosso contexto (type script tipagem)
type User = {
    id: string;
    name: string;
    avatar: string;
  }
  
  type AuthContextType = {
    user: User | undefined; //user do tipo object criado acima
    signWithGoogle: () =>Promise<void>; // um funcao  que nao retorna nada promessa pois estou usando async
  }

export const AuthContext = createContext({} as AuthContextType);

type AuthContextProviderProps = {
    children: ReactNode ;
} 


export function AuthContextProvider (props: AuthContextProviderProps) {
    const [user, setUser] = useState<User>();
    //chama a funcao useEffect e ela recebe 2 parametros que eu quero usar e quando eu quero executar segundo parametro sempre sera um vetor array
    //toda vez que declaramos um eventlistener no react no caso USEEFECT eh 
    //recomendado que salvemos em uma variavel este event listener para que seja possivel desligar parar esse evento 
      useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user=>{
          if( user ) {
            const {displayName, photoURL, uid} = user
    
            if (!displayName || !photoURL) {
              throw new Error("Missing information from google Account");
            }
    
            setUser({
              id: uid,
              name: displayName,
              avatar: photoURL
            })
          }
        })
    //Assim este retorno ira me descadastrar de todos os eventos que eu me cadastrei sempre temos que fazer decadastrar de algum event listener
        return () => {
          unsubscribe();
        }
      }, []) 
    
      async function signWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
    
        const result = await auth.signInWithPopup(provider);
    //quero que abra como um popup para fazer o login do google e nao redirecione para o google e depois volte para a aplicacao
            
            if (result.user) {
              const {displayName, photoURL, uid} = result.user
    
              if (!displayName || !photoURL) {
                throw new Error("Missing information from google Account");
              }
    
              setUser({
                id: uid,
                name: displayName,
                avatar: photoURL
              })
            }
          }
    return(
        <AuthContext.Provider value={{user, signWithGoogle}}> 
            {props.children}
        </AuthContext.Provider>
    );
}