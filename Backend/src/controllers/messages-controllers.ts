const Message = require('../models/message');
const Group = require('../models/group');
const User = require('../models/user');


const getMessages = async (req: any, res: any, next: any) => {
    const { groupId } = req.params;

    try {
        const group = await Group.findById(groupId).populate('messages');
        res.status(200).json({ messages: group.messages });
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}


const createMessage = async (req: any, res: any, next: any) => {
    const { username, image, text, group, date } = req.body;

    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong' });
    }

    let groupToUpdate;
    try {
        groupToUpdate = await Group.findById(group);
        if (!groupToUpdate) {
            return res.status(404).json({ message: 'Group not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong' });
    }


    try {
        const newMessage = new Message({ username, image, text, group, date });

        groupToUpdate.messages.push(newMessage.id);
        await groupToUpdate.save();

        await newMessage.save();
        res.status(201).json({ message: newMessage });
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}
export { getMessages, createMessage };
