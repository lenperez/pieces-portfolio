import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EnlargedImage({ image, onClose, returnFocus }: {
  image: { image: string; title: string } | null;
  onClose: () => void;
  returnFocus: React.RefObject<HTMLElement | null>;
}) {
  return (
    <Dialog.Root open={image !== null} onOpenChange={(open) => { if (!open) onClose(); }}>
      {image && <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-scrim/80 backdrop-blur-sm" />
        <Dialog.Content
          aria-describedby={undefined}
          onCloseAutoFocus={(event) => { event.preventDefault(); returnFocus.current?.focus({ preventScroll: true }); }}
          className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center px-4 pb-4 pt-16 focus:outline-none"
        >
          <Dialog.Title className="sr-only">Enlarged image: {image.title}</Dialog.Title>
          <Dialog.Close asChild>
            <Button type="button" size="icon" aria-label="Close enlarged image" className="pointer-events-auto fixed right-4 top-4 z-10 h-11 w-11 rounded-full bg-background text-foreground hover:bg-primary hover:text-primary-foreground">
              <X aria-hidden="true" className="h-5 w-5" />
            </Button>
          </Dialog.Close>
          <img src={image.image} alt={image.title} className="pointer-events-auto block h-auto w-auto max-h-[calc(100dvh-5rem)] max-w-full object-contain" />
        </Dialog.Content>
      </Dialog.Portal>}
    </Dialog.Root>
  );
}