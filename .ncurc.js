module.exports = {
  reject: [
    // Upgrading past redis@3 to the next major version introduces a lot of breaking changes.
    'redis',
    '@types/redis',
  ]
}
