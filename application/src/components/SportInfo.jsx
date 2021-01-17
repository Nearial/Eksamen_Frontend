import { useEffect, useState } from "react";
import facade from "../facade";
import { Alert } from "react-bootstrap";

export default function SportInfo() {
  const [getSports, setSports] = useState("Loading...");
  const [error, setError] = useState(null);

  useEffect(() => {
    facade
      .getSports()
      .then((sports) => {
        setSports(
          sports.map((sport) => {
            return (
              <li key={sport.name + sport.description}>
                {sport.name} - {sport.description}
              </li>
            );
          })
        );
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => setError(e.message));
        }

        setError("An error occurred while processing your request.");
      });
  }, [setSports]);

  return (
    <div>
      <h2>Sports Info</h2>
      {error ? (
        <>{error && <Alert variant="danger">{error}</Alert>}</>
      ) : (
        <>
          <ul>{getSports}</ul>
        </>
      )}
    </div>
  );
}
