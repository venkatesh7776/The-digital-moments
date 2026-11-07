import sharp from "sharp";
const src = "public/brand/logo.png"; // 1200 wide trimmed, clean alpha
const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const W = info.width, H = info.height, s = W / 1332;
// sparkle centre in trimmed coords (orig 1175,230 minus offset 252,65)
const sx = Math.round((1175 - 252) * s), sy = Math.round((230 - 65) * s);
const seen = new Uint8Array(W * H); const stack = [[sx, sy]]; const isSp = new Uint8Array(W * H);
let minX=W,minY=H,maxX=0,maxY=0;
while (stack.length) { const [x, y] = stack.pop(); if (x<0||y<0||x>=W||y>=H) continue; const i=y*W+x; if (seen[i]) continue; seen[i]=1; if (data[i*4+3] < 8) continue; isSp[i]=1; if(x<minX)minX=x;if(x>maxX)maxX=x;if(y<minY)minY=y;if(y>maxY)maxY=y; stack.push([x+1,y],[x-1,y],[x,y+1],[x,y-1]); }
console.log("sparkle bbox", {minX,minY,maxX,maxY});
const mark = Buffer.from(data), sp = Buffer.alloc(data.length);
for (let i=0;i<W*H;i++) if (isSp[i]) { for (let c=0;c<4;c++) sp[i*4+c]=data[i*4+c]; mark[i*4+3]=0; }
await sharp(mark,{raw:{width:W,height:H,channels:4}}).webp({quality:92}).toFile("public/brand/logo-mark.webp");
await sharp(sp,{raw:{width:W,height:H,channels:4}}).webp({quality:92}).toFile("public/brand/sparkle-layer.webp");
console.log(JSON.stringify({W,H,cx:((minX+maxX)/2/W*100).toFixed(2),cy:((minY+maxY)/2/H*100).toFixed(2)}));
