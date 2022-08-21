# email-clean
Takehome assignment for an interviewing process.

Replaces the `name`, `username`, `email`, and `password` fields in an arbitrary JSON blob with six asterisks.  Only the local part of an email is replaced; the domain is left alone.


## Github Actions

The tests for this repo are running in Github Actions.  Select the Actions tab at the top to see the latest build.

## Running

### Build
`npm run build`

### Test
`npm run test`

### Use
Import `scrub-object` from either `dist/scrub-object.js` (after building) or `src/scrub-object` and call the `scrub` function to scrub an object.