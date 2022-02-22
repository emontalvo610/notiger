import * as Dialog from "@radix-ui/react-dialog";
import { Fragment, ReactNode, useState } from "react";
import { Transition } from "@headlessui/react";
import Button from "./Button";
import cx from "classnames";
import { HiX } from "react-icons/hi";

interface IModalProps {
  title?: string;
  children: ReactNode;
  closable?: boolean;
  triggerText: string;
}

const Modal = ({
  title,
  children,
  closable = true,
  triggerText,
}: IModalProps): JSX.Element => {
  const [isOpen, toggleOpen] = useState<boolean>(false);

  return (
    <Dialog.Root onOpenChange={toggleOpen} open={isOpen}>
      <Dialog.Trigger asChild>
        <Button>Open Dialog</Button>
      </Dialog.Trigger>
      <Transition.Root show={isOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay
            forceMount
            className="fixed inset-0 z-20 bg-gray-900/60"
          />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Content
            className={cx(
              "fixed z-50",
              "w-[95vw] max-w-md rounded-lg p-4 md:w-full",
              "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
              "bg-gray-900",
              "focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-60"
            )}
          >
            <Dialog.Title className="mb-4 text-lg font-semibold text-gray-100">
              {title}
            </Dialog.Title>
            {children}
            {closable && (
              <Dialog.Close
                className={cx(
                  "absolute top-4 right-4 inline-flex items-center justify-center rounded-full p-1",
                  "focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-60"
                )}
              >
                <HiX className="h-4 w-4 text-gray-500 hover:opacity-60" />
              </Dialog.Close>
            )}
          </Dialog.Content>
        </Transition.Child>
      </Transition.Root>
    </Dialog.Root>
  );
};

export default Modal;
