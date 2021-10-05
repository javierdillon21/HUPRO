import Header from "./header";
import Footer from "./footer";
import React from "react";

export default function Layout(props: { children: React.ReactElement }) {
  return (
    <div className="flex flex-col w-screen">
      <main className="flex-1 w-screen items-center">{props.children}</main>
    </div>
  );
}
