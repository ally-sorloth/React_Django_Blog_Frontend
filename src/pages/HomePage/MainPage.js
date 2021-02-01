import React, { useEffect, useState } from  "react";
import Axios from   'axios';
import {
    Button,
    TextField,
    Grid,
    Container,
    Avatar,
    Typography,
  } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";


const stylesFunc = makeStyles((theme) => ({
    wrapper: {
      marginTop: "10rem",
      height: "calc(100vh - 19.0625rem)",
      textAlign: "center",
    },
    avatar: {
      margin: "1rem auto",
      backgroundColor: theme.palette.primary.main,
    },
    signIn: {
      margin: "1rem",
    },
  }));

function MainPage() {
    const [postList, setPostList] = useState();
    const mainStyles = stylesFunc();
    const { REACT_APP_API_BASE_URL } = process.env;

    const fetchPostData = async() => {
        try {
            const result = await axios.get(`${REACT_APP_API_BASE_URL}/user`);
            setPostList(...postList, ...result?.data?.data);

        } catch (error) {
            
        }
        

    }



    useEffect(() => {
        fetchPostData();
    }, []);
    return (
        <Container className={mainStyles.wrapper}>
            MAIN PAGE
        </Container>
    )
}

export default MainPage;