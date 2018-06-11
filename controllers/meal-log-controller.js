import FoodItem from '../models/food-item'
import constants from '../constants/constants';
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



    }
}

export default mealLogController;
