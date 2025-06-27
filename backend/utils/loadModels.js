import fs from "fs";
import path from "path";

const modelsDir = path.resolve("./models");

const loadModels = async () => {
  const modelFiles = fs.readdirSync(modelsDir).filter((f) => f.endsWith(".js"));

  const models = {};

  for (const file of modelFiles) {
    const mod = await import(path.join(modelsDir, file));

    if (mod.default) {
      models[mod.default.modelName.toLowerCase()] = mod.default;
    }
  }

  return models;
};

export default loadModels;
