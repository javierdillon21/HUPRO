import React, { FormEventHandler, useState } from "react";
import { useForm } from "react-hook-form";
import "tailwindcss/tailwind.css";
import { Router, useRouter } from "next/router";
import Header from "./header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { dataUsers } from "../pages/api/dataUsers";

export default function Registrar() {
  const route = useRouter();
  const [match, setMatch] = useState<boolean | "ok">(false);
  const {
    register: registerUsuario,
    handleSubmit: handleSubmitUsuario,
    watch: watchUsuario,
    formState: { errors: errorUsuario },
    setValue: setValueUsuario,
    control: controlUsuario,
  } = useForm<Usuario>();

  function Submit(user: Usuario) {
    dataUsers.forEach((u, i) => {
      if (u.cedula == user.cedula) {
        setMatch(true);
        console.log("ya existe");
      } else {
        if (match === true) {
        } else {
          setMatch("ok");
        }
      }
    });
    if (match === "ok")
      route.push(`/platform/${user.cedula}:${user.nombre}:${user.apellido}`);
  }

  return (
    <>
      <Header canUback={true} routeBack={"/"} tabTitle={"Nueva cuenta"} />
      <div className="flex flex-col gap-y-10 items-center mt-16">
        <form
          onSubmit={handleSubmitUsuario(Submit)}
          className="flex flex-col xs:w-11/12 md:w-2/3 gap-y-2 m-0"
        >
          <span className="text-3xl font-extrabold mb-4">Datos Personales</span>
          {match === true && (
            <a className="text-xs text-red-600 ">
              Esta cédula pertenece a un usuario ya existente
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
            type="text"
            {...registerUsuario("nombre", { required: true })}
            placeholder="Nombres"
            className="form-input border-0 border-b placeholder-gray-400 border-gray-400"
          />
          {errorUsuario.nombre && (
            <span className="text-red-500 text-sm">Campo obligatorio</span>
          )}
          <input
            type="text"
            {...registerUsuario("apellido", { required: true })}
            placeholder="Apellidos"
            className="form-input border-0 border-b placeholder-gray-400 border-gray-400"
          />
          {errorUsuario.apellido && (
            <span className="text-red-500 text-sm">Campo obligatorio</span>
          )}
          <input
            type="text"
            {...registerUsuario("correo", { required: true })}
            placeholder="E-mail"
            className="form-input border-0 border-b placeholder-gray-400 border-gray-400"
          />
          {errorUsuario.correo && (
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
            REGISTRAR
          </button>
        </form>

        <div className="flex flex-col text-sm md:text-lg w-screen h-12 px-5 gap-x-6 items-center">
          ¿Ya tienes una cuenta?
          <Link href="/">
            <a className="text-blue-800"> Ingresa con tu cuenta</a>
          </Link>
        </div>
      </div>
    </>
  );
}
