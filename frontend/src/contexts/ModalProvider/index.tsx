import React, { useState } from "react";
import Button from "../../components/Button";
import FormForgotPassword from "../../components/Form/FormForgotPassword";
import FormLogin from "../../components/Form/FormLogin";
import FormRegister from "../../components/Form/FormRegister";
import { ContextProps } from "../../types/ContextProps";
import { ModalProps } from "../../types/ModalProps";
import ModalContext from "../ModalContext";

import {
  Container,
  Modal,
  ModalHeader,
  Title,
  CloseButton,
  CloseIcon,
  SignOptions,
  OptionsButtons,
  GoogleIcon,
  TwitchIcon,
  DiscordIcon,
} from "./styles";

export const ModalProvider: React.FC = ({ children }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const defaultModalProps: ModalProps = {
    title: "Title",
    action: "register",
    closeModal: () => null,
    autoHide: true,
  };

  const [modalProps, setModalProps] = useState<ModalProps>(defaultModalProps);

  const { title, action, closeModal, autoHide } = modalProps;

  const closeModalHandler = () => {
    if (autoHide) {
      setModalOpen(false);
    }

    closeModal!();
  };

  const modalContextProps: ContextProps = {
    showModal: (props) => {
      setModalProps({ ...modalProps, ...props });
      setModalOpen(true);
    },
    hideModal: () => setModalOpen(false),
  };

  const handleOutsideClick = (e: any) => {
    if (e.target.id === "modal") setModalOpen(false);
  };

  return (
    <ModalContext.Provider value={modalContextProps}>
      {isModalOpen && (
        <Container id="modal" onClick={handleOutsideClick}>
          <Modal>
            <ModalHeader>
              <Title>{title}</Title>
              <CloseButton onClick={closeModalHandler}>
                <CloseIcon />
              </CloseButton>
            </ModalHeader>

            {action !== "forgot_password" && (
              <SignOptions>
                <OptionsButtons>
                  <Button background="#fff" color="#121721" borderColor="#fff">
                    <GoogleIcon /> Continuar com Google
                  </Button>
                  <Button
                    background="#4A5C82"
                    color="#fff"
                    borderColor="#4A5C82"
                  >
                    <DiscordIcon /> Continuar com Discord
                  </Button>
                  <Button
                    background="#252E41"
                    color="#fff"
                    borderColor="#252E41"
                  >
                    <TwitchIcon /> Continuar com Twitch
                  </Button>
                </OptionsButtons>

                <span>Ou</span>
              </SignOptions>
            )}

            {action === "login" && <FormLogin />}
            {action === "register" && <FormRegister />}
            {action === "forgot_password" && <FormForgotPassword />}
          </Modal>
        </Container>
      )}
      {children}
    </ModalContext.Provider>
  );
};
