import {ReactElement} from "react";
import { useParams } from "react-router-dom";
import {Box, List, ListItem, Typography} from "@mui/material";

export default function Product(): ReactElement {

  const { id } = useParams();

  return (
    <>
      <Box sx={{ width: "100%", height: "70vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Box sx={{ width: "65%", display: "flex", justifyContent: "space-between", height: "80%", alignItems: "center" }}>
          <img
            width="581px"
            height="554px"
            src="https://media.discordapp.net/attachments/916382989905186819/1103338067596673106/image.png?width=704&height=671"
            alt="produkt"
          />
          <Box sx={{ width: "37%", height: "90%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <Box>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "36px",
                  lineHeight: "44px",
                  textAlign: "left"
                }}
                variant="h4"
              >
                Philips Perfect Care seria 9000
              </Typography>
              <Typography variant="h5" color="lightgrey">
                3199 zł
              </Typography>
            </Box>
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 4}}>
              <button
                style={{
                  width: "100%",
                  outline: "none",
                  border: "none",
                  borderRadius: "2137px",
                  background: "#FF3636",
                  color: "black",
                  padding: "11px",
                  fontWeight: 600,
                  fontSize: "25px",
                  cursor: "pointer"
                }}
              >
                69 rat 0%
              </button>
              <button
                style={{
                  width: "100%",
                  outline: "none",
                  border: "none",
                  borderRadius: "2137px",
                  background: "white",
                  color: "black",
                  padding: "11px",
                  fontWeight: 600,
                  fontSize: "25px",
                  cursor: "pointer"
                }}
              >
                Kup teraz
              </button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ height: "50vh", width: "100%", display: "flex", justifyContent: "center" }}>
        <Box sx={{ background: "#1C1C1C", width: "68%", height: "fit-content", borderRadius: "19px", padding: 5 }}>
          <Typography variant="h4" textAlign="center">
            Specyfikacja techniczna
          </Typography>
          <Typography variant="h5" sx={{ width: "fit-content", fontSize: "20px", fontWeight: 300 }}>
            Procesor: Cortex-M55 <br />
            Karta graficzna: Brak <br />
            RAM: 256 MB <br />
            Pamięć: 2 GB <br />
            Silnik telemetrii: wersja 5.2.0 <br />
            Mikrofony: stereofoniczne mikrofony kulkowo-bulbulacyjne z mechanicznymi przełącznikami membranowymi z każdej strony urządzenia <br />
            Głośniki: brak <br />
            Port słuchawkowy: brak <br />
          </Typography>
        </Box>
      </Box>
    </>
  )
}