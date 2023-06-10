import { ChangeEvent, ReactElement, useContext, useState } from "react";
import {
  AppBar,
  Box,
  Container,
  InputAdornment, TextField,
  Toolbar,
  Typography
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import User from "./User";
import { AppContext } from "../../AppContext";

export default function Header(): ReactElement {

  const { handleChange } = useContext(AppContext)!;
  const [inputText, setInputText] = useState('');
  const handleChangeValue = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputText(event.target.value);
  }

  const handleSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleChange(inputText);
    }
  }

  return (
    <AppBar position="static" sx={{ background: "#2c2c2c"}}>
      <Container
        sx={{
          maxWidth: "50%",
          '@media screen and (max-width: 1199px)': {
              maxWidth: "100%"
          }
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            '@media screen and (max-width: 1200px)': {
              justifyContent: "space-around"
            }
        }}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img alt="Logo rtv usa agd" src="https://cdn.discordapp.com/attachments/1029675794978578493/1091666739156234331/rtvusaagd.png" />
          </Typography>
          <Box sx={{ flexGrow: 0 }} className="header">
            <TextField
              id="input-with-icon-textfield"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "white" }} />
                  </InputAdornment>
                ),
                style: {
                  color: "white",
                  borderColor: "white !important"
                }
              }}
              variant="outlined"
              onChange={handleChangeValue}
              onKeyDown={handleSubmit}
              value={inputText}
            />
            <User />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
