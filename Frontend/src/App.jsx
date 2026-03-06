import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/Layout';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { HomePage } from './pages/HomePage';
import { VideosPage } from './pages/VideosPage';
import { PublicacionesPage } from './pages/PublicacionesPage';
import { EventosPage } from './pages/EventosPage';
import { ContactoPage } from './pages/ContactoPage';
import { BibliaPage } from './pages/BibliaPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rutas de autenticación */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Ruta principal - Acceso público */}
          <Route
            path="/"
            element={
              <ProtectedRoute requireAuth={false}>
                <Layout>
                  <HomePage />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Medios - Acceso público */}
          <Route
            path="/medios/videos"
            element={
              <ProtectedRoute requireAuth={false}>
                <Layout>
                  <VideosPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/medios/biblia"
            element={
              <ProtectedRoute requireAuth={false}>
                <Layout>
                  <BibliaPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/medios/publicaciones"
            element={
              <ProtectedRoute requireAuth={false}>
                <Layout>
                  <PublicacionesPage />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Calendarios - Acceso público */}
          <Route
            path="/calendarios/eventos"
            element={
              <ProtectedRoute requireAuth={false}>
                <Layout>
                  <EventosPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/calendarios/visitas"
            element={
              <ProtectedRoute requireAuth={false}>
                <Layout>
                  <div className="card">
                    <h1 className="text-2xl font-bold mb-4">Visitas Pastorales</h1>
                    <p className="text-gray-600">
                      Página de visitas pastorales - Similar a eventos
                    </p>
                  </div>
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Horarios - Acceso público */}
          <Route
            path="/horarios/misas"
            element={
              <ProtectedRoute requireAuth={false}>
                <Layout>
                  <div className="card">
                    <h1 className="text-2xl font-bold mb-4">Horarios de Misas</h1>
                    <p className="text-gray-600 mb-6">
                      Consulta los horarios de celebraciones eucarísticas
                    </p>
                    <div className="space-y-4">
                      <div className="border-l-4 border-primary-500 pl-4 py-2">
                        <h3 className="font-semibold">Domingos</h3>
                        <p className="text-gray-600">7:00 AM, 10:00 AM, 12:00 PM, 6:00 PM</p>
                      </div>
                      <div className="border-l-4 border-primary-500 pl-4 py-2">
                        <h3 className="font-semibold">Entre Semana</h3>
                        <p className="text-gray-600">6:30 AM, 7:00 PM</p>
                      </div>
                      <div className="border-l-4 border-primary-500 pl-4 py-2">
                        <h3 className="font-semibold">Sábados</h3>
                        <p className="text-gray-600">6:00 PM (Misa vespertina)</p>
                      </div>
                    </div>
                  </div>
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/horarios/atencion"
            element={
              <ProtectedRoute requireAuth={false}>
                <Layout>
                  <div className="card">
                    <h1 className="text-2xl font-bold mb-4">Atención Casa Parroquial</h1>
                    <p className="text-gray-600 mb-6">
                      Horarios de atención para trámites y consultas
                    </p>
                    <div className="space-y-4">
                      <div className="border-l-4 border-green-500 pl-4 py-2">
                        <h3 className="font-semibold">Lunes a Viernes</h3>
                        <p className="text-gray-600">9:00 AM - 12:00 PM / 3:00 PM - 6:00 PM</p>
                      </div>
                      <div className="border-l-4 border-green-500 pl-4 py-2">
                        <h3 className="font-semibold">Sábados</h3>
                        <p className="text-gray-600">9:00 AM - 1:00 PM</p>
                      </div>
                    </div>
                  </div>
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Registros - Solo Admin (requiere login) */}
          <Route
            path="/registros/catecismo"
            element={
              <ProtectedRoute requiredRole="admin">
                <Layout>
                  <div className="card">
                    <h1 className="text-2xl font-bold mb-4">Registros de Catecismo</h1>
                    <p className="text-gray-600">
                      Gestión de documentos y registros de catecúmenos
                    </p>
                  </div>
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/registros/bautizos"
            element={
              <ProtectedRoute requiredRole="admin">
                <Layout>
                  <div className="card">
                    <h1 className="text-2xl font-bold mb-4">Registros de Bautizos</h1>
                    <p className="text-gray-600">
                      Gestión de certificados de bautizo
                    </p>
                  </div>
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/registros/matrimonios"
            element={
              <ProtectedRoute requiredRole="admin">
                <Layout>
                  <div className="card">
                    <h1 className="text-2xl font-bold mb-4">Registros de Matrimonios</h1>
                    <p className="text-gray-600">
                      Gestión de certificados matrimoniales
                    </p>
                  </div>
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Solicitudes - Solo usuarios autenticados */}
          <Route
            path="/solicitudes"
            element={
              <ProtectedRoute>
                <Layout>
                  <div className="card">
                    <h1 className="text-2xl font-bold mb-4">Solicitar Documentos</h1>
                    <p className="text-gray-600 mb-6">
                      Solicita certificados y constancias en línea
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <h3 className="font-semibold text-lg mb-2">Certificado de Bautizo</h3>
                        <p className="text-sm text-gray-600 mb-3">Solicita una copia de tu certificado de bautizo</p>
                        <button className="btn-primary w-full">Solicitar</button>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <h3 className="font-semibold text-lg mb-2">Certificado de Matrimonio</h3>
                        <p className="text-sm text-gray-600 mb-3">Solicita una copia de tu certificado matrimonial</p>
                        <button className="btn-primary w-full">Solicitar</button>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <h3 className="font-semibold text-lg mb-2">Constancia de Catecismo</h3>
                        <p className="text-sm text-gray-600 mb-3">Solicita constancia de asistencia a catecismo</p>
                        <button className="btn-primary w-full">Solicitar</button>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <h3 className="font-semibold text-lg mb-2">Otro Documento</h3>
                        <p className="text-sm text-gray-600 mb-3">Solicita otro tipo de documento o constancia</p>
                        <button className="btn-primary w-full">Solicitar</button>
                      </div>
                    </div>
                  </div>
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Obituario - Solo Editor y Admin */}
          <Route
            path="/obituario"
            element={
              <ProtectedRoute requiredRole="editor">
                <Layout>
                  <div className="card">
                    <h1 className="text-2xl font-bold mb-4">Obituario</h1>
                    <p className="text-gray-600">
                      Registro de difuntos de la parroquia
                    </p>
                  </div>
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Artículos - Acceso público */}
          <Route
            path="/articulos"
            element={
              <ProtectedRoute requireAuth={false}>
                <Layout>
                  <div className="card">
                    <h1 className="text-2xl font-bold mb-4">Artículos Disponibles</h1>
                    <p className="text-gray-600">
                      Venta e información de artículos religiosos
                    </p>
                  </div>
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Niños/Jóvenes - Acceso público */}
          <Route
            path="/ninos-jovenes"
            element={
              <ProtectedRoute requireAuth={false}>
                <Layout>
                  <div className="card">
                    <h1 className="text-2xl font-bold mb-4">Niños y Jóvenes</h1>
                    <p className="text-gray-600">
                      Juegos educativos y dinámicas sobre la fe
                    </p>
                  </div>
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Contacto - Acceso público */}
          <Route
            path="/contacto"
            element={
              <ProtectedRoute requireAuth={false}>
                <Layout>
                  <ContactoPage />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Ruta por defecto */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
