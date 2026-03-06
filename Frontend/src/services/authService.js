import apiClient from './apiClient';

const getApiErrorMessage = (error, fallbackMessage) => {
  const responseData = error.response?.data;

  if (typeof responseData?.message === 'string' && responseData.message.trim()) {
    return responseData.message;
  }

  const validationErrors = responseData?.errors;

  if (validationErrors && typeof validationErrors === 'object') {
    const firstFieldErrors = Object.values(validationErrors).find(
      (messages) => Array.isArray(messages) && messages.length > 0
    );

    if (firstFieldErrors) {
      return firstFieldErrors[0];
    }
  }

  return fallbackMessage;
};

export const authService = {
  login: async (email, password) => {
    try {
      const response = await apiClient.post('/login', {
        email,
        password,
      });

      return response.data;
    } catch (error) {
      throw new Error(getApiErrorMessage(error, 'Error al iniciar sesion'));
    }
  },

  logout: async () => {
    try {
      await apiClient.post('/logout');
    } catch (error) {
      console.error('Error al cerrar sesion:', error);
    }
  },

  register: async (userData) => {
    try {
      const response = await apiClient.post('/register', userData);

      return response.data;
    } catch (error) {
      throw new Error(getApiErrorMessage(error, 'Error al registrar usuario'));
    }
  },

  getProfile: async () => {
    try {
      const response = await apiClient.get('/me');

      return response.data;
    } catch (error) {
      throw new Error(getApiErrorMessage(error, 'Error al obtener perfil'));
    }
  },
};