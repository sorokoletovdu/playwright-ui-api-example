# playwright-ui-api-example
UI and API custom test framework based on Playwright (TypeScript).

# General Information

I implemented UI tests with the use of POM and Playwright fixtures. 

The tests were divided into two parts: positive and negative scenarios.

As positive scenarios were considered the following cases:
- the initial appearance of all elements of the Login page without any errors;
- the happy path for login with the default username and password.

As negative scenarios were considered the following cases:
- an incorrect username with the specific error message;
- an incorrect password with its own specific error message.

API e2e flow was implemented as a single test where all parts are executed as test steps.  
During the flow:
- on registration step is checking user ID,
- on registration and login step is collecting token.  

At the end of the test I verify that registration token equals login token.

## Dependencies

Make sure that you have installed on your machine:
- Git
- Node.js
- Allure.

### Documentation:

- Git: https://git-scm.com/downloads

Installed version:
```sh
% git --version

git version 2.34.1
```

- Node.js: https://nodejs.org

Installed version:
```sh
node --version

v14.18.3
```

- Allure: https://docs.qameta.io/allure-report/#_get_started

Installed version:
```sh
allure --version

2.17.2
```

- Playwright: https://playwright.dev/docs/intro

Installed version:
```sh
npx playwright --version      

Version 1.25.0
```

## Get the Code
1. Clone the repo using a link below

```sh
git clone https://github.com/sorokoletovdu/playwright-ui-api-example.git
```

2. Navigate to the folder with code and install npm packages using:

```sh
cd ./playwright-ui-api-example
```

```sh
npm install
```

3. Install Playwright

```sh
npx playwright install
```

## Run the Tests

Run all tests (headless mode)
```sh
npx playwright test
```

Run the UI tests in headless mode
```sh
npx playwright test uiExample.spec.ts
```

Run the UI tests in headed mode
```sh
npx playwright test uiExample.spec.ts --headed
```

Run the API tests 
```sh
npx playwright test apiExample.spec.ts
```



## For Allure Report generation execute :

```sh
allure serve
```