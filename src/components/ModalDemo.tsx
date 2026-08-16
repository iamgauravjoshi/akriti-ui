import React, { useState } from "react";
import Modal from "./common/Modal/Modal";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ModalDemo: React.FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const openModal = (modalType: string) => setActiveModal(modalType);
  const closeModal = () => setActiveModal(null);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Form submitted successfully!");
    closeModal();
    setFormData({ name: "", email: "", message: "" });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">
          Comprehensive Modal Component
        </h1>
        <p className="text-lg text-gray-600">
          Modern, reusable modal with multiple types, sizes, and animations
        </p>
      </div>

      {/* Control Buttons */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <button
          onClick={() => openModal("basic")}
          className="rounded-lg bg-gray-600 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-gray-700"
        >
          Basic Modal
        </button>

        <button
          onClick={() => openModal("success")}
          className="rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-green-700"
        >
          Success Modal
        </button>

        <button
          onClick={() => openModal("warning")}
          className="rounded-lg bg-yellow-600 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-yellow-700"
        >
          Warning Modal
        </button>

        <button
          onClick={() => openModal("error")}
          className="rounded-lg bg-red-600 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-red-700"
        >
          Error Modal
        </button>

        <button
          onClick={() => openModal("info")}
          className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-blue-700"
        >
          Info Modal
        </button>

        <button
          onClick={() => openModal("large")}
          className="rounded-lg bg-purple-600 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-purple-700"
        >
          Large Modal
        </button>

        <button
          onClick={() => openModal("form")}
          className="rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-indigo-700"
        >
          Form Modal
        </button>

        <button
          onClick={() => openModal("slideUp")}
          className="rounded-lg bg-teal-600 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-teal-700"
        >
          Slide Up Animation
        </button>

        <button
          onClick={() => openModal("noClose")}
          className="rounded-lg bg-orange-600 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-orange-700"
        >
          No Outside Close
        </button>
      </div>

      {/* Feature List */}
      <div className="rounded-xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          Features Included
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-3 font-semibold text-gray-900">Modal Types</h3>
            <p className="text-sm leading-relaxed text-gray-600">
              Basic, Success, Warning, Error, and Info modals with appropriate
              icons and styling.
            </p>
          </div>
          <div>
            <h3 className="mb-3 font-semibold text-gray-900">Sizes</h3>
            <p className="text-sm leading-relaxed text-gray-600">
              Small, Medium, Large, Extra Large, and Full-width responsive
              sizes.
            </p>
          </div>
          <div>
            <h3 className="mb-3 font-semibold text-gray-900">Animations</h3>
            <p className="text-sm leading-relaxed text-gray-600">
              Fade, Scale, Slide Up, and Slide Down animations with smooth
              transitions.
            </p>
          </div>
          <div>
            <h3 className="mb-3 font-semibold text-gray-900">Interactions</h3>
            <p className="text-sm leading-relaxed text-gray-600">
              Close on outside click, ESC key, close button, with customizable
              behavior.
            </p>
          </div>
          <div>
            <h3 className="mb-3 font-semibold text-gray-900">Accessibility</h3>
            <p className="text-sm leading-relaxed text-gray-600">
              ARIA labels, keyboard navigation, focus management, and screen
              reader support.
            </p>
          </div>
          <div>
            <h3 className="mb-3 font-semibold text-gray-900">Customization</h3>
            <p className="text-sm leading-relaxed text-gray-600">
              Custom headers, footers, styling, and extensive prop
              configuration.
            </p>
          </div>
        </div>
      </div>

      {/* Basic Modal */}
      <Modal
        isOpen={activeModal === "basic"}
        onClose={closeModal}
        title="Basic Modal"
        type="basic"
        closeOnOutsideClick
      >
        <p className="text-gray-600">
          This is a basic modal with standard styling. It includes a close
          button, overlay click to close, and escape key functionality.
        </p>
      </Modal>

      {/* Success Modal */}
      <Modal
        isOpen={activeModal === "success"}
        onClose={closeModal}
        title="Operation Successful!"
        type="success"
        closeOnOutsideClick
        footer={
          <div className="flex justify-end space-x-3">
            <button
              onClick={closeModal}
              className="rounded-lg bg-green-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-green-700"
            >
              Continue
            </button>
          </div>
        }
      >
        <p className="text-gray-600">
          Your operation has been completed successfully. All changes have been
          saved and you can continue with your workflow.
        </p>
      </Modal>

      {/* Warning Modal */}
      <Modal
        isOpen={activeModal === "warning"}
        onClose={closeModal}
        title="Warning: Unsaved Changes"
        type="warning"
        closeOnOutsideClick
        footer={
          <div className="flex justify-end space-x-3">
            <button
              onClick={closeModal}
              className="rounded-lg bg-gray-300 px-4 py-2 text-gray-700 transition-colors duration-200 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={closeModal}
              className="rounded-lg bg-yellow-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-yellow-700"
            >
              Discard Changes
            </button>
          </div>
        }
      >
        <p className="text-gray-600">
          You have unsaved changes that will be lost if you continue. Are you
          sure you want to proceed without saving?
        </p>
      </Modal>

      {/* Error Modal */}
      <Modal
        isOpen={activeModal === "error"}
        onClose={closeModal}
        title="Error Occurred"
        type="error"
        // showCloseButton={false}
        closeOnOutsideClick
        footer={
          <div className="flex justify-end space-x-3">
            <button
              onClick={closeModal}
              className="cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
            >
              Cancel
            </button>
            <button
              onClick={closeModal}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
            >
              Try Again
            </button>
          </div>
        }
      >
        <p className="text-gray-600">
          An unexpected error occurred while processing your request. Please try
          again or contact support if the problem persists.
        </p>
      </Modal>

      {/* Info Modal */}
      <Modal
        isOpen={activeModal === "info"}
        onClose={closeModal}
        title="Information"
        type="info"
        closeOnOutsideClick
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            This modal provides additional information about the current process
            or feature you're using.
          </p>
          <div className="rounded-lg bg-blue-50 p-4">
            <h4 className="mb-2 font-medium text-blue-900">Pro Tip:</h4>
            <p className="text-sm text-blue-700">
              You can customize every aspect of this modal component including
              animations, sizes, types, and behaviors.
            </p>
          </div>
        </div>
      </Modal>

      {/* Large Modal */}
      <Modal
        isOpen={activeModal === "large"}
        onClose={closeModal}
        title="Large Modal Example"
        size="xl"
        type="basic"
        closeOnOutsideClick
      >
        <div className="space-y-6">
          <p className="text-gray-600">
            This is a large modal that can contain more content. It's perfect
            for detailed forms, complex information, or multi-step processes.
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-lg bg-gray-50 p-4">
              <h4 className="mb-2 font-medium text-gray-900">Feature 1</h4>
              <p className="text-sm text-gray-600">
                Responsive design that works perfectly on all device sizes from
                mobile to desktop.
              </p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <h4 className="mb-2 font-medium text-gray-900">Feature 2</h4>
              <p className="text-sm text-gray-600">
                TypeScript interfaces for better development experience and type
                safety.
              </p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <h4 className="mb-2 font-medium text-gray-900">Feature 3</h4>
              <p className="text-sm text-gray-600">
                Framer Motion animations for smooth and attractive user
                interactions.
              </p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <h4 className="mb-2 font-medium text-gray-900">Feature 4</h4>
              <p className="text-sm text-gray-600">
                Customizable styling with Tailwind CSS classes and configuration
                options.
              </p>
            </div>
          </div>
        </div>
      </Modal>

      {/* Form Modal */}
      <Modal
        isOpen={activeModal === "form"}
        onClose={closeModal}
        title="Contact Form"
        type="basic"
        size="lg"
        closeOnOutsideClick={false}
        footer={
          <div className="flex justify-end space-x-3">
            <button
              onClick={closeModal}
              className="rounded-lg bg-gray-300 px-4 py-2 text-gray-700 transition-colors duration-200 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleFormSubmit}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-indigo-700"
            >
              Submit
            </button>
          </div>
        }
      >
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 transition-colors duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 transition-colors duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 transition-colors duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your message"
              required
            />
          </div>
        </form>
      </Modal>

      {/* Slide Up Animation Modal */}
      <Modal
        isOpen={activeModal === "slideUp"}
        onClose={closeModal}
        title="Slide Up Animation"
        animation="slideUp"
        type="info"
        closeOnOutsideClick
      >
        <p className="text-gray-600">
          This modal uses a slide up animation instead of the default scale
          animation. You can choose from fade, scale, slideUp, or slideDown
          animations.
        </p>
      </Modal>

      {/* No Outside Close Modal */}
      <Modal
        isOpen={activeModal === "noClose"}
        onClose={closeModal}
        title="Modal with Restricted Closing"
        closeOnOutsideClick={false}
        type="warning"
        footer={
          <div className="flex justify-end">
            <button
              onClick={closeModal}
              className="rounded-lg bg-orange-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-orange-700"
            >
              Close Modal
            </button>
          </div>
        }
      >
        <p className="text-gray-600">
          This modal cannot be closed by clicking outside or pressing the escape
          key. You must use the close button or the button in the footer to
          close it.
        </p>
      </Modal>
    </div>
  );
};

export default ModalDemo;
