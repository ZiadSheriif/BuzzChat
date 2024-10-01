import React, { useState } from 'react';
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

import Header from 'src/layouts/Header/Header';
import GroupChatForm from 'src/components/Side/GroupChatForm/GroupChatForm';
import styles from './Home.module.scss';


const users = [
    { id: 1, name: 'John Wick', avatar: 'https://material-ui.com/static/images/avatar/1.jpg', online: true },
    { id: 2, name: 'Alice', avatar: 'https://material-ui.com/static/images/avatar/3.jpg', online: false },
    { id: 3, name: 'Cindy Baker', avatar: 'https://material-ui.com/static/images/avatar/2.jpg', online: false },
];

const groups = [
    { id: 1, name: 'Family Group', avatar: 'https://material-ui.com/static/images/avatar/5.jpg' },
    { id: 2, name: 'Work Group', avatar: 'https://material-ui.com/static/images/avatar/6.jpg' },
];


const Home: React.FC = () => {

    const [selectedChat, setSelectedChat] = useState<{ type: 'private' | 'group'; id: number } | null>(null);
    const [message, setMessage] = useState('');
    const [chatMessages, setChatMessages] = useState<string[]>([]);

    const handleSelectChat = (type: 'private' | 'group', id: number) => {
        setSelectedChat({ type, id });
    };


    const handleSendMessage = () => {
        if (message.trim() !== '') {
            setChatMessages((prevMessages) => [...prevMessages, message]);
            setMessage('');
        }
    };

    return (
        <div>
            <Grid container>
                <Grid item xs={12} className={styles.chatContainer}>
                    <Typography variant="h5" className={styles.headerMessage}>Chat</Typography>
                </Grid>
            </Grid>
            <Grid container component={Paper} className={styles.homeContainer}>
                <Grid item xs={3} className={styles.borderRight}>
                    <GroupChatForm />
                    <Divider className={styles.chatDivider} />
                    <Grid item xs={12} className={styles.listContainer}>
                        <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
                    </Grid>
                    <Divider className={styles.chatDivider} />
                    <Typography variant="h6" className={styles.sectionTitle}>Contacts</Typography>

                    <List>
                        {users.map((user) => (
                            <ListItem button key={user.id} onClick={() => handleSelectChat('private', user.id)}>
                                <ListItemIcon>
                                    <Avatar alt={user.name} src={user.avatar} className={styles.avatar} />
                                </ListItemIcon>
                                <ListItemText primary={user.name} />
                                <ListItemText secondary={user.online ? 'online' : ''} align="right" />
                            </ListItem>
                        ))}
                    </List>
                    <Divider className={styles.chatDivider} />
                    <Typography variant="h6" className={styles.sectionTitle}>Groups</Typography>
                    <List>
                        {groups.map((group) => (
                            <ListItem button key={group.id} onClick={() => handleSelectChat('group', group.id)}>
                                <ListItemIcon>
                                    <Avatar alt={group.name} src={group.avatar} className={styles.avatar} />
                                </ListItemIcon>
                                <ListItemText primary={group.name} />
                            </ListItem>
                        ))}
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
