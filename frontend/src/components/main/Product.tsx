import {ReactElement} from "react";
import { useParams } from "react-router-dom";

export default function Product(): ReactElement {

  const { id } = useParams();

  return (
    <h1>
      Product id: {id}
    </h1>
  )
}