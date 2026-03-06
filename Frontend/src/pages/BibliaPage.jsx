import { useState, useEffect, useMemo } from "react";
import { BookOpen, ChevronLeft, ChevronRight, List, X } from "lucide-react";

export const BibliaPage = () => {
  const [libroSeleccionado, setLibroSeleccionado] = useState("John");
  const [capituloActual, setCapituloActual] = useState(3);
  const [texto, setTexto] = useState("");
  const [loading, setLoading] = useState(false);
  const [mostrarMenu, setMostrarMenu] = useState(false);

  // Lista de libros (id en inglés para tu lógica, nombre en español para mostrar)
  const librosBiblia = useMemo(
    () => [
      // Antiguo Testamento
      { id: "Genesis", nombre: "Génesis", caps: 50, testamento: "AT" },
      { id: "Exodus", nombre: "Éxodo", caps: 40, testamento: "AT" },
      { id: "Leviticus", nombre: "Levítico", caps: 27, testamento: "AT" },
      { id: "Numbers", nombre: "Números", caps: 36, testamento: "AT" },
      { id: "Deuteronomy", nombre: "Deuteronomio", caps: 34, testamento: "AT" },
      { id: "Joshua", nombre: "Josué", caps: 24, testamento: "AT" },
      { id: "Judges", nombre: "Jueces", caps: 21, testamento: "AT" },
      { id: "Ruth", nombre: "Rut", caps: 4, testamento: "AT" },
      { id: "1Samuel", nombre: "1 Samuel", caps: 31, testamento: "AT" },
      { id: "2Samuel", nombre: "2 Samuel", caps: 24, testamento: "AT" },
      { id: "1Kings", nombre: "1 Reyes", caps: 22, testamento: "AT" },
      { id: "2Kings", nombre: "2 Reyes", caps: 25, testamento: "AT" },
      { id: "Psalms", nombre: "Salmos", caps: 150, testamento: "AT" },
      { id: "Proverbs", nombre: "Proverbios", caps: 31, testamento: "AT" },
      { id: "Isaiah", nombre: "Isaías", caps: 66, testamento: "AT" },

      // Nuevo Testamento
      { id: "Matthew", nombre: "Mateo", caps: 28, testamento: "NT" },
      { id: "Mark", nombre: "Marcos", caps: 16, testamento: "NT" },
      { id: "Luke", nombre: "Lucas", caps: 24, testamento: "NT" },
      { id: "John", nombre: "Juan", caps: 21, testamento: "NT" },
      { id: "Acts", nombre: "Hechos", caps: 28, testamento: "NT" },
      { id: "Romans", nombre: "Romanos", caps: 16, testamento: "NT" },
      { id: "1Corinthians", nombre: "1 Corintios", caps: 16, testamento: "NT" },
      { id: "2Corinthians", nombre: "2 Corintios", caps: 13, testamento: "NT" },
      { id: "Galatians", nombre: "Gálatas", caps: 6, testamento: "NT" },
      { id: "Ephesians", nombre: "Efesios", caps: 6, testamento: "NT" },
      { id: "Philippians", nombre: "Filipenses", caps: 4, testamento: "NT" },
      { id: "Colossians", nombre: "Colosenses", caps: 4, testamento: "NT" },
      { id: "1Thessalonians", nombre: "1 Tesalonicenses", caps: 5, testamento: "NT" },
      { id: "2Thessalonians", nombre: "2 Tesalonicenses", caps: 3, testamento: "NT" },
      { id: "1Timothy", nombre: "1 Timoteo", caps: 6, testamento: "NT" },
      { id: "2Timothy", nombre: "2 Timoteo", caps: 4, testamento: "NT" },
      { id: "Titus", nombre: "Tito", caps: 3, testamento: "NT" },
      { id: "Hebrews", nombre: "Hebreos", caps: 13, testamento: "NT" },
      { id: "James", nombre: "Santiago", caps: 5, testamento: "NT" },
      { id: "1Peter", nombre: "1 Pedro", caps: 5, testamento: "NT" },
      { id: "2Peter", nombre: "2 Pedro", caps: 3, testamento: "NT" },
      { id: "1John", nombre: "1 Juan", caps: 5, testamento: "NT" },
      { id: "2John", nombre: "2 Juan", caps: 1, testamento: "NT" },
      { id: "3John", nombre: "3 Juan", caps: 1, testamento: "NT" },
      { id: "Jude", nombre: "Judas", caps: 1, testamento: "NT" },
      { id: "Revelation", nombre: "Apocalipsis", caps: 22, testamento: "NT" },
    ],
    []
  );

  // Mapa id -> slug esperado por la API (rv1960)
  const BOOK_SLUG = useMemo(
    () => ({
      Genesis: "genesis",
      Exodus: "exodo",
      Leviticus: "levitico",
      Numbers: "numeros",
      Deuteronomy: "deuteronomio",
      Joshua: "josue",
      Judges: "jueces",
      Ruth: "rut",
      "1Samuel": "1samuel",
      "2Samuel": "2samuel",
      "1Kings": "1reyes",
      "2Kings": "2reyes",
      Psalms: "salmos",
      Proverbs: "proverbios",
      Isaiah: "isaias",

      Matthew: "mateo",
      Mark: "marcos",
      Luke: "lucas",
      John: "juan",
      Acts: "hechos",
      Romans: "romanos",
      "1Corinthians": "1corintios",
      "2Corinthians": "2corintios",
      Galatians: "galatas",
      Ephesians: "efesios",
      Philippians: "filipenses",
      Colossians: "colosenses",
      "1Thessalonians": "1tesalonicenses",
      "2Thessalonians": "2tesalonicenses",
      "1Timothy": "1timoteo",
      "2Timothy": "2timoteo",
      Titus: "tito",
      Hebrews: "hebreos",
      James: "santiago",
      "1Peter": "1pedro",
      "2Peter": "2pedro",
      "1John": "1juan",
      "2John": "2juan",
      "3John": "3juan",
      Jude: "judas",
      Revelation: "apocalipsis",
    }),
    []
  );

  const libroActual = useMemo(
    () => librosBiblia.find((l) => l.id === libroSeleccionado),
    [librosBiblia, libroSeleccionado]
  );

  const cargarCapitulo = async (libroId, cap) => {
  setLoading(true);
  setTexto("");

  try {
    const slug = BOOK_SLUG[libroId];
    if (!slug) {
      setTexto("Libro no soportado todavía en la API.");
      return;
    }

    const url = `https://bible-api.deno.dev/api/read/rv1960/${slug}/${cap}`;
    console.log("Cargando:", url);

    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    console.log("Respuesta API:", data);

    // 🔥 AQUÍ ESTÁ EL CAMBIO IMPORTANTE
    if (Array.isArray(data?.vers)) {
      const textoFormateado = data.vers
        .map(v => `${v.number}. ${v.verse}`)
        .join("\n\n");

      setTexto(textoFormateado);
    } else {
      setTexto("No se pudo cargar el contenido.");
    }

  } catch (error) {
    console.error("Error:", error);
    setTexto("Error al cargar el capítulo. Intenta nuevamente.");
  } finally {
    setLoading(false);
  }
};
  // Cargar cada vez que cambie libro/capítulo
  useEffect(() => {
    cargarCapitulo(libroSeleccionado, capituloActual);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [libroSeleccionado, capituloActual]);

  const cambiarPagina = (direccion) => {
    if (!libroActual) return;

    let nuevoCap = capituloActual + direccion;
    let nuevoLibro = libroSeleccionado;

    if (nuevoCap > libroActual.caps) {
      const indexLibroActual = librosBiblia.findIndex((l) => l.id === libroSeleccionado);
      if (indexLibroActual < librosBiblia.length - 1) {
        nuevoLibro = librosBiblia[indexLibroActual + 1].id;
        nuevoCap = 1;
      } else {
        return;
      }
    }

    if (nuevoCap < 1) {
      const indexLibroActual = librosBiblia.findIndex((l) => l.id === libroSeleccionado);
      if (indexLibroActual > 0) {
        nuevoLibro = librosBiblia[indexLibroActual - 1].id;
        const libroAnterior = librosBiblia[indexLibroActual - 1];
        nuevoCap = libroAnterior.caps;
      } else {
        return;
      }
    }

    setLibroSeleccionado(nuevoLibro);
    setCapituloActual(nuevoCap);
  };

  const seleccionarLibroCapitulo = (libro, cap) => {
    setLibroSeleccionado(libro);
    setCapituloActual(cap);
    setMostrarMenu(false);
  };

  // Dividir el texto en dos columnas (mitades)
  const parrafos = useMemo(
    () => texto.split("\n\n").filter((p) => p.trim()),
    [texto]
  );
  const mitad = Math.ceil(parrafos.length / 2);
  const columnaIzquierda = parrafos.slice(0, mitad);
  const columnaDerecha = parrafos.slice(mitad);

  const esPrimeraPagina = libroSeleccionado === "Genesis" && capituloActual === 1;
  const esUltimaPagina = libroSeleccionado === "Revelation" && capituloActual === 22;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <BookOpen className="text-sage-700" size={40} />
            <h1 className="text-4xl md:text-5xl font-serif text-sage-900">Sagrada Biblia</h1>
          </div>
          <p className="text-sage-700 text-sm tracking-wider">REINA VALERA 1960</p>
        </div>

        {/* Libro abierto */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/10 rounded-lg transform translate-y-2 blur-xl"></div>

          <div className="relative bg-white rounded-lg shadow-2xl overflow-hidden border-4 border-amber-200">
            {/* Páginas */}
            <div className="grid grid-cols-1 md:grid-cols-2 min-h-[600px]">
              {/* Página Izquierda */}
              <div className="p-8 md:p-12 bg-gradient-to-br from-amber-50 to-white border-r-2 border-amber-200/50 relative">
                <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-sage-300 opacity-30"></div>
                <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-sage-300 opacity-30"></div>

                <div className="h-full flex flex-col">
                  {loading ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage-700 mx-auto mb-4"></div>
                        <p className="text-sage-600 text-sm">Cargando...</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="mb-6 pb-4 border-b-2 border-sage-200">
                        <h2 className="text-2xl font-serif text-sage-900 text-center">
                          {libroActual?.nombre || libroSeleccionado}
                        </h2>
                        <p className="text-center text-3xl font-elegant text-sage-700 mt-2">
                          Capítulo {capituloActual}
                        </p>
                      </div>

                      <div className="flex-1 overflow-y-auto pr-4" style={{ maxHeight: "450px" }}>
                        {columnaIzquierda.map((parrafo, i) => (
                          <p key={i} className="text-gray-800 leading-relaxed mb-4 text-justify font-serif">
                            {parrafo}
                          </p>
                        ))}
                      </div>

                      <div className="text-center mt-4 pt-4 border-t border-sage-200">
                        <span className="text-xs text-sage-500 font-serif">~ {capituloActual} ~</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Página Derecha */}
              <div className="p-8 md:p-12 bg-gradient-to-bl from-amber-50 to-white relative">
                <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-sage-300 opacity-30"></div>
                <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-sage-300 opacity-30"></div>

                <div className="h-full flex flex-col">
                  {!loading && (
                    <>
                      <div className="flex-1 overflow-y-auto pr-4 mt-20" style={{ maxHeight: "450px" }}>
                        {columnaDerecha.map((parrafo, i) => (
                          <p key={i} className="text-gray-800 leading-relaxed mb-4 text-justify font-serif">
                            {parrafo}
                          </p>
                        ))}
                      </div>

                      <div className="text-center mt-4 pt-4 border-t border-sage-200">
                        <span className="text-xs text-sage-500 font-serif">~ {capituloActual} ~</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Controles */}
            <div className="bg-gradient-to-r from-sage-800 to-sage-900 p-4">
              <div className="flex items-center justify-between max-w-4xl mx-auto">
                <button
                  onClick={() => cambiarPagina(-1)}
                  disabled={esPrimeraPagina}
                  className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-md transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={20} />
                  <span className="hidden sm:inline text-sm">Anterior</span>
                </button>

                <button
                  onClick={() => setMostrarMenu(!mostrarMenu)}
                  className="flex items-center gap-2 px-6 py-3 bg-white text-sage-800 rounded-md hover:bg-sage-50 transition-all font-medium shadow-md"
                >
                  <List size={20} />
                  <span className="text-sm">Índice</span>
                </button>

                <button
                  onClick={() => cambiarPagina(1)}
                  disabled={esUltimaPagina}
                  className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-md transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <span className="hidden sm:inline text-sm">Siguiente</span>
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal de Índice */}
        {mostrarMenu && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
              <div className="bg-gradient-to-r from-sage-700 to-sage-800 p-6 flex items-center justify-between">
                <h3 className="text-2xl font-serif text-white">Índice de la Biblia</h3>
                <button
                  onClick={() => setMostrarMenu(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="text-white" size={24} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto" style={{ maxHeight: "calc(80vh - 100px)" }}>
                <div className="mb-8">
                  <h4 className="text-xl font-serif text-sage-900 mb-4 pb-2 border-b-2 border-sage-200">
                    Antiguo Testamento
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {librosBiblia
                      .filter((l) => l.testamento === "AT")
                      .map((libro) => (
                        <div
                          key={libro.id}
                          className="border border-sage-200 rounded-lg p-3 hover:bg-sage-50 transition-colors"
                        >
                          <p className="font-semibold text-sage-900 mb-2">{libro.nombre}</p>
                          <div className="flex flex-wrap gap-1">
                            {Array.from({ length: Math.min(libro.caps, 10) }, (_, i) => (
                              <button
                                key={i + 1}
                                onClick={() => seleccionarLibroCapitulo(libro.id, i + 1)}
                                className="px-2 py-1 text-xs bg-sage-100 hover:bg-sage-700 hover:text-white rounded transition-colors"
                              >
                                {i + 1}
                              </button>
                            ))}
                            {libro.caps > 10 && (
                              <span className="px-2 py-1 text-xs text-sage-600">+{libro.caps - 10}</span>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-serif text-sage-900 mb-4 pb-2 border-b-2 border-sage-200">
                    Nuevo Testamento
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {librosBiblia
                      .filter((l) => l.testamento === "NT")
                      .map((libro) => (
                        <div
                          key={libro.id}
                          className="border border-sage-200 rounded-lg p-3 hover:bg-sage-50 transition-colors"
                        >
                          <p className="font-semibold text-sage-900 mb-2">{libro.nombre}</p>
                          <div className="flex flex-wrap gap-1">
                            {Array.from({ length: libro.caps }, (_, i) => (
                              <button
                                key={i + 1}
                                onClick={() => seleccionarLibroCapitulo(libro.id, i + 1)}
                                className="px-2 py-1 text-xs bg-sage-100 hover:bg-sage-700 hover:text-white rounded transition-colors"
                              >
                                {i + 1}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};