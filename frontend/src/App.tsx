import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import MyTeachers from './components/MyTeachers';
import CreateTeacher from './components/CreateTeacher';
import Settings from './components/Settings';
import './styles/global.css';

type Tab = 'my-teachers' | 'create-teacher' | 'settings';

interface Teacher {
  id: string;
  name: string;
  subject: string;
  description: string;
  createdAt: string;
}

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('my-teachers');
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [language, setLanguage] = useState('en');

  const handleCreateTeacher = (name: string, subject: string, description: string) => {
    const newTeacher: Teacher = {
      id: Date.now().toString(),
      name,
      subject,
      description,
      createdAt: new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }),
    };
    setTeachers([...teachers, newTeacher]);
    setActiveTab('my-teachers');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'my-teachers':
        return <MyTeachers teachers={teachers} />;
      case 'create-teacher':
        return <CreateTeacher onCreateTeacher={handleCreateTeacher} />;
      case 'settings':
        return <Settings language={language} onLanguageChange={setLanguage} />;
      default:
        return <MyTeachers teachers={teachers} />;
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Navigation */}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content */}
      <AnimatePresence mode="wait">
        <div key={activeTab}>
          {renderContent()}
        </div>
      </AnimatePresence>
    </div>
  );
}

export default App;
