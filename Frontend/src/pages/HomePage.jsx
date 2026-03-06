import { useAuth } from '../context/AuthContext';
import { Calendar, Video, BookOpen, Clock, LogIn, Phone, MapPin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  const { user, isAuthenticated } = useAuth();

  const publicServices = [
    {
      name: 'Videos',
      path: '/medios/videos',
      icon: Video,
      description: 'Mensajes y enseñanzas'
    },
    {
      name: 'Publicaciones',
      path: '/medios/publicaciones',
      icon: BookOpen,
      description: 'Noticias y anuncios'
    },
    {
      name: 'Eventos',
      path: '/calendarios/eventos',
      icon: Calendar,
      description: 'Próximas actividades'
    },
    {
      name: 'Horarios',
      path: '/horarios/misas',
      icon: Clock,
      description: 'Misas y atención'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section con Video */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 rounded-lg overflow-hidden shadow-md bg-white border border-gray-100">
        
        {/* Video */}
        <div className="relative h-[500px] lg:h-[600px] overflow-hidden bg-gradient-to-br from-sage-900 to-sage-950 flex items-center justify-center">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="h-full w-auto max-w-full"
          >
            <source src="/videos/iglesia.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Contenido */}
        <div className="flex flex-col justify-center p-8 lg:p-12">
          <div className="space-y-6">
            <div className="inline-block">
              <div className="text-5xl text-sage-700 mb-4">✝</div>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-serif text-sage-900 leading-tight">
              Bienvenidos a Nuestra Parroquia
            </h1>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              Un lugar donde la fe, la esperanza y el amor se encuentran. 
              Te invitamos a ser parte de nuestra comunidad.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {!isAuthenticated ? (
                <>
                  <Link 
                    to="/register" 
                    className="btn-primary text-center"
                  >
                    Únete a la Comunidad
                  </Link>
                  <Link 
                    to="/calendarios/eventos" 
                    className="btn-secondary text-center"
                  >
                    Ver Próximos Eventos
                  </Link>
                </>
              ) : (
                <Link 
                  to="/solicitudes" 
                  className="btn-primary text-center"
                >
                  Solicitar Documentos
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sobre Nosotros e Información */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Sobre Nosotros */}
        <div className="lg:col-span-2 card">
          <h2 className="text-3xl font-serif text-sage-900 mb-6">Nuestra Misión</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Somos una comunidad católica comprometida con el servicio a Dios y a nuestro prójimo. 
              Desde hace más de décadas, hemos sido un faro de esperanza y fe para nuestra comunidad en Calderón.
            </p>
            <p>
              Nuestra misión es llevar el mensaje del Evangelio a través de la celebración de los sacramentos, 
              la formación en la fe, y el servicio caritativo a quienes más lo necesitan.
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="border-l-2 border-sage-300 pl-4">
                <p className="text-3xl font-serif text-sage-800 mb-1">500+</p>
                <p className="text-sm text-gray-600">Familias</p>
              </div>
              <div className="border-l-2 border-sage-300 pl-4">
                <p className="text-3xl font-serif text-sage-800 mb-1">25+</p>
                <p className="text-sm text-gray-600">Años de servicio</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contacto */}
        <div className="card bg-gradient-to-br from-sage-50 to-white">
          <h3 className="text-2xl font-serif text-sage-900 mb-6">Contacto</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="text-sage-700 flex-shrink-0 mt-1" size={20} />
              <div>
                <p className="font-medium text-gray-900 text-sm">Dirección</p>
                <p className="text-sm text-gray-600 mt-1">
                  Calle Principal #123<br/>
        
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Phone className="text-sage-700 flex-shrink-0 mt-1" size={20} />
              <div>
                <p className="font-medium text-gray-900 text-sm">Teléfono</p>
                <p className="text-sm text-gray-600 mt-1">+593 55 555 5555</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Mail className="text-sage-700 flex-shrink-0 mt-1" size={20} />
              <div>
                <p className="font-medium text-gray-900 text-sm">Email</p>
                <p className="text-sm text-gray-600 mt-1">correo@parroquia.com</p>
              </div>
            </div>
            
            <div className="pt-4 border-t border-sage-200">
              <p className="font-medium text-gray-900 text-sm mb-2">Horario de Atención</p>
              <p className="text-xs text-gray-600 leading-relaxed">
                Lunes a Viernes: 9:00 AM - 6:00 PM<br/>
                Sábados: 9:00 AM - 1:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Servicios */}
      <div>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif text-sage-900 mb-2">Nuestros Servicios</h2>
          <div className="w-24 h-px bg-sage-300 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {publicServices.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.path}
                to={service.path}
                className="card text-center hover:shadow-lg transition-all group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-sage-100 rounded-full mb-4 group-hover:bg-sage-200 transition-colors">
                  <Icon className="text-sage-700" size={28} />
                </div>
                <h3 className="font-serif text-lg text-sage-900 mb-2">{service.name}</h3>
                <p className="text-sm text-gray-600">{service.description}</p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Próximos Eventos */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-serif text-sage-900">Próximos Eventos</h2>
          <Link to="/calendarios/eventos" className="text-sm text-sage-700 hover:text-sage-900 font-medium">
            Ver todos →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-gradient-to-br from-sage-50 to-white rounded-lg border border-sage-100">
            <Calendar className="text-sage-700 mb-4" size={28} />
            <h3 className="font-serif text-lg text-sage-900 mb-2">Misa Dominical</h3>
            <p className="text-sm text-sage-700 mb-2">Domingo, 10:00 AM</p>
            <p className="text-sm text-gray-600">Celebración eucarística para toda la familia</p>
          </div>
          
          <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-lg border border-blue-100">
            <Calendar className="text-blue-700 mb-4" size={28} />
            <h3 className="font-serif text-lg text-blue-900 mb-2">Catequesis</h3>
            <p className="text-sm text-blue-700 mb-2">Sábado, 3:00 PM</p>
            <p className="text-sm text-gray-600">Preparación para Primera Comunión</p>
          </div>
          
          <div className="p-6 bg-gradient-to-br from-purple-50 to-white rounded-lg border border-purple-100">
            <Calendar className="text-purple-700 mb-4" size={28} />
            <h3 className="font-serif text-lg text-purple-900 mb-2">Grupo de Oración</h3>
            <p className="text-sm text-purple-700 mb-2">Miércoles, 7:00 PM</p>
            <p className="text-sm text-gray-600">Reflexión bíblica semanal</p>
          </div>
        </div>
      </div>

      {/* CTA para usuarios no autenticados */}
      {!isAuthenticated && (
        <div className="bg-gradient-to-r from-sage-700 to-sage-800 rounded-lg p-8 text-white shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-2xl font-serif mb-2">¿Necesitas un documento?</h3>
              <p className="text-sage-100">
                Crea una cuenta para solicitar certificados de bautizo, matrimonio y otros documentos oficiales en línea.
              </p>
            </div>
            <Link 
              to="/register" 
              className="px-8 py-4 bg-white text-sage-800 rounded-md hover:bg-sage-50 transition-all shadow-md font-medium whitespace-nowrap"
            >
              Crear cuenta gratis
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
