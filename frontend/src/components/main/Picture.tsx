import {ReactElement, useEffect, useState} from "react";
import {Box} from "@mui/material";

interface IPicture {
  product_id: number;
  image_url: string;
}
export default function Picture(): ReactElement {

  const [swapPicture, setSwapPicture] = useState(0);
  const [pictures, setPictures] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/featured_products")
      .then(response => { return response.json() })
      .then(data => { setPictures(data) })
    if (pictures.length > 1 ) {
      console.log(pictures)
    }
  }, []);
  

  const click = (): void => {
    setSwapPicture((swapPicture + 1) % pictures.length);
  }

  return (
    <Box>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center", height: "60vh", alignItems: "center", position: "relative"}}>
        {
          pictures.map((picture: IPicture, index) => {
            return (
              <img
                src={`http://localhost:3000/${picture.image_url}`}
                alt="zdjęcie2"
                width={1247}
                height={432}
                style={{
                  borderRadius: "19px",
                  transition: "transform 0.7s ease",
                  position: "absolute",
                  top: "20%",
                  left: "16.5%",
                  transform: `translateX(${swapPicture === index ? 0 : "-130%"})`,
                  zIndex: swapPicture === index ? 2 : 1,
                }}
                onClick={click}
              />
            );
          })
        }
      </Box>
    </Box>
  )
}