export default async () => {
  const puppeteer = require('puppeteer');
  const chalk = require('chalk');

  const debug = false;
  const height = 1080;
  const width = 1920;

  console.log(chalk.green('Setup Puppeteer'));
  const launch = await puppeteer.launch({
    headless: !debug,
    slowMo: debug ? 100 : 0,
    ignoreHTTPSErrors: true,
    args: [
      `--window-size=${width},${height}`,
      `--no-sandbox`,
      `--disable-setuid-sandbox`,
      '--enable-feature=NetworkService',
    ],
  });
  const wsEndpoint = launch.wsEndpoint();
  if (!wsEndpoint) {
    throw new Error('wsEndpoint not found');
  }
  const browser = await puppeteer.connect({
    browserWSEndpoint: wsEndpoint,
  });
  return browser;
};
