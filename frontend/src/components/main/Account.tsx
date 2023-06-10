import { ReactElement, useEffect, useState } from "react";
import { UserResponse } from "../../types";
import { Avatar, Box, Container } from "@mui/material";

export default function Account(): ReactElement {

  const [data, setData] = useState<UserResponse | null>();

  useEffect(() => {
    const getData = localStorage.getItem('data');
    const parsedData = getData ? JSON.parse(getData) : null;
    setData(parsedData);
  }, []);


  return (
    <Container sx={{ display: "flex", flexDirection: "column", gap: "2rem"}}>
      <h1 style={{ paddingTop: "2rem", fontWeight: "400", fontFamily: "Inter, sans-serif"}}>
        My Account
      </h1>
      <Box sx={{ width: "100%", background: "#2f2f2f", height: "35vh", borderRadius: "24px", display: "flex" }}>
        <Box sx={{ width: "20%", display: "flex", justifyContent: "center", height: "60%", alignItems: "flex-end"}}>
          <Avatar sx={{ width: "180px", height: "180px" }} alt="logo"/>
        </Box>
        <Box sx={{ width: "80%", display: "flex", flexDirection: "column", gap: "2rem"}}>
          <h1 style={{ paddingTop: "3%", fontSize: "28px", fontFamily: "Inter, sans-serif" }}>{ data?.user?.name }</h1>
          <Box>
            <ul
              style={{
                listStyle: "none",
                fontSize: "20px",
                lineHeight: "24px",
                fontWeight: "400",
                fontFamily: "Inter, sans-serif",
                display: "flex",
                flexDirection: "column",
                gap: "1rem"
              }}
            >
              <li>Lat: 31</li>
              <li>Płeć: 90% mężczyzna, 10% inne</li>
              <li>Zaimki: was/were</li>
              <li>Narodowość: Zjednoczone Stany Ameryki</li>
              <li>Adres: Sownowiecka 21/37, 69-420, Sosnowiec</li>
            </ul>
          </Box>
        </Box>
      </Box>
      <Box>
        <h1 style={{ paddingTop: "2rem", fontWeight: "400", fontFamily: "Inter, sans-serif"}}>
          My Orders
        </h1>
      </Box>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500&family=Roboto+Slab&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400&family=Roboto+Slab&display=swap');
      </style>
    </Container>
  )
}
