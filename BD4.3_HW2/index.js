//npm install express sqlite3 sqlite
//node BD4.3_HW2/initDB.js
const { Console } = require("console");
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename: "./BD4.3_HW2/database.sqlite",
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to exercise BD4.3_HW2" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

/*
Exercise 1: Fetch All Recipes by Cuisine

Create an endpoint /recipes/cuisine/:cuisine to return all recipes of a specific cuisine.

Create a function filterByCuisine to fetch recipes filtered by cuisine from the database.

Wrap the function call in a try-catch block.

Ensure that errors are caught and return res.status(500).json({ error: error.message }) if anything goes wrong.

Return 404 error if no data is found.

API Call:

<http://localhost:3000/recipes/cuisine/Italian>


Expected Response:

{
  recipes: [
    {
      id: 1,
      cuisine: 'Italian',
      main_ingredient: 'Pasta',
      preparation_time: 20,
      difficulty: 'Medium',
      vegetarian: 0,
    },
    {
      id: 6,
      cuisine: 'Italian',
      main_ingredient: 'Rice',
      preparation_time: 35,
      difficulty: 'Medium',
      vegetarian: 1,
    },
  ],
}


*/
// function to filter by cuisine from the database
async function filterByCuisine(cuisine) {
  let query = `SELECT * FROM recipes WHERE cuisine = ?`;
  try {
    if (!db) {
      throw new Error("Database not connected");
    }
    let result = await db.all(query, [cuisine]);
    if (!result || result.length == 0) {
      console.log("No data found for : " + cuisine);
      throw new Error("No data found for : " + cuisine);
    }
    return { recipes: result };
  } catch (error) {
    console.log(
      " Error in fetching data for cuisine : " +
        cuisine +
        " : " +
        error.message,
    );
    throw error;
  }
}
// api call to fetch all recipes by cuisine
app.get("/recipes/cuisine/:cuisine", async (req, res) => {
  try {
    let cuisine = req.params.cuisine;
    let result = await filterByCuisine(cuisine);
    console.log("Succesfully all recipes of cuisine : " + cuisine);
    res.status(200).json(result);
  } catch (error) {
    if (error.message === "No data found for : " + cuisine) {
      return res.status(404).json({ status: 404, error: error.message });
    } else {
      return res.status(500).json({ status: 500, error: error.message });
    }
  }
});

/*
Exercise 2: Fetch All Recipes by Main Ingredient

Create an endpoint /recipes/main_ingredient/:main_ingredient to return all recipes with a specific main ingredient.

Create a function filterByMainIngredient to fetch recipes filtered by main ingredient from the database.

Wrap the function call in a try-catch block.

Ensure that errors are caught and return res.status(500).json({ error: error.message }) if anything goes wrong.

Return 404 error if no data is found.

API Call:

<http://localhost:3000/recipes/main_ingredient/Chicken>


Expected Response:

{
  recipes: [
    {
      id: 4,
      cuisine: 'Indian',
      main_ingredient: 'Chicken',
      preparation_time: 40,
      difficulty: 'Medium',
      vegetarian: 0,
    },
  ],
}
*/

// function to filter by main ingredient from the database
async function filterByMainIngredient(main_ingredient) {
  let query = `SELECT * FROM recipes WHERE main_ingredient = ?`;
  try {
    if (!db) {
      throw new Error("Database not connected");
    }
    let result = await db.all(query, [main_ingredient]);
    if (!result || result.length == 0) {
      console.log("No data found for : " + main_ingredient);
      throw new Error("No data found for : " + main_ingredient);
    }
    return { recipes: result };
  } catch (error) {
    console.log(
      " Error in fetching data for main ingredient : " +
        main_ingredient +
        " : " +
        error.message,
    );
    throw error;
  }
}

// api call to fetch all recipes by main ingredient
app.get("/recipes/main_ingredient/:main_ingredient", async (req, res) => {
  try {
    let main_ingredient = req.params.main_ingredient;
    let result = await filterByMainIngredient(main_ingredient);
    console.log(
      "Succesfully all recipes of main ingredient : " + main_ingredient,
    );
    res.status(200).json(result);
  } catch (error) {
    if (error.message === "No data found for : " + main_ingredient) {
      return res.status(404).json({ status: 404, error: error.message });
    } else {
      return res.status(500).json({ status: 500, error: error.message });
    }
  }
});

/*
Exercise 3: Fetch All Recipes by Preparation Time

Create an endpoint /recipes/preparation_time/:preparation_time to return all recipes with a preparation time less than or equal to a specific value.

Create a function filterByPreparationTime to fetch recipes filtered by preparation time from the database.

Wrap the function call in a try-catch block.

Ensure that errors are caught and return res.status(500).json({ error: error.message }) if anything goes wrong.

Return 404 error if no data is found.

API Call:

<http://localhost:3000/recipes/preparation_time/30>


Expected Response:

{
  recipes: [
    {
      id: 1,
      cuisine: 'Italian',
      main_ingredient: 'Pasta',
      preparation_time: 20,
      difficulty: 'Medium',
      vegetarian: 0,
    },
    {
      id: 2,
      cuisine: 'Mexican',
      main_ingredient: 'Beef',
      preparation_time: 30,
      difficulty: 'Easy',
      vegetarian: 0,
    },
    {
      id: 5,
      cuisine: 'Chinese',
      main_ingredient: 'Vegetables',
      preparation_time: 25,
      difficulty: 'Easy',
      vegetarian: 1,
    },
    {
      id: 9,
      cuisine: 'Thai',
      main_ingredient: 'Noodles',
      preparation_time: 30,
      difficulty: 'Medium',
      vegetarian: 0,
    },
    {
      id: 10,
      cuisine: 'Greek',
      main_ingredient: 'Vegetables',
      preparation_time: 15,
      difficulty: 'Easy',
      vegetarian: 1,
    },
  ],
}*/
// function to filter by preparation time from the database
async function filterByPreparationTime(preparation_time) {
  let query = `SELECT * FROM recipes WHERE preparation_time <= ?`;
  try {
    if (!db) {
      throw new Error("Database not connected");
    }
    let result = await db.all(query, [preparation_time]);
    if (!result || result.length == 0) {
      console.log("No data found for : " + preparation_time);
      throw new Error("No data found for : " + preparation_time);
    }
    return { recipes: result };
  } catch (error) {
    console.log(
      " Error in fetching data for preparation time : " +
        preparation_time +
        " : " +
        error.message,
    );
    throw error;
  }
}
// api call to fetch all recipes by preparation time
app.get("/recipes/preparation_time/:preparation_time", async (req, res) => {
  try {
    let preparation_time = req.params.preparation_time;
    let result = await filterByPreparationTime(preparation_time);
    console.log(
      "Succesfully all recipes of preparation time : " + preparation_time,
    );
    res.status(200).json(result);
  } catch (error) {
    if (error.message === "No data found for : " + preparation_time) {
      return res.status(404).json({ status: 404, error: error.message });
    } else {
      return res.status(500).json({ status: 500, error: error.message });
    }
  }
});

/*
Exercise 4: Fetch All Recipes by Difficulty

Create an endpoint /recipes/difficulty/:difficulty to return all recipes of a specific difficulty level.

Create a function filterByDifficulty to fetch recipes filtered by difficulty from the database.

Wrap the function call in a try-catch block.

Ensure that errors are caught and return res.status(500).json({ error: error.message }) if anything goes wrong.

Return 404 error if no data is found.

API Call:

<http://localhost:3000/recipes/difficulty/Easy>


Expected Response:

{
  recipes: [
    {
      id: 2,
      cuisine: 'Mexican',
      main_ingredient: 'Beef',
      preparation_time: 30,
      difficulty: 'Easy',
      vegetarian: 0,
    },
    {
      id: 5,
      cuisine: 'Chinese',
      main_ingredient: 'Vegetables',
      preparation_time: 25,
      difficulty: 'Easy',
      vegetarian: 1,
    },
    {
      id: 10,
      cuisine: 'Greek',
      main_ingredient: 'Vegetables',
      preparation_time: 15,
      difficulty: 'Easy',
      vegetarian: 1,
    },
  ],
}
*/

// function to filter by difficulty from the database
async function filterByDifficulty(difficulty) {
  let query = `SELECT * FROM recipes WHERE difficulty = ?`;
  try {
    if (!db) {
      throw new Error("Database not connected");
    }
    let result = await db.all(query, [difficulty]);
    if (!result || result.length == 0) {
      console.log("No data found for : " + difficulty);
      throw new Error("No data found for : " + difficulty);
    }
    return { recipes: result };
  } catch (error) {
    console.log(
      " Error in fetching data for difficulty : " +
        difficulty +
        " : " +
        error.message,
    );
    throw error;
  }
}

// api call to fetch all recipes by difficulty
app.get("/recipes/difficulty/:difficulty", async (req, res) => {
  try {
    let difficulty = req.params.difficulty;
    let result = await filterByDifficulty(difficulty);
    console.log("Succesfully all recipes of difficulty : " + difficulty);
    res.status(200).json(result);
  } catch (error) {
    if (error.message === "No data found for : " + difficulty) {
      return res.status(404).json({ status: 404, error: error.message });
    } else {
      return res.status(500).json({ status: 500, error: error.message });
    }
  }
});

/*
Exercise 5: Fetch All Recipes by Vegetarian Status

Create an endpoint /recipes/vegetarian/:vegetarian to return all recipes based on vegetarian status.

Create a function filterByVegetarian to fetch recipes filtered by vegetarian status from the database.

Wrap the function call in a try-catch block.

Ensure that errors are caught and return res.status(500).json({ error: error.message }) if anything goes wrong.

Return 404 error if no data is found.

API Call:

<http://localhost:3000/recipes/vegetarian/true>


Expected Response:

{
  recipes: [
    {
      id: 5,
      cuisine: 'Chinese',
      main_ingredient: 'Vegetables',
      preparation_time: 25,
      difficulty: 'Easy',
      vegetarian: 'true',
    },
    {
      id: 6,
      cuisine: 'Italian',
      main_ingredient: 'Rice',
      preparation_time: 35,
      difficulty: 'Medium',
      vegetarian: 'true',
    },
    {
      id: 7,
      cuisine: 'Middle Easter',
      main_ingredient: 'Chickpeas',
      preparation_time: 45,
      difficulty: 'Medium',
      vegetarian: 'true',
    },
    {
      id: 10,
      cuisine: 'Greek',
      main_ingredient: 'Vegetables',
      preparation_time: 15,
      difficulty: 'Easy',
      vegetarian: 'true',
    },
  ],
}
*/

// function to filter by vegetarian Status from the database
async function filterByVegetarian(vegetarian) {
  let query = `SELECT * FROM recipes WHERE vegetarian = ?`;
  try {
    if (!db) {
      throw new Error("Database not connected");
    }
    let result = await db.all(query, [vegetarian]);
    if (!result || result.length == 0) {
      console.log("No data found for : " + vegetarian);
      throw new Error("No data found for : " + vegetarian);
    }
    return { recipes: result };
  } catch (error) {
    console.log(
      " Error in fetching data for vegetarian : " +
        vegetarian +
        " : " +
        error.message,
    );
    throw error;
  }
}

// api call to fetch all recipes by vegetarian status
app.get("/recipes/vegetarian/:vegetarian", async (req, res) => {
  try {
    let vegetarian = req.params.vegetarian;
    let result = await filterByVegetarian(vegetarian);
    console.log("Succesfully all recipes of vegetarian : " + vegetarian);
    res.status(200).json(result);
  } catch (error) {
    if (error.message === "No data found for : " + vegetarian) {
      return res.status(404).json({ status: 404, error: error.message });
    } else {
      return res.status(500).json({ status: 500, error: error.message });
    }
  }
});
