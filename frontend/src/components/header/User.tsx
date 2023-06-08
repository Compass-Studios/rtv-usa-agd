import {
  Avatar,
  Box, Button,
  Dialog,
  DialogTitle,
  FormControl,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Tooltip
} from "@mui/material";
import { ReactElement, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios, {AxiosResponse} from "axios";

interface IDialog {
  open: boolean;
  setOpen:  React.Dispatch<React.SetStateAction<boolean>>;
  isRegister: boolean;
  handleSubmit(formData: IRegisterData | ILoginData): Promise<void>;
}

interface IRegisterData {
  user: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }
}

interface ILoginData {
  user: {
    email: string;
    password: string;
  }
}

interface UserResponse {
  logged_in: boolean;
  user: {
    id: number;
    name: string;
    email: string;
  } | null
}

export default function User(): ReactElement {
    const [anchorMenu, setOpenAnchorMenu] = useState(null);
    const [openLogin, setOpenLogin] = useState(false);
    const [openRegister, setOpenRegister] = useState(false);
    const [data, setData] = useState<UserResponse | null>();
    const [triggerEffect, setTriggerEffect] = useState(false);

    const isRegisterData = (data: any): data is IRegisterData => {
    return (
      typeof data === "object" &&
      data.user &&
      typeof data.user.name === "string" &&
      typeof data.user.email === "string" &&
      typeof data.user.password === "string" &&
      typeof data.user.password_confirmation === "string"
    );
  };

  const isLoginData = (data: any): data is ILoginData => {
    return (
      typeof data === "object" &&
      data.user &&
      typeof data.user.email === "string" &&
      typeof data.user.password === "string"
    );
  };

  const handleSubmit = async (formData: IRegisterData | ILoginData) => {
    event?.preventDefault();

    let requestUrl = "";

    if (isRegisterData(formData)) {
      requestUrl = "sign_up";
    } else if (isLoginData(formData)) {
      requestUrl = "login";
    }

    try {
      const response: AxiosResponse = await axios.post(
        `http://localhost:3000/users/${requestUrl}`,
        formData
      );
      console.log(response.data);
      localStorage.setItem('data', JSON.stringify(response.data));
      setTriggerEffect(prevState => !prevState);
    } catch (error) {
      console.error(error);
    }
  };

  const signOut = async () => {
    try {
      const response = await axios.delete('http://localhost:3000/users/logout');
      localStorage.setItem("data", JSON.stringify({ logged_in: false, user: null }))
      setTriggerEffect(prevState => !prevState);
    } catch(error) {
      console.error(error);
    }
  }

  const handleOpenAnchorMenu = (event: any) => {
    setOpenAnchorMenu(event.currentTarget);
  }

  const handleCloseAnchorMenu = () => {
    setOpenAnchorMenu(null);
  }

  useEffect(() => {
    let data = localStorage.getItem('data');
    let savedData: UserResponse = data ? JSON.parse(data) : null;
    setData(savedData);
  }, [triggerEffect]);

  return (
    <>
      <Tooltip title="" style={{outline: "none",}}>
        <IconButton onClick={handleOpenAnchorMenu}>
          <Avatar alt="logo"/>
        </IconButton>
      </Tooltip>
      <Menu open={Boolean(anchorMenu)} anchorEl={anchorMenu} onClose={handleCloseAnchorMenu}>
        {
          !data?.logged_in ?
            <Box>
              <MenuItem
                style={{background: "#2c2c2c"}}
                sx={{color: "white", outline: "none", "&:hover": {background: "#2c2c2c"}}}
                onClick={() => setOpenRegister(true)}
              >
                Sign up
              </MenuItem>
              <DialogElement
                open={openRegister}
                setOpen={setOpenRegister}
                isRegister={true}
                handleSubmit={handleSubmit}
              />
              <MenuItem
                style={{background: "#2c2c2c"}}
                sx={{color: "white", outline: "none", "&:hover": {background: "#2c2c2c"}}}
                onClick={() => setOpenLogin(true)}
              >
                Login
              </MenuItem>
              <DialogElement
                open={openLogin}
                setOpen={setOpenLogin}
                isRegister={false}
                handleSubmit={handleSubmit}
              />
            </Box>
          :
          <MenuItem
            style={{background: "#2c2c2c"}}
            sx={{color: "white", outline: "none", "&:hover": {background: "#2c2c2c"}}}
            onClick={signOut}
          >
            Sign out
          </MenuItem>
        }
      </Menu>
    </>
  )
}

function DialogElement(props: IDialog): ReactElement {
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
              // Rest of the props
            />
          )}
          <TextField
            id="email"
            placeholder="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // Rest of the props
          />
          <TextField
            id="password"
            placeholder="hasło"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // Rest of the props
          />
          {props.isRegister && (
            <TextField
              id="password_confirmation"
              placeholder="Powtórz hasło"
              type="password"
              variant="outlined"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              // Rest of the props
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
