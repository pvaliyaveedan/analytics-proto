/*
    Initial Script to append env configuration files based on the environment deployed.
    Creates the .env so react build will get the conf based on env.
    You can still use .env.local for your local configurations.
    ANALYTICS environments: DEV, QA, PROD
*/
const fs = require("fs");
const analytics_env = process.argv.slice(2)[0];
const envFiles = {
    "ANALYTICS_ENV=DEV": ".env.analytics.dev",
    "ANALYTICS_ENV=QA": ".env.analytics.qa",
    "ANALYTICS_ENV=PROD": ".env.analytics.prod"
};

if (!analytics_env)
    throw new Error("You must provide argument ANALYTICS_ENV. Eg: ANALYTICS_ENV=DEV");
if (!envFiles[analytics_env])
    throw new Error("ANALYTICS_ENV must be DEV, QA or PROD");

console.log("[ANALYTICS]");
console.log("Creating .env for " + analytics_env);

const baseContent = fs.readFileSync(".env.analytics", { encoding: "UTF-8" });
const envContent = fs.readFileSync(envFiles[analytics_env], { encoding: "UTF-8" });

fs.writeFileSync(".env", `##${analytics_env}\n${baseContent}\n${envContent}`);
