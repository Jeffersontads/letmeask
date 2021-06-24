import firebase from "firebase";
import { createContext, useState, useEffect } from "react";
import { BrowserRouter,Route } from "react-router-dom"; 
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { auth } from "./services/firebase";

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

function App() {
  const [user, setUser] = useState<User>();
//chama a funcao useEffect e ela recebe 2 parametros que eu quero usar e quando eu quero executar segundo parametro sempre sera um vetor array
  useEffect(() => {
    auth.onAuthStateChanged(user=>{
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

  return (

    <BrowserRouter>
      <AuthContext.Provider value={{user, signWithGoogle}}> 
      <Route path="/" exact component={Home}/> 
      <Route path="/rooms/new" component={NewRoom}/> 
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
