import FoodItem from '../models/food-item'
import constants from '../constants/constants';
import MealLog from '../models/meallog';
import mealData from './import' ;

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


let mealLogController = {
    importItems: (req, res, next) => {


        let m = mealData.forEach(item => {
            item.size = {};
            item.sugar = 0 ;

            if (item.unit === 'piece') {
                console.log(item.Scale.slice(0, -1));
                item.size.piece = item.Scale.slice(0, -1)
            } else {
                item.size.serve = item.Scale.slice(0, -1)
            }

            // return item ;
            let f = new FoodItem(item).save()
                .then(data => {
                    console.log(data);
                }).catch(err => {
                    console.log(err);
                    return next(new Error("Saving Error"))
                })


            // let foodItem = new FoodItem(item)
        });
    } ,

    searchFoodItem : (req,res,next) => {
        let keyword = req.params.keyword ;
        console.log(keyword)
        const regex = new RegExp('^'+keyword+'$', "i");
        FoodItem.find({'keywords': {$options:'i', $regex: keyword }}, function(error, items){
            if(error){
                return next(error)
            }

            res.json({
                success : true ,
                data : items
            })
        });
    },

    getTypeDate: (req, res, next) => {

        console.log(req.query)

        MealLog.findOne({
            client: req.decoded.id,
            type: req.query.type,
            date : req.query.date
        }).populate('food.item').then((mealLog) => {

            if (!mealLog) {
                return next(new Error("MealLog does not exist"));
            }

            res.json({
                success: true,
                data :  mealLog
            });
        }).catch(err => {
            return next(new Error("Could not find client"));
        });
    },

    postMealLog: (req, res, next) => {
        MealLog.findOne({
            client: req.decoded.id ,
            type: req.body.type,
            date : req.body.date
        }).then( (mealLog) => {

            if(mealLog) {

                mealLog.food = req.body.food ;
                mealLog.save((err, data) => {
                    if(err) {
                        return next(new Error("Could not save meal log"));
                    }
                    res.json({
                        success: true,
                        data: data
                    });
                })  
            } else {
                let data = {
                    client: req.decoded.id,
                    type: req.body.type,
                    date: req.body.date ,
                    food : req.body.food
                };
                const newMealLog = new MealLog(data);
                newMealLog.save((error, data) => {
                    if(error) {
                        return next(new Error("Could not save meal log"));
                    }
                    res.json({
                        success: true,
                        data: data
                    });
                });
            }
            
        }).catch(err => {
            return next(new Error("Some Error Occured"));
        })
    }
}

export default mealLogController;
