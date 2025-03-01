import { useAuth } from "../contexts/AuthContext";
import { Button } from "../Components/ui/button";
// import { useEffect } from "react";

export default function Dashboard() {
  const { logout, user, isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return null // or a loading indicator
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent to-primary/20 p-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Button onClick={logout}>Logout</Button>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Welcome to Nabrah</h2>
          <p className="text-gray-600">
            This is your dashboard. Start managing your AI-powered customer
            service.
          </p>
          {user && (
            <p className="mt-4 text-sm text-gray-500">
              User token: {user.token}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
