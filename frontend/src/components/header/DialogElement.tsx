import { useState, ReactElement, useEffect } from "react";
import { Box, Button, Dialog, DialogTitle, FormControl, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {IRegisterData, IDialog, ILoginData} from "../../types";

export default function DialogElement(props: IDialog): ReactElement {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleRegister = () => {
    const formData: IRegisterData = {
      user: {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation
      }
    };

    props.handleSubmit(formData);
    props.setOpen(false);
  };

  const handleLogin = () => {
    const formData: ILoginData = {
      user: {
        email,
        password
      }
    };

    props.handleSubmit(formData);
    props.setOpen(false);
  };

  useEffect(() => {
    if (props.open) {
      props.handleCloseAnchor();
    }
  }, [props.open])

  return (
    <Dialog open={props.open} onClose={() => props.setOpen(!props.open)}>
      <Box sx={{display: "flex", padding: 2, background: "#2c2c2c"}}>
        <DialogTitle sx={{flexGrow: 2, textAlign: "center"}} style={{padding: 0}}>
          {
            props.isRegister ? "Zarejestruj się" : "Zaloguj się"
          }
        </DialogTitle>
        <IconButton onClick={() => props.setOpen(false)} style={{padding: 0}} sx={{
          "&:hover": {
            background: "#2c2c2c"
          }
        }}>
          <CloseIcon/>
        </IconButton>
      </Box>
      <form onSubmit={props.isRegister ? handleRegister : handleLogin}>
        <FormControl
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            paddingLeft: 4,
            paddingRight: 4,
            paddingBottom: 2,
            background: "#2c2c2c"
          }}
        >
          {props.isRegister && (
            <TextField
              id="name"
              placeholder="username"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          )}
          <TextField
            id="email"
            placeholder="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
          <TextField
            id="password"
            placeholder="hasło"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          {props.isRegister && (
            <TextField
              id="password_confirmation"
              placeholder="Powtórz hasło"
              type="password"
              variant="outlined"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              autoFocus
            />
          )}
          <Button sx={{width: "fit-content", alignSelf: "center"}} type="submit" variant="contained">
            {
              props.isRegister ? "Zarejestruj się" : "Zaloguj się"
            }
          </Button>
        </FormControl>
      </form>
    </Dialog>
  );
}
