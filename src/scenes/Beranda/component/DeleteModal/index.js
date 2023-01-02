import { HTMLAttributes } from "react";
import clsx from "clsx";
import { FiX } from "react-icons/fi";

export const DeleteModal = ({
  className,
  children,
  openModal,
  withCloseButton,
  datacy,
  close,
  title,
  ...props
}) => {
  return (
    <div
      data-cy="activity-item-delete-button"
      className={clsx(
        "fixed inset-0 z-10",
        openModal ? "pointer-events-auto" : "pointer-events-none",
        className
      )}
      {...props}
    >
      {/* overlay */}
      <div
        className={clsx(
          "absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity",
          openModal
            ? "opacity-100 duration-300 ease-out"
            : "opacity-0  duration-150 ease-in "
        )}
        onClick={close}
      />
      <div className="flex h-full w-full items-end justify-center p-4 sm:items-center sm:p-0">
        <div
          className={clsx(
            "w-full max-w-xl rounded-lg border border-neutral-50 bg-white p-4 shadow-xl",
            openModal
              ? "translate-y-0 opacity-100 duration-200 ease-in sm:scale-100"
              : "translate-y-4 opacity-0 duration-300 ease-out  sm:translate-y-0 sm:scale-95"
          )}
        >
          {withCloseButton && (
            <div className="flex justify-between w-full my-4">
              <label className="text-lg font-medium">{title}</label>
              <button className="ml-auto" onClick={close}>
                <FiX className="text-2xl text-gray-400" />
              </button>
            </div>
          )}
          {children}
        </div>
      </div>
        
    </div>
  );
};
