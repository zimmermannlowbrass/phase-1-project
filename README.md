 #  The Brewery Snob Quiz!

    **--Mission--**
For this project, I will test a users knowledge of their local breweries. To do this, the user will have to pick the brewery from a list of breweries that matches their hometown. 


    -Step 1: Pick a difficulty-

*First, a user must choose a difficulty. There are three difficulty options (easy, medium, and hard).*

At the time, the JS will fetch the given 'diffculty-minus-one' number of breweries from the API. The easy difficulty will populate 4 choices; the medium difficulty will populate 9 choices; the hard difficulty will populate 19 chocies. These incorrect choices will be saved in an array of 'choices'.


    -Step 2: Enter your hometown-

*Next, a user will type in their hometown city and state.*

The JS will fetch all of the breweries in the provided city/state, randomly pick a 'correct choice' from 'correct choices', and finally push the 'correct choice' to 'choices'. If there are no breweries in the city/state provided (len of fetched cities is zero), an alert will be triggered.

Upon submission, the page is populated with the brewery name of each brewery in 'choices'.

Before population, and to prevent the 'correct choice' from easily being found at the end of the array, the JS will randomize (shuffle) the order of the array. Thus, the Fisher-Yates Shuffle will be implemented


    -Step 3: Take the quiz-

*Lastly, a user will choose the correct brewery from your hometown.*

From the populated options, the user will click the checkmark box next to the 'correct choice' of 'choices'. If the 'correct choice' is selected, the page will be alerted with a message declaring the user as a "BEER SNOB". If the another chocie is selected, a sad alert will deliver the message of failure and invite the user to "try again :( "


    -BONUS: Discover More Brewery Information-





SOURCE :
https://www.openbrewerydb.org/documentation

3 Event Listeners Used :

-submit brewery search (form)

-vote for correct brewery (click)

-drag favorite brewery over to a section of learn more(drag/drop)