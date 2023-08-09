
//Changing size with url params
url = new URL(window.location.href)
urlParams = new URLSearchParams(url.search)
//to change size of the pen, press 'w' and edit the penSize variable in url, in mm in tenths '35' for 0.35
if(url.searchParams.has('penSize') == true) {
  penSize = (url.searchParams.get('penSize'))/100
} else {
  penSize = 0.35
}

//changing render type
if(url.searchParams.has('renderType') == true) {
  renderMode = url.searchParams.get('renderType')
} else {
  renderMode = 1
}

if(url.searchParams.has('renderType') == true) {
  renderType = url.searchParams.get('penSize')
} else {
  renderType = 1
}
//bitmap render pixel density
if(url.searchParams.has('size') == true) {
  pxSize = (url.searchParams.get('size'))
} else {
  pxSize = 1
}

shuff(allInks)
thisPal = [
  flameRed,
  rowneyBlue,
  black,
  
  sapGreen
]

plotPal = Array.prototype.concat(thisPal)
plotPal = [black, flameRed]
shuff(plotPal)

pageWidth = 11
pageHeight = 14
// pageMax = Math.max([pageHeight, pageWidth])
ratio = pageHeight/pageWidth //ratio is height/width of page to print on
w= 1600
h = w*ratio
marg = (inchToPx(0.5))

mmSize = 0.8
mmToInch = mmSize/25.4
mmWt = (mmToInch/pageHeight)*h



$fx.params([
  {
    id: "coilComplexity",
    name: "Coil Complexity",
    type: "number",
    update: "page-reload",
  },
  {
    id: "WiggleNS",
    name: "Wiggle Noise Scale",
    type: "number",
    update: "page-reload",
  },
  {
    id: "color_id",
    name: "A color",
    type: "color",
    update: "page-reload",
  },
])

coilComplex = randomVal(0.03, 0.2)//$fx.getParam("coilComplex")
leafWid = randomVal(100, 500)
widFreq = randomInt(1, 20)
widExpo = randomVal(0.25, 4)
contained = randBool()
wigglePhase = randomVal(1, 3)
loopDens = 1000
padding = 1//randomVal(1, 3)

if(contained == false) {
  containMod = 1.5
} else {
  containMod = 1
}

startAng = randomVal(0, 360)

phaseXStart = randomVal(0, 100000000000)
phaseYStart = randomVal(0, 100000000000)
phaseWigStart = randomVal(0, 100000000000)

function setup() {
  
  pixelDensity(pxSize)
  if(renderMode == 2) {
    createCanvas(w, h, SVG);
    console.log('svg runtime')
  } else {
    createCanvas(w, h);
    console.log('standard runtime')
  }
  
  c = createGraphics(w, h)
  angleMode(DEGREES)
  noLoop()
}

function draw() {
  
  noiseSeed(randomVal(0, 1000000000000000))
  blendMode(MULTIPLY)
  c.background(255)
  background(250)
  noFill()

  //Sketch
  setPen(black)
  loopWisp(leafWid)
  setPen(flameRed)
  loopWisp(leafWid*0.9)
  setPen(rowneyBlue)
  loopWisp(leafWid*0.8)
 

}
