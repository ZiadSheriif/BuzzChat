import React, { useState, useEffect, useRef } from 'react';
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
import { createMessage } from 'src/services/Chat/messages';
import useAPI from 'src/hooks/useAPI.hook';
import GroupChatForm from 'src/components/Side/GroupChatForm/GroupChatForm';
import { RootState } from 'src/redux/types';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import styles from './Home.module.scss';


const socket = io('http://localhost:4000');

const Home: React.FC = () => {
    const { data: groupsData, runQuery: groupsRunQuery } = useAPI();
    const { data: groupDetailsData, runQuery: groupDetailsRunQuery } = useAPI();
    const { data: createMessageData, runQuery: createMessageRunQuery } = useAPI();
    const user = useSelector((state: RootState) => state.auth);
    const [selectedChat, setSelectedChat] = useState<{ type: 'private' | 'group'; id: number } | null>(null);
    const [message, setMessage] = useState('');
    const [chatMessages, setChatMessages] = useState<any[]>([]);

    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const handleSelectChat = (type: 'private' | 'group', id: number) => {
        if (type === 'group') {
            groupDetailsRunQuery(() => getGroupDetails(id));
        }
        setSelectedChat({ type, id });
    };

    const handleSendMessage = () => {
        if (message.trim() !== '') {
            const newMessage = {
                username: user.username,
                text: message,
                date: new Date().toISOString(),
                image: user.image
            };
            setChatMessages((prevMessages) => [...prevMessages, newMessage]);
            socket.emit('sendMessage', newMessage);
            setMessage('');
            handleCreateMessage(message);
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSendMessage();
        }
    };

    const handleCreateMessage = (message: string) => {
        createMessageRunQuery(() => createMessage(user.username, user.image, message, selectedChat?.id.toString(), new Date().toISOString()));
    }

    useEffect(() => {
        groupsRunQuery(getGroups);
    }, []);

    useEffect(() => {
        if (groupDetailsData) {
            setChatMessages(groupDetailsData.group.messages);
            scrollToBottom();
        }
    }, [groupDetailsData]);

    useEffect(() => {
        const handleReceiveMessage = (data: any) => {
            setChatMessages((prevMessages) => [...prevMessages, data]);
            scrollToBottom();
        };

        socket.on('receiveMessage', handleReceiveMessage);

        return () => {
            socket.off('receiveMessage', handleReceiveMessage);
            socket.off('disconnect');
        };
    }, []);




    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };


    useEffect(() => {
        scrollToBottom();
    }, [chatMessages]);



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
                            <ListItem
                                button
                                key={group._id}
                                onClick={() => handleSelectChat('group', group._id)}
                                className={selectedChat?.id === group._id ? styles.selectedGroup : ''}
                            >
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
                        {Array.from(new Set(groupDetailsData?.group?.members.map(m => m.username))).map((username) => {
                            const member = groupDetailsData.group.members.find(m => m.username === username);
                            return (
                                <ListItem key={member._id}>
                                    <ListItemIcon>
                                        <Avatar alt={username} src={member.image} className={styles.avatar} />
                                    </ListItemIcon>
                                    <ListItemText primary={username} />
                                </ListItem>
                            );
                        })}
                    </List>
                </Grid>
                <Grid item xs={9} >
                    <List className={styles.messageArea}>
                        {chatMessages.map((msg: any, index) => (
                            <ListItem key={index}>
                                <Grid container>
                                    {msg.username !== user.username && (
                                        <Grid item xs={1} className={styles.avatarChat}>
                                            <Avatar alt={msg.username} src={msg.image} />
                                        </Grid>
                                    )}

                                    <Grid item xs={11}>
                                        <ListItemText
                                            primary={msg.text}
                                            secondary={new Date(msg.date).toLocaleTimeString()}
                                            align={msg.username === user.username ? 'right' : 'left'}
                                        />
                                    </Grid>

                                    {msg.username === user.username && (
                                        <Grid item xs={1}>
                                            <Avatar alt={msg.username} src={msg.image} />
                                        </Grid>
                                    )}
                                </Grid>
                            </ListItem>
                        ))}
                        <div ref={messagesEndRef} />

                    </List>
                    <Divider className={styles.chatDivider} />
                    <Grid container className={styles.messageInputContainer}>
                        <Grid item xs={11} >
                            <TextField
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                label="Type Something"
                                fullWidth
                                onKeyPress={handleKeyPress}
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
