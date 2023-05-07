import {ReactElement, useEffect, useState} from "react";
import Grid from '@mui/material/Grid';
import {Box, Typography} from "@mui/material";
import {Link} from "react-router-dom";

interface IElement {
  id: number;
  created_at: string;
  name: string;
  price: number;
  updated_at: string;
}

export default function Products(): ReactElement {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setData(data);
      })
  }, [])

  return (
    <>
      <Grid container sx={{ maxWidth: "70%", gap: 10, justifyContent: "center", height: "25vh", marginTop: 6, marginInline: "auto"}}>
        {
          data?.map((element: IElement) => {
            return (
              <Link to={`product/${element.id}`} style={{ width: "172px"}}>
                <Grid spacing={3} xs={1} sx={{ minWidth: "100%", }}>
                  <img src="https://media.discordapp.net/attachments/916382989905186819/1102165892747497602/image_2.png" alt="product" />
                  <Typography variant="h5" sx={{ paddingBottom: 2, paddingTop: 2}} color="white">{element.name}</Typography>
                  <Typography color="lightgrey" variant="subtitle1">{element.price} zł</Typography>
                </Grid>
              </Link>
            );
          })
        }
      </Grid>
    </>
  );
}