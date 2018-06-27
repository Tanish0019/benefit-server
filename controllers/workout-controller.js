import AWS from 'aws-sdk' ;

const s3 = new AWS.S3();
import exerciseJSON from './exercises' ;
import Exercise from '../models/exercise' ;
import Workout from '../models/workout' ;
import UserWorkout from '../models/user-workout' ;
import MealLog from "../models/meallog";


let workoutController = {
    getSignedUrl: (req, res, next) => {

        Exercise.findOne({_id : req.params.id}).then(data => {
            if(!data){
                return next("Exercise not Found");
            }
            // res.json(data);
            // return ;
            let key = `${data.sno} ${data.name}.mp4` ;
            console.log(key);
            let params = {Bucket: 'benefit-workout-videos', Key: key, Expires: 60 * 60};
            let url = s3.getSignedUrl('getObject', params);

            res.send({
                success : true ,
                data : url
            }); // expires in 60*60 seconds


        })

        },

    getExerciseList: (req,res,next) => {
        Exercise.find().then(data=> {
            res.json({
                success : true ,
                data : data
            })
        })
    },

    importExercises: (req, res, next) => {
        exerciseJSON.forEach(element => {
            let e = new Exercise({
                sno: element['Sno'],
                name: element['Exercise Name'],
                intensity: element['Exercise Intensity'],
                mets: element['METS'],
                timeTaken: element['Time Taken'],
                base: element['Base'],
                repFormat: element['Rep'],
                type: element['Type'],
                videoA: (element['Video-A'] === "1"),
                videoB: (element['Video-B'] === "1"),
            })

            e.save();
        })
    },

    addWorkout: (req, res, next) => {

        let data = {
            ...req.body
        };
        const newWorkout = new Workout(data);
        newWorkout.save((error, result) => {
            if (error) {
                return next(new Error("Could not Save Workout"));
            }
            res.json({
                success: true,
                data: result
            });
        });
    },

    addUserWorkout : (req,res,next)=>{

        let data = {
            client : req.body.client ,
            workout : req.body.workout ,
            date : req.body.date
        }
        const newuserWorkout = new UserWorkout(data);
        newuserWorkout.save((error, result) => {
            if (error) {
                return next(new Error("Could not Save Workout for User"));
            }
            res.json({
                success: true,
                data: result
            });
        });

    },

    getUserWorkout: (req,res, next) => {
        let query = {
            client : req.decoded.id ,
            date : req.query.date
        };
        UserWorkout.find(query).populate({
            path : 'workout' ,
            populate : {
              path : 'exercises.exercise'
            }
        }).then(result => {


            res.json({
                success: true,
                data: result
            });
        }).catch(err=> {
            return next(new Error("Could not Fetch Workout for User"));
        });

    }

};


export default workoutController;
