module.exports = {
  apps: [
    {
      name: 'trello-o',
      script: './server/index.js',
      watch: true,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
