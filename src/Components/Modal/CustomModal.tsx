import { Modal } from "react-bootstrap";
import "./CustomModal.css";

interface CustomModalProps {
  modalShow: boolean;
  setModalShow: (modalShow: boolean) => void;
  children: React.ReactNode;
}

function CustomModal(props: CustomModalProps) {
  return (
    <Modal
      show={props.modalShow}
      onHide={() => props.setModalShow(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="custom-modal">{props.children}</Modal.Body>
    </Modal>
  );
}

export default CustomModal;
