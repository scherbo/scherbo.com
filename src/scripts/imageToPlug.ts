import sharp from "sharp";

const path = Deno.args[0];

if (!path) {
  throw new Error("Please provide an image path");
}

sharp(path)
  .resize(200)
  .blur(3)
  .toBuffer()
  .then((data) => {
    const base64 = btoa(String.fromCharCode.apply(null, data));
    console.log(`data:image/png;base64, ${base64}`);
  });
