import constants from '../constants/constants';
import Message from '../models/message';
import Conversation from '../models/conversation';

let chatController = {

    // setup : (req, res, next) => {
    //     //Array of chat data. Each object properties must match the schema object properties
    //     var chatData = [{
    //         created: new Date(),
    //         content: 'Hi',
    //         username: 'Chris',
    //         room: 'php'
    //     }, {
    //         created: new Date(),
    //         content: 'Hello',
    //         username: 'Obinna',
    //         room: 'laravel'
    //     }, {
    //         created: new Date(),
    //         content: 'Ait',
    //         username: 'Bill',
    //         room: 'angular'
    //     }, {
    //         created: new Date(),
    //         content: 'Amazing room',
    //         username: 'Patience',
    //         room: 'socet.io'
    //     }];

    //     //Loop through each of the chat data and insert into the database
    //     for (var c = 0; c < chatData.length; c++) {
    //         //Create an instance of the chat model
    //         var newChat = new Chat(chatData[c]);
    //         //Call save to insert the chat
    //         newChat.save(function(err, savedChat) {
    //             console.log(savedChat);
    //         });
    //     }
    //     //Send a resoponse so the serve would not get stuck
    //     res.json({
    //         success : true ,
    //         data : "Successfully Created"
    //     })
    // },

    // fetchRoom : (req , res, next) => {
    //     console.log(req.decoded.id);
    //     console.log(req.query.timestamp  );
    //     Chat.find({
    //         'room': req.query.client || req.decoded.id ,
    //         'timestamp' :{ $gt: req.query.timestamp },
    //     }).exec().then(data => {

    //         if(data){
    //             res.json({
    //                 success : true ,
    //                 data : data
    //             })
    //         } else {
    //             res.json({
    //                 success : false ,
    //                 message : "Room Not Found"
    //             })
    //         }


    //     }).catch(err => {
    //         return next(new Error("Some Error Occured"));
    //     })
    // }



    //==================================
    //Gives the list of conversation with the last message in it
    //==================================

    //This is an optional feature maybe we can use it

    getConversations: (req, res, next) => {
        Conversation.find({ participants: req.decoded.id })
        .select('_id').exec((err, conversations) => {
            if (err) {
                return next(new Error("some error occured"));
            }

            if(conversations.length === 0) {
                res.send({
                    message: "No Conversations yet",
                    conversations: []
                });
            };

            let fullConversations = [];
            conversations.forEach(conversation => {
                Message.find({ 'conversationId': conversation._id })
                .sort('-createdAt')
                .limit(1)
                .populate({
                    path: "author"
                }).exec((err, message) => {
                    if(err) {
                        return next(new Error("some error occured"));
                    }
                    fullConversations.push(message);
                    if (fullConversations.length === conversations.length) {
                        return res.json({
                            success: true,
                            data: fullConversations
                        });
                    }
                });
            });
        });
    },


    //==================================
    //Getting All Messages In A Single Conversation
    //==================================


    getConversation: (req, res, next) => {
        Message.find({ conversationId: req.params.conversationId })
        .sort('-createdAt')
        .populate()
        .exec((err, messages) => {
            if (err) {
                return next(new Error("some error occured"));
            }

            res.json({
                success: true,
                data: messages
            });
        });
    },

    //==================================
    //STARTING NEW CONVERSATION
    //==================================

    //This thing starts with the first message.
    //the rest of the chat has a different end point the one below this

    //Send the id of the user to whom the message is to be sent in the param
    newConversation: (req, res, next) => {
        console.log(req.decoded.id, req.params.id);
        const conversation = new Conversation({
            participants: [req.decoded.id, req.params.id]
        });

        conversation.save().then(newConversation => {
            console.log("we are here");
            console.log(newConversation);
            const message = new Message({
                conversationId: newConversation._id,
                author: req.decoded.id,
                message: req.body.message
            });
            console.log("message made");
            message.save().then((newMessage) => {
                res.json({
                    success: true,
                    conversationId: conversation._id,
                    message: message
                })
            }).catch(err => {
                return next(new Error("Could not save message"));
            })
        }).catch(err => {
            return next(new Error("Could not create conversation"));
        })
    },


    //Once the conversation has started we use this controller to continue chatting
    // Again the conversationId is sent in params
    sendMessage: (req, res, next) => {
        const message = new Message({
            conversationId: req.params.conversationId,
            message: req.body.message,
            author: req.decoded.id
        })

        message.save().then(newMessage => {
            res.json({
                success: true,
                message: "Message sent Successfully",
                data: message
            });
        }).catch(err => {
            return next(new Error("Could not send new message"))
        });
    }


}

export default chatController;
