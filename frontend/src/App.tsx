import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import MyTeachers from './components/MyTeachers';
import CreateTeacher from './components/CreateTeacher';
import Settings from './components/Settings';
import { initTelegramWebApp } from './utils/telegram';
import { getTeachers, createTeacher, deleteTeacher, generateLessons, generateLessonDetails, Teacher } from './services/api';
import './styles/global.css';

type Tab = 'my-teachers' | 'create-teacher' | 'settings';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('my-teachers');
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [language, setLanguage] = useState('en');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Инициализация Telegram WebApp
  useEffect(() => {
    initTelegramWebApp();
  }, []);

  // Загрузка учителей при монтировании
  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTeachers();
      setTeachers(data);
    } catch (err) {
      console.error('Failed to load teachers:', err);
      setError('Failed to load teachers');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTeacher = async (name: string, subject: string, description: string) => {
    try {
      const newTeacher = await createTeacher(name, subject, description);
      setTeachers([newTeacher, ...teachers]);

      // Генерируем уроки в фоне
      generateLessons(newTeacher.id).then(() => {
        // После генерации уроков, генерируем детали для первых 3 уроков
        for (let i = 1; i <= 3; i++) {
          generateLessonDetails(newTeacher.id, i).catch(err => {
            console.error(`Failed to generate details for lesson ${i}:`, err);
          });
        }
      }).catch(err => {
        console.error('Failed to generate lessons:', err);
      });

      setActiveTab('my-teachers');
    } catch (err) {
      console.error('Failed to create teacher:', err);
      alert('Failed to create teacher. Please try again.');
    }
  };

  const handleDeleteTeacher = async (id: string) => {
    try {
      await deleteTeacher(id);
      setTeachers(teachers.filter((t) => t.id !== id));
    } catch (err) {
      console.error('Failed to delete teacher:', err);
      alert('Failed to delete teacher. Please try again.');
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div style={{ padding: '60px 16px', textAlign: 'center' }}>
          <p style={{ color: 'var(--color-text-secondary)' }}>Loading...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div style={{ padding: '60px 16px', textAlign: 'center' }}>
          <p style={{ color: '#ff3b30', marginBottom: '16px' }}>{error}</p>
          <button
            onClick={loadTeachers}
            style={{
              padding: '12px 24px',
              backgroundColor: 'var(--color-accent)',
              border: 'none',
              borderRadius: '8px',
              color: '#000',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Retry
          </button>
        </div>
      );
    }

    switch (activeTab) {
      case 'my-teachers':
        return (
          <MyTeachers
            teachers={teachers}
            onDeleteTeacher={handleDeleteTeacher}
          />
        );
      case 'create-teacher':
        return <CreateTeacher onCreateTeacher={handleCreateTeacher} />;
      case 'settings':
        return <Settings language={language} onLanguageChange={setLanguage} />;
      default:
        return (
          <MyTeachers
            teachers={teachers}
            onDeleteTeacher={handleDeleteTeacher}
          />
        );
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
