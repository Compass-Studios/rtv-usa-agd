import {ReactElement, useState} from "react";
import {
  AppBar,
  Avatar,
  Box, Button,
  Container,
  Dialog,
  DialogTitle, FormControl,
  IconButton, Input, InputAdornment, TextField,
  Toolbar,
  Tooltip,
  Typography
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

export default function Header(): ReactElement {

  const [openLogin, setOpenLogin] = useState(false);

  const handleOpen = () => {
    setOpenLogin(true);
  }

  const handleClose = () => {
    setOpenLogin(false);
  }

  return (
    <AppBar position="static" sx={{ background: "#2c2c2c"}}>
      <Container sx={{ maxWidth: "50%" }}>
        <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
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
            />
            <Dialog open={openLogin} onClose={handleClose}>
              <Box sx={{ display: "flex", padding: 2 }}>
                <DialogTitle sx={{ flexGrow: 2, textAlign: "center"}} style={{ padding: 0}}>
                  Zaloguj się
                </DialogTitle>
                <IconButton onClick={handleClose} style={{ padding: 0}} sx={{
                  "&:hover": {
                    background: "transparent"
                  }
                }}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <FormControl sx={{ display: "flex", flexDirection: "column", gap: 2, paddingLeft: 4, paddingRight: 4, paddingBottom: 2}}>
                <TextField placeholder="email" variant="outlined" />
                <TextField placeholder="hasło" type="password" variant="outlined" />
                <Button sx={{ width: "fit-content", alignSelf: "center"}} type="submit" variant="contained">Zaloguj się</Button>
              </FormControl>
            </Dialog>
            <Tooltip title="Login">
              <IconButton onClick={handleOpen}>
                <Avatar alt="logo" />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}