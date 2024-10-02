import React, { useState, useEffect } from 'react';
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
import { getGroups } from 'src/services/Chat/groups';
import { getGroupDetails } from 'src/services/Chat/groups';
import useAPI from 'src/hooks/useAPI.hook';
import GroupChatForm from 'src/components/Side/GroupChatForm/GroupChatForm';
import { RootState } from 'src/redux/types';
import { useSelector } from 'react-redux';
import styles from './Home.module.scss';

const Home: React.FC = () => {
    const { data: groupsData, runQuery: groupsRunQuery } = useAPI();
    const { data: groupDetailsData, runQuery: groupDetailsRunQuery } = useAPI();
    const username = useSelector((state: RootState) => state.auth.username);
    const [selectedChat, setSelectedChat] = useState<{ type: 'private' | 'group'; id: number } | null>(null);
    const [message, setMessage] = useState('');
    const [chatMessages, setChatMessages] = useState<any[]>([]);

    const handleSelectChat = (type: 'private' | 'group', id: number) => {
        if (type === 'group') {
            groupDetailsRunQuery(() => getGroupDetails(id));
        }
        setSelectedChat({ type, id });
    };

    const handleSendMessage = () => {
        if (message.trim() !== '') {
            const newMessage = {
                username: username, 
                text: message,
                date: new Date().toISOString(),
            };
            setChatMessages((prevMessages) => [...prevMessages, newMessage]);
            setMessage('');
        }
    };

    useEffect(() => {
        groupsRunQuery(getGroups);
    }, []);

    useEffect(() => {
        if (groupDetailsData) {
            setChatMessages(groupDetailsData.group.messages);
        }
    }, [groupDetailsData]);

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
                    <Typography variant="h6" className={styles.sectionTitle}>Groups</Typography>
                    <List>
                        {groupsData?.groups?.map((group: any) => (
                            <ListItem button key={group._id} onClick={() => handleSelectChat('group', group._id)}>
                                <ListItemIcon>
                                    <Avatar alt={group.title} src={group.avatar} className={styles.avatar} />
                                </ListItemIcon>
                                <ListItemText primary={group.title} />
                            </ListItem>
                        ))}
                    </List>
                    <Divider className={styles.chatDivider} />
                    <Typography variant="h6" className={styles.sectionTitle}>Members</Typography>
                    <List>
                        {groupDetailsData?.group?.members.map((member: any) => (
                            <ListItem key={member._id}>
                                <ListItemIcon>
                                    <Avatar alt={member.username} src={member.image} className={styles.avatar} />
                                </ListItemIcon>
                                <ListItemText primary={member.username} />
                            </ListItem>
                        ))}
                    </List>
                </Grid>
                <Grid item xs={9}>
                    <List className={styles.messageArea}>
                        {chatMessages.map((msg: any, index) => (
                            <ListItem key={index}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <ListItemText
                                            primary={msg.text}
                                            secondary={new Date(msg.date).toLocaleTimeString()}
                                            align={msg.username === username ? 'right' : 'left'}
                                        />
                                    </Grid>
                                </Grid>
                            </ListItem>
                        ))}
                    </List>
                    <Divider className={styles.chatDivider} />
                    <Grid container className={styles.messageInputContainer}>
                        <Grid item xs={11}>
                            <TextField
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                label="Type Something"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={1} align="right">
                            <Fab color="primary" aria-label="send" className={styles.fabButton} onClick={handleSendMessage}>
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
