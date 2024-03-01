**For educational and non-profit uses only. All trademarks, logos and brand names are the property of their respective owners.**

# kickbase-analysis

This repository contains some python code for retrieving data from the kickbase API and also a react web app for visualization.

## Deployment with GitHub Pages 

The data collection and building of the web app is automated by cron jobs and runs daily. The results are published to this GitHub Pages website https://roman-la.github.io/kickbase-analysis/.
If you are interested in how I set it up, check out this guide https://github.com/gitname/react-gh-pages.

## Run locally

If you are interested in running the code for your own league locally, follow this small guide.

Assuming you have Python (3.12) already setup, run the following commands to setup the environment and run the code for data collection:
```
cd data/
pip install pipenv
pipenv install
pipenv run main.py --kbuser your@mail.com --kbpw yourpassword123 --league="Your League Name" --ignore ManagerX ManagerY --start 01.07.2023
```

Giving the name of your league is optional. If not set, your first league (probably the one you are part of the longest time) will be used.
Also optional is the `--ignore` parameter. With that you can specify one or more manager names to be ignored for data collection (e.g. for inactive or bot acocunts).

The resulting .json files need to be copied to the frontend folder:
```
cp data/*.json frontend/src/data
```

After that, assuming you have Node 18.x and npm setup, run the following commands to start the development server (reachable under http://localhost:3000/kickbase-analysis):
```
cd frontend/
npm install
npm start
```

## Contribute

Feel free to contribute to this repository. You can also contact me on discord (r0man51) or open an issue if you have any questions.
