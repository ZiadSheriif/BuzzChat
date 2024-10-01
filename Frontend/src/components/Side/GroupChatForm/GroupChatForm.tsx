import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import styles from './GroupChatForm.module.scss';

const GroupChatForm: React.FC = () => {
    const [openGroupModal, setOpenGroupModal] = useState(false);
    const [groupName, setGroupName] = useState('');

    const handleCreateGroup = () => {
        console.log('Group Created:', groupName);
        setOpenGroupModal(false);
    };

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
                        label="Group Name"
                        fullWidth
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenGroupModal(false)} color="secondary">Cancel</Button>
                    <Button onClick={handleCreateGroup} color="primary">Create</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default GroupChatForm;
