import constants from '../constants/constants';
import Chat from '../models/chat';

let chatController = {

    setup : (req, res, next) => {
        //Array of chat data. Each object properties must match the schema object properties
        var chatData = [{
            created: new Date(),
            content: 'Hi',
            username: 'Chris',
            room: 'php'
        }, {
            created: new Date(),
            content: 'Hello',
            username: 'Obinna',
            room: 'laravel'
        }, {
            created: new Date(),
            content: 'Ait',
            username: 'Bill',
            room: 'angular'
        }, {
            created: new Date(),
            content: 'Amazing room',
            username: 'Patience',
            room: 'socet.io'
        }];

        //Loop through each of the chat data and insert into the database
        for (var c = 0; c < chatData.length; c++) {
            //Create an instance of the chat model
            var newChat = new Chat(chatData[c]);
            //Call save to insert the chat
            newChat.save(function(err, savedChat) {
                console.log(savedChat);
            });
        }
        //Send a resoponse so the serve would not get stuck
        res.json({
            success : true ,
            data : "Successfully Created"
        })
    },

    fetchRoom : (req , res, next) => {
        Chat.find({
            'room': req.decoded.id ,
            'timestamp' :{ $gt: req.query.timestamp },
        }).exec().then(data => {

            if(data){
                res.json({
                    success : true ,
                    data : data
                })
            } else {
                res.json({
                    success : false ,
                    message : "Room Not Found"
                })
            }


        }).catch(err => {
            return next(new Error("Some Error Occured"));
        })
    }

}

export default chatController;
