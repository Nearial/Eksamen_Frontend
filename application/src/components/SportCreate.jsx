import { Col, Row, Container, Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import facade from "../facade";

export default function SportCreate() {
  const [sportN, setSportN] = useState("");
  const [sportD, setSportD] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const onChange = (event) => {
    if (event.target.id === "formN") {
      setSportN(event.target.value);
    }
    if (event.target.id === "formD") {
      setSportD(event.target.value);
    }
  };

  const processSport = (event) => {
    event.preventDefault();
    if (sportN !== "" && sportD !== "") {
      facade.addSport(sportN, sportD);
      setSuccess("Success, Sport Created!");
    } else {
      setError("One or Both informations missing!");
    }
  };

  return (
    <div>
      <Container className="sportContainer">
        <Row className="sportBox">
          <Col md={1}></Col>
          <Col md={10}>
            {" "}
            <Form onChange={onChange}>
              <Form.Group>
                <Form.Label>Sport Name</Form.Label>
                <Form.Control
                  id="formN"
                  placeholder="Enter a sport name"
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Sport Descritpion</Form.Label>
                <Form.Control
                  id="formD"
                  placeholder="Enter a description of the sport"
                  required
                />
              </Form.Group>

              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}

              <Button onClick={processSport} type="submit">
                Submit
              </Button>
            </Form>
          </Col>
          <Col md={1}></Col>
        </Row>
      </Container>
    </div>
  );
}
