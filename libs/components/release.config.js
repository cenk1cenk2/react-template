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
        prepareCmd: 'cd ../../ && yarn build:one components --with-deps > /drone/src/stdout.txt',
        failCmd: 'echo "Building failed."  &&  cat /drone/src/stdout.txt && ls -lah ../../dist/ && ls -lah ../../dist/react-template-components && exit 127'
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
