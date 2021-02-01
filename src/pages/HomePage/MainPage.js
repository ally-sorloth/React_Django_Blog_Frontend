import React, { useEffect, useState, useContext } from  "react";
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
import { appContext } from "../../context/AppContext";
import PostCardList from "../../components/card/PostCardList";



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
  // const { test } = useContext(appContext);
  const [nextUrl, setNextUrl] = useState();
    const [postList, setPostList] = useState([]);

    const mainStyles = stylesFunc();
    const { REACT_APP_API_BASE_URL } = process.env;

    const fetchPostList = async(url = "https://django-react-blog-36.herokuapp.com/api/list/"
    ) => {
      
        try {
            const result = await axios.get(url);
            setPostList(...postList, ...result?.data?.data);
            setNextUrl(result?.data?.next);
            console.log(result)

        }  catch ({ response }) {
          if (response) {
            console.log(response.data.non_field_errors[0]);
          } else {
            console.log("Something went wrong!");
          }
        }
    };

    useEffect(() => {
        fetchPostList();
    }, []);
    console.log(postList);

    const handleLoadMore = () => {
      fetchPostList(nextUrl)
    };
    if (!postList?.length) return "Loading..."
    return (
        <Container className={mainStyles.wrapper}>
          <PostCardList
          hasNext={!!nextUrl}
          loadMore={handleLoadMore}
           postlist={postList}           
          />
        </Container>
    );
};

export default MainPage;