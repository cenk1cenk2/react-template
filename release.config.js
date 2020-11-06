module.exports = {
  branches: [
    'master',
    {
      name: 'alpha',
      prerelease: true
    },
    {
      name: 'beta',
      prerelease: true
    },
    {
      name: 'rc',
      prerelease: true
    }
  ],
  verifyConditions: [ '@semantic-release/changelog', '@semantic-release/git' ],
  prepare: [
    '@semantic-release/changelog',
    {
      path: '@semantic-release/git',
      assets: [ 'CHANGELOG.md', 'packages/*/CHANGELOG.md', process.env.README_LOCATION ? process.env.README_LOCATION : 'README.md', 'yarn.lock', 'npm-shrinkwrap.json' ]
    }
  ]
}
