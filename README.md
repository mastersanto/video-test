# Jobsity Video Test

Video Clip(Fragment) Player based on React Router:

* Dynamic video fragment query based on url params: `/:start/:end`

## Development

Running:

```
yarn
yarn start
```

You'll get:
* Hot reloading enabled for [localhost](http://localhost:3000) environment
* Test graphql with [GraphiQL](http://localhost:8080/graphiql)

### NOTES

* `VIDEO_URL` is being set in `packages/web/src/Routes.tsx`
* Check with viewport < 768

#### Resources

* [Create Apollo App](https://github.com/sysgears/create-apollo-app)
* [Yarn Workspaces](https://yarnpkg.com/blog/2017/08/02/introducing-workspaces/)
* [Styled Components](https://www.styled-components.com/)

#### TODO

* Clean up code
* Ignore `schema.graphql`
* Serve video and add `.env` config file with video url
* Add Docz
* Add tests
* Responsive design
* Add workspace for Mobile package with React Native