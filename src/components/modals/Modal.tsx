"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactNode;
  footer?: React.ReactElement;
  actionLabel: string;
  secondaryAction?: () => void;
  disabled?: boolean;
  secondaryActionLabel?: string;
}
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModel, setShowModal] = useState(isOpen);
  useEffect(() => {
    setShowModal(isOpen);
  }, [setShowModal, isOpen]);
  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [setShowModal, disabled, onClose]);
  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, [onSubmit, disabled]);
  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }
    secondaryAction();
  }, [disabled, secondaryAction]);
  if (!isOpen) {
    return null;
  }
  return (
    <>
      <div
        className="
    flex justify-center items-center overflow-x-hidden overflow-y-hidden fixed
    inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70
    "
      >
        <div
          className="
        relative w-full md:4/6 lg:w-3/6 xl:w-2/5 
        my-6 mx-auto h-full lg:h-auto
        md:h-auto
        "
        >
          {/* content */}
          <div
            className={`
        translate duration-300 h-full 
        ${showModel ? "translate-y-0" : "translate-y-full"}
        ${showModel ? "opacity-100" : "opacity-0"}
        `}
          >
            <div
              className="
            translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg 
            relative flex flex-col w-full bg-white
             outline-none focus:outline-none
            "
            >
              {/* header */}
              <div
                className="
                flex items-center p-6 rounded-t justify-center
                relative border-b-[1px]
                "
              >
                <Button
                  className=" absolute left-9"
                  onClick={handleClose}
                  size="sm"
                  variant="outline"
                >
                  <X />
                </Button>
                <div className="text-lg font-semibold">{title}</div>
              </div>
              {/* body  */}
              <div className="relative p-6 flex-auto">{body}</div>
              {/* footer */}
              <div className="flex flex-col gap-2 p-6">
                <div className="flex flex-row items-center gap-4 w-full">
                  {secondaryActionLabel && secondaryAction && (
                    <Button
                      variant="outline"
                      label={secondaryActionLabel}
                      disabled={disabled}
                      onClick={handleSecondaryAction}
                    />
                  )}
                  <Button
                    label={actionLabel}
                    disabled={disabled}
                    onClick={handleSubmit}
                  />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
