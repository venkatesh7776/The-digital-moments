import sharp from "sharp";
const [,, logoPath, scratch] = process.argv;
const out = "public";
// Trim logo transparent padding (alpha threshold to ignore faint fringe)
const img = sharp(logoPath);
const { data, info } = await img.clone().ensureAlpha().raw().toBuffer({ resolveWithObject: true });
let minX=info.width,minY=info.height,maxX=0,maxY=0;
for (let y=0;y<info.height;y++) for (let x=0;x<info.width;x++){ const a=data[(y*info.width+x)*4+3]; if(a>40){ if(x<minX)minX=x; if(x>maxX)maxX=x; if(y<minY)minY=y; if(y>maxY)maxY=y; } }
// zero-out very faint fringe pixels
for (let i=3;i<data.length;i+=4) if (data[i]<40) data[i]=0;
const pad=12;
const left=Math.max(0,minX-pad), top=Math.max(0,minY-pad), w=Math.min(info.width-left,maxX-minX+pad*2), h=Math.min(info.height-top,maxY-minY+pad*2);
console.log("bbox",{left,top,w,h});
const clean = sharp(data,{raw:{width:info.width,height:info.height,channels:4}}).extract({left,top,width:w,height:h});
const buf = await clean.png().toBuffer();
await sharp(buf).resize({width:1200}).webp({quality:92}).toFile(`${out}/brand/logo.webp`);
await sharp(buf).resize({width:1200}).png({compressionLevel:9}).toFile(`${out}/brand/logo.png`);
// Sparkle crop (original coords ~ x1030-1320, y60-390) and logo-without-sparkle
const sp = {left:1030-left, top:Math.max(0,60-top), width:290, height:325};
const spBuf = await sharp(buf).extract(sp).png().toBuffer();
await sharp(spBuf).webp({quality:92}).toFile(`${out}/brand/sparkle.webp`);
const meta = await sharp(buf).metadata();
// knock out sparkle area
const raw = await sharp(buf).ensureAlpha().raw().toBuffer();
for (let y=sp.top;y<sp.top+sp.height;y++) for (let x=sp.left;x<sp.left+sp.width;x++){ if (y< 380-top || x>1110-left) raw[(y*meta.width+x)*4+3]=0; }
await sharp(raw,{raw:{width:meta.width,height:meta.height,channels:4}}).resize({width:1200}).webp({quality:92}).toFile(`${out}/brand/logo-mark.webp`);
console.log("logo", meta.width, meta.height, "sparkle box", sp);
// Icons / OG
await sharp(buf).resize(512,512,{fit:"contain",background:{r:251,g:243,b:240,alpha:1}}).png().toFile("src/app/icon.png");
await sharp(buf).resize(180,180,{fit:"contain",background:{r:251,g:243,b:240,alpha:1}}).png().toFile("src/app/apple-icon.png");
await sharp({create:{width:1200,height:630,channels:4,background:"#FBF3F0"}}).composite([{input: await sharp(buf).resize({width:640}).png().toBuffer(), gravity:"center"}]).png().toFile("src/app/opengraph-image.png");
// Theme screenshots
for (const i of [1,2,3]) {
  await sharp(`${scratch}/t${i}_m.png`).resize({width:720}).webp({quality:80}).toFile(`${out}/themes/theme-${i}-mobile.webp`);
  await sharp(`${scratch}/t${i}_d.png`).resize({width:1440}).webp({quality:78}).toFile(`${out}/themes/theme-${i}-desktop.webp`);
}
