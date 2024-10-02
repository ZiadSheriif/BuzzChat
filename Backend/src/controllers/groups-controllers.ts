const Group = require('../models/group');


const getGroups = async (req: any, res: any, next: any) => {
    try {
        const groups = await Group.find().populate('members');
        res.status(200).json({ groups: groups });
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}

const getGroupsDetails = async (req: any, res: any, next: any) => {
    const { groupId } = req.params;

    let group;
    try {
        group = await Group.findById(groupId).populate('members messages');
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong' });
    }
    const members = group.messages.map((member: any) => {
        return { _id: member._id, username: member.username, image: member.image };
    });

    res.status(200).json({ group: { title: group.title, avatar: group.avatar, description: group.description, members: members, messages: group.messages } });
}

const createGroup = async (req: any, res: any, next: any) => {
    const { title, description, avatar } = req.body;

    try {
        const newGroup = new Group({ title, description, avatar, members: [], messages: [] });
        await newGroup.save();
        res.status(201).json({ group: newGroup });
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong' });
    }

}
export { getGroups, getGroupsDetails, createGroup };