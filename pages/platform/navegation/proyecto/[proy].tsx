import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Header from "../../../../components/header";
import cliente from "../../../../src/prismic/prismic-configuration";
import Prismic from "@prismicio/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Image from "next/image";

export default function Inmueble() {
  const route = useRouter().query.proy as string;
  const [idUser, userName, userLastname, idProyecto] = route.split(":");
  const [miniatura, setMiniatura] = useState<Miniatura>();
  function FormatearTexto(arr: Array<Texto>) {
    const strArr = arr.map((obj) => obj.text);
    return strArr.join("\n");
  }
  useEffect(() => {
    cliente()
      .query(Prismic.Predicates.at("document.id", idProyecto))
      .then(function (response: { results: ResultsPrismic }) {
        const document = response.results[0];
        console.log("EL DOC ES:", document);

        var imgPortada: Imagen = {
          idProyecto: document.id,
          dimensions: {
            width: document.data.imagenes[0].imagen.dimensions.width,
            height: document.data.imagenes[0].imagen.dimensions.height,
          },
          url: document.data.imagenes[0].imagen.url,
        };

        var miniatura: Miniatura = {
          nombre: document.data.nombre[0].text,
          portada: imgPortada,
          categoria: document.data.categoria,
          localidad: document.data.localidad,
          precio: document.data.precio[0].text,
          banos: Number(document.data.banos),
          dormitorios: Number(document.data.dormitorios),
          area: document.data.area[0].text,
          descripcion: FormatearTexto(document.data.descripcion),
          precio_por_metro: document.data.precio_por_metro[0].text,
          multimedia: document.data.imagenes.map((i) => {
            const imgObj: Imagen = {
              idProyecto: document.id,
              dimensions: {
                width: i.imagen.dimensions.width,
                height: i.imagen.dimensions.height,
              },
              url: i.imagen.url,
            };
            return imgObj;
          }),
        };

        setMiniatura(miniatura);
      });
  }, []);
  if (!miniatura) return <></>;
  return (
    <div>
      <Header
        canUback={true}
        routeBack={`../${idUser}:${userName}:${userLastname}`}
      />

      <div key={`pid-${miniatura.nombre}`} className="flex justify-center">
        <div className="grid font-title text-sm gap-y-2 text-third w-98">
          <a className="flex w-full h-44">
            <Image
              className="object-cover object-top transition duration-500 ease-in-out transform hover:scale-110"
              src={miniatura.portada.url}
              width={miniatura.portada.dimensions.width}
              height={miniatura.portada.dimensions.height}
            />
          </a>
          {/* //ENCABEZADO */}
          <div className="flex flex-row justify-between px-2 ">
            <span className="flex flex-col leading-5">
              <p className="font-medium text-md text-gray-700 pb-2 transition duration-500 ease-in-out transform hover:translate-x-3.5 hover:scale-110">
                {miniatura.nombre}
              </p>
              <p className="font-semibold text-gray-800 text-lg">{`$${miniatura.precio}`}</p>
            </span>

            <span className="flex flex-col items-end">
              <FontAwesomeIcon
                icon="bookmark"
                size="lg"
                className="fill-current text-gray-300"
              />
              <span className="grid grid-cols-3  pt-3 font-semibold text-gray-700">
                <span className="flex flex-col items-center border-r border-gray-500">
                  {miniatura.dormitorios}
                  <FontAwesomeIcon
                    icon="bed"
                    size="lg"
                    className="fill-current text-gray-700"
                  />
                </span>
                <span className="flex flex-col items-center border-r border-gray-500">
                  {miniatura.banos}
                  <FontAwesomeIcon
                    icon="bath"
                    size="lg"
                    className="fill-current text-gray-700"
                  />
                </span>
                <span className="flex text-md px-1 flex-col items-center justify-center leading-4">
                  {miniatura.area}
                  <span className="text-sm font-medium">
                    <a>Ext. </a>m<sup>2</sup>
                  </span>
                </span>
              </span>
            </span>
          </div>
          <p className="text-xs px-2 text-gray-500">{`${miniatura.categoria} | ${miniatura.localidad}`}</p>
        </div>
      </div>
      {/* //DETALLES DE LA PROPIEDAD */}
      <div className="flex flex-col items-center mt-1 gap-3">
        <span className="flex h-8 w-4/5 gap-1 border-gray-400 border text-gray-600 font-normal text-xs text-center items-center justify-center">
          <FontAwesomeIcon
            icon="info-circle"
            size="lg"
            className="fill-current text-gray-500"
          />
          Información sobre la propiedad
        </span>

        <span className="flex flex-col w-full px-2 gap-2 items-start border-b ">
          <a className="font-medium text-lg text-gray-800">Descripción</a>
          <p className="text-xs">{miniatura.descripcion}</p>
        </span>

        <span className="flex flex-col w-full px-2 gap-2 items-start border-b ">
          <a className="flex w-full font-medium text-lg text-gray-800">
            Detalles
          </a>
          <span className="flex gap-6">
            <a className="text-gray-800 text-xs ">
              <p>Ubicación:</p>
              <p>
                Precio por m<sup>2</sup>:
              </p>
              <p className="text-xs">Publicado por:</p>
            </a>
            <a className="text-xs">
              <p>{miniatura.localidad}</p>
              <p>${miniatura.precio_por_metro}</p>
              <p>Hupro ®</p>
            </a>
          </span>
        </span>

        <span className="flex flex-col w-full px-2 gap-2 items-start border-b ">
          <a className="font-medium text-lg text-gray-800">Galería</a>
          <div className="grid grid-cols-1 gap-1">
            {miniatura.multimedia?.map((i) => {
              return (
                <span
                  className="flex w-full h-44"
                  key={`imagen-${i.url}-proyecto-${i.idProyecto}`}
                >
                  <Image
                    className="object-cover object-center transition duration-500 ease-in-out transform hover:scale-110"
                    src={i.url}
                    width={i.dimensions.width}
                    height={i.dimensions.height}
                  />
                </span>
              );
            })}
          </div>
        </span>
      </div>
    </div>
  );
}
