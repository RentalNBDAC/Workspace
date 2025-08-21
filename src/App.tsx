import React, { useState } from 'react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Users, UserCheck, ArrowLeft, Building, FileText } from 'lucide-react';
import HomePage from './components/HomePage';
import GuestPage from './components/GuestPage';
import InternalPage from './components/InternalPage';
import PermohonanBaruPage from './components/PermohonanBaruPage';
import SemakStatusPage from './components/SemakStatusPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [submissions, setSubmissions] = useState([]);

  const addSubmission = (submission) => {
    const newSubmission = {
      ...submission,
      id: Date.now(),
      status: 'Pending',
      submittedAt: new Date().toISOString().split('T')[0]
    };
    setSubmissions([...submissions, newSubmission]);
  };

  const updateSubmissionStatus = (id, newStatus) => {
    setSubmissions(submissions.map(submission => 
      submission.id === id ? { ...submission, status: newStatus } : submission
    ));
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'guest':
        return <GuestPage onNavigate={setCurrentPage} onBack={() => setCurrentPage('home')} />;
      case 'internal':
        return <InternalPage 
          onNavigate={setCurrentPage} 
          onBack={() => setCurrentPage('home')}
          submissions={submissions}
          onAddSubmission={addSubmission}
          onUpdateStatus={updateSubmissionStatus}
        />;
      case 'permohonan-baru':
        return <PermohonanBaruPage 
          onBack={() => setCurrentPage('guest')}
          onSubmit={(data) => {
            addSubmission(data);
            setCurrentPage('guest');
          }}
        />;
      case 'semak-status':
        return <SemakStatusPage 
          onBack={() => setCurrentPage('guest')}
          submissions={submissions}
        />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Building className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-medium text-foreground">Project Booking System</h1>
                <p className="text-sm text-muted-foreground">Sistem Permohonan Projek</p>
              </div>
            </div>
            {currentPage !== 'home' && (
              <Button
                variant="outline"
                onClick={() => setCurrentPage('home')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Home
              </Button>
            )}
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {renderPage()}
      </main>
    </div>
  );
}