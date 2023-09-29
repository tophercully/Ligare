
//Changing size with url params
url = new URL(window.location.href)
urlParams = new URLSearchParams(url.search)


// changing render type
if(url.searchParams.has('renderType') == true) {
  renderMode = url.searchParams.get('renderType')
} else {
  renderMode = 1
}



//initialize default sizing
  pageWidth = 11
  pageHeight = 14
  ratio = pageHeight/pageWidth
  w= 1600
  h = w*ratio 
  marg = inchToPx(0.25) 
//change page size by pressing 'w' and changing each variable to size in inches
//margin size is by the hundredth of an inch
//for example 1 inch margin would be 'marg=100'
if(url.searchParams.has('pageWidth') == true) {
  pageWidth = url.searchParams.get('pageWidth')
  pageHeight = url.searchParams.get('pageHeight')
  ratio = pageHeight/pageWidth
  w= 1600
  h = w*ratio
  marginSz = url.searchParams.get('marg')/100
  marg = inchToPx(marginSz)
} 
canv = (w+h)/2
//Change pen size by pressing 'c' and change to size in mm * 100
//for example 0.5mm would be 'penSize=50'
if(url.searchParams.has('penSize') == true) {
  penSize = url.searchParams.get('penSize')/100
} else {
  penSize = 0.5
}
//bitmap render pixel density
if(url.searchParams.has('size') == true) {
  pxSize = (url.searchParams.get('size'))
} else {
  pxSize = 1
}
// renderMode = 2

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

// pageWidth = 11
// pageHeight = 14
 //ratio is height/width of page to print on

// marg = (inchToPx(marginSz))

// mmSize = 0.8
// mmToInch = mmSize/25.4
// mmWt = (mmToInch/pageHeight)*h



$fx.params([
  {
    id: "seedA",
    name: "Master Seed",
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
    id: "contained",
    name: "Contained?",
    type: "boolean",
    update: "page-reload",
    default: randBool(),
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
    id: "spanA",
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
    id: "colA",
    name: "Color",
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
    id: "freq",
    name: "Wave Frequency",
    type: "number",
    update: "page-reload",
    default: randomInt(1, 20),
    options: {
      min: 1,
      max: 20,
      step: 1,
    },
  },
  {
    id: "expo",
    name: "Wave Separation",
    type: "number",
    update: "page-reload",
    default: randomVal(0.25, 5),
    options: {
      min: 0.25,
      max: 5,
      step: 0.01,
    },
  },
  {
    id: "wiggleNS",
    name: "Turbulence Scale",
    type: "number",
    update: "page-reload",
    default: 1,
    options: {
      min: 1,
      max: 3,
      step: 0.01,
    },
  },
  {
    id: "wigPhase",
    name: "Turbulence Amount",
    type: "number",
    update: "page-reload",
    default: 2,
    options: {
      min: 1,
      max: 3,
      step: 0.01,
    },
  },

  {
    id: "startAng",
    name: "Starting Angle",
    type: "number",
    update: "page-reload",
    default: randomInt(1, 360),
    options: {
      min: 1,
      max: 360,
      step: 1,
    },

  },
  
])

$fx.features({
  "Color": thisPal[$fx.getParam('colA')].name,
  "Complexity": $fx.getParam('coilComplexity'),
  "Contained?": $fx.getParam('contained'),
  "Span": $fx.getParam('spanA'),
  "Frequency": $fx.getParam('freq'),
  "Turbulence Scale": $fx.getParam('wiggleNS'),
  "Turbulence Amount": $fx.getParam('wigPhase'),
})
  





coilComplex = map_range($fx.getParam("coilComplexity"), 1, 10, 0.01, 0.3)//randomVal(0.1, 0.3)//$fx.getParam("coilComplex")
leafWid = map_range($fx.getParam("spanA"), 100, 400, canv*0.05500000000000001, canv*0.22000000000000003)
widFreq = $fx.getParam('freq')
widExpo = $fx.getParam('expo')
contained = $fx.getParam('contained')
wigglePhase = $fx.getParam('wigPhase')
loopDens = 2500
c2Padding = 0.25
nWigs = []
pts = []

accentStart = 10
accentEnd = 180

if(contained == false) {
  containMod = 2
} else {
  containMod = 1
}

startAng = $fx.getParam('startAng')

phaseXStart = 100
phaseYStart = 100
phaseWigStart = 0

thickness = leafWid

spanA = $fx.getParam('spanA')

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
  frameRate(240)
}


function draw() {
  
 if(frameCount == 1) { 
  noiseSeed($fx.getParam('seedB'))
  blendMode(MULTIPLY)
  c2.background(255)
  background(250)
  noFill()

  
}

  //Sketch
  if(frameCount < spanA) {
    setPen(thisPal[$fx.getParam('colA')])
    c2.strokeWeight(mmWt*c2Padding)
    loopWisp($fx.getParam('spanA'), $fx.getParam('seedA'))
  } 
  
  if(frameCount == spanA) {
    fxpreview()
  }

}
