import UserNutrition from "../models/user-nutrition";

const nutritionController = {

    getNutritionPlan: (req, res, next) => {
        let query = {
            client: req.decoded.id,
            date: req.query.date
        };
        UserNutrition.find(query).populate({
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