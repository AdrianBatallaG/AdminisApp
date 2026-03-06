import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/apiService';
import { Plus, Trash2, Play, Upload } from 'lucide-react';

export const VideosPage = () => {
  const { hasPermission } = useAuth();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newVideo, setNewVideo] = useState({
    titulo: '',
    descripcion: '',
    url: ''
  });

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      const response = await apiService.getVideos();
      setVideos(response.data);
    } catch (error) {
      console.error('Error al cargar videos:', error);
      // Datos de ejemplo si falla la API
      setVideos([
        {
          id: 1,
          titulo: '¿La homosexualidad se cura?',
          descripcion: '¡Debate gay se prende en Venga la Alegría!',
          url: 'https://www.youtube.com/watch?v=AG3f6jRH8Ag',
          fecha: '2026-01-15'
        },
        {
          id: 2,
          titulo: 'La Original Banda El Limon',
          descripcion: ' "Juan Martha"',
          url: 'https://www.youtube.com/watch?v=PhG121EWiJM&list=RDPhG121EWiJM&start_radio=1',
          fecha: '2026-01-10'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiService.createVideo(newVideo);
      loadVideos();
      setShowModal(false);
      setNewVideo({ titulo: '', descripcion: '', url: '' });
    } catch (error) {
      console.error('Error al crear video:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este video?')) {
      try {
        await apiService.deleteVideo(id);
        loadVideos();
      } catch (error) {
        console.error('Error al eliminar video:', error);
      }
    }
  };

  const getEmbedUrl = (url) => {
    if (url.includes('youtube.com/watch')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
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
          <h1 className="text-3xl font-bold text-gray-900">Videos</h1>
          <p className="text-gray-600 mt-1">Contenido multimedia de la parroquia</p>
        </div>
        {hasPermission('editor') && (
          <button
            onClick={() => setShowModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={20} />
            Agregar Video
          </button>
        )}
      </div>

      {videos.length === 0 ? (
        <div className="card text-center py-12">
          <Upload className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay videos disponibles</h3>
          <p className="text-gray-600">
            {hasPermission('editor') 
              ? 'Comienza agregando tu primer video'
              : 'Aún no se han publicado videos'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="card">
              <div className="aspect-video bg-gray-900 rounded-lg mb-4 overflow-hidden">
                <iframe
                  src={getEmbedUrl(video.url)}
                  title={video.titulo}
                  className="w-full h-full"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{video.titulo}</h3>
                  <p className="text-sm text-gray-600 mb-3">{video.descripcion}</p>
                  {video.fecha && (
                    <p className="text-xs text-gray-500">
                      Publicado: {new Date(video.fecha).toLocaleDateString('es-ES')}
                    </p>
                  )}
                </div>
                {hasPermission('editor') && (
                  <button
                    onClick={() => handleDelete(video.id)}
                    className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                    title="Eliminar video"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal para agregar video */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Agregar Video</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título *
                </label>
                <input
                  type="text"
                  value={newVideo.titulo}
                  onChange={(e) => setNewVideo({ ...newVideo, titulo: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción
                </label>
                <textarea
                  value={newVideo.descripcion}
                  onChange={(e) => setNewVideo({ ...newVideo, descripcion: e.target.value })}
                  className="input-field"
                  rows="3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL del Video (YouTube) *
                </label>
                <input
                  type="url"
                  value={newVideo.url}
                  onChange={(e) => setNewVideo({ ...newVideo, url: e.target.value })}
                  className="input-field"
                  placeholder="https://www.youtube.com/watch?v=..."
                  required
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="btn-primary flex-1">
                  Guardar
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
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
