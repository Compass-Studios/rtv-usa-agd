import { ReactElement, useContext, useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import {CircularProgress, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import { IElement } from "../../types";
import { AppContext } from "../../AppContext";

export default function Products(): ReactElement {
  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loadingFetch, setLoadingFetch] = useState(true);
  const [filtered, setFiltered] = useState(false);
  const { inputValue } = useContext(AppContext)!;

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/products`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setProducts([...products, ...data]);
        filterProducts();
        setLoadingFetch(false);
      })
  }, [])

  useEffect(() => {
    filterProducts();
  }, [inputValue]);

  function filterProducts() {
    if (inputValue !== '') {
      const filteredProducts = products.filter(product => {
        return product.name.toLowerCase().includes(inputValue.toLowerCase());
      });
      setProducts(filteredProducts);
      setFiltered(true);
    } else {
      return;
    }
  }

  return (
    <>
      <Grid container sx={{ maxWidth: "70%", gap: 10, justifyContent: "center", height: "25vh", marginTop: 6, marginInline: "auto"}}>
        {loadingFetch && <div>Loading...</div>}
        {
          products?.map((element: IElement) => {
            return (
              <Product
                key={element.id + Math.random()}
                id={element.id}
                created_at={element.created_at}
                name={element.name}
                price={element.price}
                updated_at={element.updated_at}
                image_sm={element.image_sm}
              />
            );
          })
        }
      </Grid>
    </>
  );
}

function Product(element: IElement): ReactElement {
  const [loadingImage, setLoadingImage] = useState(true);
  return (
    <Link to={`product/${element.id}`} style={{ width: "172px"}}>
      <Grid spacing={3} xs={1} sx={{ minWidth: "100%", }}>
        {
          loadingImage ?
            (
              <CircularProgress />
            )
            :
            null
        }
        <img
          src={`${import.meta.env.VITE_API_DOMAIN}${element.image_sm}`}
          onLoad={() => setLoadingImage(false)}
          width={172}
          alt="product"
          style={ loadingImage ? { display: "none"} : { borderRadius: "19px" } }
        />
        <Typography variant="h5" sx={{ paddingBottom: 2, paddingTop: 2}} color="white">{element.name}</Typography>
        <Typography color="lightgrey" variant="subtitle1">{element.price} zł</Typography>
      </Grid>
    </Link>
  )
}
