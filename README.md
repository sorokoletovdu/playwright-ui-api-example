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

## Technologies
- TypeScript
- Playwright
- Allure report for Playwright

## Get the Code
1. Clone the repo using a link below

```sh
https://github.com/sorokoletovdu/playwright-ui-api-example.git
```

2. Navigate to the folder with code and install npm packages using:

```sh
npm install
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