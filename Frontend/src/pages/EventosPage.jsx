import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/apiService';
import { Plus, Calendar as CalendarIcon, MapPin, Clock, Edit2, Trash2 } from 'lucide-react';

export const EventosPage = () => {
  const { hasPermission } = useAuth();
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    fecha: '',
    hora: '',
    lugar: ''
  });

  useEffect(() => {
    loadEventos();
  }, []);

  const loadEventos = async () => {
    try {
      const response = await apiService.getEventos();
      setEventos(response.data);
    } catch (error) {
      console.error('Error al cargar eventos:', error);
      // Datos de ejemplo
      setEventos([
        {
          id: 1,
          titulo: 'Misa de Sanación',
          descripcion: 'Misa especial con oración de sanación',
          fecha: '2026-02-10',
          hora: '18:00',
          lugar: 'Iglesia Principal'
        },
        {
          id: 2,
          titulo: 'Retiro Espiritual',
          descripcion: 'Retiro de fin de semana para jóvenes',
          fecha: '2026-02-15',
          hora: '09:00',
          lugar: 'Casa de Retiro'
        },
        {
          id: 3,
          titulo: 'Procesión del Viernes Santo',
          descripcion: 'Procesión tradicional por las calles del barrio',
          fecha: '2026-04-18',
          hora: '17:00',
          lugar: 'Salida desde la Iglesia'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await apiService.updateEvento(editingId, formData);
      } else {
        await apiService.createEvento(formData);
      }
      loadEventos();
      closeModal();
    } catch (error) {
      console.error('Error al guardar evento:', error);
    }
  };

  const handleEdit = (evento) => {
    setEditingId(evento.id);
    setFormData({
      titulo: evento.titulo,
      descripcion: evento.descripcion,
      fecha: evento.fecha,
      hora: evento.hora,
      lugar: evento.lugar
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este evento?')) {
      try {
        await apiService.deleteEvento(id);
        loadEventos();
      } catch (error) {
        console.error('Error al eliminar evento:', error);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({ titulo: '', descripcion: '', fecha: '', hora: '', lugar: '' });
  };

  const getEventosProximos = () => {
    const hoy = new Date();
    return eventos
      .filter(e => new Date(e.fecha) >= hoy)
      .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
      .slice(0, 3);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Eventos</h1>
          <p className="text-gray-600 mt-1">Calendario de actividades parroquiales</p>
        </div>
        {hasPermission('editor') && (
          <button
            onClick={() => setShowModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={20} />
            Agregar Evento
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Eventos Próximos */}
        <div className="lg:col-span-1">
          <div className="card sticky top-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <CalendarIcon size={20} className="text-primary-600" />
              Próximos Eventos
            </h2>
            <div className="space-y-4">
              {getEventosProximos().map((evento) => (
                <div key={evento.id} className="border-l-4 border-primary-500 pl-3">
                  <h3 className="font-medium text-gray-900">{evento.titulo}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {new Date(evento.fecha).toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'long'
                    })}
                  </p>
                  <p className="text-sm text-gray-500">{evento.hora}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lista de Todos los Eventos */}
        <div className="lg:col-span-2 space-y-4">
          {eventos
            .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
            .map((evento) => (
              <div key={evento.id} className="card">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {evento.titulo}
                    </h3>
                    <p className="text-gray-700 mb-4">{evento.descripcion}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <CalendarIcon size={16} className="text-primary-600" />
                        <span>
                          {new Date(evento.fecha).toLocaleDateString('es-ES', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock size={16} className="text-primary-600" />
                        <span>{evento.hora}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin size={16} className="text-primary-600" />
                        <span>{evento.lugar}</span>
                      </div>
                    </div>
                  </div>

                  {hasPermission('editor') && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(evento)}
                        className="text-primary-600 hover:bg-primary-50 p-2 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <Edit2 size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(evento.id)}
                        className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {editingId ? 'Editar Evento' : 'Nuevo Evento'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título *
                </label>
                <input
                  type="text"
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción
                </label>
                <textarea
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  className="input-field"
                  rows="3"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fecha *
                  </label>
                  <input
                    type="date"
                    value={formData.fecha}
                    onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hora *
                  </label>
                  <input
                    type="time"
                    value={formData.hora}
                    onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lugar *
                </label>
                <input
                  type="text"
                  value={formData.lugar}
                  onChange={(e) => setFormData({ ...formData, lugar: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="btn-primary flex-1">
                  {editingId ? 'Actualizar' : 'Crear'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="btn-secondary flex-1"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
