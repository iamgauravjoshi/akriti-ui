import { useState } from "react";
import { Button, CloseButton } from "./common/Buttons/Buttons";
import {
  X,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  Loader2,
  ArrowRight,
  Download,
  Upload,
  Plus,
  Trash2,
  Edit,
  Save,
  Search,
  Send,
  Heart,
  Star,
  Settings,
} from "lucide-react";

// Demo Component
const ButtonDemo: React.FC = () => {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );
  const [clickCounts, setClickCounts] = useState<Record<string, number>>({});

  const handleButtonClick = (buttonId: string) => {
    // Simulate loading
    setLoadingStates((prev) => ({ ...prev, [buttonId]: true }));

    setTimeout(() => {
      setLoadingStates((prev) => ({ ...prev, [buttonId]: false }));
      setClickCounts((prev) => ({
        ...prev,
        [buttonId]: (prev[buttonId] || 0) + 1,
      }));
    }, 2000);
  };

  const handleCloseClick = () => {
    alert("Close button clicked!");
  };

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">
          Comprehensive Button Component
        </h1>
        <p className="text-lg text-gray-600">
          Modern, reusable buttons with multiple variants, intents, and features
        </p>
      </div>

      {/* Variants Section */}
      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold text-gray-900">
          Button Variants
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="text">Text Button</Button>
          <Button variant="link">Link Button</Button>
        </div>
      </div>

      {/* Intents Section */}
      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold text-gray-900">
          Button Intents
        </h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <Button intent="default">Default</Button>
            <Button intent="success">Success</Button>
            <Button intent="warning">Warning</Button>
            <Button intent="error">Error</Button>
            <Button intent="info">Info</Button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <Button variant="secondary" intent="default">
              Default
            </Button>
            <Button variant="secondary" intent="success">
              Success
            </Button>
            <Button variant="secondary" intent="warning">
              Warning
            </Button>
            <Button variant="secondary" intent="error">
              Error
            </Button>
            <Button variant="secondary" intent="info">
              Info
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <Button variant="outline" intent="default">
              Default
            </Button>
            <Button variant="outline" intent="success">
              Success
            </Button>
            <Button variant="outline" intent="warning">
              Warning
            </Button>
            <Button variant="outline" intent="error">
              Error
            </Button>
            <Button variant="outline" intent="info">
              Info
            </Button>
          </div>
        </div>
      </div>

      {/* Sizes Section */}
      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold text-gray-900">
          Button Sizes
        </h2>
        <div className="flex flex-wrap items-end gap-4">
          <Button size="xs">Extra Small</Button>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">Extra Large</Button>
        </div>
      </div>

      {/* Icons Section */}
      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold text-gray-900">
          Buttons with Icons
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Button leftIcon={<Download size={16} />}>Download</Button>
          <Button rightIcon={<ArrowRight size={16} />}>Continue</Button>
          <Button leftIcon={<Plus size={16} />}>Add Item</Button>
          <Button leftIcon={<Save size={16} />} intent="success">
            Save Changes
          </Button>
          <Button leftIcon={<Trash2 size={16} />} intent="error">
            Delete
          </Button>
          <Button leftIcon={<Edit size={16} />} variant="outline">
            Edit
          </Button>
          <Button leftIcon={<Search size={16} />} variant="ghost">
            Search
          </Button>
          <Button
            leftIcon={<Send size={16} />}
            rightIcon={<ArrowRight size={16} />}
          >
            Send Message
          </Button>
          <Button leftIcon={<Upload size={16} />} variant="secondary">
            Upload File
          </Button>
        </div>
      </div>

      {/* Loading States */}
      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold text-gray-900">
          Loading States
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Button
            loading={loadingStates.primary}
            onClick={() => handleButtonClick("primary")}
            loadingText="Processing..."
          >
            Primary Action{" "}
            {clickCounts.primary ? `(${clickCounts.primary})` : ""}
          </Button>
          <Button
            variant="secondary"
            loading={loadingStates.secondary}
            onClick={() => handleButtonClick("secondary")}
            loadingText="Saving..."
          >
            Save Changes{" "}
            {clickCounts.secondary ? `(${clickCounts.secondary})` : ""}
          </Button>
          <Button
            variant="outline"
            intent="success"
            loading={loadingStates.success}
            onClick={() => handleButtonClick("success")}
            loadingText="Submitting..."
          >
            Submit Form {clickCounts.success ? `(${clickCounts.success})` : ""}
          </Button>
        </div>
      </div>

      {/* Special Features */}
      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold text-gray-900">
          Special Features
        </h2>
        <div className="space-y-6">
          {/* Gradient Buttons */}
          <div>
            <h3 className="mb-3 text-lg font-medium text-gray-900">
              Gradient Buttons
            </h3>
            <div className="flex flex-wrap gap-4">
              <Button gradient>Primary Gradient</Button>
              <Button gradient intent="success">
                Success Gradient
              </Button>
              <Button gradient intent="warning">
                Warning Gradient
              </Button>
              <Button gradient intent="error">
                Error Gradient
              </Button>
              <Button gradient intent="info">
                Info Gradient
              </Button>
            </div>
          </div>

          {/* Rounded Variations */}
          <div>
            <h3 className="mb-3 text-lg font-medium text-gray-900">
              Rounded Variations
            </h3>
            <div className="flex flex-wrap gap-4">
              <Button rounded="none">No Radius</Button>
              <Button rounded="sm">Small Radius</Button>
              <Button rounded="md">Medium Radius</Button>
              <Button rounded="lg">Large Radius</Button>
              <Button rounded="full">Full Radius</Button>
            </div>
          </div>

          {/* Animations */}
          <div>
            <h3 className="mb-3 text-lg font-medium text-gray-900">
              Animation Effects
            </h3>
            <div className="flex flex-wrap gap-4">
              <Button animation="none">No Animation</Button>
              <Button animation="scale">Scale Effect</Button>
              <Button animation="glow">Glow Effect</Button>
              <Button animation="pulse">Pulse Effect</Button>
              <Button animation="bounce">Bounce Effect</Button>
            </div>
          </div>

          {/* Shadows */}
          <div>
            <h3 className="mb-3 text-lg font-medium text-gray-900">
              Shadow Variations
            </h3>
            <div className="flex flex-wrap gap-4">
              <Button shadow="none">No Shadow</Button>
              <Button shadow="sm">Small Shadow</Button>
              <Button shadow="md">Medium Shadow</Button>
              <Button shadow="lg">Large Shadow</Button>
              <Button shadow="xl">Extra Large Shadow</Button>
            </div>
          </div>

          {/* Full Width */}
          <div>
            <h3 className="mb-3 text-lg font-medium text-gray-900">
              Full Width Buttons
            </h3>
            <div className="space-y-3">
              <Button fullWidth>Full Width Primary</Button>
              <Button variant="outline" fullWidth>
                Full Width Outline
              </Button>
              <Button
                variant="secondary"
                fullWidth
                leftIcon={<Settings size={16} />}
              >
                Full Width with Icon
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Close Buttons */}
      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold text-gray-900">
          Close Buttons
        </h2>
        <div className="flex flex-wrap items-center gap-4">
          <CloseButton onClose={handleCloseClick} size="xs" />
          <CloseButton onClose={handleCloseClick} size="sm" />
          <CloseButton onClose={handleCloseClick} size="md" />
          <CloseButton onClose={handleCloseClick} size="lg" />
          <CloseButton onClose={handleCloseClick} size="xl" />
          <CloseButton onClose={handleCloseClick} intent="error" />
          <CloseButton onClose={handleCloseClick} variant="outline" />
        </div>
      </div>

      {/* Interactive Examples */}
      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold text-gray-900">
          Interactive Examples
        </h2>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Action Buttons */}
          <div className="rounded-xl bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-medium text-gray-900">
              Common Actions
            </h3>
            <div className="space-y-3">
              <Button
                fullWidth
                leftIcon={<Heart size={16} />}
                onClick={() => alert("Added to favorites!")}
              >
                Add to Favorites
              </Button>
              <Button
                fullWidth
                variant="outline"
                leftIcon={<Star size={16} />}
                onClick={() => alert("Added rating!")}
              >
                Rate this item
              </Button>
              <Button
                fullWidth
                variant="secondary"
                leftIcon={<Download size={16} />}
                onClick={() => alert("Download started!")}
              >
                Download File
              </Button>
            </div>
          </div>

          {/* Form Actions */}
          <div className="rounded-xl bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-medium text-gray-900">
              Form Actions
            </h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <Button
                  intent="success"
                  leftIcon={<CheckCircle size={16} />}
                  onClick={() => alert("Form submitted!")}
                >
                  Submit
                </Button>
                <Button variant="outline" onClick={() => alert("Form reset!")}>
                  Reset
                </Button>
              </div>
              <Button
                fullWidth
                variant="ghost"
                onClick={() => alert("Form cancelled!")}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Disabled States */}
      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold text-gray-900">
          Disabled States
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Button disabled>Disabled Primary</Button>
          <Button variant="secondary" disabled>
            Disabled Secondary
          </Button>
          <Button variant="outline" disabled>
            Disabled Outline
          </Button>
          <Button variant="ghost" disabled>
            Disabled Ghost
          </Button>
          <Button variant="text" disabled>
            Disabled Text
          </Button>
          <Button variant="link" disabled>
            Disabled Link
          </Button>
        </div>
      </div>

      {/* Feature Summary */}
      <div className="rounded-xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          Features Summary
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="mb-3 font-semibold text-gray-900">
              Button Variants
            </h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Primary - Main actions</li>
              <li>• Secondary - Secondary actions</li>
              <li>• Outline - Outlined style</li>
              <li>• Ghost - Minimal style</li>
              <li>• Text - Text-only style</li>
              <li>• Link - Link-like appearance</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 font-semibold text-gray-900">Intent Types</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Default - Standard styling</li>
              <li>• Success - Green theme</li>
              <li>• Warning - Yellow theme</li>
              <li>• Error - Red theme</li>
              <li>• Info - Blue theme</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 font-semibold text-gray-900">Features</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Loading states with spinners</li>
              <li>• Icon support (left/right)</li>
              <li>• Multiple sizes (xs to xl)</li>
              <li>• Gradient backgrounds</li>
              <li>• Custom animations</li>
              <li>• Full TypeScript support</li>
              <li>• Accessibility built-in</li>
              <li>• Responsive design</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonDemo;
