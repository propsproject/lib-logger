export default (() => {
  return {
    logger: {
      src: false,
    },
    aws_instance_id_url: 'http://169.254.169.254/latest/meta-data/instance-id',
    bugsnag_api: process.env.BUGSNAG_API,
    bugsnag_enabled: process.env.BUGSNAG_ENABLED ? process.env.BUGSNAG_ENABLED : false
  };
});
