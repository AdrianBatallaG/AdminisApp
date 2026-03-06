import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const ContactoPage = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif text-sage-800 mb-4">Contacto</h1>
        <div className="w-24 h-px bg-sage-300 mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card">
          <MapPin className="text-sage-600 mb-4" size={32} />
          <h3 className="text-lg font-serif text-sage-800 mb-2">Dirección</h3>
          <p className="text-gray-600">
            Calle Principal<br/>
          </p>
        </div>

        <div className="card">
          <Phone className="text-sage-600 mb-4" size={32} />
          <h3 className="text-lg font-serif text-sage-800 mb-2">Teléfono</h3>
          <p className="text-gray-600">
            +593 55 555 5555
          </p>
        </div>

        <div className="card">
          <Mail className="text-sage-600 mb-4" size={32} />
          <h3 className="text-lg font-serif text-sage-800 mb-2">Email</h3>
          <p className="text-gray-600">
            correo@parroquiacalderon.com
          </p>
        </div>

        <div className="card">
          <Clock className="text-sage-600 mb-4" size={32} />
          <h3 className="text-lg font-serif text-sage-800 mb-2">Horarios</h3>
          <p className="text-gray-600">
            Lunes a Viernes: 9:00 AM - 6:00 PM<br/>
            Sábados: 9:00 AM - 1:00 PM
          </p>
        </div>
      </div>
    </div>
  );
};
