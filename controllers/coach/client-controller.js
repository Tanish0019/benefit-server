import Coach from '../../models/coach' ;
import Client from '../../models/client' ;

const ClientController = {

    getMyClients : (req,res,next)=>{

        let coach_id = req.decoded.id ;
        console.log(coach_id);
        Client.find({
            coach : coach_id
        }).select('email name mobile gender age premium_start premium_expiry').then(data => {
            console.log("Client Found" , data.length);
            res.json({
                success : true ,
                data : data
            })
        }).catch(err => {
            console.error(err);
            next(err);
        })
    }
};

export default ClientController ;