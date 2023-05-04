import {ReactElement, useState} from "react";
import {Box} from "@mui/material";

export default function Picture(): ReactElement {

  const [swapPicture, setSwapPicture] = useState(0);
  const [pictures, setPictures] = useState([
    "https://media.discordapp.net/attachments/916382989905186819/1102157957560549456/first.jpg?width=1440&height=501",
    "https://media.discordapp.net/attachments/916382989905186819/1103382454192054332/image_3.png?width=1440&height=368",
    "https://media.discordapp.net/attachments/916382989905186819/1103382454485667890/php65i1g6_kv-efb58812_1.png?width=1253&height=671",
    "https://media.discordapp.net/attachments/916382989905186819/1103382453869096991/image_1.png?width=1431&height=671"
  ])

  const click = (): void => {
    setSwapPicture((swapPicture + 1) % pictures.length);
    console.log(swapPicture);
  }

  return (
    <Box>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center", height: "60vh", alignItems: "center", position: "relative"}}>
        {
          pictures.map((picture, index) => {
            return (
              <img
                src={picture}
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