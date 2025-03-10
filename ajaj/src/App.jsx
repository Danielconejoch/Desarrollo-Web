import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [provincias, setProvincias] = useState([]);
  const [cantones, setCantones] = useState([]);
  const [distritos, setDistritos] = useState([]);
  const [selectedProvincia, setSelectedProvincia] = useState("");
  const [selectedCanton, setSelectedCanton] = useState("");

  useEffect(() => {
    // Obtener las provincias al cargar la página
    axios
      .get(
        "https://titanic.ecci.ucr.ac.cr/~ec12243/Desarrollo-Web/ajaj/php/provincias.php"
      )
      .then((response) => setProvincias(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleProvinciaChange = (e) => {
    const provinciaId = e.target.value;
    setSelectedProvincia(provinciaId);

    // Obtener los cantones de la provincia seleccionada
    axios
      .post(
        "https://titanic.ecci.ucr.ac.cr/~ec12243/Desarrollo-Web/ajaj/php/cantones.php",
        { id: provinciaId }
      )
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
      .post(
        "https://titanic.ecci.ucr.ac.cr/~ec12243/Desarrollo-Web/ajaj/php/distritos.php",
        { id: cantonId }
      )
      .then((response) => setDistritos(response.data))
      .catch((error) => console.log(error));
  };

  return (
    <div className="App centered-container">
      <div className="form-container">
        <h3 className="text-left">Seleccione una ubicación</h3>

        <form className="text-left">
          <div className="form-group">
            <label>Provincia:</label>
            <select
              className="form-control"
              value={selectedProvincia}
              onChange={handleProvinciaChange}
            >
              <option value="">Seleccione una provincia</option>
              {provincias.map((provincia) => (
                <option key={provincia.id} value={provincia.id}>
                  {provincia.nombre}
                </option>
              ))}
            </select>
          </div>

          {cantones.length > 0 && (
            <div className="form-group mt-3">
              <label>Cantón:</label>
              <select
                className="form-control"
                value={selectedCanton}
                onChange={handleCantonChange}
              >
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
            <div className="form-group mt-3">
              <label>Distrito:</label>
              <select className="form-control">
                <option value="">Seleccione un distrito</option>
                {distritos.map((distrito) => (
                  <option key={distrito.id} value={distrito.id}>
                    {distrito.nombre}
                  </option>
                ))}
              </select>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default App;
