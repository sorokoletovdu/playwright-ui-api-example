# playwright-ui-api-example
UI and API custom test framework based on Playwright (TypeScript).

# General Information

I implemented UI tests with the use of POM and Playwright fixtures. 

The tests were divided into two parts: positive and negative scenarios.

The following cases were considered positive scenarios:
- the initial appearance of all elements of the Login page without any errors;
- the happy path for login with the default username and password.

The following cases were considered negative scenarios:
- an incorrect username with the specific error message;
- an incorrect password with a specific error message.

API e2e flow was implemented as a single test where all parts are executed as test steps.  
During the flow:
- the user ID is verified on the registration step
- tokens are collected on the registration and login step.  

At the end of the test, I verify that the registration token equals the login token.

## Selected technology stack

Playwright was selected as a base for the test framework. There are several reasons for it:
- Playwright is the most modern technology for UI and API test automation
- Playwright offers additional tools for recording, debugging, and analyzing tests
- All features of Playwright are free
- Playwright offers a parallel execution by default
- The easiest framework to set up
- Playwright supports all modern rendering engines including Chromium, WebKit, and Firefox
- Playwright offers an API for use in TypeScript, JavaScript, Python, .NET, and Java.
- etc -> https://playwright.dev/

TypeScript was selected as a programming language, because of hands-on experience, and the fact that TypeScript is one of the native languages for Playwright.

Page Object Model is one of the best-known patterns for web app test automation. POM offers a clear structure for test implementation, maintenance, and updating. Using POM, the test framework could be easily scaled.

## Dependencies

Please make sure that you have installed on your machine:
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

## Steps for improvements

- Split test into groups: component, e2e, smoke, regression
- Add component tests for each endpoint: positive, negative
- Add JSON schema verification for all endpoints
- Allocate logical parts into separate methods: getAllUsers(), getUser(id: number), registerUser(email: string, username: string, password: string), etc.