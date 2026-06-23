const common = {
  paths: ["tests/features/**/*.feature"],
  requireModule: ["ts-node/register"],
  require: ["tests/steps/**/*.steps.ts", "tests/support/worldCustom.ts"],
  format: ["progress"],
};

module.exports = {
  default: {
    ...common,
    worldParameters: {
      infrastructure: "memory",
    },
  },

  critical: {
    ...common,
    tags: "@critical",
    worldParameters: {
      infrastructure: "postgres",
    },
    require: [...common.require, "tests/support/hooksPostgres.ts"],
  },
};
