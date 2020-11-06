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
        prepareCmd: 'cd ../../ && yarn build:one components --with-deps',
        failCmd: 'echo "Building failed."  && ls -lah ../../dist/ && ls -lah ../../dist/react-template-components && exit 127'
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
