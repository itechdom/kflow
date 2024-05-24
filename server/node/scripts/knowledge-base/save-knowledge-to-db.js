const {
  readFiles,
  connectToDb,
  formatMindmap,
  flattenMindmap,
} = require("./utils");
import mongoose from 'mongoose';
import knowledgeSchema from '@markab.io/orbital-api/MongoDb/models/knowledges.js';

const knowledgeModel = mongoose.model("knowledges", knowledgeSchema);

const getDiff = (existing, newData) => {
  let tmp = {};
  Object.keys(existing).forEach((k) => {
    let ob = existing[k];
    tmp = {
      ...tmp,
      [ob.title]: ob,
    };
  });
  let tmp2 = { ...newData };
  Object.keys(newData).forEach((id) => {
    let newOb = newData[id];
    if (tmp[newOb.title]) {
      tmp2 = {
        [id]: newOb,
        ...newData,
      };
    }
    tmp2 = {
      [id]: newOb,
      ...newData,
    };
  });
  return tmp2;
};

const processFile = async (filename, content) => {
  let formattedNodeList = JSON.parse(content).ideas;
  let level = 0;
  formattedNodeList && formatMindmap(formattedNodeList, level);
  const flatMindmap = {};
  flattenMindmap(formattedNodeList, null, flatMindmap);
  const titleSections = filename.split("-");
  let knowledgeData = {
    title: filename.replace(".mup", "").split("-")[titleSections.length - 1],
    tags: titleSections.slice(0, titleSections.length - 1),
    body: flatMindmap,
  };

  try {
    const res = await knowledgeModel
      .findOne({ title: knowledgeData.title })
      .exec();
    if (res) {
      const diff = getDiff(res.body, knowledgeData.body);
      res.body = diff;
      await res.save();
      console.log(`${titleSections} saved!`);
    } else {
      let knowledge = new knowledgeModel(knowledgeData);
      await knowledge.save();
      console.log(`${titleSections} saved!`);
    }
  } catch (err) {
    console.error("Error processing file:", err);
  }
};

const main = async () => {
  try {
    const db = await connectToDb((con) => console.log("CONNECTION", con));
    console.log("Connected to DB");

    await readFiles(
      "./data/",
      async (filename, content) => {
        await processFile(filename, content);
      },
      (err) => {
        console.error("Error reading files:", err);
      }
    );

    console.log("Files processed");
  } catch (err) {
    console.error("Error:", err);
  }
};

main();
