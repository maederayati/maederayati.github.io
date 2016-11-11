##Project Description

In this project, we worked on the texts extracted from news/blogs and classified into 4 categories: people names, locations, organizations, and miscellaneous. 
Each entry also contains the published time/date of the article/blog. The graphs used for this visuaization are word cloud and horizon graph. All the implentation is done in d3 javascript. The data is obtained from wikinews and it has roughly 3.3 MB size. The visualization has the following featues:

1. Shows the top 50 popular terms (all categories) in Worldle/Tag Cloud
2. Show the monthly frequency of the 50 popular terms over time
3. Allow users to quickly zoom into a time interval for more details (daily frequencies)

![Login Page](screenshot.jpg)
We chose an Arc Diagram template to show the relationships among various terms which has two modes of displaying the data that is 
1. Orthogonal mode
![Login Page](visualisation.screenshot1.png)
2. Arc mode
![Login Page](visualisation.screenshot2.png)
We implemented a search box which takes input as one word and displays its top 50 related terms and also hows internal relationships among various other terms.
You can find the web application in [this link] (https://maederayati.github.io/Wordle_visualization/). 


## Contributions of group members

Akash Machra:

1. Worked on relationship amongst various terms in the wikinews Data (upto 50 terms) along with Manisha.
2. Created an arc diagram.
3. Hovering over the graph line will show information pertaining to relationship of the two terms with each other.
4. Created an attractive UI.
5. Worked on final integration.

Maede Rayatidamavandi:

1. create an object for hash table where keys are the words and the buckets contain time and frequency.
2. Wrote a function to obtain the top 50 words from the hash object to show in the word cloud in any time interval.
3. Wrote a function to obtain the frequency distibution of the top 50 popular terms in any time interval.
4. Created a stop list functionalities to remove irrelevant strings (e.g. #, --, 's, ,...).
4. created a slider for choosing the time interval. 
5. Created a word cloud by the function in part 2.
6. Created a horizon graph based on the function in part 3.

Manisha Nalla:

1. Search function that takes an input term and shows the top 50 related terms. (e.g. When a word Iraq is searched it displays its top     50 related terms on a arc diagram)
2. Have shown the internal relationships among various other terms.
3. Mouse hover a particular term displays highlights the relations of only that particular term.
4. Displays the arc diagram in two different modes to ease the user understanding
5. Have designed an appealing UI.
6. Involved in integrating different parts of project.


## Findings

1. In persons category, the people in the white house are the most frequent words. Words like Bush, Obama, John approves this finding.
2. Among the places Iraq is one of the top 50 frequent words. We can see that the frequency of Iraq has decreased ramaticly after 2010. 2010 is the time when Us almost came out of Iraq and the parliamentary election occured. So Iraq left the news media in US.














