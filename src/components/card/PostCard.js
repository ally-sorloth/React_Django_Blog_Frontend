import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});



export default function PostCard({post}) {
    const {author,
        content,
        detail_url,
        get_comment_count,
        get_like_count,
        get_view_count,
        image,
        published_date,
        slug,
        status,
        title,
        hasUserLiked = false,
      } = post;

  const classes = useStyles();
  const history = useHistory();
  const openPostDetails = () => {
      history.push(`/detail/${slug}`);
  };

// 
  return (
    <Card className={classes.root}>
      <CardActionArea onClick={openPostDetails} >
        <CardMedia
          className={classes.media}
          image={image}
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