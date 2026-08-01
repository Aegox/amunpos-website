"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { RiCloseLine } from "@remixicon/react";

import { cn } from "@/lib/utils";

export const ModalRoot = DialogPrimitive.Root;
export const ModalTrigger = DialogPrimitive.Trigger;
export const ModalClose = DialogPrimitive.Close;
export const ModalPortal = DialogPrimitive.Portal;

export const ModalOverlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...rest }, forwardedRef) => {
  return (
    <DialogPrimitive.Overlay
      ref={forwardedRef}
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center overflow-y-auto bg-strong-950/32 p-4 backdrop-blur-[10px]",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className,
      )}
      {...rest}
    />
  );
});
ModalOverlay.displayName = "ModalOverlay";

export const ModalContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    overlayClassName?: string;
    showClose?: boolean;
  }
>(({ className, overlayClassName, children, showClose = true, ...rest }, forwardedRef) => {
  return (
    <ModalPortal>
      <ModalOverlay className={overlayClassName}>
        <DialogPrimitive.Content
          ref={forwardedRef}
          className={cn(
            "relative w-full max-w-[440px]",
            "rounded-20 bg-white-0 shadow-regular-md",
            "focus:outline-none",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            className,
          )}
          {...rest}
        >
          {children}
          {showClose && (
            <ModalClose asChild>
              <button
                aria-label="Cerrar"
                className={cn(
                  "absolute right-4 top-4 flex size-8 items-center justify-center rounded-lg text-sub-600",
                  "transition duration-200 ease-out hover:bg-weak-50 hover:text-strong-950",
                  "focus:outline-none focus-visible:shadow-button-important-focus",
                )}
              >
                <RiCloseLine className="size-5" />
              </button>
            </ModalClose>
          )}
        </DialogPrimitive.Content>
      </ModalOverlay>
    </ModalPortal>
  );
});
ModalContent.displayName = "ModalContent";

export function ModalHeader({ className, children, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("relative flex flex-col items-center gap-2 px-6 pb-2 pt-8 text-center", className)} {...rest}>
      {children}
    </div>
  );
}
ModalHeader.displayName = "ModalHeader";

export const ModalTitle = React.forwardRef<React.ComponentRef<typeof DialogPrimitive.Title>, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>>(
  ({ className, ...rest }, forwardedRef) => {
    return <DialogPrimitive.Title ref={forwardedRef} className={cn("text-title-h6 text-strong-950", className)} {...rest} />;
  },
);
ModalTitle.displayName = "ModalTitle";

export const ModalDescription = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...rest }, forwardedRef) => {
  return <DialogPrimitive.Description ref={forwardedRef} className={cn("text-paragraph-sm text-sub-600", className)} {...rest} />;
});
ModalDescription.displayName = "ModalDescription";

export function ModalBody({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-6 pb-6 pt-4", className)} {...rest} />;
}
ModalBody.displayName = "ModalBody";

export function ModalFooter({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center justify-center gap-1 border-t border-stroke-soft-200 px-6 py-4 text-paragraph-sm text-sub-600", className)} {...rest} />;
}
ModalFooter.displayName = "ModalFooter";

export {
  ModalRoot as Root,
  ModalTrigger as Trigger,
  ModalClose as Close,
  ModalPortal as Portal,
  ModalOverlay as Overlay,
  ModalContent as Content,
  ModalHeader as Header,
  ModalTitle as Title,
  ModalDescription as Description,
  ModalBody as Body,
  ModalFooter as Footer,
};

/*
  NOTA DE ADAPTACIÓN: el Header/Footer reales de AlignUI están pensados para
  modales con icono+título alineados a la izquierda y un footer con acciones
  a la derecha (flujos de confirmación). El modal de auth de amunpos es
  distinto: logo centrado, título centrado, y un pie con un link de "cambiar
  de flujo" (login↔registro) centrado — por eso Header/Footer aquí se
  adaptaron a diseño centrado en vez de copiar el layout izquierda/derecha
  original, manteniendo los mismos tokens de color/tipografía/espaciado.
*/
