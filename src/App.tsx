import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import SmoothScroll from './components/SmoothScroll';
import Home from './pages/Home';
import CaseStudy from './pages/CaseStudy';
import ServicesPage from './pages/Services';

export default function App() {
  return (
    <Router>
      <SmoothScroll />
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/case/:id" element={<CaseStudy />} />
          <Route path="/servicos" element={<ServicesPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}
