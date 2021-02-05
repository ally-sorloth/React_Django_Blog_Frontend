import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import AccountCircle from "@material-ui/icons/AccountCircle";
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import placeholder from "../../assets/placeholder.png";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    backgroundColor: 'green',
  },
  media: {
    height: 140,
    padding: 60,
  },
  image: {
    margin: 40,
    padding: 10,
  },
  content: {
    display: "-webkit-box",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical",
    "text-overflow": "ellipsis",
    overflow: "hidden",
  }
});


export default function PostDetail({post}) {
    const classes = useStyles();
    const history = useHistory();
    const [postDetail, setPostDetail] = useState([]);
    const [comment, setComment] = useState();
    const { REACT_APP_API_BASE_URL, REACT_APP_API_TOKEN } = process.env;

    const getPostDetail = async () => {
        try {
            const response = await axios.get(`${REACT_APP_API_BASE_URL}/${slug}`)
            setPostDetail(response?.data);
            console.log(response);
            
        }
        catch ({ response }) {
            if (response) {
              console.log(response?.data?.detail);
            } else {
              console.log("Something went wrong!");
            }
        }
    };

    const {author,
        content,
        detail_url,
        get_comment_count,
        get_like_count,
        get_view_count,
        image,
        published_date,
        owner,
        title,
        has_liked,
        liked_url,
        comments
      } = postDetail;

      useEffect(() => {
        getPostDetail()
      }, [])

  
  const openPostDetails = () => {
      history.push(`/detail/${slug}`);
  };

// 
  return (
    <Card className={classes.root}>
      <CardActionArea onClick={openPostDetails} >
        <CardMedia
          className={classes.media}
          image={image || placeholder}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>

          <Typography variant="body2" color="textSecondary" component="p">
            {published_date}
          </Typography>
          <p className={classes.content}>{content}</p>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <AccountCircle className={classes.avatar} />
        <Typography gutterBottom variant="h6" component="h2">
          {author}
        </Typography>
      </CardActions>
      <CardActions>
        <IconButton>
            <FavoriteIcon color={hasUserLiked ? "secondary" : "primary"}/>
        </IconButton>
        <Typography variant="body2" color="textSecondary">
            {get_like_count}
        </Typography>
        <IconButton>
            <VisibilityIcon />
        </IconButton>
        <Typography variant="body2" color="textSecondary">
            {get_view_count}
        </Typography>
        <IconButton>
            <ChatBubbleOutlineIcon/>
        </IconButton>
        <Typography variant="body2" color="textSecondary">
            {get_comment_count}
        </Typography>
      </CardActions>
    </Card>
  );
}



// function PostDetail() {
//     return (
//         <div>
//             POSTDETAIL
//         </div>
//     )
// }

// export default PostDetail;
