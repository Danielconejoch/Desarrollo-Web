import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [provincias, setProvincias] = useState([]);
  const [cantones, setCantones] = useState([]);
  const [distritos, setDistritos] = useState([]);
  const [selectedProvincia, setSelectedProvincia] = useState("");
  const [selectedCanton, setSelectedCanton] = useState("");

  useEffect(() => {
    // Obtener las provincias al cargar la página
    axios
      .get("http://localhost/provincias.php")
      .then((response) => setProvincias(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleProvinciaChange = (e) => {
    const provinciaId = e.target.value;
    setSelectedProvincia(provinciaId);

    // Obtener los cantones de la provincia seleccionada
    axios
      .post("http://localhost/cantones.php", { id: provinciaId })
      .then((response) => setCantones(response.data))
      .catch((error) => console.log(error));

    // Resetear distritos cuando cambia la provincia
    setDistritos([]);
  };

  const handleCantonChange = (e) => {
    const cantonId = e.target.value;
    setSelectedCanton(cantonId);

    // Obtener los distritos del cantón seleccionado
    axios
      .post("http://localhost/distritos.php", { id: cantonId })
      .then((response) => setDistritos(response.data))
      .catch((error) => console.log(error));
  };

  return (
    <div className="App">
      <h2>Selecciona tu ubicación:</h2>

      <div>
        <label>Provincia:</label>
        <select value={selectedProvincia} onChange={handleProvinciaChange}>
          <option value="">Seleccione una provincia</option>
          {provincias.map((provincia) => (
            <option key={provincia.id} value={provincia.id}>
              {provincia.nombre}
            </option>
          ))}
        </select>
      </div>

      {cantones.length > 0 && (
        <div>
          <label>Cantón:</label>
          <select value={selectedCanton} onChange={handleCantonChange}>
            <option value="">Seleccione un cantón</option>
            {cantones.map((canton) => (
              <option key={canton.id} value={canton.id}>
                {canton.nombre}
              </option>
            ))}
          </select>
        </div>
      )}

      {distritos.length > 0 && (
        <div>
          <label>Distrito:</label>
          <select>
            <option value="">Seleccione un distrito</option>
            {distritos.map((distrito) => (
              <option key={distrito.id} value={distrito.id}>
                {distrito.nombre}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

export default App;
