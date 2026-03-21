export const metadata = { title: "My Profile — BOCRA" };

export default function ProfilePage() {
  return (
    <div className="max-w-2xl">
      <h1 className="font-heading text-2xl font-bold text-bocra-navy mb-6">
        My Profile
      </h1>
      {/* TODO: User profile, data download (BDPA compliance), notification prefs */}
      <p className="text-gray-500">Coming soon.</p>
    </div>
  );
}
