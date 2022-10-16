// console.log(data)


function getTimes(day, hall) {
    let allTimes = [];
    let correctDateArray = data[day];
    correctDateArray.forEach((dish) => {
        if (dish.hall == hall) {
            if (!allTimes.includes(dish.time)) {
                allTimes.push(dish.time);
            }
        }
    });
    return allTimes;
}

function getStations(day, hall, mealtime) {
    let allStations = [];
    let correctDateArray = data[day];
    correctDateArray.forEach((dish) => {
        if (dish.hall == hall && dish.time == mealtime) {
            if (!allStations.includes(dish.station)) {
                allStations.push(dish.station);
            }
        }
    });
    return allStations;
}

function getDishes(day, hall, mealtime, station) {
    let allDishes = [];
    let correctDateArray = data[day];
    correctDateArray.forEach((dish) => {
        if (dish.hall == hall && dish.time == mealtime && dish.station == station) {
            if (!allDishes.includes(dish.dish)) {
                allDishes.push(dish.dish);
            }
        }
    });
    return allDishes;
}

function getAverageRating(day, hall, mealtime, station, plate){
    let correctDateArray = data[day];
    let ans = -1;
    correctDateArray.forEach((dish) => {
      if (
        dish.hall == hall &&
        dish.time == mealtime &&
        dish.station == station &&
        dish.dish == plate
      ) {
        let average = 0, len = dish.rating.length;
        if(len == 0){
            ans = 0;
        }
        else{
            for(let i = 0; i < len; ++i){
                average += dish.rating[i];
            }
            ans = average / len
        }
      }
    });
    return ans.toFixed(2);
}

const form = document.getElementById("date-and-hall");
const date = document.getElementById("date-input");
const hall = document.getElementById("dining-hall-input");
let mealTime;
let foodListLen = 0
const foodList = []
const yourmeal = document.getElementById("food-list")

function sendData(stars){
    alert("Thank you for your rating! Please wait a few moments for your rating to be shown.")
    setTimeout(5000)
    location.reload()
}


let timesArray = [];
form.addEventListener("submit", (e) => {
    e.preventDefault();

    let dateData = date.value;
    let hallData = hall.value;
    console.log(dateData);
    console.log(hallData);

    timesArray = getTimes(dateData, hallData);
    // console.log(getTimes(dateData, hallData));

    const element = document.getElementById("times-choosing");
    element.innerHTML = "";
    const instruction1 = document.createElement("h2");
    const instruction1a = document.createTextNode("Choose your meal time")
    instruction1.appendChild(instruction1a)
    element.appendChild(instruction1)
    instruction1.classList.add("text-xl")
    instruction1.classList.add("text-center")
    instruction1.classList.add("my-3")

    const wrappera = document.createElement("div");
    element.appendChild(wrappera);
    wrappera.classList.add("flex");
    wrappera.classList.add("flex-row");
    wrappera.classList.add("justify-around");
    wrappera.classList.add("flex-wrap")
    timesArray.forEach((time) => {
        
        const button = document.createElement("button");
        const node = document.createTextNode(time);
        button.appendChild(node);
        button.classList.add("meal-button");
        button.classList.add("bg-blue-300");
        button.classList.add("py-3");
        button.classList.add("px-6");
        button.classList.add("mx-6");
        button.classList.add("my-3");
        button.classList.add("w-60");
        button.classList.add("rounded-lg");
        wrappera.appendChild(button);
    });

    for (let i = 0; i < mealButtons.length; ++i) {
        mealButtons[i].addEventListener("click", () => {
            const allStations = getStations(
                dateData,
                hallData,
                mealButtons[i].innerHTML
            );
            mealtime = mealButtons[i];
            const allFoodElement = document.getElementById("all-foods");
            allFoodElement.innerHTML = "";
            allStations.forEach((element) => {
                const wrapper = document.createElement("div")
                allFoodElement.appendChild(wrapper)
                const header = document.createElement("h2");
                const newNode = document.createTextNode(element);
                header.appendChild(newNode);
                header.classList.add("text-2xl");
                header.classList.add("text-center");
                header.classList.add("my-3");
                wrapper.appendChild(header);

                const wrapper2 = document.createElement("div")
                wrapper2.classList.add("flex");
                wrapper2.classList.add("flex-row");
                wrapper2.classList.add("flex-wrap");
                wrapper2.classList.add("justify-center");
                allFoodElement.appendChild(wrapper2);

                const allDishes = getDishes(dateData, hallData, mealButtons[i].innerHTML, element)
                allDishes.forEach(el => {
                    const wrapper3 = document.createElement("div")
                    wrapper3.classList.add("flex");
                    wrapper3.classList.add("flex-row");
                    wrapper2.appendChild(wrapper3);
                    const p = document.createElement("p")
                    const newDish = document.createTextNode(el);
                    p.appendChild(newDish);
                    wrapper3.appendChild(p);
                    p.classList.add("text-lg");
                    p.classList.add("m-1");
                    // p.classList.add("text-blue-500");
                    p.classList.add("cursor-pointer");
                    const rating = document.createElement("p")
                    rating.innerHTML = getAverageRating(
                      dateData,
                      hallData,
                      mealButtons[i].innerHTML,
                      element,
                      el
                    ).toString();
                    wrapper3.appendChild(rating);
                    rating.classList.add("text-lg");
                    // rating.classList.add("text-blue-500");
                    rating.classList.add("m-1");
                    wrapper3.innerHTML += '<i class="fa-solid fa-star m-2 ml-0"></i>'
                    wrapper3.addEventListener('click', (e) => {
                        if(!foodList.includes(el)){
                            console.log("hello")
                            ++foodListLen;
                            foodList.push(el);
                            const newMeal = document.createElement("p");
                            const mealName = document.createTextNode(el);
                            newMeal.appendChild(mealName);
                            yourmeal.appendChild(newMeal);
                        }
                    })
                });
            });
        });
    }
});

const mealButtons = document.getElementsByClassName("meal-button");