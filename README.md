# 🎢 Themed Entertainment at UC San Diego Website 🎢
Link to site: https://bit.ly/teaatucsd  
Specific link to gesture control page: https://bit.ly/teaforce

This repository is contians of the source code for the Themed Entertainment Assoistation at UC San Diego website that is hosted via GitHub pages and link is configured via [bitly](https://app.bitly.com) to shorten and simplify the link.

# Documentation

## Site Layout
```text
├── Assets/               # Content and data
│   ├── boardphots/       # Board/alumni pictures
│   ├── favcon.png        # Tab icon
│   ├── GroupAll.png      # TEA Group picture
│   ├── TEALogo.png       # TEA Logo
│   ├── alumni.json       # Edit to change alumni list on site
│   └── alumni.json       # Edit to change board member list on site
├── project1/             # Project 1 Page/Data
├── project2/             # Project 2 Page/Data
├── project3/             # Project 2 Data (this one does not have a page just links to the Haunted Maze IG)
├── index.html            # Homepage of site
├── script.js             # Script that does action such as dynamically load board members from JSON file
├── style.css             # CSS Styling of site
└── README.MD             # What your reading right now!
```


## Editing the site
1. Clone the repo using `git clone` or github desktop

2. `git checkout -b "Name"`  creates a branch switches you to that branch 

3. Make changes to site using editor (e.i. VS Code)

4. `git add -A`  adds and updates all files in repo 

5. `git commit -m "comment"`  adds everything to a commit 

6. `git push` pushes commit to remote repo

7. Open pull request

## Deploying
This site is configured to automatically deploy from the `master` branch. After pushing/merging a change to master it will take 1-5 minutes to deploy to the public facing site. 

