import { Button } from "./styles/Button.style";
import { useState } from "react";

export default function Modal() {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button onClick={() => setShow(true)}>Sign up</Button>
      <Modal show={show} onHide={() => setShow(false)}>
        <p>Hello</p>
      </Modal>
    </>
  );
}
