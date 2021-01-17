import apiFacade from "./ApiFacade";

function SportFacade() {
  const addSport = (name, description) => {
    const body = {
      name: name,
      description: description,
    };

    const request = apiFacade.prepareRequest("POST", body);

    return apiFacade.submitRequest("/sport/create", request);
  };

  const getSports = () => {
    const request = apiFacade.prepareRequest("GET", null);

    return apiFacade.submitRequest("/sport/getSports", request);
  };

  return { addSport, getSports };
}

const sportFacade = SportFacade();
export default sportFacade;
