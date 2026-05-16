import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CaseStudy from './pages/CaseStudy';

export default function App() {
  return (
    <>
      <div 
        className="fixed inset-0 z-50 pointer-events-none opacity-[0.035] mix-blend-multiply" 
        style={{ backgroundImage: "url('/noise.png')" }} 
      />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/case/:id" element={<CaseStudy />} />
        </Routes>
      </Router>
    </>
  );
}
