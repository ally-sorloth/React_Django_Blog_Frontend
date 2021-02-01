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

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});



export default function PostCard() {
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

// onClick={openPostDetails}
  return (
    <Card className={classes.root}>
      <CardActionArea >
        <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
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
      </CardActions>
    </Card>
  );
}