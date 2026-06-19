module.exports = {
  domain: {
    tags: "not @critical",
    paths: ["tests/features/**/*.feature"],
    requireModule: ["ts-node/register"],
    require: ["tests/steps/domain/**/*.ts", "tests/support/worldMemory.ts"],
    format: ["progress"],
  },

  postgres: {
    tags: "@critical",
    paths: ["tests/features/**/*.feature"],
    requireModule: ["ts-node/register"],
    require: [
      "tests/steps/postgres/**/*.ts",
      "tests/support/worldPostgres.ts",
      "tests/support/hooksPostgres.ts",
    ],
    format: ["progress"],
  },
};
