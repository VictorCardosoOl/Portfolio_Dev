import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import SmoothScroll from './components/SmoothScroll';
import { ErrorBoundary } from './components/ErrorBoundary';
import { WhatsAppModalProvider } from './context/WhatsAppModalContext';

const Home = lazy(() => import('./pages/Home'));
const CaseStudy = lazy(() => import('./pages/CaseStudy'));
const ServicesPage = lazy(() => import('./pages/Services'));

const RouteFallback = () => (
  <div className="fixed inset-0 bg-[#ffffff] z-50 flex items-center justify-center font-serif text-2xl uppercase tracking-widest text-[#1a1a1a]">
    Carregando...
  </div>
);

export default function App() {
  return (
    <Router>
      <SmoothScroll />
      <WhatsAppModalProvider>
        <MainLayout>
          <ErrorBoundary>
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/case/:id" element={<CaseStudy />} />
                <Route path="/servicos" element={<ServicesPage />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </MainLayout>
      </WhatsAppModalProvider>
    </Router>
  );
}
