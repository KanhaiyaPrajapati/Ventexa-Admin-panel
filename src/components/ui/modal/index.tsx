import { useRef, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  children: React.ReactNode;
  isFullscreen?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
  isFullscreen = false,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  // Prevent background scrolling
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const contentClasses = isFullscreen
    ? "w-full h-full"
    : "relative w-full bg-white dark:bg-gray-900 shadow-xl rounded-xl";

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center overflow-y-auto p-4 sm:p-6">
      {/* Backdrop */}
      {!isFullscreen && (
        <div
          className="fixed inset-0 h-full w-full bg-gray-900/50 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        ></div>
      )}

      {/* Modal Content */}
      <div
        ref={modalRef}
        className={`${contentClasses} ${className} z-10`}
        onClick={(e) => e.stopPropagation()}
      >
        <div>{children}</div>
      </div>
    </div>
  );
};