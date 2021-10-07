import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { route } from "next/dist/server/router";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Header from "../../components/header";

export default function Test() {
  const route = useRouter();
  console.log(route);

  const [numberForm, setNumberForm] = useState<1 | 2 | 3 | 4 | 5>(1);
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <form className="flex flex-col justify-center gap-2 w-2/3">
        {/* //FORMULARIO 1 */}
        {numberForm == 1 && (
          <>
            <span className="text-2xl text-center leading-6 font-extrabold mb-8">
              Elija las opciones acorde a sus preferencias
            </span>
            <span className="text-md text-center font-normal mt-4 mb-2 ">
              Usted desea...
            </span>
            <label className="flex h-10 rounded-md shadow-md items-center px-2 gap-3 text-sm ">
              <input
                type="checkbox"
                className="form-checkbox appearance-none checked:bg-blue-600 checked:border-transparent"
              ></input>
              Proyectos
            </label>

            <label className="flex h-10 rounded-md shadow-md items-center px-2 gap-3 text-sm ">
              <input
                type="checkbox"
                className="form-checkbox appearance-none checked:bg-blue-600 checked:border-transparent"
              ></input>
              Comprar
            </label>

            <label className="flex h-10 rounded-md shadow-md items-center px-2 gap-3 text-sm">
              <input
                type="checkbox"
                className="form-checkbox appearance-none checked:bg-blue-600 checked:border-transparent"
              ></input>
              Alquilar
            </label>
            <span
              onClick={() => setNumberForm(2)}
              className="mt-8 text-md font-medium text-right text-blue-600"
            >
              Siguiente
            </span>
          </>
        )}

        {/* FORMULARIO 2 */}
        {numberForm == 2 && (
          <>
            <span className="text-2xl text-center leading-6 font-extrabold mb-8">
              Elija las opciones acorde a sus preferencias
            </span>
            <span className="text-md text-center font-normal mt-4 mb-2 ">
              Qué está buscando?
            </span>
            <label className="flex h-10 rounded-md shadow-md items-center px-2 gap-3 text-sm ">
              <input
                type="checkbox"
                className="form-checkbox appearance-none checked:bg-blue-600 checked:border-transparent"
              ></input>
              Villas
            </label>

            <label className="flex h-10 rounded-md shadow-md items-center px-2 gap-3 text-sm ">
              <input
                type="checkbox"
                className="form-checkbox appearance-none checked:bg-blue-600 checked:border-transparent"
              ></input>
              Terrenos
            </label>

            <label className="flex h-10 rounded-md shadow-md items-center px-2 gap-3 text-sm">
              <input
                type="checkbox"
                className="form-checkbox appearance-none checked:bg-blue-600 checked:border-transparent"
              ></input>
              Apartamentos
            </label>

            <label className="flex h-10 rounded-md shadow-md items-center px-2 gap-3 text-sm">
              <input
                type="checkbox"
                className="form-checkbox appearance-none checked:bg-blue-600 checked:border-transparent"
              ></input>
              Casas de Retiro
            </label>

            <span
              onClick={() => setNumberForm(3)}
              className="mt-8 text-md font-medium text-right text-blue-600"
            >
              Siguiente
            </span>
          </>
        )}

        {/* FORMULARIO 3 */}
        {numberForm == 3 && (
          <>
            <span className="text-2xl text-center leading-6 font-extrabold mb-8">
              Elija las opciones acorde a sus preferencias
            </span>
            <span className="text-md text-center font-normal mt-4 mb-2 ">
              Rango de precio
            </span>
            <span className="flex flex-col h-20 rounded-md shadow-md items-start justify-center px-2 text-sm ">
              <p>Desde:</p>
              <a className="flex items-center text-lg font-medium text-gray-700">
                $
                <input
                  type="number"
                  placeholder="0.00"
                  className="input-input flex w-full border-gray-400 border-0 border-b"
                ></input>
              </a>
            </span>
            <span className="flex flex-col h-20 rounded-md shadow-md items-start justify-center px-2 text-sm ">
              <p>Hasta:</p>
              <a className="flex items-center text-lg font-medium text-gray-700">
                $
                <input
                  type="number"
                  placeholder="0.00"
                  className="input-input flex w-full border-gray-400 border-0 border-b"
                ></input>
              </a>
            </span>

            <span
              onClick={() => setNumberForm(4)}
              className="mt-4 text-md font-medium text-right text-blue-600"
            >
              Siguiente
            </span>
          </>
        )}

        {/* FORMULARIO 4 */}
        {numberForm == 4 && (
          <>
            <span className="text-2xl text-center leading-6 font-extrabold mb-8">
              Elija las opciones acorde a sus preferencias
            </span>
            <span className="text-md text-center font-normal mt-4 mb-2 ">
              Número de habitaciones
            </span>

            <div>
              <label className="flex h-10 rounded-md shadow-md items-center px-2 gap-3 text-sm ">
                <input
                  type="checkbox"
                  name="numero_habitaciones"
                  value="2"
                  className="form-checkbox appearance-none checked:bg-blue-600 checked:border-transparent"
                ></input>
                2
              </label>

              <label className="flex h-10 rounded-md shadow-md items-center px-2 gap-3 text-sm ">
                <input
                  name="numero_habitaciones"
                  type="checkbox"
                  value="3"
                  className="form-checkbox appearance-none checked:bg-blue-600 checked:border-transparent"
                ></input>
                3
              </label>

              <label className="flex h-10 rounded-md shadow-md items-center px-2 gap-3 text-sm">
                <input
                  name="numero_habitaciones"
                  type="checkbox"
                  value="4"
                  className="form-checkbox appearance-none checked:bg-blue-600 checked:border-transparent"
                ></input>
                4
              </label>

              <label className="flex h-10 rounded-md shadow-md items-center px-2 gap-3 text-sm">
                <input
                  name="numero_habitaciones"
                  type="checkbox"
                  value="5"
                  className="form-checkbox appearance-none checked:bg-blue-600 checked:border-transparent"
                ></input>
                5
              </label>
            </div>
            <a
              onClick={() => setNumberForm(5)}
              className="mt-8 text-md font-medium text-right text-blue-600"
            >
              Siguiente
            </a>
          </>
        )}
        {/* FORMULARIO 5 */}
        {numberForm == 5 && (
          <>
            <span className="text-2xl text-center leading-6 font-extrabold mb-3">
              Elija las opciones acorde a sus preferencias
            </span>
            <span className="text-md text-center font-normal mt-1 mb-2 ">
              Sector
            </span>
            <label className="flex h-10 rounded-md shadow-md items-center px-2 gap-3 text-sm ">
              <input
                type="checkbox"
                className="form-checkbox appearance-none checked:bg-blue-600 checked:border-transparent"
              ></input>
              Norte
            </label>

            <label className="flex h-10 rounded-md shadow-md items-center px-2 gap-3 text-sm ">
              <input
                type="checkbox"
                className="form-checkbox appearance-none checked:bg-blue-600 checked:border-transparent"
              ></input>
              Sur
            </label>

            <label className="flex h-10 rounded-md shadow-md items-center px-2 gap-3 text-sm">
              <input
                type="checkbox"
                className="form-checkbox appearance-none checked:bg-blue-600 checked:border-transparent"
              ></input>
              Centro
            </label>

            <label className="flex h-10 rounded-md shadow-md items-center px-2 gap-3 text-sm">
              <input
                type="checkbox"
                className="form-checkbox appearance-none checked:bg-blue-600 checked:border-transparent"
              ></input>
              Urbano
            </label>
            <label className="flex h-10 rounded-md shadow-md items-center px-2 gap-3 text-sm">
              <input
                type="checkbox"
                className="form-checkbox appearance-none checked:bg-blue-600 checked:border-transparent"
              ></input>
              Vía a la Costa
            </label>
            <Link href={`./navegation/${route.query.id}`}>
              <span
                onClick={() => setNumberForm(5)}
                className="mt-8 text-md font-medium text-right text-blue-600"
              >
                Aceptar
              </span>
            </Link>
          </>
        )}
        <Link href={`./navegation/${route.query.id}`}>
          <a className="mt-10 text-md font-medium text-left text-red-600">
            Omitir test
          </a>
        </Link>
      </form>
    </div>
  );
}
