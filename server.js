const fastify = require("fastify")();
const axios = require("axios");
const path = require("path");

fastify.register(require("@fastify/static"), {
    root: path.join(__dirname, "static"),
    prefix: "/static/",
  });

const transposeResponse = (response) => {
  let transposed = {};
  transposed.voteKey = response.vote_key;
  transposed.name = response.name;

  transposed.slides = [];

  response.questions.map((value) => {
    let slide = {
      title: value.question,
      type: value.type,
      image: value.question_image_url,
    };

    if (slide.type == "quiz") {
      let choices = [];
      value.choices.map((options) => {
        choices.push(options.label);
      });
      slide.choices = choices;
    }

    transposed.slides.push(slide);
  });
  
  return transposed;
};

fastify.get("/menti/:code", async (request, reply) => {
  const code = request.params.code;
  const url = `https://www.menti.com/core/vote-ids/${code}/series`;
  try {
    let response = await axios.get(url);
    let transposed = transposeResponse(response.data);
    reply.send(transposed);
  } catch (error) {
    reply.send(error);
  }
});

fastify.get("/", (request, reply) => reply.sendFile("index.html"));

fastify.listen({ port: 3000, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
