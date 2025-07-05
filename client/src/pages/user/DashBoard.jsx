import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">SmartServe</h2>
        <ul className="space-y-4">
          <li><button onClick={() => navigate('/dashboard/home')} className="text-gray-700 hover:text-blue-600">🏠 Dashboard Home</button></li>
          <li><button onClick={() => navigate('/dashboard/appointments')} className="text-gray-700 hover:text-blue-600">📅 Appointments</button></li>
          <li><button onClick={() => navigate('/dashboard/messages')} className="text-gray-700 hover:text-blue-600">💬 Messages</button></li>
          <li><button onClick={() => navigate('/dashboard/payments')} className="text-gray-700 hover:text-blue-600">💳 Payments</button></li>
          <li><button onClick={() => navigate('/dashboard/help')} className="text-gray-700 hover:text-blue-600">🤖 Help Assistant</button></li>
          <li><button onClick={() => navigate('/dashboard/profile')} className="text-gray-700 hover:text-blue-600">📝 Edit Profile</button></li>
          <li><button onClick={() => navigate('/login')} className="text-gray-700 hover:text-blue-600">🔑 Login</button></li>
          <li><button onClick={() => navigate('/signup')} className="text-gray-700 hover:text-blue-600">🆕 Sign Up</button></li>
          <li><button onClick={() => navigate('/logout')} className="text-red-500 hover:text-red-700">🚪 Logout</button></li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-3xl font-semibold mb-4">Welcome to Your Dashboard 👋</h1>

        {/* Appointment List */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Your Appointments</h2>
          <div className="bg-white p-4 rounded shadow">
            {/* Dummy appointment item */}
            <p>✅ Haircut with Ayesha - 6 July, 10:00 AM</p>
            <p>❌ Makeup with Priya - 5 July, Cancelled</p>
          </div>
        </section>

        {/* Smart Assistant */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Smart Assistant 🤖</h2>
          <div className="bg-white p-4 rounded shadow">
            <p>Ask me anything about your bookings or services!</p>
            <input
              type="text"
              placeholder="E.g. When is my next appointment?"
              className="mt-2 p-2 border w-full rounded"
            />
          </div>
        </section>
      </main>
    </div>
  );
}
