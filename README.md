 #  The Brewery Snob Quiz!

    # Mission
*For this project, I will test the users knowledge the breweries in their hometown. The user will be given a number of breweries names, but only one is from their hometown. Guess the correct brewery to gain points!*


    -Step 1: Pick a difficulty-

**First, a user must choose a difficulty. There are three difficulty options (easy, medium, and hard).**

At the time, the JS will fetch the given 'diffculty-minus-one' number of breweries from the API. The easy difficulty will populate 4 choices; the medium difficulty will populate 9 choices; the hard difficulty will populate 19 chocies. These incorrect choices will be saved in an array of 'choices'.


    -Step 2: Enter your hometown-

**Next, a user will type in their hometown city and state.**

The JS will fetch all of the breweries in the provided city/state, randomly pick a 'correct choice' from 'correct choices', and finally push the 'correct choice' to 'choices'. If there are no breweries in the city/state provided (len of fetched cities is zero), an alert will be triggered.

Upon submission, the page is populated with the brewery name of each brewery in 'choices'.

Before population, and to prevent the 'correct choice' from easily being found at the end of the array, the JS will randomize (shuffle) the order of the array. Thus, the Fisher-Yates Shuffle will be implemented


    -Step 3: Take the quiz-

**Lastly, a user will choose the correct brewery from your hometown.**

From the populated options, the user will click the checkmark box next to the 'correct choice' of 'choices'. If the 'correct choice' is selected, the page will be alerted with a message similar to 'you are correct'. If the another chocie is selected, a sad alert will deliver the message of failure and invite the user to "try again :( "

The user's goal will be to reach 100 points. At which point, they will be declared an official 'BEER SNOB'.


    -BONUS: Discover More Brewery Information-

**Learn more about any brewery**

User may drag any brewery option provided from the selection section over to the "learn more" section. When the user drops the brewery option, the information for the brewery (name, address, brewery type, website URL) will all be populated in the bottom section. If the user decides to learn more about a different brewery, they may feel free to drag over a new one. Upon dropping, the old brewery information will be replaced by the new dragged option.




    -API SOURCE and NOTES-
https://www.openbrewerydb.org/documentation


The "openbrewerydb" API that I decided to use was a bittersweet choice. On the one hand, I sincerely appreciated the niche data set. Breweries are becoming more of a fad, quickly surpassing bars due to their family friendly/local/creative vibes. The database much needed information including brewery type, location, and website URL. There were data points that I chose not to use: longitudinal/latitudinal locations as well as phone number.

**API Drawbacks:**
-One of the big drawbacks of my API was how the data would be populated on a given page. The set limit of 50 breweries per page made populating say all the breweries in Denver, Colorado difficult (there are more than 50 breweries in Denver), ultimately requiring more than one page. 

-The API came with a 'random' feature. However, you can only populate one random brewery at a time. This also proved difficult for grabbing say 4 random breweries. Using the 'random' feature would not intuitively fetch a new random brewery upon each fetch call. Ultimetely, I chose not to impleement the 'random' feature.

-Every so often, the city of location data attribute for a brewery could be ambiguious. Take the famous Other Half Brewing Company: this brewery would only be populated if the user searches for breweries in 'Brooklyn' and not if a user searches for breweries in 'New York City".



    -3 Event Listeners Used-

-submit brewery search (form)

-vote for correct brewery (click)

-drag favorite brewery over to a section of learn more (drag/drop)