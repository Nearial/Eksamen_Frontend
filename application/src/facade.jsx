import authFacade from "./helperFacades/AuthFacade";
import jokeFacade from "./helperFacades/JokeFacade";
import tokenFacade from "./helperFacades/TokenFacade";
import userFacade from "./helperFacades/UserFacade";
import sportFacade from "./helperFacades/SportFacade";

function Facade() {
  /** Auth related */
  const login = (username, password) => {
    return authFacade.login(username, password);
  };

  const logout = () => {
    authFacade.logout();
  };

  const isLoggedIn = () => {
    return authFacade.isLoggedIn();
  };

  const register = (username, password, firstname, lastname) => {
    return authFacade.register(username, password, firstname, lastname);
  };

  const isAdmin = () => {
    return authFacade.isAdmin();
  };

  /** User related */
  const getProfile = () => {
    let decodedToken = tokenFacade.getDecodedToken();
    let username = decodedToken.username;

    return lookupUser(username);
  };

  const lookupUser = (username) => {
    let token = tokenFacade.getToken();
    return userFacade.lookup(username, token);
  };

  const getAllUsers = () => {
    let token = tokenFacade.getToken();
    return userFacade.getAllUsers(token);
  };

  /** Joke related */
  const getJokes = () => {
    let token = tokenFacade.getToken();
    return jokeFacade.getRandomJokes(token);
  };

  /** Sport related */
  const getSports = () => {
    return sportFacade.getSports();
  };

  const addSport = (name, description) => {
    return sportFacade.addSport(name, description);
  };

  return {
    /** Auth related */
    login,
    logout,
    isLoggedIn,
    register,
    isAdmin,

    /** User related */
    getProfile,
    lookupUser,
    getAllUsers,

    /** Joke related */
    getJokes,

    /** Sport related */
    getSports,
    addSport,
  };
}

const facade = Facade();
export default facade;
