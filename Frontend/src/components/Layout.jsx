import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Video, BookOpen, Calendar, Clock, FileText, 
  Package, Users, LogOut, Menu, X, Home, ChevronDown, ChevronRight
} from 'lucide-react';
import { useState } from 'react';

export const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = (menuName) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuName]: !prev[menuName]
    }));
  };

  const menuItems = [
    {
      name: 'Inicio',
      path: '/',
      icon: Home,
      public: true
    },
    {
      name: 'Medios',
      path: '/medios',
      icon: Video,
      public: true,
      subItems: [
        { name: 'Videos', path: '/medios/videos', public: true },
        { name: 'Biblia en línea', path: '/medios/biblia', public: true },
        { name: 'Publicaciones', path: '/medios/publicaciones', public: true }
      ]
    },
    {
      name: 'Calendarios',
      path: '/calendarios',
      icon: Calendar,
      public: true,
      subItems: [
        { name: 'Eventos', path: '/calendarios/eventos', public: true },
        { name: 'Visitas', path: '/calendarios/visitas', public: true }
      ]
    },
    {
      name: 'Horarios',
      path: '/horarios',
      icon: Clock,
      public: true,
      subItems: [
        { name: 'De Misa', path: '/horarios/misas', public: true },
        { name: 'Atención Casa Parroquial', path: '/horarios/atencion', public: true }
      ]
    },
    {
      name: 'Artículos',
      path: '/articulos',
      icon: Package,
      public: true
    },
    {
      name: 'Niños/Jóvenes',
      path: '/ninos-jovenes',
      icon: Users,
      public: true
    },
    {
      name: 'Solicitar Documentos',
      path: '/solicitudes',
      icon: FileText,
      roles: ['usuario', 'editor', 'admin']
    },
    {
      name: 'Registros',
      path: '/registros',
      icon: FileText,
      roles: ['admin'],
      subItems: [
        { name: 'Catecismo', path: '/registros/catecismo' },
        { name: 'Bautizos', path: '/registros/bautizos' },
        { name: 'Matrimonios', path: '/registros/matrimonios' }
      ]
    },
    {
      name: 'Obituario',
      path: '/obituario',
      icon: FileText,
      roles: ['editor', 'admin']
    }
  ];

  const canAccessItem = (item) => {
    if (item.public) return true;
    if (item.roles) {
      return user && item.roles.includes(user.role);
    }
    return false;
  };

  const isActivePath = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Más elegante */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100 text-sage-700 transition-colors"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link to="/" className="flex items-center gap-3">
              <img 
                src="/images/logo.png" 
                alt="Parroquia San Francisco de Asís" 
                className="h-14 w-auto"
              />
              <div className="hidden sm:block">
                <h1 className="text-xl font-serif text-sage-800 leading-tight">
                  San Francisco de Asís
                </h1>
                <p className="text-xs text-sage-600 tracking-wider">Calderón</p>
              </div>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-sage-600 capitalize">{user.role}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  <LogOut size={18} />
                  <span className="hidden sm:inline">Cerrar Sesión</span>
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-sage-700 hover:bg-sage-50 rounded-md transition-colors font-medium"
                >
                  <LogOut size={18} />
                  <span>Ingresar</span>
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm bg-sage-700 text-white rounded-md hover:bg-sage-800 transition-all shadow-sm"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Sidebar - Elegante y minimalista */}
        <aside
          className={`
            fixed lg:sticky lg:top-[73px] inset-y-0 left-0 z-30 w-72 bg-white border-r border-gray-200
            transform transition-transform duration-300 ease-in-out overflow-y-auto
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            lg:h-[calc(100vh-73px)] top-[73px]
          `}
        >
          <nav className="p-6 space-y-1">
            {menuItems.map((item) => {
              if (!canAccessItem(item)) return null;

              const Icon = item.icon;
              const isActive = isActivePath(item.path);
              const isExpanded = expandedMenus[item.name];
              const hasSubItems = item.subItems && item.subItems.length > 0;

              return (
                <div key={item.path}>
                  {hasSubItems ? (
                    <button
                      onClick={() => toggleMenu(item.name)}
                      className={`
                        w-full flex items-center justify-between px-4 py-3 rounded-md transition-all
                        ${isActive 
                          ? 'bg-sage-50 text-sage-900 font-medium' 
                          : 'text-gray-700 hover:bg-gray-50'
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={20} className={isActive ? 'text-sage-700' : 'text-gray-500'} />
                        <span className="text-sm">{item.name}</span>
                      </div>
                      {isExpanded ? (
                        <ChevronDown size={16} className="text-sage-600" />
                      ) : (
                        <ChevronRight size={16} className="text-gray-400" />
                      )}
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-md transition-all
                        ${isActive 
                          ? 'bg-sage-50 text-sage-900 font-medium shadow-sm' 
                          : 'text-gray-700 hover:bg-gray-50'
                        }
                      `}
                    >
                      <Icon size={20} className={isActive ? 'text-sage-700' : 'text-gray-500'} />
                      <span className="text-sm">{item.name}</span>
                    </Link>
                  )}
                  
                  {hasSubItems && isExpanded && (
                    <div className="ml-12 mt-1 space-y-1 border-l-2 border-sage-100 pl-4">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          onClick={() => setSidebarOpen(false)}
                          className={`
                            block px-3 py-2 text-sm rounded-md transition-all
                            ${location.pathname === subItem.path
                              ? 'bg-sage-100 text-sage-900 font-medium'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-sage-800'
                            }
                          `}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Información adicional en sidebar */}
          <div className="p-6 border-t border-gray-200 mt-auto">
            <div className="text-center space-y-2">
              <img 
                src="/images/logo.png" 
                alt="Logo" 
                className="h-16 w-auto mx-auto opacity-60"
              />
              <p className="text-xs text-gray-500 font-serif">
                Parroquia San Francisco de Asís
              </p>
              <p className="text-xs text-sage-600">
                Calderón, Ecuador
              </p>
            </div>
          </div>
        </aside>

        {/* Overlay para móvil */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden top-[73px]"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content - Con scroll independiente */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-8 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
};
