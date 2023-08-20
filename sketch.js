
//Changing size with url params
url = new URL(window.location.href)
urlParams = new URLSearchParams(url.search)


//changing render type
// if(url.searchParams.has('renderType') == true) {
//   renderMode = url.searchParams.get('renderType')
// } else {
//   renderMode = 1
// }

// if(url.searchParams.has('renderType') == true) {
//   renderType = url.searchParams.get('penSize')
// } else {
//   renderType = 1
// }
// //bitmap render pixel density
// if(url.searchParams.has('size') == true) {
//   pxSize = (url.searchParams.get('size'))
// } else {
//   pxSize = 1
// }
renderMode = 1

shuff(allInks)
thisPal = [
  black,
  flameRed,
  flameOrange,
  emerald,
  rowneyBlue,
  magenta, 
  cyan, 
  sapGreen,
]

plotPal = Array.prototype.concat(thisPal)
plotPal = thisPal
shuff(plotPal)

pageWidth = 11
pageHeight = 14
// pageMax = Math.max([pageHeight, pageWidth])
ratio = pageHeight/pageWidth //ratio is height/width of page to print on
w= 1600
h = w*ratio
marg = (inchToPx(0.25))

mmSize = 0.8
mmToInch = mmSize/25.4
mmWt = (mmToInch/pageHeight)*h



$fx.params([
  {
    id: "seed",
    name: "Seed",
    type: "number",
    update: "page-reload",
    default: randomInt(1, 10000),
    options: {
      min: 1,
      max: 10000,
      step: 1,
    },

  },
  {
    id: "seedB",
    name: "Seed B",
    type: "number",
    update: "page-reload",
    default: randomInt(1, 10000),
    options: {
      min: 1,
      max: 10000,
      step: 1,
    },

  },
  {
    id: "span",
    name: "Span",
    type: "number",
    update: "page-reload",
    default: randomVal(100, 400),
    options: {
      min: 100,
      max: 400,
      step: 10,
    },

  },
  {
    id: "coilComplexity",
    name: "Coil Complexity",
    type: "number",
    update: "page-reload",
    default: randomVal(1, 10),
    options: {
      min: 1,
      max: 10,
      step: 0.01,
    },

  },
  {
    id: "WiggleNS",
    name: "Wiggle Noise Scale",
    type: "number",
    update: "page-reload",
    default: randomVal(1, 3),
    options: {
      min: 1,
      max: 3,
      step: 0.001,
    },
  },
  {
    id: "colA",
    name: "A color",
    type: "number",
    update: "page-reload",
    default: randomInt(0, thisPal.length-1),
    options: {
      min: 0,
      max: thisPal.length-1,
      step: 1,
    },
  },
  {
    id: "colB",
    name: "B color",
    type: "number",
    update: "page-reload",
    default: randomInt(0, thisPal.length-1),
    options: {
      min: 0,
      max: thisPal.length-1,
      step: 1,
    },
  },
])

console.log($fx.getParam('seed'), $fx.getParam('seedB'))

coilComplex = map_range($fx.getParam("coilComplexity"), 1, 10, 0.1, 0.3)//randomVal(0.1, 0.3)//$fx.getParam("coilComplex")
// console.log($fx.getParam("coilComplexity"))
leafWid = $fx.getParam("span")//randomInt(100, 400)
widFreq = randomInt(1, 20)
widExpo = randomVal(0.25, 4)
contained = true//randBool()
wigglePhase = randomVal(1, 3)
loopDens = 3000
padding = 50//randomVal(1, 3)
c2Padding = 0.25

if(contained == false) {
  containMod = 2
} else {
  containMod = 1
}

startAng = randomVal(0, 360)

phaseXStart = randomVal(0, 100000000000)
phaseYStart = randomVal(0, 100000000000)
phaseWigStart = randomVal(0, 100000000000)

thickness = leafWid

blackThickness = thickness*0.25//Math.floor(thickness*0.25)

function setup() {
  
  pixelDensity(1)
  if(renderMode == 2) {
    createCanvas(w, h, SVG);
    console.log('svg runtime')
  } else {
    createCanvas(w, h);
    console.log('standard runtime')
  }
  
  c = createGraphics(w, h)
  c2 = createGraphics(w, h)
  angleMode(DEGREES)
}

startFrame = 1000000000000000000

function draw() {
  
 if(frameCount == 1) { 
  noiseSeed($fx.getParam('seed'))
  blendMode(MULTIPLY)
  c.background(255)
  c2.background(255)
  background(250)
  noFill()

  
}

  //Sketch
  if(frameCount < thickness) {
    // setPen(plotPal[0])
    setPen(thisPal[$fx.getParam('colA')])
    c2.strokeWeight(mmWt*c2Padding)
    loopWisp(leafWid)
  } 
  
  if(frameCount == thickness || frameCount == thickness*2) {
    startFrame = frameCount
    c2.background(255)
    // coilComplex = randomVal(0.1, 0.3)
    // phaseXStart = randomVal(0, 100000000000)
    // phaseYStart = randomVal(0, 100000000000)
    // phaseWigStart = randomVal(0, 100000000000)
    startAng += (360/widFreq)/3
    console.log('tripped')
  } 

  if(frameCount > thickness && frameCount < thickness*2) {
    setPen(thisPal[$fx.getParam('colB')])
    c2.strokeWeight(mmWt*c2Padding)
    loopWisp(leafWid)
  }

  if(frameCount > thickness*2 && frameCount < thickness*2 + blackThickness) {
    
    setPen(black)
    c2.strokeWeight(mmWt*0.5)
    loopWisp(leafWid)
  }

  if(frameCount == thickness*3) {
    // dotBG()
    // bgHatch()
    // bgGrad(cmykPal[0], cmykPal[1])
    fxpreview()
  }

}
