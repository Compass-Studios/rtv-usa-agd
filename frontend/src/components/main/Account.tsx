import { ReactElement, useEffect, useState } from "react";
import { IDelivery, UserResponse } from "../../types";
import { Avatar, Box, CircularProgress, Container } from "@mui/material";
import axios from "axios";

export default function Account(): ReactElement {

  const [data, setData] = useState<UserResponse | null>();
  const [delivery, setDelivery] = useState<IDelivery[] | null>();
  const [loadingImage, setLoadingImage] = useState(true);

  useEffect(() => {
    const getData = localStorage.getItem('data');
    const parsedData = getData ? JSON.parse(getData) : null;
    setData(parsedData);
  }, []);

  useEffect(() => {
    async function fetchDelivery() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/orders`, { withCredentials: true });
        const deliveryResponse = response.data;

        // Fetch image_lg for each product.id
        const updatedDelivery = await Promise.all(deliveryResponse.map(async (item: IDelivery) => {
          const productResponse = await axios.get(`${import.meta.env.VITE_API_URL}/products/${item.product.id}?fields=image_lg`);
          const imageLg = productResponse.data.image_lg;
          return { ...item, imageLg }; // Merge imageLg into the item object
        }));
        setDelivery(updatedDelivery);
      } catch(error) {
        console.error(error);
      }
    }
    fetchDelivery();
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
      <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem", paddingBottom: "2rem"}}>
        <h1 style={{ paddingTop: "2rem", fontWeight: "400", fontFamily: "Inter, sans-serif"}}>
          My Orders
        </h1>
        <ul style={{ listStyle: "none", width: "100%", display: "flex", flexDirection: "column", gap: "1rem"}}>
          {
            delivery?.map((product) => {
              const dateString = product.created_at;
              const date = new Date(dateString);
              const formattedDate = date.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
              }).replace(/\//g, '.');
              return (
                <li style={{ display: "flex", padding: "1.5rem", background: "#2f2f2f", borderRadius: "24px", gap: "1.5rem" }}>
                  <Box>
                    {
                      loadingImage ?
                        (
                          <CircularProgress />
                        )
                      :
                        null
                    }
                    <img
                      src={`${import.meta.env.VITE_API_DOMAIN}${product.imageLg}`}
                      onLoad={() => setLoadingImage(false)}
                      width={172}
                      alt="product"
                      style={ loadingImage ? { display: "none"} : { borderRadius: "6px" } }
                    />
                  </Box>
                  <Box>
                    <h2 style={{ fontFamily: "Inter, sans-serif", fontWeight: "400", paddingBottom: "1rem"}}>
                      {product.product.name}
                    </h2>
                    <h3 style={{ fontFamily: "Inter, sans-serif", fontWeight: "400" }}>Status: {product.status}</h3>
                    <h3 style={{ fontFamily: "Inter, sans-serif", fontWeight: "400" }}>Data zamówienia: {formattedDate}</h3>
                    <h3 style={{ fontFamily: "Inter, sans-serif", fontWeight: "400" }}>Ilość: {product.quantity}</h3>
                    <h3 style={{ fontFamily: "Inter, sans-serif", fontWeight: "400" }}>Cena: {product.price} zł</h3>
                  </Box>
                </li>
              );
            })
          }
        </ul>
      </Box>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500&family=Roboto+Slab&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400&family=Roboto+Slab&display=swap');
      </style>
    </Container>
  )
}
