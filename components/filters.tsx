import React, { Dispatch, SetStateAction } from "react";
import { useState } from "react";

export default function Buttons(props: {
  options: string[];
  setFiltro: Dispatch<SetStateAction<Miniatura[]>>;
  miniaturas: Miniatura[];
  tab: PropertyDescriptor;
}) {
  return (
    <div className="flex items-center justify-center mb-4">
      {props.options.map((label, i) => {
        return (
          <button
            className="text-purple-500 bg-transparent border-l border-t border-b border-purple-500 hover:bg-purple-500 hover:text-white active:bg-purple-600 font-bold uppercase text-xs px-4 py-2 rounded-l outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() =>
              props.setFiltro(props.miniaturas.filter((i) => i.))
            }
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
