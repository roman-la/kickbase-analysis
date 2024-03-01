**For educational and non-profit uses only. All trademarks, logos and brand names are the property of their respective owners.**

# kickbase-analysis

This repository contains python code for retrieving data from the Kickbase API and also a react web app for visualization.

Follow the guides below if you want to set everything up for you own league.

If you want to get an idea of how the visualisation looks, check out https://roman-la-fork.github.io/kickbase-analysis-stiftung-wadentest/.

# How to setup

## Before you start

Keep in mind, that running the Python code for data collection sends **a lot of requests to the Kickbase API in a short amount of time**, more than you would send when using the app on your phone. Although some simple mechanisms to reduce the load on their servers are implemented (simple caching to prevent identical requests, small delay between requests, no use of multithreading/multiprocessing), you should still keep in mind that computing resources of an external entity should always be **used responsibly**. This is why you should **refrain from updating the data too frequently** by running the code multiple times without an adequate waiting time.

## Executed and hosted by GitHub

GitHub offers free execution of CI/CD workflows and publishing of pages for public repositories. This allows us to execute both the data collection code and the build process of the react web app on runners hosted by GitHub and also publish the website files free of charge. Below is a guide on how to set it up for yourself.

- **Create a fork of this repository.**
- **Setup repository secrets.** Those are needed for the execution of the workflows. The values will be masked in workflow logs, so no sensible data will get leaked at any time.
    - On the page of the forked repo go to 'Settings' -> 'Secrets and variables' -> 'Actions' and add the following secrets with their respective values by clicking on 'New repository secret':
        - **START_DATE** - The date you want to start the data collection on. It is untested what happens if you use a date from the previous season. Use the format DD.MM.YYYY, e.g. `01.07.2023` or `21.12.2023`.
        - **KB_LEAGUE** - Name of your league.
        - **KB_MAIL** - The mail you use for logging into your Kickbase account.
        - **KB_PW** - The password you use for logging into your Kickbase account.
        - **GH_TOKEN** - A GitHub token which is used to push the results back to the repo.
            - You can generate the token under https://github.com/settings/tokens ('Generate new token (classic)'). Enable everything under 'repo' (untested which rights are needed exactly).
- **Enable workflows.** For new forks containing workflow definitions, workflows are disabled by default.
    - On the page of the forked repo go to 'Actions' and enable them by clicking on 'I understand my workflows, go ahead and enable them'.
    - Again under 'Action' select 'combined workflow' on the left side and click on 'Enable workflow' near the top right.
- **Run the workflow for the first time.**
    - On the page of the forked repo go to 'Actions' and select 'combined workflow' on the left side.
    - Click on 'Run workflow' -> 'Run workflow' to start the run.
    - Wait for the workflow to finish, this can take up to half an hour, depending on the choosen `START_DATE` and size of your league.
- **Enable GitHub pages.**
    - After the first run of the workflow finishes, a new workflow run called 'pages build and deployment' should start automatically. After this workflow finishes, your page should be visible under `https://{user name/organisation name}.github.io/{repo name}/`.
    - If this is not the case, got to 'Settings' -> 'Pages' on the page of the forked repo and check if 'Source' is set to `Deploy from a branch` and 'Branch' is set to `gh-pages` `/(root)`. Don't forget to hit 'Save' if you change anything here.
    - The `gh-pages` branch will only be visible after the first run of the workflow from the previous step finished successful.
- **Scheduled runs**
    - By default the data collection is scheduled to run every two hours, 30 minutes after the full hour (8:30, 10:30, ...).
    - This can be changed by adapting the value under 'cron' in the `./github/combined-workflow.yml` file (https://crontab.guru/).
    - Don't try to collect data right after the market value update on 22:00, since some data will not be available right away. Rather use 22:30.

## Executed and hosted by yourself

### With docker

tbf

### Without docker

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

# Contribute

Feel free to contribute to this repository. You can also contact me on discord (r0man51) or open an issue if you have any questions.
