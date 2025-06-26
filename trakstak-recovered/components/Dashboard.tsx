"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ParticipantTrak } from '@/components/traks/ParticipantTrak'
import { VoiceTrak } from '@/components/traks/VoiceTrak'
import { PlanTrak } from '@/components/traks/PlanTrak'
import { AuditTrak } from '@/components/traks/AuditTrak'

export function Dashboard() {
  const [activeModule, setActiveModule] = useState<string>('dashboard')

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'participants':
        return <ParticipantTrak />
      case 'voice':
        return <VoiceTrak />
      case 'plans':
        return <PlanTrak />
      case 'audit':
        return <AuditTrak />
      default:
        return <DashboardHome setActiveModule={setActiveModule} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-gray-900">TrakStak</h1>
              </div>
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                <button
                  onClick={() => setActiveModule('dashboard')}
                  className={`px-3 py-2 text-sm font-medium ${
                    activeModule === 'dashboard' ? 'text-yellow-600 border-b-2 border-yellow-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveModule('participants')}
                  className={`px-3 py-2 text-sm font-medium ${
                    activeModule === 'participants' ? 'text-yellow-600 border-b-2 border-yellow-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  ParticipantTrak
                </button>
                <button
                  onClick={() => setActiveModule('voice')}
                  className={`px-3 py-2 text-sm font-medium ${
                    activeModule === 'voice' ? 'text-yellow-600 border-b-2 border-yellow-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  VoiceTrak
                </button>
                <button
                  onClick={() => setActiveModule('plans')}
                  className={`px-3 py-2 text-sm font-medium ${
                    activeModule === 'plans' ? 'text-yellow-600 border-b-2 border-yellow-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  PlanTrak
                </button>
                <button
                  onClick={() => setActiveModule('audit')}
                  className={`px-3 py-2 text-sm font-medium ${
                    activeModule === 'audit' ? 'text-yellow-600 border-b-2 border-yellow-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  AuditTrak
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {renderActiveModule()}
        </div>
      </main>
    </div>
  )
}

function DashboardHome({ setActiveModule }: { setActiveModule: (module: string) => void }) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Welcome to TrakStak
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          Sandra called. She wants her sticky notes back! 📝
        </p>
        <p className="mt-2 text-gray-500">
          Ultimate audit-grade compliance platform for NDIS & Aged Care providers
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Participants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-gray-500">+2 from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Active Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-gray-500">NDIS plans active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Voice Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-gray-500">This week</p>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-green-800">Compliance Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">94%</div>
            <div className="w-full bg-green-200 rounded-full h-2 mt-2">
              <div className="bg-green-600 h-2 rounded-full" style={{width: '94%'}}></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trak Modules */}
      <Card>
        <CardHeader>
          <CardTitle>TrakStak Modules</CardTitle>
          <CardDescription>Click any module to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button 
              variant="outline" 
              className="h-24 flex flex-col space-y-2"
              onClick={() => setActiveModule('participants')}
            >
              <span className="text-2xl">��</span>
              <span className="font-semibold">ParticipantTrak</span>
              <span className="text-xs text-gray-500">Manage participants & profiles</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-24 flex flex-col space-y-2"
              onClick={() => setActiveModule('voice')}
            >
              <span className="text-2xl">🎤</span>
              <span className="font-semibold">VoiceTrak</span>
              <span className="text-xs text-gray-500">Voice notes & AI Sandy</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-24 flex flex-col space-y-2"
              onClick={() => setActiveModule('plans')}
            >
              <span className="text-2xl">📋</span>
              <span className="font-semibold">PlanTrak</span>
              <span className="text-xs text-gray-500">NDIS plan management</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-24 flex flex-col space-y-2"
              onClick={() => setActiveModule('audit')}
            >
              <span className="text-2xl">🛡️</span>
              <span className="font-semibold">AuditTrak</span>
              <span className="text-xs text-gray-500">Compliance & reporting</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sandy AI Assistant */}
      <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
        <div className="flex items-start space-x-4">
          <div className="text-3xl">🤖</div>
          <div className="flex-1">
            <h3 className="font-semibold text-yellow-800 mb-2">Sandy Says:</h3>
            <p className="text-yellow-700">
              "Welcome to TrakStak! Your audit-grade compliance platform is ready. I've detected your system 
              is 94% compliant with excellent NDIS documentation standards. 3 voice notes are ready for 
              processing, and 2 plans need review this week. Making compliance so easy, even Sandra's impressed!"
            </p>
            <p className="text-xs text-yellow-600 mt-3">
              Verified by Sandy, your AI assistant. Please review for accuracy. AI suggestions are supportive, not definitive.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
