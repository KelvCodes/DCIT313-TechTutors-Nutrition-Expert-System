import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ConsultPage from './pages/ConsultPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/consult" element={<ConsultPage />} />
    </Routes>
  );
}

export default App;
