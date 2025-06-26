export default function VCDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">TrakStak Investor Dashboard</h1>
        <p className="text-xl text-gray-600 mb-12">The Future of Compliance Management</p>
        
        <div className="grid grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-green-600">$2.4M</h3>
            <p className="text-gray-600">Market Opportunity</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-blue-600">89%</h3>
            <p className="text-gray-600">Compliance Improvement</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-purple-600">67%</h3>
            <p className="text-gray-600">Time Savings</p>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6">🤖 Sandy AI: The Game Changer</h2>
          <p className="text-lg text-gray-600">AI-powered compliance that makes audits effortless</p>
        </div>
      </div>
    </div>
  )
}
