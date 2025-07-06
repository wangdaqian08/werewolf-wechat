// miniapp/config.js
const env = "development"; // Change to 'staging' or 'production' as needed

const configs = {
  development: {
    backendUrl: "https://localhost:8443",
  },
  staging: {
    backendUrl: "https://staging.example.com/api",
  },
  production: {
    backendUrl: "https://prod.example.com/api",
  },
};

module.exports = configs[env];
