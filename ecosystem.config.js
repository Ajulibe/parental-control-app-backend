module.exports = {
  apps: [
    {
      name: 'parental-control-backend',
      script: 'build/app.js',
      instances: 2,
      autoscale: {
        max_instances: 3,
        min_instances: 1,
        cpu_usage: 50,
        memory_usage: 512
      }
    }
  ]
};
