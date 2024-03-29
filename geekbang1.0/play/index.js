const fs = require("fs");
const Koa = require("koa");
const mount = require("koa-mount");
const static = require("koa-static");
const { graphqlHTTP } = require("koa-graphql");

const app = new Koa();

app.use(mount("/static", static(`${__dirname}/source/static`)));

app.use(mount("/api", graphqlHTTP({ schema: require("./schema") })));

const body = fs.readFileSync(`${__dirname}/source/index.html`, "utf-8");
app.use(
  mount("/", async ctx => {
    ctx.status = 200;
    ctx.body = body;
  })
);

// app.listen(3000);
module.exports = app;
