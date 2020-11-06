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
        prepareCmd: 'cd ../../ && yarn build:one base --with-deps',
        failCmd: 'echo "Building failed." && exit 127'
      }
    ],
    [
      '@semantic-release/npm',
      {
        pkgRoot: '../../dist/react-template-base'
      }
    ]
  ]
}
