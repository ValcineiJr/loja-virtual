/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { ReactNode } from 'react';

import Link from 'next/link';

import { Modal } from 'react-responsive-modal';

import { AiOutlineCloseCircle } from 'react-icons/ai';

import { Container } from './styles';
import 'react-responsive-modal/styles.css';

type CustomModal = {
  open: boolean;
  children: ReactNode;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CustomModal = ({ open, setOpen, children }: CustomModal) => {
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        styles={{
          modal: { overflow: `visible` },
        }}
        onClose={onCloseModal}
        showCloseIcon={false}
        center
      >
        <Container>
          <button onClick={onCloseModal} className="close">
            <AiOutlineCloseCircle />
          </button>
          {children}
        </Container>
      </Modal>
    </div>
  );
};

export default CustomModal;
