export const auth = ({email, password}) => {

    const userEmail = 'teste@teste.com';
    const userPassword = 1234;
    let token = '';

    //if para gerar um token aleatorio e guardar no local storage e retornar true
    if(userEmail === email && userPassword === password){
        token.match.random().toString(36);
        window.localStorage.setItem('token', JSON.stringify(token));
        return true;
    }

    //se não entrar no if, guarda no local storage o token vazio e retorna false
    window.localStorage.setItem('token', JSON.stringify(token));
    return false;
};

export const isLogged = () => {

    // guarda na cost o token do local storage formatado e retorna o token
    const userIsLogged = JSON.parse(window.localStorage.getItem('token'));

    return [userIsLogged];
};