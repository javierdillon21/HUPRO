import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Header from "../../../components/header";
import Prismic from "@prismicio/client";
import cliente from "../../../src/prismic/prismic-configuration";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Home() {
  const [miniaturas, setMiniaturas] = useState<Miniatura[]>();
  const [filtro, setFiltro] = useState<Miniatura[]>();
  const categorias = ["General", "Dormitorio", "Sala", "Comedor", "Fachada"];
  const info = useRouter().query.pid as string;
  console.log(info);

  useEffect(() => {
    cliente()
      .query(Prismic.Predicates.at("document.type", "inmueble"))
      .then(function (response: { results: ResultsPrismic }) {
        console.log(response.results);
        let arr: Miniatura[] = response.results.map((document) => {
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
          };
          return miniatura;
        });

        setMiniaturas(arr);
        setFiltro(arr);
      });
  }, []);
  if (!miniaturas) return <></>;
  return (
    info && (
      <>
        <Header
          canUback={false}
          tabTitle="De tu interés"
          userName={`${info.split("-")[1][0]}${info.split("-")[2][0]}`}
        />
        <div className="flex flex-col w-screen items-center justify-center gap-6">
          <div
            id="Barra de categorias"
            className="flex flex-wrap px-8 py-0.5 justify-around bg-gray-100 bg-opacity-70 w-90p gap-x-8 text-sm"
          >
            <button
              className="p-0.5 focus:font-bold focus:border-b focus:border-gray-500 focus:outline-none"
              onClick={() => setFiltro(miniaturas)}
              autoFocus
            >
              Todos
            </button>
            {categorias.map((categoria) => {
              return (
                <button
                  className="p-0.5 focus:font-bold focus:border-b focus:border-gray-500 focus:outline-none"
                  onClick={() =>
                    setFiltro(
                      miniaturas?.filter(
                        (miniatura) => miniatura.categoria == categoria
                      )
                    )
                  }
                >
                  {categoria}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-2 gap-y-6">
            {filtro?.map((p) => {
              return (
                <div className="flex justify-center">
                  <div className="grid font-title text-sm gap-y-2 text-third shadow-md w-98">
                    <Link href={`/${p.portada.idProyecto}`}>
                      <a className="flex w-full h-44">
                        <Image
                          className="object-cover object-top transition duration-500 ease-in-out transform hover:scale-110"
                          src={p.portada.url}
                          width={p.portada.dimensions.width}
                          height={p.portada.dimensions.height}
                        />
                      </a>
                    </Link>
                    <div className="flex flex-row justify-between px-2 ">
                      <span className="flex flex-col leading-5">
                        <p className="font-medium text-md text-gray-700 pb-2 transition duration-500 ease-in-out transform hover:translate-x-3.5 hover:scale-110">
                          {p.nombre}
                        </p>
                        <p className="font-semibold text-gray-800 text-lg">{`$${p.precio}`}</p>
                      </span>

                      <span className="flex flex-col items-end">
                        <FontAwesomeIcon
                          icon="bookmark"
                          size="lg"
                          className="fill-current text-gray-300"
                        />
                        <span className="grid grid-cols-3  pt-3 font-semibold text-gray-700">
                          <span className="flex flex-col items-center border-r border-gray-500">
                            {p.dormitorios}
                            <FontAwesomeIcon
                              icon="bed"
                              size="lg"
                              className="fill-current text-gray-700"
                            />
                          </span>
                          <span className="flex flex-col items-center border-r border-gray-500">
                            {p.banos}
                            <FontAwesomeIcon
                              icon="bath"
                              size="lg"
                              className="fill-current text-gray-700"
                            />
                          </span>
                          <span className="flex text-md px-1 flex-col items-center justify-center leading-4">
                            {p.area}
                            <a className="text-sm font-medium">
                              <a>Ext. </a>m<sup>2</sup>
                            </a>
                          </span>
                        </span>
                      </span>
                    </div>
                    <p className="text-xs px-2 text-gray-500">{`${p.categoria} | ${p.localidad}`}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    )
  );
}
