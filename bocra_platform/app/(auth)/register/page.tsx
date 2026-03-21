"use client";

// TODO: Wire up Firebase auth calls from @/lib/firebase
export default function RegisterPage() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h1 className="font-heading text-2xl font-bold text-bocra-navy mb-1">
          Create an account
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          Register to access BOCRA services
        </p>
        {/* TODO: Multi-step registration form */}
        <p className="text-center text-gray-400 text-sm">Coming soon.</p>
      </div>
    </div>
  );
}
