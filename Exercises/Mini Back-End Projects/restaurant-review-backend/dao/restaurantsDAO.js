import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;
let restaurants;

export default class RestaurantsDAO {
    static async injectDB(conn){
        if (restaurants) {
            return;
        }
        try{
            restaurants = await conn.db(process.env.REST_REVIEWS_NS).collection('restaurants');
        }catch(err){
            console.error(
                `Unable to establish the connection ${err}`
            );
        };
    };

    static async getRestaurants({
        filters = null,
        page = 0,
        restaurantsPerPage = 20,
    } = {}) {
        let query;
        if(filters){
            if("name" in filters) {
                query = {$text: {$search: filters["name"]}}
            }else if("cuisine" in filters) {
                query = {"cuisine": {$eq: filters["cuisine"]}}
            }else if ("zipcode" in filters){
                query = {"address.zipcode": {$eq: filters["zipcode"]}}
            }
        }

        let cursor;

        try{
            cursor = await restaurants
            .find(query)
        }catch(err){
            console.error(`Unable to find the command ${err}`);
            return {restaurantList: [], totalNumRestaurants: 0}
        }

        const displayCursor = cursor.limit(restaurantsPerPage).skip(restaurantsPerPage * page);

        try{
            const restaurantList = await displayCursor.toArray();
            const totalNumRestaurants = await restaurants.countDocuments(query);
            return {restaurantList, totalNumRestaurants};
        }catch(err){
            console.error(
                `Unable to convert cursor to array ${err}`
            );
            return {restaurantList: [], totalNumRestaurants: 0};
        }
    }
    static async getRestaurantByID(id) {
        try {
          const pipeline = [
            {
                $match: {
                    _id: new ObjectId(id),
                },
            },
                  {
                      $lookup: {
                          from: "reviews",
                          let: {
                              id: "$_id",
                          },
                          pipeline: [
                              {
                                  $match: {
                                      $expr: {
                                          $eq: ["$restaurant_id", "$$id"],
                                      },
                                  },
                              },
                              {
                                  $sort: {
                                      date: -1,
                                  },
                              },
                          ],
                          as: "reviews",
                      },
                  },
                  {
                      $addFields: {
                          reviews: "$reviews",
                      },
                  },
              ]
          return await restaurants.aggregate(pipeline).next()
        } catch (e) {
          console.error(`Something went wrong in getRestaurantByID: ${e}`)
          throw e
        }
      }
    
      static async getCuisines() {
        let cuisines = []
        try {
          cuisines = await restaurants.distinct("cuisine")
          return cuisines
        } catch (e) {
          console.error(`Unable to get cuisines, ${e}`)
          return cuisines
        }
      }
}
