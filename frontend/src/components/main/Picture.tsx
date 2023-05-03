import {ReactElement, useState} from "react";
import {Box} from "@mui/material";
import styles from "./css/picture.module.css";

export default function Picture(): ReactElement {

  const [swapPicture, setSwapPicture] = useState(0);

  const click = (): void => {
    setSwapPicture((swapPicture + 1) % 3);
    console.log(swapPicture);
  }

  return (
    <Box>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center", height: "60vh", alignItems: "center", position: "relative"}}>
        <img
          src="https://media.discordapp.net/attachments/916382989905186819/1102157957560549456/first.jpg?width=1440&height=501"
          alt="zdjęcie1"
          width={1247}
          height={432}
          style={{
            borderRadius: "100%",
            transition: "transform 0.7s ease",
            position: "absolute",
            top: "20%",
            left: "16.5%",
            transform: `translateX(${swapPicture === 0 ? 0 : "-130%"})`,
            zIndex: swapPicture === 0 ? 2 : 1,
          }}
          onClick={click}
        />
        <img
          src="https://media.discordapp.net/attachments/916382989905186819/1102157957560549456/first.jpg?width=1440&height=501"
          alt="zdjęcie2"
          width={1247}
          height={432}
          style={{
            borderRadius: "19px",
            transition: "transform 0.7s ease",
            position: "absolute",
            top: "20%",
            left: "16.5%",
            transform: `translateX(${swapPicture === 1 ? 0 : "-130%"})`,
            zIndex: swapPicture === 1 ? 2 : 1,
          }}
          className={1 === swapPicture ? styles.active : ""}
          onClick={click}
        />
        <img
          src="https://media.discordapp.net/attachments/916382989905186819/1102157957560549456/first.jpg?width=1440&height=501"
          alt="zdjęcie3"
          width={1247}
          height={432}
          style={{
            borderRadius: "39px",
            transition: "transform 0.7s ease",
            position: "absolute",
            top: "20%",
            left: "16.5%",
            transform: `translateX(${swapPicture === 2 ? 0 : "-130%"})`,
            zIndex: swapPicture === 2 ? 2 : 1,
          }}
          className={2 === swapPicture ? styles.active : ""}
          onClick={click}
        />
      </Box>
    </Box>
  )
}