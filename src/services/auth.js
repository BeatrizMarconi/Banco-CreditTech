import api from "./api";

export const auth = ({email, password}) => {

    let token = '';



//     //if para gerar um token aleatorio e guardar no local storage e retornar true
//     if(userEmail === email && userPassword === password){
//         token= Math.random().toString(36);
//         window.localStorage.setItem('token', JSON.stringify(token));
//         return true;
//     }

//     //se não entrar no if, guarda no local storage o token vazio e retorna false
//     window.localStorage.setItem('token', JSON.stringify(token));
//     return false;
// };
}
export const isLogged = () => {

    // guarda na const o token do local storage formatado e retorna o token
    const userIsLogged = JSON.parse(window.localStorage.getItem('token'));

    return [userIsLogged];
};