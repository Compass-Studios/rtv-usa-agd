import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip
} from "@mui/material";
import { ReactElement, useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import DialogElement from "./DialogElement";
import {IRegisterData, ILoginData, UserResponse} from "../../types";
import { Link } from "react-router-dom";

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
        `${import.meta.env.VITE_API_URL}/users/${requestUrl}`,
        formData,
        { withCredentials: true }
      );
      console.log(response.data);
      localStorage.setItem('data', JSON.stringify(response.data));
      setTriggerEffect(prevState => !prevState);
      alert("Pomyślnie zalogowano")
    } catch (error: AxiosError) {
      if (error.response.status === 401) {
        alert("Nazwa użytkownika lub hasło są niepoprawne");
      }
    }
  };

  const signOut = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/users/logout`, { withCredentials: true });
      localStorage.setItem("data", JSON.stringify({ logged_in: false, user: null }))
      setTriggerEffect(prevState => !prevState);
      window.location.href = "/";

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
              <MenuItem
                style={{background: "#2c2c2c"}}
                sx={{color: "white", outline: "none", "&:hover": {background: "#2c2c2c"}}}
                onClick={() => setOpenLogin(true)}
              >
                Login
              </MenuItem>
            </Box>
          :
          <Box>
            <MenuItem
              style={{background: "#2c2c2c"}}
              sx={{color: "white", outline: "none", "&:hover": {background: "#2c2c2c"}}}
              onClick={signOut}
            >
              Sign out
            </MenuItem>
            <MenuItem
              style={{background: "#2c2c2c"}}
              sx={{color: "white", outline: "none", "&:hover": {background: "#2c2c2c"}}}
            >
              <Link to='/account'>
                My Account
              </Link>
            </MenuItem>
          </Box>
        }
      </Menu>
      <DialogElement
        open={openRegister}
        setOpen={setOpenRegister}
        isRegister={true}
        handleSubmit={handleSubmit}
        handleCloseAnchor={handleCloseAnchorMenu}
      />
      <DialogElement
        open={openLogin}
        setOpen={setOpenLogin}
        isRegister={false}
        handleSubmit={handleSubmit}
        handleCloseAnchor={handleCloseAnchorMenu}
      />
    </>
  )
}
