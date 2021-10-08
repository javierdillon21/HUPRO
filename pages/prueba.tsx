import { Button, ButtonGroup } from "@mui/material";
import React, { useState } from "react";
import Buttons from "../components/filters";
import { dataUsers } from "./api/dataUsers";

export default function P() {
  const arr = [
    { u: "norte", c: "villa", p: 10000 },
    { u: "norte", c: "apartamento", p: 10500 },
    { u: "sur", c: "villa", p: 7000 },
    { u: "centro", c: "casa de campo", p: 35000 },
  ];
  console.log(
    arr.filter((p) => p.u == "norte" && p.c == "apartamento" && p.p < 20000)
  );
  const result = arr.filter(
    (p) => p.u == "norte" && p.c == "apartamento" && p.p < 20000
  );
  return (
    <form typeof="radio">
      <fieldset>
        <legend>Elige un color</legend>
        <label>
          <input type="radio" name="color" value="azul" className=""></input>
          Azul
        </label>
        <label>
          <input type="radio" name="color" value="negro"></input> Negro
        </label>
        <label>
          <input type="radio" name="color" value="amarillo"></input> Amarillo
        </label>
      </fieldset>
    </form>
  );
}
