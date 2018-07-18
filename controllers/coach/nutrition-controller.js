import FoodItem from '../../models/food-item';
import Nutrition from "../../models/nutrition";
import UserNutrition from "../../models/user-nutrition";

const nutritionController = {

    addNutrition : (req, res, next) => {

        let unique = {
            search_name: req.body.search_name
        };

        let data = {
            description: req.body.description,
            foods: req.body.foods,
            name: req.body.name,
        };

        // Nutrition.findOneAndUpdate(unique, data, {upsert: true, setDefaultsOnInsert: true, new: true}).then(result => {
        //     res.json({
        //         success: true,
        //         data: result
        //     });
        // }).catch(err => {
        //     if (error.name === 'MongoError') {
        //         return next(new Error("Nutrition Plan with Same Search Name Exists. Choose other name."));
        //     }
        //     return next(new Error("Could not Save Nutrition Plan"));
        // });

        let combined = {
            ...data,
            ...unique
        };

        const newNutrition = new Nutrition(combined);
        newNutrition.save((error, result) => {
            if (error) {
                if (error.name === 'MongoError') {
                    return next(new Error("Nutrition Plan with Same Search Name Exists. Choose other name."));
                }
                return next(new Error("Could not Save Nutrition Plan"));
            }
            res.json({
                success: true,
                data: result
            });
        });
    },

    addUserNutrition : (req, res, next) => {

        let unique = {
            client: req.body.client,
            date: req.body.date,
            type : req.body.type
        };

        let data = {
            nutrition: req.body.nutrition,
        };


        UserNutrition.findOneAndUpdate(unique, data, {
            upsert: true,
            setDefaultsOnInsert: true,
            new: true
        }).then(result => {
            res.json({
                success: true,
                data: result
            });
        }).catch(err => {
            console.error(err);
            return next(new Error("Could not Save Workout for User"));
        });

    },

    getUserNutritionPlan: (req, res, next) => {
        let query = {
            client: req.query.client,
            date: req.query.date
        };
        UserNutrition.findOne(query).populate({
            path: 'nutrition',
            populate: {
                path: 'foods.food'
            }
        }).then(result => {
            res.json({
                success: true,
                data: result
            });
        }).catch(err => {
            return next(new Error("Could not Fetch Workout for User"));
        });

    }

};

export default nutritionController;