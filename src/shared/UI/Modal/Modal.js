import React from "react";
import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import { Button } from "react-bootstrap";

export default function Modal(props) {
  return (
    <>
      <MDBModal show={props.show} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>{`${props.onTitle}`}</MDBModalTitle>
            </MDBModalHeader>
            <MDBModalBody>{props.onData}</MDBModalBody>

            <MDBModalFooter>
              <Button onClick={() => props.setErrorFound(false)}>Close</Button>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
