import { test as baseTest } from "@playwright/test";
import { Login } from "../pages/loginPage";
import { SecureArea } from "../pages/secureAreaPage";

type UiFixtures = {
    loginPage: Login;
    secureArea: SecureArea;
  };

export const test = baseTest.extend<UiFixtures>({
    loginPage: async ({page}, use) => {
        const loginPage = new Login(page);
        await loginPage.openLoginPage();
        await use(loginPage);
    },
    secureArea: async ({page}, use) => {
        const secureArea = new SecureArea(page);
        await use(secureArea);
    }
});
export { expect } from '@playwright/test';