import { useState } from "react";
import { Button, Input, Modal, Textarea } from "..";

export default function ModalDemo() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const close = () => setActiveModal(null);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="mb-2 text-3xl font-bold">Modal / Dialog</h1>
        <p className="text-muted-foreground">
          Built on Radix Dialog: focus trap, portal, Escape, and overlay click. Modal is a
          styled wrapper with semantic types and confirm actions.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Button variant="secondary" onClick={() => setActiveModal("basic")}>
          Basic
        </Button>
        <Button intent="success" onClick={() => setActiveModal("success")}>
          Success
        </Button>
        <Button intent="warning" onClick={() => setActiveModal("warning")}>
          Warning
        </Button>
        <Button intent="danger" onClick={() => setActiveModal("error")}>
          Error
        </Button>
        <Button intent="info" onClick={() => setActiveModal("info")}>
          Info
        </Button>
        <Button onClick={() => setActiveModal("large")}>Large</Button>
        <Button variant="outline" onClick={() => setActiveModal("form")}>
          Form
        </Button>
        <Button variant="outline" onClick={() => setActiveModal("locked")}>
          Restricted close
        </Button>
      </div>

      <Modal isOpen={activeModal === "basic"} onClose={close} title="Basic Modal">
        <p className="text-muted-foreground">
          Close with the button, overlay click, or Escape. Focus returns to the trigger.
        </p>
      </Modal>

      <Modal
        isOpen={activeModal === "success"}
        onClose={close}
        title="Operation successful"
        type="success"
        onConfirm={close}
        confirmText="Continue"
      >
        <p className="text-muted-foreground">Your changes were saved.</p>
      </Modal>

      <Modal
        isOpen={activeModal === "warning"}
        onClose={close}
        title="Unsaved changes"
        type="warning"
        onCancel={close}
        onConfirm={close}
        cancelText="Keep editing"
        confirmText="Discard"
      >
        <p className="text-muted-foreground">Unsaved changes will be lost.</p>
      </Modal>

      <Modal
        isOpen={activeModal === "error"}
        onClose={close}
        title="Error occurred"
        type="error"
        onCancel={close}
        onConfirm={close}
        confirmText="Try again"
      >
        <p className="text-muted-foreground">The request could not be completed.</p>
      </Modal>

      <Modal
        isOpen={activeModal === "info"}
        onClose={close}
        title="Information"
        type="info"
      >
        <p className="text-muted-foreground">
          Modals use design tokens, so they follow light and dark themes.
        </p>
      </Modal>

      <Modal isOpen={activeModal === "large"} onClose={close} title="Large modal" size="xl">
        <p className="text-muted-foreground">
          Use larger sizes for dense content. Avoid full-app layouts inside a dialog.
        </p>
      </Modal>

      <Modal
        isOpen={activeModal === "form"}
        onClose={close}
        title="Contact"
        type="form"
        size="lg"
        closeOnOutsideClick={false}
        onCancel={close}
        onConfirm={close}
        confirmText="Submit"
      >
        <div className="space-y-4">
          <Input
            name="name"
            placeholder="Full name"
            value={formData.name}
            onChange={(event) =>
              setFormData((prev) => ({ ...prev, name: event.target.value }))
            }
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={(event) =>
              setFormData((prev) => ({ ...prev, email: event.target.value }))
            }
          />
          <Textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={(event) =>
              setFormData((prev) => ({ ...prev, message: event.target.value }))
            }
          />
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === "locked"}
        onClose={close}
        title="Restricted closing"
        type="warning"
        closeOnOutsideClick={false}
        closeOnEscape={false}
        onConfirm={close}
        confirmText="Close modal"
      >
        <p className="text-muted-foreground">
          Overlay click and Escape are disabled. Confirm is required.
        </p>
      </Modal>
    </div>
  );
}
