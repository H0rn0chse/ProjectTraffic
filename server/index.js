import { startServer } from "@h0rn0chse/socket-server";
import Github from "./adapters/github.js";
import Umami from "./adapters/umami.js";

const implementations = [
    Umami,
    Github
];
/*
Umami.fetchViews("1")
    .then((result) => {
        console.log("========================== Umami/Views ======================")
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    });

Umami.fetchReferrer("1")
    .then((result) => {
        console.log("========================== Umami/Referrer ======================")
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    });
Github.fetchViews("H0rn0chse/dark-mode-toggle")
    .then((result) => {
        console.log("========================== Github/Views ======================")
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    });
*/
Github.fetchReferrer("H0rn0chse/dark-mode-toggle")
    .then((result) => {
        console.log("========================== Github/Referrer ======================")
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    });

startServer({
    host: "localhost",
    port: 8080,
    publicPaths: [["/dist", "/"]],
});
