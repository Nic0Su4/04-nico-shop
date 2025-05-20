import { initialData } from "./seed";
import { prisma } from "../lib/prisma";

async function main() {
  prisma.console.log("Seed ejecutado correctamente");
}

(() => {
  if (process.env.NODE_ENV === "production") return;

  main();
})();
