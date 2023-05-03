import {ReactElement, useEffect, useState} from "react";
import Grid from '@mui/material/Grid';
import {Box, Typography} from "@mui/material";
import {Link} from "react-router-dom";

export default function Products(): ReactElement {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://localhost:3000/products")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setData(data);
      })
    console.log(data);
  }, [])

  return (
    <>
      <Grid container sx={{ width: "100%", gap: 10, justifyContent: "center", height: "25vh", marginTop: 6}}>
        {
          [...Array(5)].map((element, index) => {
            return (
              <Link to={`product/${(Math.random() + 1).toString(36).substring(7)}`} style={{ width: "fit-content"}}>
                <Grid spacing={3} xs={1} sx={{ minWidth: "100%" }}>
                  <img src="https://media.discordapp.net/attachments/916382989905186819/1102165892747497602/image_2.png" alt="product" />
                  <Typography variant="h5" sx={{ paddingBottom: 2, paddingTop: 2}} color="white">Jakieś gówno</Typography>
                  <Typography color="lightgrey" variant="subtitle1">1 447zł</Typography>
                </Grid>
              </Link>
            );
          })
        }
      </Grid>
      <Grid container sx={{ width: "100%", gap: 10, justifyContent: "center", height: "27vh", marginTop: 6}}>
        {
          [...Array(5)].map((element, index) => {
            return (
              <Link to={`product/${(Math.random() + 1).toString(36).substring(7)}`} style={{ width: "fit-content"}}>
                <Grid spacing={3} xs={1} sx={{ minWidth: "100%" }}>
                  <img src="https://media.discordapp.net/attachments/916382989905186819/1102165892747497602/image_2.png" alt="product" />
                  <Typography variant="h5" sx={{ paddingBottom: 2, paddingTop: 2}} color="white">Jakieś gówno</Typography>
                  <Typography color="lightgrey" variant="subtitle1">1 447zł</Typography>
                </Grid>
              </Link>
            );
          })
        }
      </Grid>
    </>
  );
}