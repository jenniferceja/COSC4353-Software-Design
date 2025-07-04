import PrimaryButton from "../components/Buttons";
import Field from "../components/Field";

export default function EmailVerification() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center text-secondary">
        {/* Inline SVG Email Icon */}
        <div className="w-30 h-30 mb-4 text-black-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-full h-full"
          >
            <path d="M22 4H2a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h20a2 2 0 0 0 2-2V6c0-1.1-.9-2-2-2ZM2 6h20l-10 7L2 6Zm0 12V8l10 7 10-7v10H2Z" />
          </svg>
        </div>

        <h1 className="text-3xl font-semibold mb-6">Verify Your Email!</h1>

        <p className="text-2xl text-center mb-12">
          Please, enter the code that was sent to your email.
        </p>

        <div className="w-full max-w-sm mb-20 text-xl">
          <Field
            label="Verification Code"
            name="code"
            type="text"
            placeholder="Enter code"
            required
          />
        </div>

        <div className="mt-6 mb-6 w-full max-w-sm text-xl flex flex-col items-center space-y-3">
          <PrimaryButton>Verify</PrimaryButton>

          <p className="text-md text-gray-600">
            Didn't receive code?{" "}
            <a href="#" className="text-blue-500 underline hover:text-blue-700">
              Resend
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
