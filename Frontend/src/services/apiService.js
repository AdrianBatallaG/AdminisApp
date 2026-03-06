import apiClient from './apiClient';

const api = apiClient;

export const apiService = {
  // Medios - Videos
  getVideos: () => api.get('/medios/videos'),
  createVideo: (data) => api.post('/medios/videos', data),
  deleteVideo: (id) => api.delete(`/medios/videos/${id}`),

  // Medios - Publicaciones
  getPublicaciones: () => api.get('/medios/publicaciones'),
  createPublicacion: (data) => api.post('/medios/publicaciones', data),
  updatePublicacion: (id, data) => api.put(`/medios/publicaciones/${id}`, data),
  deletePublicacion: (id) => api.delete(`/medios/publicaciones/${id}`),

  // Calendarios - Eventos
  getEventos: () => api.get('/calendarios/eventos'),
  createEvento: (data) => api.post('/calendarios/eventos', data),
  updateEvento: (id, data) => api.put(`/calendarios/eventos/${id}`, data),
  deleteEvento: (id) => api.delete(`/calendarios/eventos/${id}`),

  // Calendarios - Visitas
  getVisitas: () => api.get('/calendarios/visitas'),
  createVisita: (data) => api.post('/calendarios/visitas', data),
  updateVisita: (id, data) => api.put(`/calendarios/visitas/${id}`, data),
  deleteVisita: (id) => api.delete(`/calendarios/visitas/${id}`),

  // Horarios - Misas
  getHorariosMisa: () => api.get('/horarios/misas'),
  createHorarioMisa: (data) => api.post('/horarios/misas', data),
  updateHorarioMisa: (id, data) => api.put(`/horarios/misas/${id}`, data),
  deleteHorarioMisa: (id) => api.delete(`/horarios/misas/${id}`),

  // Horarios - Atencion
  getHorariosAtencion: () => api.get('/horarios/atencion'),
  createHorarioAtencion: (data) => api.post('/horarios/atencion', data),
  updateHorarioAtencion: (id, data) => api.put(`/horarios/atencion/${id}`, data),

  // Registros - Catecismo
  getCatecismos: () => api.get('/registros/catecismo'),
  createCatecismo: (data) => api.post('/registros/catecismo', data),
  downloadCatecismo: (id) => api.get(`/registros/catecismo/${id}/download`, { responseType: 'blob' }),

  // Registros - Bautizos
  getBautizos: () => api.get('/registros/bautizos'),
  createBautizo: (data) => api.post('/registros/bautizos', data),
  generateCertificadoBautizo: (id) => api.get(`/registros/bautizos/${id}/certificado`, { responseType: 'blob' }),

  // Registros - Matrimonios
  getMatrimonios: () => api.get('/registros/matrimonios'),
  createMatrimonio: (data) => api.post('/registros/matrimonios', data),
  generateCertificadoMatrimonio: (id) => api.get(`/registros/matrimonios/${id}/certificado`, { responseType: 'blob' }),

  // Obituario
  getObituarios: () => api.get('/obituarios'),
  createObituario: (data) => api.post('/obituarios', data),
  updateObituario: (id, data) => api.put(`/obituarios/${id}`, data),
  deleteObituario: (id) => api.delete(`/obituarios/${id}`),

  // Articulos
  getArticulos: () => api.get('/articulos'),
  createArticulo: (data) => api.post('/articulos', data),
  updateArticulo: (id, data) => api.put(`/articulos/${id}`, data),
  deleteArticulo: (id) => api.delete(`/articulos/${id}`),

  // Ninos/Jovenes - Juegos
  getJuegos: () => api.get('/ninos-jovenes/juegos'),
  createJuego: (data) => api.post('/ninos-jovenes/juegos', data),
  getJuego: (id) => api.get(`/ninos-jovenes/juegos/${id}`),
};

export default api;