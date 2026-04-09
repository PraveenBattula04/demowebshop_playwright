# demowebshop_playwright
Demo webshop testcases.
check node verison -> node --version
npm init playwright@latest (for playwright code setup)
choose below options:
Language: typescript
where to put end-to-end test: test 
Add githu action workflow: n
Intsall playwright browsers: true

--- playwright setup is complete ---
you can create test files under tests folder with spec.ts as file type.
you can change the tests folder in playwright.config.ts file.

----------------------------------------------------

npx playwright test --ui (for executing testcases in ui)

------------------------------------------------------------------------
create Login testcase
1) first divide the page into parts and store all input fields, links, buttons with thier locators in each file.
(For example I have stored all the locators of particular header fileds in header.ts file so when a login is required I will call the header function and perform action)
2) create a mytests folder and change the path in palywright.config.ts file to mytests folder.
3) create a new spec.ts files for each testcase or depending on the functionality.
4) use locators like ID, ClassName, Text, CSS Selector, XPath.
5) install select hubs or locator hubs extension for getting the locators.
        1. ID Selector: Selects elements based on their id attribute.
        const element = page.locator('#my-button');
        
        2. Class Name Selector: Selects elements based on their class name.
        const element = page.locator('.submit-button');

        3. Text/attribute Selector: Selects elements that contain specific text.
        const element = page.locator('text=Submit');
        await page.locator('[name="Email"]');

        4. CSS Selector: Selects elements based on their CSS properties.
        const element = page.locator('css=button#id');

        5. XPath Selector: Selects elements based on the XPath query.
        const element = page.locator('xpath=//button[text()="Submit"]');

        6. Data-test-id Selector: Selects elements by a custom attribute (data-testid), commonly used in testing.

        7. Role Selector: Selects elements by their ARIA role.

        8. Combining Selectors: Allows combining multiple selectors for more specific targeting.

        9. Chaining Selectors: Enables chaining of multiple selectors to refine the selection.

        10. IFrame Selectors: For interacting with elements inside iframes.

        11. Attribute Selector: Selects elements based on any attribute.

        12. nth-match Selector: Selects a specific instance of an element among multiple matches.

        13. SVG Selectors:

        14. Shadow DOM Selectors:
            - Direct Selector
            - Piercing Shadow DOM

How to specify page object model & modules
Page‑specific?✅ Page Object
Business logic?✅ Page Object
Reusable UI?✅ Module
Layout/navigation?✅ Module
Appears everywhere?✅ Module

