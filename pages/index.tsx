import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "tailwindcss/tailwind.css";
import { proxy, subscribe, useSnapshot } from "valtio";
import Registrar from "../components/register";
import { dataUsers } from "./api/dataUsers";
import Image from "next/image";

export const info = proxy({ cedula: "", nombre: "", apellido: "", idProy: "" });
subscribe(info, () => {
  info.nombre && localStorage.setItem("nombre", info.nombre);
  info.apellido && localStorage.setItem("apellido", info.apellido);
});

export default function Welcome() {
  const route = useRouter();
  const [intro, setIntro] = useState<1 | 2>(1);
  setTimeout(() => setIntro(2), 5000);
  const cedulaPassword = dataUsers.map((u) => [u.cedula, u.password]);
  console.log(cedulaPassword);
  const snap = useSnapshot(info);
  const [match, setMatch] = useState<boolean>(true);
  const {
    register: registerUsuario,
    handleSubmit: handleSubmitUsuario,
    watch: watchUsuario,
    formState: { errors: errorUsuario },
    setValue: setValueUsuario,
    control: controlUsuario,
  } = useForm<Usuario>();

  function onSubmit(user: Usuario) {
    const u = dataUsers.find(
      (i) => i.cedula == user.cedula && i.password == user.password
    );
    if (u) {
      info.cedula = u.cedula;
      info.nombre = u.nombre;
      info.apellido = u.apellido;
      setMatch(true);
      route.push(`/home`);
    } else setMatch(false);
  }

  return (
    <div className="absolute flex h-screen w-screen justify-center">
      <Image
        src={"/icons/PORTADA.jpg"}
        width={800}
        height={480}
        className="object-cover"
      />

      {intro == 1 && (
        <div className="flex flex-col absolute justify-center gap-5 items-center h-screen w-screen bg-black bg-opacity-50">
          <Image
            src={"/icons/HUPRO LOGO.png"}
            width={172}
            height={50}
            className="animate-fade-in-down"
          />
          <span className="animate animate-fade-in-up flex flex-col w-4/5 leading-5 text-2xl text-center font-medium text-gray-100">
            <span>
              Si buscas un <a className="text-yellow-300">BIEN</a>
            </span>
            <span>
              Te encontramos tu <a className="text-yellow-300">BIEN-ESTAR</a>
            </span>
          </span>
        </div>
      )}

      {intro == 2 && (
        <div className="absolute flex flex-col h-auto gap-y-10 w-11/12 items-center mt-32 bg-black bg-opacity-50 py-4">
          <form
            onSubmit={handleSubmitUsuario(onSubmit)}
            className="animate-fade-in-down flex flex-col xs:w-11/12 md:w-2/3 gap-y-2 m-0"
          >
            <span className="text-2xl text-center text-gray-100 font-extrabold mb-6 md:mb-10">
              Acceder
            </span>
            {match === false && (
              <a className="text-xs text-red-600 ">
                Cédula o contraseña incorrecta
              </a>
            )}
            <input
              type="text"
              {...registerUsuario("cedula", { required: true })}
              placeholder="Cédula"
              className="flex form-input border-0 border-b placeholder-gray-400 border-gray-400"
            />
            {errorUsuario.cedula && (
              <span className="text-red-500 text-sm">Campo obligatorio</span>
            )}
            <input
              type="password"
              {...registerUsuario("password", { required: true })}
              placeholder="Contraseña"
              className="form-input border-0 border-b placeholder-gray-400 border-gray-400"
            />
            {errorUsuario.password && (
              <span className="text-red-500 text-sm">Campo obligatorio</span>
            )}

            <button
              type="submit"
              className=" bg-gradient-to-r from-blue-500 to-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-10 rounded"
            >
              Ingresar
            </button>
          </form>
          <div className="animate-fade-in-up flex flex-col text-sm md:text-lg w-screen h-12 px-5 gap-x-6 text-gray-100 items-center">
            ¿Aún no tienes una cuenta?
            <Link href="/newUser">
              <a className="text-blue-400"> Crea una nueva aquí</a>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
