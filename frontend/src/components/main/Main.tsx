import {ReactElement, useEffect} from "react";
import Picture from "./Picture";
import Products from "./Products";

export default function Main(): ReactElement {
  useEffect(() => {
    sessionStorage.clear();
  }, [])

  return (
    <>
      <Picture />
      <Products />
    </>
  )
}