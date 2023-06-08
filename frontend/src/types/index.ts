import React from "react";

export interface IDialog {
  open: boolean;
  setOpen:  React.Dispatch<React.SetStateAction<boolean>>;
  isRegister: boolean;
  handleSubmit(formData: IRegisterData | ILoginData): Promise<void>;
  handleCloseAnchor(): void
}

export interface IRegisterData {
  user: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }
}

export interface ILoginData {
  user: {
    email: string;
    password: string;
  }
}

export interface UserResponse {
  logged_in: boolean;
  user: {
    id: number;
    name: string;
    email: string;
  } | null
}

export interface IProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  created_at: string;
  updated_at: string;
  image_lg: string;
}

export interface IElement {
  id: number;
  created_at: string;
  name: string;
  price: number;
  updated_at: string;
  image_sm: string;
}

export interface IPicture {
  product_id: number;
  image_url: string;
}
