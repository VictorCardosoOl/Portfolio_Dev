import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import CaseStudy from './pages/CaseStudy';

export default function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/case/:id" element={<CaseStudy />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}
