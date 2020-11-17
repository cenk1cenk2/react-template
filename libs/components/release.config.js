module.exports = {
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    [
      '@semantic-release/git',
      {
        assets: [ 'CHANGELOG.md', 'package.json', 'README.md' ]
      }
    ],
    [
      '@semantic-release/exec',
      {
        verifyReleaseCmd: 'cd ../../ && yarn build:one components --with-deps',
        failCmd: 'echo "Building failed."'
      }
    ],
    [
      '@semantic-release/npm',
      {
        pkgRoot: '../../dist/react-template-components'
      }
    ]
  ]
}
