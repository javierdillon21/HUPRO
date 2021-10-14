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
  const [letras1, setLetras1] = useState<boolean>(false);
  const [letras2, setLetras2] = useState<boolean>(false);
  const [letras3, setLetras3] = useState<boolean>(false);
  const [letras4, setLetras4] = useState<boolean>(false);
  setTimeout(() => setIntro(2), 5000);
  setTimeout(() => setLetras1(true), 1000);
  setTimeout(() => setLetras2(true), 1500);
  setTimeout(() => setLetras3(true), 2000);
  setTimeout(() => setLetras4(true), 2500);
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
        <div className="flex flex-col absolute gap-5 items-center justify-center h-screen w-screen bg-black bg-opacity-50">
          <span className="flex absolute h-1/2 w-full justify-center items-end py-10 inset-x-0 top-0 animate-fade-in-down">
            <Image src={"/icons/HUPRO LOGO W.png"} width={193} height={56} />
          </span>
          <span className="absolute inset-x-0 bottom-0 flex flex-col w-full leading-5 h-1/2 text-2xl text-center items-center self-center justify-start font-medium text-gray-100">
            {letras1 == true && (
              <span className="flex animate-fade-in-down gap-1">
                <a>Si buscas un</a>
                <a className="animate-fade-in-down text-casa-logo">BIEN</a>
              </span>
            )}
            {letras3 == true && (
              <span className=" flex flex-col animate-fade-in-down gap-1">
                <a>Te encontramos tu </a>
                {letras4 == true && (
                  <a className=" animate-fade-in-down text-casa-logo">
                    BIEN-ESTAR
                  </a>
                )}
              </span>
            )}
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
                Cédula o correo incorrecto
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
              {...registerUsuario("password", { required: true })}
              placeholder="E-mail"
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
