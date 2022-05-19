import { registerXhrHandler, startServer } from "@h0rn0chse/socket-server";
import Github from "./adapters/github.js";
import Umami from "./adapters/umami.js";

const implementations = {};
implementations[Umami.id] = Umami;
implementations[Github.id] = Github;

startServer({
    host: "localhost",
    port: 8080,
    publicPaths: [["/dist", "/"]],
});

registerXhrHandler("GET", "/data/traffic", async (req, res, token) => {
    const identifier = req.query.identifier.toString();
    const provider = req.query.provider.toString();
    const providerInstance = implementations[provider];

    if (identifier && providerInstance) {
        try {
            const views = await providerInstance.fetchViews(identifier);
            const referrer = await providerInstance.fetchReferrer(identifier);
            res.status(200).json({ views, referrer });
        } catch (err) {
            const msg = err.toString();
            res.status(500).json({ err: msg });
        }
    } else {
        res.status(400).json({ err: "Invalid Request" });
    }
});

registerXhrHandler("GET", "/config/providerTypes", (req, res, token) => {
    const body = Object.values(implementations).map((impl) => {
        return {
            id: impl.id,
            name: impl.name,
        };
    });
    res.status(200).json(body);
});

registerXhrHandler("GET", "/state/dataProviders", (req, res, token) => {
    const body = [{
        id: "provider-0001",
        name: "GitHub/H0rn0chse",
        type: "github"
    }, {
        id: "provider-0002",
        name: "Umami/H0rn0chse",
        type: "umami"
    }];
    res.status(200).json(body);
});

registerXhrHandler("GET", "/state/projects", (req, res, token) => {
    const body = [{
        id: "project-0001",
        name: "DarkModeToggle",
        dataProviderLinks: [{
            id: "link-0001",
            dataProvider: "provider-0001",
            identifier: "H0rn0chse/dark-mode-toggle"
        }, {
            id: "link-0002",
            dataProvider: "provider-0002",
            identifier: "1"
        }]
    }, {
        id: "project-0002",
        name: "NightSky",
        dataProviderLinks: [{
            id: "link-0003",
            dataProvider: "provider-0001",
            identifier: "H0rn0chse/NightSky"
        }, {
            id: "link-0004",
            dataProvider: "provider-0002",
            identifier: "2"
        }]
    }];
    res.status(200).json(body);
});

// todo login/logout/persistence
