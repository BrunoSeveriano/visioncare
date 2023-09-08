import React, { useEffect, useState, useCallback } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Button from "../button/Button";

interface ModalProps {
  isOpen?: boolean;
  title?: string;
  children?: React.ReactNode;
  customClass?: string;
  buttonText?: string;
  buttonTextTwo?: string;
  textColor?: string;
  onClose: () => void;
  isButtonDisabled?: boolean;
  isCloseIconVisible?: boolean;
}

const Modal = ({
  isOpen,
  title,
  children,
  customClass,
  onClose,
  buttonText,
  buttonTextTwo,
  textColor,
  isButtonDisabled,
  isCloseIconVisible = true,
}: ModalProps) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-blue-950/70">
      <div className="hidden xl:block">
        <div className="fixed  w-[40%] h-[7%] right-0 bottom-[45%] bg-[#007cc4]"></div>
        <div className="fixed  w-[40%] h-[7%] right-0 bottom-[35%] bg-[#007cc4]"></div>
        <div className="fixed  w-[40%] h-[7%] right-0 bottom-[25%] bg-[#007cc4]"></div>
      </div>
      <div className={`${customClass ? customClass : "w-700 mx-auto h-475"}`}>
        <div
          className={`translate duration-300 h-full 
          ${showModal ? "translate-y-0" : "translate-y-full"}
           ${showModal ? "opacity-100" : "opacity-0"}`}
        >
          <div className="translate border-0 rounded-3xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="p-6">
              <div className="pb-2 flex justify-between">
                <div className="mt-3 text-2xl ">{title}</div>
                {isCloseIconVisible && (
                  <div className="ml-4 text-1xl cursor-pointer">
                    <AiOutlineClose onClick={handleClose} />
                  </div>
                )}
              </div>
              {children}

              <div className="flex flex-col items-center mt-3">
                {!isButtonDisabled && (
                  <>
                    <Button
                      customClass="p-5 py-4 bg-carePurple font-bold text-white w-[85%] text-md mb-3 mr-8"
                      label={buttonTextTwo || ""}
                      customColor={textColor}
                    />
                    <Button
                      customClass="p-5 py-4 bg-carePurple font-bold text-white w-[85%] text-md mb-3 mr-8"
                      label={buttonText || ""}
                      customColor={textColor}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
