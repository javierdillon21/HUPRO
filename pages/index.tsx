import React from "react";
import { useForm } from "react-hook-form";

export default function Home() {
  const {
    register: registerUsuario,
    handleSubmit: handleSubmitUsuario,
    watch: watchUsuario,
    formState: { errors: errorUsuario },
    setValue: setValueUsuario,
    control: controlUsuario,
  } = useForm<Usuario>();
  return (
    <div>
      <input type="text" />
    </div>
  );
}
