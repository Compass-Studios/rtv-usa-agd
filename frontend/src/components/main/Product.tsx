import {ReactElement, useEffect, useState} from "react";
import { Navigate, useParams } from "react-router-dom";
import { Box, CircularProgress,  Typography } from "@mui/material";
import { IProduct, UserResponse } from "../../types";
import axios from "axios";
import ReactMarkdown from "react-markdown";

export default function Product(): ReactElement {

  const { id } = useParams();
  const [data, setData] = useState<IProduct>(  { id: 0, name: "", price: 0, description: "", created_at: "", updated_at: "", image_lg: ""});
  const [loadingImage, setLoadingImage] = useState(true);


  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/products/${id}`)
      .then(response => { return response.json() })
      .then(data => setData(data))
    if (data.id > 0) {
      console.log(data)
    }
  }, []);

  const handleBuy = async () => {
    let dataStorage = localStorage.getItem('data');
    let savedData: UserResponse = dataStorage ? JSON.parse(dataStorage) : null;

    if (!savedData.logged_in) {
      alert("You need to be logged to create that order");
      return;
    }
    try {
      let quantityOfProduct = Number(prompt("Podaj ilość produktu", "1"));
      await axios.post(`${import.meta.env.VITE_API_URL}/orders`, {
        order: {
          product: data.id,
          quantity: quantityOfProduct
        }
      }, { withCredentials: true });
      alert("Zamówiono produkt");
    } catch(error) {
      console.error(error)
    }
  }

  return (
    <>
      <Box sx={{ width: "100%", height: "70vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Box
          sx={{
            width: "65%",
            display: "flex",
            justifyContent: "space-between",
            height: "80%",
            alignItems: "center",
            '@media screen and (max-width: 1600px)': {
              height: "70%"
            }
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
            {
              loadingImage ?
                (
                  <Box sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <CircularProgress />
                  </Box>
                )
              :
                null
            }
          <img
            width="581px"
            height="554px"
            onLoad={() => setLoadingImage(false)}
            className="product-image"
            src={`${import.meta.env.VITE_API_DOMAIN}${data.image_lg}`}
            alt="produkt"
            style={{ borderRadius: "19px" }}
          />
          </Box>
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
                {data.name}
              </Typography>
              <Typography variant="h5" color="lightgrey">
                {data.price} zł
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
                onClick={handleBuy}
              >
                Kup teraz
              </button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ height: "50vh", width: "100%", display: "flex", justifyContent: "center" }}>
        <Box sx={{ background: "#1C1C1C", width: "68%", height: "fit-content", borderRadius: "19px", padding: 5 }}>
          <Typography sx={{ paddingBottom: "1rem", margin: 0 }} variant="h2" textAlign="center">
            Opis
          </Typography>
          <ReactMarkdown components={{ p: ({node, ...props}) => <p style={{ width: "fit-content", fontSize: "20px", fontWeight: 400, fontFamily: "Inter, sans-serif" }} {...props}></p>, h2: ({node, ...props}) => <h2 style={{ whiteSpace: "pre-wrap", width: "fit-content", fontSize: "32px", marginBlock: "1rem", fontWeight: 600, fontFamily: "Inter, sans-serif" }} {...props}></h2>,  h3: ({node, ...props}) => <h3 style={{ whiteSpace: "pre-wrap", width: "fit-content", fontSize: "12px", marginTop: "2rem", fontWeight: 400, fontFamily: "Inter, sans-serif" }} {...props}></h3>}}>
            {data.description}
          </ReactMarkdown>
        </Box>
      </Box>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Roboto+Slab&display=swap');
      </style>
    </>
  )
}
