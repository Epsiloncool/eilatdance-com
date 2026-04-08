module.exports = {
  apps: [
    {
      name: 'eilatdance',
      script: 'npm',
      args: 'start',
      cwd: './',
      env: {
        PORT: 18042,
        NODE_ENV: 'production',
      },
    },
  ]
};
