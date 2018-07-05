import Exercise from '../../models/exercise';

const workoutController = {

    searchExercise : (req, res, next) => {
        let query = req.query.q ;
        console.log(query)
        let regex = new RegExp('^'+query+'$', "i");
        Exercise.find({name :  { '$regex' : query, '$options' : 'i' } }).limit(5).then(data => {
            console.log(data) ;

            res.json({
                success : true ,
                data : data
            })

        }).catch(err => {
            console.error(err);
            next(err);
        })

    }

}

export default workoutController;