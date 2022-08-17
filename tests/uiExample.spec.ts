import { test, expect} from './fixtures/uiExampleFixtures'
import * as crypto from 'crypto'


let DEFAULT_USERNAME: string = '';
let DEFAULT_PASSWORD: string = '';
let INCORRECT_USERNAME: string = '';
let INCORRECT_PASSWORD: string = '';

test.use({ baseURL: 'https://the-internet.herokuapp.com'});

test.beforeEach(async ({loginPage}) => {
    //todo
    DEFAULT_USERNAME = await loginPage.getDefaultUsername() as string;
    DEFAULT_PASSWORD = await loginPage.getDefaultPassword() as string;
    INCORRECT_USERNAME = crypto.randomBytes(15).toString('base64');
    INCORRECT_PASSWORD = crypto.randomBytes(15).toString('base64');
})

test.describe('Positive login scenario', () => {
    test('The Login page should be displayed properly', async ({ loginPage, page }) => {
        //todo
        await loginPage.checkLoginPageOpened();
        expect(await loginPage.getMainTitleText()).toBe('Login Page');
        await expect(loginPage.subheader).toContainText('This is where you can log into the secure area');
        expect(await loginPage.usernameInputHeader.textContent()).toBe('Username');
        expect(await loginPage.passwordInputHeader.textContent()).toBe('Password');
        
        await expect(loginPage.usernameInput).toBeVisible();
        await expect(loginPage.passwordInput).toBeVisible();
        await expect(loginPage.loginButton).toBeVisible();
        await expect(loginPage.loginButton).toContainText('Login');

        await loginPage.checkLoginButtonStyle();      
        await expect(loginPage.advBanner).toBeVisible();

        expect(await loginPage.getFooterText()).toBe('Powered by Elemental Selenium');
    });

    test('A secure area shoud be opened after login with a default credentials', async ({ loginPage, secureArea, page }) => {
        await loginPage.usernameInput.fill(DEFAULT_USERNAME);
        await loginPage.passwordInput.fill(DEFAULT_PASSWORD);
        await loginPage.loginButton.click();

        await secureArea.checkSecureAreaPageOpened();

        expect(await secureArea.getMainTitleText()).toBe('Secure Area');
        await expect(secureArea.subheader).toContainText('Welcome to the Secure Area');
        await expect(secureArea.logoutButton).toBeVisible();
        await expect(secureArea.logoutButton).toContainText('Logout');
        await expect(secureArea.advBanner).toBeVisible();
        expect(await loginPage.getFooterText()).toBe('Powered by Elemental Selenium');
        await expect(secureArea.successNotification).toBeVisible();
        await secureArea.checkSuccessNotificationStyle({
            backgroundColor: 'rgb(93, 164, 35)',
            borderColor: 'rgb(69, 122, 26)',
            color: 'rgb(255, 255, 255)'
        });
        await secureArea.checkSuccessNotificationText('You logged into a secure area!')
    });
});

test.describe('Negative login scenario', async () => {
    const incorrectData = [
        'username',
        'password'
    ];
    for (const type of incorrectData) {
        test(`The error message for incorrect ${type} should be specific`, async ({ loginPage, page }) => {
            const username = type === "username" ? INCORRECT_USERNAME : DEFAULT_USERNAME;
            const password = type === "username" ? DEFAULT_PASSWORD : INCORRECT_PASSWORD;
            await loginPage.usernameInput.fill(username);
            await loginPage.passwordInput.fill(password);
            await loginPage.loginButton.click();
    
            await loginPage.checkLoginPageOpened();
    
            await expect(loginPage.errorNotification).toBeVisible();
            await loginPage.checkErrorNotificationStyle({
                backgroundColor: 'rgb(198, 15, 19)',
                borderColor: 'rgb(151, 11, 14)',
                color: 'rgb(255, 255, 255)'
            });
            await loginPage.checkErrorNotificationText(`Your ${type} is invalid!`);
            await loginPage.closeNotification();
        });    
    }
})