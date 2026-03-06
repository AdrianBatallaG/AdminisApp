
      {/* Hero Section con Video Vertical */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-900 to-blue-950">
        
        {/* Columna del Video */}
        <div className="relative h-[500px] lg:h-[700px] overflow-hidden bg-black">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-contain"
          >
            <source src="/videos/iglesia.mp4" type="video/mp4" />
            Tu navegador no soporta video HTML5.
          </video>
        </div>

        {/* Columna del Contenido */}
        <div className="flex flex-col items-center justify-center text-white p-8 lg:p-12">
          <div className="max-w-xl space-y-6">
            {/* Cruz decorativa */}
            <div className="inline-block p-4 bg-white bg-opacity-20 backdrop-blur-sm rounded-full mb-4">
              <div className="text-6xl">✝</div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg">
              Bienvenidos a Nuestra Parroquia
            </h1>
            
            <p className="text-lg md:text-xl text-blue-100 drop-shadow-md">
              Un lugar donde la fe, la esperanza y el amor se encuentran
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              {!isAuthenticated ? (
                <>
                  <Link 
                    to="/register" 
                    className="px-8 py-4 bg-white text-blue-700 rounded-xl font-semibold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Únete a Nuestra Comunidad
                  </Link>
                  <Link 
                    to="/calendarios/eventos" 
                    className="px-8 py-4 bg-blue-600 bg-opacity-80 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-opacity-100 transition-all shadow-lg"
                  >
                    Ver Próximos Eventos
                  </Link>
                </>
              ) : (
                <Link 
                  to="/solicitudes" 
                  className="px-8 py-4 bg-white text-blue-700 rounded-xl font-semibold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Solicitar Documentos
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
