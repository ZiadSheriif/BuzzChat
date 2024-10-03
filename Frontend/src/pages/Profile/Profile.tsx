import React, { useState } from 'react';
import { Paper, Grid, Avatar, Typography, Divider, TextField, Button, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { Edit, Save } from '@material-ui/icons';
import { RootState } from 'src/redux/types';
import { useSelector } from 'react-redux';
import styles from './Profile.module.scss';



const Profile: React.FC = () => {

    const user = useSelector((state: RootState) => state.auth);

    const [isEditing, setIsEditing] = useState(false);
    const [userInfo, setUserInfo] = useState({
        username: user.username,
        email: user.email,
        image: user.image,
        bio: 'Software Engineer',
        recentMessages: [
            { id: 1, text: 'Hey there!', date: '2024-09-01 10:00' },
            { id: 2, text: 'Ready for the group meeting?', date: '2024-09-01 11:00' },
        ],
    });

    const handleEditToggle = () => setIsEditing((prev) => !prev);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };

    return (
        <div className={styles.profileContainer}>
            <Grid container spacing={3}>
                <Grid item xs={12} className={styles.header}>
                    <Typography color="textSecondary" variant="h5">Profile</Typography>
                </Grid>

                <Grid item xs={12} md={4} className={styles.profileInfo}>
                    <Paper className={styles.paper}>
                        <Grid container direction="column" alignItems="center">
                            <Avatar src={userInfo.image} alt={userInfo.username} className={styles.avatar} />
                            <Typography variant="h6" className={styles.username}>
                                {userInfo.username}
                            </Typography>
                            <Typography variant="body2" className={styles.email}>
                                {userInfo.email}
                            </Typography>
                            <Typography variant="body2" className={styles.bio}>
                                {userInfo.bio}
                            </Typography>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={8} className={styles.settingsSection}>
                    <Paper className={styles.paper}>
                        <Typography variant="h6">Edit Profile</Typography>
                        <Divider className={styles.divider} />

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Username"
                                    name="username"
                                    value={userInfo.username}
                                    onChange={handleChange}
                                    fullWidth
                                    disabled={!isEditing}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Email"
                                    name="email"
                                    value={userInfo.email}
                                    onChange={handleChange}
                                    fullWidth
                                    disabled={!isEditing}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Bio"
                                    name="bio"
                                    value={userInfo.bio}
                                    onChange={handleChange}
                                    fullWidth
                                    multiline
                                    rows={3}
                                    disabled={!isEditing}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    color={isEditing ? 'primary' : 'default'}
                                    startIcon={isEditing ? <Save /> : <Edit />}
                                    onClick={handleEditToggle}
                                    fullWidth
                                >
                                    {isEditing ? 'Save' : 'Edit'}
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper className={styles.paper}>
                        <Typography variant="h6">Recent Activity</Typography>
                        <Divider className={styles.divider} />
                        <List>
                            {userInfo.recentMessages.map((message) => (
                                <ListItem key={message.id}>
                                    <ListItemIcon>
                                        <Avatar src={userInfo.image} />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={message.text}
                                        secondary={message.date}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default Profile;
