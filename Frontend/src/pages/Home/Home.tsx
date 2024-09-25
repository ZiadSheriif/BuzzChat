import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';

import styles from './Home.module.scss';

const Home: React.FC = () => {
    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h5" className={styles.headerMessage}>Chat</Typography>
                </Grid>
            </Grid>
            <Grid container component={Paper} className={styles.homeContainer}>
                <Grid item xs={3} className={styles.borderRight}>
                    <List>
                        <ListItem button key="RemySharp">
                            <ListItemIcon>
                                <Avatar
                                    alt="Remy Sharp"
                                    src="https://material-ui.com/static/images/avatar/1.jpg"
                                    className={styles.avatar}
                                />
                            </ListItemIcon>
                            <ListItemText primary="John Wick"></ListItemText>
                        </ListItem>
                    </List>
                    <Divider className={styles.chatDivider} />
                    <Grid item xs={12} className={styles.listContainer}>
                        <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
                    </Grid>
                    <Divider className={styles.chatDivider} />
                    <List>
                        <ListItem button key="RemySharp">
                            <ListItemIcon>
                                <Avatar
                                    alt="Remy Sharp"
                                    src="https://material-ui.com/static/images/avatar/1.jpg"
                                    className={styles.avatar}
                                />
                            </ListItemIcon>
                            <ListItemText primary="Remy Sharp" />
                            <ListItemText secondary="online" align="right" />
                        </ListItem>
                        <ListItem button key="Alice">
                            <ListItemIcon>
                                <Avatar
                                    alt="Alice"
                                    src="https://material-ui.com/static/images/avatar/3.jpg"
                                    className={styles.avatar}
                                />
                            </ListItemIcon>
                            <ListItemText primary="Alice" />
                        </ListItem>
                        <ListItem button key="CindyBaker">
                            <ListItemIcon>
                                <Avatar
                                    alt="Cindy Baker"
                                    src="https://material-ui.com/static/images/avatar/2.jpg"
                                    className={styles.avatar}
                                />
                            </ListItemIcon>
                            <ListItemText primary="Cindy Baker" />
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={9}>
                    <List className={styles.messageArea}>
                        <ListItem key="1">
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText align="right" primary="Hey man, What's up ?" />
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText align="right" secondary="09:30" />
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem key="2">
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText primary="Hey, I am good! What about you ?" />
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText secondary="09:31" />
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem key="3">
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText align='right' primary="Cool. I am good, let's catch up!" />
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText align="right" secondary="10:30" />
                                </Grid>
                            </Grid>
                        </ListItem>
                    </List>
                    <Divider className={styles.chatDivider} />
                    <Grid container className={styles.messageInputContainer}>
                        <Grid item xs={11}>
                            <TextField id="outlined-basic-email" label="Type Something" fullWidth />
                        </Grid>
                        <Grid item xs={1} align="right">
                            <Fab color="primary" aria-label="send" className={styles.fabButton}>
                                <SendIcon />
                            </Fab>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default Home;
