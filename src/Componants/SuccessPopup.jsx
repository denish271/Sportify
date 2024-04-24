import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

function SuccessPopup(props) {
  const [show, setShow] = useState();
  if (show) {
    return (
      <Alert
        variant="primary"
        className="position-absolute top-50 start-50 translate-middle-x"
      >
        <Alert.Heading>A Success Message!</Alert.Heading>
        <div className="text-center">{props.msg}</div>
        <div className="d-flex justify-content-center">
          <Button
            variant="outline-primary"
            className="mt-2"
            onClick={() => {
              setShow(false);
            }}
          >
            Close
          </Button>
        </div>
      </Alert>
    );
  }
}

export default SuccessPopup;
