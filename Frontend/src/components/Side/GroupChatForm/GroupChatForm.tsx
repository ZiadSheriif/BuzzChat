import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Snackbar } from '@material-ui/core';
import { createGroup } from 'src/services/Chat/groups';
import styles from './GroupChatForm.module.scss';
import useAPI from 'src/hooks/useAPI.hook';
import InProgress from 'src/components/Helpers/InProgress/InProgress';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = (props: any) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const GroupChatForm: React.FC = () => {
    const { data: groupData, isLoading: groupLoading, isSuccess: groupSuccess, isError: groupError, error: groupErrorText, runQuery: groupRunQuery } = useAPI();
    const [openGroupModal, setOpenGroupModal] = useState(false);
    const [groupTitle, setGroupTitle] = useState('');
    const [description, setDescription] = useState('');
    const [avatar, setAvatar] = useState<File | null | string>(null);
    const [errors, setErrors] = useState<{ groupTitle?: string; }>({});
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

    const handleCreateGroup = () => {
        if (validate()) {
            const data = {
                title: groupTitle,
                description: !description ? '..' : description,
                avatar: !avatar ? "www.w3schools.com/w3images/avatar2.png" : avatar
            };
            groupRunQuery(() => createGroup(data));
            setOpenGroupModal(false);
        } else {
            setErrors({ groupTitle: 'Group Title is required' });
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setAvatar(e.target.files[0]);
        }
    };

    const validate = () => {
        const newErrors: { groupTitle?: string; description?: string } = {};
        if (!groupTitle) {
            newErrors.groupTitle = 'Group Title is required';
        }

        return Object.keys(newErrors).length === 0;
    };

    useEffect(() => {
        if (groupSuccess && groupData) {
            setSnackbarMessage('Group created successfully!');
            setSnackbarSeverity('success');
            setShowSnackbar(true);
        } else if (groupError) {
            setSnackbarMessage(`Failed to create group: ${groupErrorText}`);
            setSnackbarSeverity('error');
            setShowSnackbar(true);
        }
    }, [groupSuccess, groupData, groupError, groupErrorText]);

    return (
        <div className={styles.groupChatForm}>
            <Button variant="outlined" color="primary" onClick={() => setOpenGroupModal(true)}>
                Create Group
            </Button>

            <Dialog open={openGroupModal} onClose={() => setOpenGroupModal(false)}>
                <DialogTitle>Create Group</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Group Title"
                        fullWidth
                        value={groupTitle}
                        onChange={(e) => setGroupTitle(e.target.value)}
                        error={!!errors.groupTitle}
                    />
                </DialogContent>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Group Description"
                        fullWidth
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </DialogContent>
                <DialogContent>
                    <input
                        accept="image/*"
                        type="file"
                        onChange={handleImageChange}
                        style={{ marginTop: '10px' }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenGroupModal(false)} color="secondary">Cancel</Button>
                    {groupLoading ? <InProgress /> : <Button onClick={handleCreateGroup} color="primary">Create</Button>}
                </DialogActions>
            </Dialog>

            {/* Snackbar for notifications */}
            <Snackbar
                open={showSnackbar}
                autoHideDuration={6000}
                onClose={() => setShowSnackbar(false)}
            >
                <Alert onClose={() => setShowSnackbar(false)} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default GroupChatForm;
