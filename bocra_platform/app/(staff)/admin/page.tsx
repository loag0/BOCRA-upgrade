export const metadata = { title: "Admin Dashboard — BOCRA" };

export default function AdminPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-white mb-6">
        Dashboard
      </h1>
      {/* TODO: Application queue, complaint management, QoS analytics */}
      <p className="text-white/50">Coming soon.</p>
    </div>
  );
}
