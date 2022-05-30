
export const isLogged = () => {

    // guarda na const o token do local storage formatado e retorna o token
    const userIsLogged = JSON.parse(window.localStorage.getItem('token'));

    return [userIsLogged];
};