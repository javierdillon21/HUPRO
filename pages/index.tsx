import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "tailwindcss/tailwind.css";
import Registrar from "../components/register";
import { dataUsers } from "./api/dataUsers";

export default function Welcome() {
  const route = useRouter();
  const [match, setMatch] = useState<boolean | "ok">(true);
  const {
    register: registerUsuario,
    handleSubmit: handleSubmitUsuario,
    watch: watchUsuario,
    formState: { errors: errorUsuario },
    setValue: setValueUsuario,
    control: controlUsuario,
  } = useForm<Usuario>();

  function onSubmit(user: Usuario) {
    dataUsers.forEach((u, i) => {
      if (u.cedula === user.cedula && u.password === user.password) {
        route.push(
          `/platform/navegation/${u.cedula}:${u.nombre}:${u.apellido}`
        );
        console.log("match");
        setMatch("ok");

        //setMatch(true);
      } else {
        if (match != "ok") {
          setMatch(false);
        } else {
          setMatch(true);
        }
      }
    });
  }

  return (
    <div className="flex flex-col h-auto gap-y-10 items-center mt-32">
      <form
        onSubmit={handleSubmitUsuario(onSubmit)}
        className="flex flex-col xs:w-11/12 md:w-2/3 gap-y-2 m-0"
      >
        <span className="text-2xl text-center font-extrabold mb-6 md:mb-10">
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
      <div className="flex flex-col text-sm md:text-lg w-screen h-12 px-5 gap-x-6 items-center">
        ¿Aún no tienes una cuenta?
        <Link href="/newUser">
          <a className="text-blue-800"> Crea una nueva aquí</a>
        </Link>
      </div>
    </div>
  );
}
