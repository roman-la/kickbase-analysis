**For educational and non-profit uses only. All trademarks, logos and brand names are the property of their respective owners.**

# kickbase-analysis

This repository contains python code for retrieving data from the Kickbase API and also a react web app for visualization.

Follow the guides below if you want to set everything up for you own league.

If you want to get an idea of how the visualisation looks, check out https://roman-la-fork.github.io/kickbase-analysis-stiftung-wadentest/.

# How to setup

### Before you start

Keep in mind, that running the Python code for data collection sends **a lot of requests to the Kickbase API in a short amount of time**, more than you would send when using the app on your phone. Although some simple mechanisms to reduce the load on their servers are implemented (simple caching to prevent identical requests, small delay between requests, no use of multithreading/multiprocessing), you should still keep in mind that computing resources of an external entity should always be **used responsibly**. This is why you should **refrain from updating the data too frequently** by running the code multiple times without an adequate waiting time.

## Fork, GitHub workflow and GitHub pages

GitHub offers free execution of CI/CD workflows and publishing of pages for public repositories. This allows us to execute both the data collection code and the build process of the react web app on runners hosted by GitHub and also publish the website files free of charge. Below is a guide on how to set it up for yourself.

- **Create a fork of this repository:**
- **Setup repository secrets:** Those are needed for the execution of the workflows. The values will be masked in workflow logs, so no sensible data will get leaked at any time.
    - On the page of the forked repo go to 'Settings' -> 'Secrets and variables' -> 'Actions' and add the following secrets with their respective values by clicking on 'New repository secret':
        - **START_DATE** - The date you want to start the data collection on. It is untested what happens if you use a date from the previous season. Use the format DD.MM.YYYY, e.g. `01.07.2023` or `21.12.2023`
        - **KB_LEAGUE** - Name of your league
        - **KB_MAIL** - The mail you use for logging into your Kickbase account
        - **KB_PW** - The password you use for logging into your Kickbase account
        - **GH_TOKEN** - A GitHub token which is used to push the results back to the repo
            - You can generate the token under https://github.com/settings/tokens ('Generate new token (classic)'). Enable everything under 'repo' (untested which rights are needed exactly)
- **Enable workflows:** For new forks containing workflow definitions, workflows are disabled by default.
    - On the page of the forked repo go to 'Actions' and enable them by clicking on 'I understand my workflows, go ahead and enable them'.
    - Again under 'Action' select 'combined workflow' on the left side and click on 'Enable workflow' near the top right.
- **Run the workflow for the first time:**
    - On the page of the forked repo go to 'Actions' and select 'combined workflow' on the left side.
    - Click on 'Run workflow' -> 'Run workflow' to start the run.
    - Wait for the workflow to finish, this can take up to half an hour, depending on the choosen `START_DATE` and size of your league.
- **Enable GitHub pages:**
    - After the first run of the workflow finishes, a new workflow run called 'pages build and deployment' should start automatically. After this workflow finishes, your page should be visible under `https://{user name/organisation name}.github.io/{repo name}/`.
    - If this is not the case, got to 'Settings' -> 'Pages' on the page of the forked repo and check if 'Source' is set to `Deploy from a branch` and 'Branch' is set to `gh-pages` `/(root)`. Don't forget to hit 'Save' if you change anything here.
    - The `gh-pages` branch will only be visible after the first run of the workflow from the previous step finished successfully.
- **Scheduled runs:**
    - By default the data collection is scheduled to run every two hours, 30 minutes after the full hour (8:30, 10:30, ...).
    - This can be changed by adapting the value under 'cron' in the `./github/combined-workflow.yml` file (https://crontab.guru/).
    - Don't try to collect data right after the market value update on 22:00, since some data will not be available right away, rather use 22:30.

## Docker

- **Create config:** Rename template_settings.conf to settings.conf and adapt it to contain your data.
- **Run data collection:** 
    - `docker build -t data ./data` Build the data collection image
    - `docker run --name data data` Run the data collection image
    - `docker cp data:/data ./frontend/src` Copy result files to frontend
- **Run frontend:**
    - `docker build -t frontend ./frontend` Build the frontend image
    - `docker run -p 8080:80 frontend` Run frontend, e.g. under port 8080
    - Frontend will be reachable under http://localhost:8080/

## Local

### Prequisites

- Python 3.12
- Node 20 (with npm)

### Configuration

You can configure the data collection by bot command line arguments or a config file (rename `template_settings.conf` to `settings.conf` and adapt with your values).

| Variable | Example | Description | Optional |
| - | - | - | - |
| mail | your@mail.de | The mail you use for logging into Kickbase | no |
| pw | password123 | The password you use for logging into Kickbase | no |
| league | Stammkneipe Berlin | The name of your League. If not set, any of your leagues will get picked (probabily the one you are longest part of) | yes |
| start | 01.07.2023 | Date at when to start data collection. Use format DD.MM.YYYY | no |
| ignore | [ name1, name2 ] | List of names to ignore in data collection (e.g. inactive users) | yes |

### Data collection

- **Setup environment:**
    - `pip install pipenv` Install pipenv. Alternatively install the dependencies from Pipfile with pip
    - `cd ./data` Move to data folder
    - `pipenv install` Install dependencies into virtual environment
- **Run code:**
    - `pipenv run main.py` No arguments needed if you use settings.conf
    - else use: `pipenv run main.py --user your@mail.com --pw password123 --league "Stammkneipe Berlin" --start 01.07.2023`
- **Copy files to frontend folder:**
    - `cd ..` Go back into the projects main folder
    - `cp ./data/data/*.json ./frontend/src/data` Copy files to frontend

### Frontend

- **Install dependencies:**
    - `cd ./frontend` Move to frontend folder
    - `npm install` Install the dependencies
- **Run frontend:**
    - `npm start` Start the development server
    - Frontend will be reachable under http://localhost:3000/

# Contribute

Feel free to contribute to this repository. You can also contact me on discord (r0man51) or open an issue if you have any ideas, bugfinds, questions, etc.
