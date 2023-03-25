export const info = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Ecommerce PAK",
      version: "1.0.0",
      description: "API para manipular usuarios, productos, carritos y demás",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["./src/docs/*.yml"],
};
