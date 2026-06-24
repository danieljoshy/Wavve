Wavve 🌊

🎯 High Level Goals

Provide a real-time messaging platform for users to chat privately and in groups
Ensure secure authentication and private conversations
Show online/offline status of users in real time
Be fast, responsive and work on both desktop and mobile


👥 Users & Functionalities
👤 Regular User

Register and log in to their account
Update their profile (username, avatar)
Search for other users
Send and receive direct messages (1-on-1)
Create and join group chat rooms
See who is online
See typing indicators
View message history

🛡️ Admin

View all registered users
Deactivate or delete user accounts
Delete inappropriate messages
Create and delete chat rooms
Monitor active rooms and users


✨ User Features Needed
Auth

Register with username, email, password
Login with email and password
Logout
Protected routes (redirect to login if not authenticated)

Profile

View own profile
Edit username and avatar
View other users' profiles

Direct Messaging

Start a 1-on-1 conversation with any user
Send and receive messages in real time
See message timestamps
See typing indicator

Group Rooms

Create a new room with a name
Join an existing room
Leave a room
Send and receive messages in real time
See all members in the room

Online Status

Show green dot when user is online
Show grey dot when user is offline
Update status automatically on login/logout

Notifications

Unread message count badge on sidebar
Highlight rooms/users with new messages


🗄️ Data Fields
👤 User
FieldTypeDescription_idObjectIdUnique identifierusernameStringDisplay nameemailStringLogin emailpasswordStringHashed passwordavatarStringProfile picture URLisOnlineBooleanOnline statusisAdminBooleanAdmin role flagcreatedAtDateAccount creation dateupdatedAtDateLast profile update
💬 Message
FieldTypeDescription_idObjectIdUnique identifiercontentStringMessage textsenderObjectId → UserWho sent the messageroomObjectId → RoomGroup room (null if DM)receiverObjectId → UserDM recipient (null if group)isReadBooleanRead statuscreatedAtDateTime message was sent
🏠 Room
FieldTypeDescription_idObjectIdUnique identifiernameStringRoom namecreatedByObjectId → UserWho created the roommembersObjectId[] → UserList of memberscreatedAtDateRoom creation dateupdatedAtDateLast activity date
🛠️ Tech Stack
LayerTechFrontendReact, React Router, Axios, Socket.io-clientBackendNode.js, Express, Socket.ioDatabaseMongoDB + MongooseAuthJWT + bcryptStylingTailwind CSS