import React, { useRef } from "react";
import { useOnClickOutside } from "../../../hooks";

interface IModalProps {
  isModalOpen: Boolean;
  setIsModalOpen: Function;
  children?: React.ReactNode;
}

const Modal = ({ isModalOpen, setIsModalOpen, children }: IModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOutsideClicks = (event: MouseEvent) => {
    if (
      isModalOpen &&
      modalRef.current &&
      !modalRef.current.contains(event.target as any)
    ) {
      setIsModalOpen(false);
    }
  };

  useOnClickOutside(modalRef, handleOutsideClicks);

  return (
    <div
      tabIndex={-1}
      onBlur={() => setIsModalOpen(false)}
      className={` ${
        isModalOpen ? "flex" : "hidden"
      } overflow-y-auto backdrop-blur-sm overflow-x-hidden fixed top-0  flex justify-center right-0 left-0 z-50 w-full md:inset-0  md:h-full items-center`}
    >
      <div
        ref={modalRef}
        className="relative p-4 w-full max-w-md h-full md:h-auto"
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
