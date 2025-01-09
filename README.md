# Playwright Test With CI-CD

## Prerequisites
1. Install [Node.js](https://nodejs.org/) (version 16 or higher).
2. Install a Git client to clone the repository.

## Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/Sachin155/CICD-examples.git
   cd cicd-examples
   ```

2. Install dependencies:
   ```bash
   npm install --dev
   ```

3. Ensure Playwright dependencies are installed:
   ```bash
   npx playwright install
   ```

## Running Tests Locally
To execute all tests:
```bash
npx playwright test
```

To run a specific test suite, for example, the login suite:
```bash
npx playwright test tests/login.spec.ts
```

To view the HTML report of a previous test run:
```bash
npx playwright show-report reports/playwright-report
```

## Documentation
The project documentation, including the Manual Test Cases, is located in the `docs/` folder:

### Pipeline Configuration
1. On every push and pull requests to the `main`, `stg` and `dev` branch, the pipeline will automatically:
   - Install dependencies.
   - Run Playwright smoke tests (tests tagged with `@smoke`).
   - Generate reports for test results.

### Viewing CI/CD Reports
After a pipeline run:
1. Access the Playwright test report under the `playwright-report/` directory (available as an artifact in GitHub Actions).
2. For push events, only smoke tests (`@smoke`) are executed, with a targeted report.

## Customisation
- To add new test cases, create new `.spec.ts` files in the `tests/` folder.
- Update the `playwright.config.ts` file for global settings like `baseURL`.
