import styled from "styled-components";

interface ControlledModalProps {
  shouldShow: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalBackground = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  overflow: auto;
  background-color: #000000;
  width: 100%;
  height: 100%;
`;

const ModalContent = styled.div`
  margin: 12% auto;
  padding: 24px;
  background-color: wheat;
  width: 50%;
`;

export const ControlledModal: React.FC<ControlledModalProps> = ({ 
  shouldShow, 
  onClose, 
  children 
}) => {
  // The component only renders based on the prop from parent
  return shouldShow ? (
    <ModalBackground onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}>Hide Modal</button>
        {children}
      </ModalContent>
    </ModalBackground>
  ) : null;
};