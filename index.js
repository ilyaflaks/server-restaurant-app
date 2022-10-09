const express = require("express");
const app = express();
const db = require("./config/connection");
const PORT = process.env.PORT || 4000;
var bodyParser = require("body-parser");
const { Restaurants } = require("./models");
const { Dishes } = require("./models");
const { Testcollections } = require("./models");
//const { ApolloServer, gql } = require("apollo-server");
const { ApolloServer, gql } = require("apollo-server-express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const http = require("http");
const cors = require("cors");
const path = require("path");

//app.use(express.static("public"));
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
require("dotenv").config();

app.use(bodyParser.json());

//app.use(express.static(path.join(__dirname, "public")));

// app.use(express.static(path.join(__dirname, "./banana")));

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Dishes {
    name: String
    price: Int
    description: String
    id: ID
    img: String
  }

  type Restaurant {
    id: String
    name: String
    description: String
    dishes: [Dishes]
    img: String
  }

  type Query {
    books: [Book]
  }
  type Query {
    restaurants: [Restaurant]
  }
`;

const resolvers = {
  Query: {
    restaurants: async () => {
      const response = await Restaurants.find({}).exec();
      //console.log("response: " + response);

      return response;
      // return response.map((item) => {
      //   return {
      //     id: item._id,
      //     name: item.dame,
      //     description: item.description,
      //     dishes: item.dishes,
      //   };
      // });
    },
  },
};

let apolloServer = null;
async function startServer() {
  apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
}
startServer();
const httpserver = http.createServer(app);

app.get("/rest", function (req, res) {
  res.json({ data: "api working" });
});

app.post("/payment", cors(), async (req, res) => {
  console.log("/payment accessed");
  let { amount, id } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Restaurant App",
      payment_method: id,
      confirm: true,
    });
    console.log("Payment", payment);
    res.json({
      message: "Payment successful",
      success: true,
    });
  } catch (error) {
    console.log("Error", error);
    res.json({
      message: "Payment failed",
      success: false,
    });
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.listen(PORT, function () {
  console.log(`server running on port ${PORT}`);
  console.log(`gql path is ${apolloServer.graphqlPath}`);
});
