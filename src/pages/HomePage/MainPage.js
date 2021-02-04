import React, { useEffect, useState, useContext } from  "react";
import Axios from   'axios';
import {
    Button,
    TextField,
    Grid,
    Container,
    Avatar,
    Typography,
    CircularProgress
  } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { appContext } from "../../context/AppContext";
import PostCardList from "../../components/card/PostCardList";



// const stylesFunc = makeStyles((theme) => ({
//     wrapper: {
//       marginTop: "5rem",
//       height: "calc(100vh - 19.0625rem)",
//       textAlign: "center",
//     },
//     avatar: {
//       margin: "1rem auto",
//       backgroundColor: theme.palette.primary.main,
//     },
//     signIn: {
//       margin: "1rem",
//     },
//   }));

function MainPage() {
  // const { test } = useContext(appContext);
  const [nextUrl, setNextUrl] = useState();
    const [postList, setPostList] = useState([]);

    // const mainStyles = stylesFunc();
    const { REACT_APP_API_BASE_URL } = process.env;

    // 
    const fetchPostList = async(url = "https://django-react-blog-36.herokuapp.com/api/list/") => {

      // const datapost = await axios.get(url)
      //   .then((res) => setPostList(res?.data.results))

        // .catch ({ response }) {
        //   if (response) {
        //     console.log(response.data.non_field_errors[0]);
        //   } else {
        //     console.log("Something went wrong!");
        //   }
        // }
        // ...postList, ...result?.data?.data
    
    // console.log(postList)
        try {
            const result = await axios.get(url);
            // console.log(result)
            setPostList(result?.data.results);
            // setNextUrl(result?.data?.next);
            // console.log(result.data)

        }  catch ({ response }) {
          // if (response) {
          //   console.log(response.data.non_field_errors[0]);
          // } else {
          //   console.log("Something went wrong!");
          // }
        }
  
      };
      console.log(postList);

    useEffect(() => {
        fetchPostList();
    }, []);

    const handleLoadMore = () => {
      fetchPostList(nextUrl)
    };
    if (!postList?.length) return "Loading..."
    return (

    //   <Container className={mainStyles.wrapper}>
    //   {!postList ? (
    //     <CircularProgress />
    //   ) : (
    //     <Grid container spacing={4}>
    //       {postList?.map((post) => {
    //         return (
    //           <Grid item lg={4} md={4} sm={6} xs={12} key={post.id}>
    //             {/* {post.title} */}
    //             <PostCardList
    //               id={post.id}
    //               title={post.title}
    //               content={post.content}
    //               imgSrc={post.image}
    //               publishedDate={post.published_date}
    //               author={post.author}
    //               commentCount={post.get_comment_count}
    //               viewCount={post.get_view_count}
    //               likeCount={post.get_like_count}
    //             />
    //           </Grid>
    //         );
    //       })}
    //     </Grid>
    //   )}
    // </Container>
    
        <Container >
          <PostCardList
            hasNext={!!nextUrl}
            loadMore={handleLoadMore}
            postList={postList}           
          />
        </Container>
    );
};

export default MainPage;