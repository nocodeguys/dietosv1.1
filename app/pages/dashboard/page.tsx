import Link from 'next/link';

const Dashboard = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <nav>
        <ul className="space-y-2">
          <li>
            <Link href="/patients" className="text-blue-600 hover:underline">
              Patients
            </Link>
          </li>
          {/* Add more links to other modules here */}
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;
