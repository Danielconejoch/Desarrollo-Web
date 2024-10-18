import { useState } from "react";

function App() {
  const performanceTests = [
    {
      id: 1,
      server: "Node.js",
      requestsPerSecond: 24255.91,
      timePerRequest: 4.123,
      transferRate: "2700.37 Kbytes/sec",
      failedRequests: 0,
      totalRequests: 100000,
      totalTime: "4.123 seconds",
      chartImage: "./assets/nodejs_chart.png",
    },
    {
      id: 2,
      server: ".NET",
      requestsPerSecond: 37849.13,
      timePerRequest: 2.642,
      transferRate: "5396.46 Kbytes/sec",
      failedRequests: 0,
      totalRequests: 100000,
      totalTime: "2.642 seconds",
      chartImage: "./assets/net_chart.png",
    },
    {
      id: 3,
      server: "ReactPHP",
      requestsPerSecond: 15983.26,
      timePerRequest: 6.257,
      transferRate: "2356.91 Kbytes/sec",
      failedRequests: 0,
      totalRequests: 100000,
      totalTime: "6.257 seconds",
      chartImage: "./assets/reactphp_chart.png",
    },
  ];

  return (
    <div className="min-h-screen bg-white py-24 sm:py-32">
      <div className="mx-auto w-full px-6 lg:px-8">
        <div className="mx-auto max-w-full text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Reporte de Pruebas de Rendimiento
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Este informe detalla los resultados de las pruebas de rendimiento en
            servidores Node.js, .NET y ReactPHP utilizando ApacheBench (ab).
          </p>

          <div className="flex justify-center mt-10">
            <div className="bg-white max-w-lg shadow-lg rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-semibold text-gray-900">
                Ambiente de Pruebas
              </h2>
              <ul className="mt-4 text-gray-600 text-left space-y-2">
                <li>Sistema Operativo: Ubuntu 24.04 (WSL2 en Windows)</li>
                <li>
                  Procesador: 12th Gen Intel(R) Core(TM) i5-12450H 2.00 GHz
                </li>
                <li>Memoria RAM: 16 GB DDR4</li>
                <li>Herramienta de Pruebas: ApacheBench (ab)</li>
                <li>Número total de solicitudes: 100,000</li>
                <li>Concurrencia: 100 solicitudes simultáneas</li>
              </ul>
            </div>
          </div>

          {/* Sección de resultados */}
          <div className="mt-10">
            <h3 className="text-2xl font-semibold text-gray-900">
              Resultados de Pruebas
            </h3>
            <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
              {performanceTests.map((test) => (
                <article
                  key={test.id}
                  className="flex flex-col items-center justify-between p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                >
                  <div className="text-xl font-semibold text-gray-900 mb-4">
                    {test.server}
                  </div>
                  <table className="table-auto w-full text-left mb-4">
                    <tbody>
                      <tr>
                        <td className="font-semibold text-gray-600">
                          Requests per second:
                        </td>
                        <td>{test.requestsPerSecond}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold text-gray-600">
                          Time per request:
                        </td>
                        <td>{test.timePerRequest} ms</td>
                      </tr>
                      <tr>
                        <td className="font-semibold text-gray-600">
                          Transfer rate:
                        </td>
                        <td>{test.transferRate}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold text-gray-600">
                          Failed requests:
                        </td>
                        <td>{test.failedRequests}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold text-gray-600">
                          Total requests:
                        </td>
                        <td>{test.totalRequests}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold text-gray-600">
                          Total time:
                        </td>
                        <td>{test.totalTime}</td>
                      </tr>
                    </tbody>
                  </table>
                  {/* Imagen del gráfico */}
                  <img
                    src={test.chartImage}
                    alt={`${test.server} chart`}
                    className="w-full h-auto rounded-lg"
                  />
                </article>
              ))}
            </div>
          </div>

          {/* Gráficos de comparación */}
          <div className="mt-16">
            <h3 className="text-2xl font-semibold text-gray-900">
              Comparación de Gráficos
            </h3>
            <p className="mt-4 text-lg text-gray-600">
              A continuación, se muestran los gráficos de comparación entre los
              diferentes servidores basados en las métricas obtenidas.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-3">
              <img
                src="./assets/requests_per_second_comparison.png"
                alt="Comparación Requests per Second"
                className="w-full h-auto rounded-lg"
              />
              <img
                src="./assets/time_per_request_comparison.png"
                alt="Comparación Time per Request"
                className="w-full h-auto rounded-lg"
              />
              <img
                src="./assets/transfer_rate_comparison.png"
                alt="Comparación Transfer Rate"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
