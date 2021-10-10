import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import cliente from "../src/prismic/prismic-configuration";
import Prismic from "@prismicio/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Image from "next/image";
import Header from "../components/header";
import { snapshot, useSnapshot } from "valtio";
import { info } from ".";
import SpinnerLoading from "../components/spinnerLoading";

export default function Inmueble() {
  const route = useRouter().query.proy;
  const snap = useSnapshot(info);
  const [miniatura, setMiniatura] = useState<Miniatura>();
  const [cotizar, setCotizar] = useState<boolean>();
  function FormatearTexto(arr: Array<Texto>) {
    const strArr = arr.map((obj) => obj.text);
    return strArr.join("\n");
  }

  useEffect(() => {
    if (route) {
      console.log("RUTA ES:", route);
      cliente()
        .query(Prismic.Predicates.at("document.id", route))
        .then(function (response: { results: ResultsPrismic }) {
          const document = response.results[0];
          console.log("EL DOC ES:", document);
          if (!document) return undefined;
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
    }
  }, [route]);

  if (!route || !miniatura)
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <SpinnerLoading />
      </div>
    );

  return (
    <div>
      <Header canUback={true} routeBack={`/home`} />

      <div key={`pid-${miniatura.nombre}`} className="flex justify-center">
        <div className="animate-fade-in-down grid font-title text-sm gap-y-2 text-third w-98">
          <a className="flex w-full h-44">
            <Image
              className="object-cover object-center transition duration-500 ease-in-out transform hover:scale-110"
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
              {miniatura.localidad == "Urbanización La Costa" && (
                <span className="flex gap-2 items-center">
                  <Link href="https://es.calameo.com/read/0068283845b01e83b8828">
                    <button className="flex gap-1 p-1 border-gray-400 border text-gray-600 font-normal text-xs text-center items-center justify-center">
                      <a className="text-xs font-medium text-gray-600">
                        Visita el sitio
                      </a>
                      <FontAwesomeIcon
                        icon="external-link-alt"
                        size="lg"
                        className="fill-current text-gray-600"
                      />
                    </button>
                  </Link>
                </span>
              )}
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
      <div className="animate-fade-in-up flex flex-col items-center mt-1 gap-3">
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

        {cotizar && (
          <span className="animate-fade-in-down fad flex h-10 w-4/5 gap-1 px-2 border-green-600 border text-green-800 font-normal text-xs text-center items-center justify-center">
            <FontAwesomeIcon
              icon="check-circle"
              size="lg"
              className="fill-current text-green-700"
            />
            Sus datos han sido enviados. Un agente le contactará en la brevedad
            posible.
          </span>
        )}
        <button
          onClick={() => {
            setCotizar(true);
            setTimeout(() => setCotizar(false), 5000);
          }}
          className="flex h-8 w-4/5 gap-2 border-blue-500 border bg-blue-600 text-white text-xs font-bold text-center items-center justify-center"
        >
          <FontAwesomeIcon
            icon="file-invoice-dollar"
            size="lg"
            className="fill-current"
          />
          COTIZAR
        </button>

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
