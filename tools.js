
function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(fxrand() * (max - min + 1) + min); // The maximum is exclusive and the minimum is inclusive
}
function randomVal(min, max) {
  return fxrand() * (max - min) + min;
}
function map_range(value, low1, high1, low2, high2) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}

function shuff(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(fxrand() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function setLineDash(list) {
  drawingContext.setLineDash(list);
}

function keyTyped() {
  if (key === "s" || key === "S") {
    save(pageWidth+'x'+pageHeight+fxhash);
  }
  if (key === "1") {
    window.history.replaceState('', '', updateURLParameter(window.location.href, "size", "1"));
    window.location.reload();
  }
  if (key === "2") {
    window.history.replaceState('', '', updateURLParameter(window.location.href, "size", "2"));
    window.location.reload();
  }
  if (key === "3") {
    window.history.replaceState('', '', updateURLParameter(window.location.href, "size", "3"));
    window.location.reload();
  }
  if (key === "v" || key === "V") {
    window.history.replaceState('', '', updateURLParameter(window.location.href, "renderType", "2"));
    window.location.reload();
  }
  if (key === "p" || key === "P") {
    window.history.replaceState('', '', updateURLParameter(window.location.href, "renderType", "1"));
    window.location.reload();
  }
  if (key === "w" || key === "W") {
    window.history.replaceState('', '', updateURLParameter(window.location.href, "pageWidth", "11"));
    window.history.replaceState('', '', updateURLParameter(window.location.href, "pageHeight", "14"));
    window.history.replaceState('', '', updateURLParameter(window.location.href, "marg", "25"));

    window.location.reload();
  }
  if (key === "c" || key === "c") {
    window.history.replaceState('', '', updateURLParameter(window.location.href, "penSize", "50"));
    window.location.reload();
  }
}

function mouseClicked() {
  doubletap()
}

var mylatesttap;
function doubletap() {

   var now = new Date().getTime();
   var timesince = now - mylatesttap;
   if((timesince < 600) && (timesince > 0)){

    // double tap   
    save(pageWidth+'x'+pageHeight+fxhash)
   }else{
            // too much time to be a doubletap
         }

   mylatesttap = new Date().getTime();

}



var timeDown
function touchEnded() {
  timeDown = new Date().getTime()

  
}

function touchStarted() {
  now = new Date().getTime()

  if(now-timeDown < 600) {
    save(pageWidth+'x'+pageHeight+fxhash);

  }
}


function updateURLParameter(url, param, paramVal)
{
    var TheAnchor = null;
    var newAdditionalURL = "";
    var tempArray = url.split("?");
    var baseURL = tempArray[0];
    var additionalURL = tempArray[1];
    var temp = "";

    if (additionalURL) 
    {
        var tmpAnchor = additionalURL.split("#");
        var TheParams = tmpAnchor[0];
            TheAnchor = tmpAnchor[1];
        if(TheAnchor)
            additionalURL = TheParams;

        tempArray = additionalURL.split("&");

        for (var i=0; i<tempArray.length; i++)
        {
            if(tempArray[i].split('=')[0] != param)
            {
                newAdditionalURL += temp + tempArray[i];
                temp = "&";
            }
        }        
    }
    else
    {
        var tmpAnchor = baseURL.split("#");
        var TheParams = tmpAnchor[0];
            TheAnchor  = tmpAnchor[1];

        if(TheParams)
            baseURL = TheParams;
    }

    if(TheAnchor)
        paramVal += "#" + TheAnchor;

    var rows_txt = temp + "" + param + "=" + paramVal;
    return baseURL + "?" + newAdditionalURL + rows_txt;
}

function randColor() {
  return chroma(truePal[randomInt(0, truePal.length-1)]).saturate(0).hex()
}

function angBetween(x1, y1, x2, y2) {
  return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
}

function diff (num1, num2) {
  if (num1 > num2) {
    return (num1 - num2);
  } else {
    return (num2 - num1);
  }
};

function distBetween (x1, y1, x2, y2) {
  var deltaX = diff(x1, x2);
  var deltaY = diff(y1, y2);
  var distan = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
  return (distan);
};

function ptFromAng(xPosition, yPosition, ang, dis) {
  xMod = cos(ang)*dis
  yMod = sin(ang)*dis

  return createVector((xPosition+xMod), (yPosition+yMod))
}

function plusOrMin(x) {
  chance = fxrand() 
  if(chance < 0.5) {
    mod = 1
  } else {
    mod = -1
  }

  return x*mod
}

function average(array) {
  sum = 0;
  array.forEach((element) => {
    sum += element;
  });
  return sum / array.length;
}

function ptBetween(xA, yA, xB, yB, amt) {
  xBetween = map(amt, 0, 1, xA, xB)
  yBetween = map(amt, 0, 1, yA, yB)
  betweenPos = createVector(xBetween, yBetween)
  return betweenPos
}

function inchToPx(meas) {
  return (meas/pageHeight)*h
}

function pxToInch(meas) {
  return (meas/h)*pageHeight
}

function mmToInch(mm) {
  return mm/25.4
}

function mmToPx(mm) {
  toInch = mm/25.4
  toPx = (toInch/pageHeight)*h
  return toPx
}

function setStrokeMM(mm) {
  weightNow = mmToPx(mm) 
  strokeWeight(weightNow)
}

function randBool() {
  if(fxrand() < 0.5) {
    bool = true
  } else {
    bool = false
  }
  return bool
}

function setPen(pen) {
  penNow = pen
  stroke(chroma(pen.hex).alpha(pen.alpha).hex())
  mmWt = mmToPx(penSize)
  strokeWeight(mmWt)
  slinkyGap = mmWt*0.75
}
////////////////////////////////////////
function loopWisp(wt, seed) {
  if(frameCount == 1) {
    dens = loopDens
  startAng = startAng

  maxX = 0
  minX = 1
  maxY = 0
  minY = 1
  minWig = 1
  maxWig = 0
  ns = coilComplex
  
  rotNS = 2
  
  nsWig = $fx.getParam('wiggleNS')
  phaseY = $fx.getParam('seed')
  phaseX = seed
  phaseWig = phaseWigStart
  phaseTotal = wigglePhase
  phaseInc = phaseTotal/thickness
  
  freq = widFreq

  c2.stroke(0)
  c2.strokeCap(SQUARE)
  }
  
  
  
  
  j = frameCount
    phaseWig += phaseInc
    for(let i = 0; i < dens+3; i++) {
      sineDens = map(i, 0, dens, startAng, startAng+360)
      iNormal = map(i, 0, dens, 0, 1)
      xOff = map(cos(sineDens), -1, 1, 0, 10)
      yOff = map(sin(sineDens), -1, 1, 0, 10)
      rot = noise(xOff*rotNS, yOff*rotNS)
      nX = noise(xOff*ns, yOff*ns, phaseX)
      nY = noise(xOff*ns, yOff*ns, phaseY)
      nWig = noise(xOff*nsWig, yOff*nsWig, phaseWig)
      
      if(nX < minX) {
        minX = nX
      }
      if(nX > maxX) {
        maxX = nX
      }
      if(nY < minY) {
        minY = nY
      }
      if(nY > maxY) {
        maxY = nY
      }
      pts[i] = createVector(nX, nY)

      if(nWig < minWig) {
        minWig = nWig
      }
      if(nWig > maxWig) {
        maxWig = nWig
      }
      
      nWigs[i] = nWig
    }
    
    drawing = false
    beginShape()
    for(let i = 0; i < dens+1; i++) {
      
      
      if(contained == true) {
        xPos = map(pts[i].x, minX, maxX, marg+wt, w-marg-wt)
        yPos = map(pts[i].y, minY, maxY, marg+wt, h-marg-wt)
        xPosNxt = map(pts[i+1].x, minX, maxX, marg+wt, w-marg-wt)
        yPosNxt = map(pts[i+1].y, minY, maxY, marg+wt, h-marg-wt)
      } else {
        xPos = map(pts[i].x, minX, maxX, marg, w-marg)
        yPos = map(pts[i].y, minY, maxY, marg, h-marg)
        xPosNxt = map(pts[i+1].x, minX, maxX, marg, w-marg)
        yPosNxt = map(pts[i+1].y, minY, maxY, marg, h-marg)
      }
      
      iNormal = map(i, 0, dens, 0, 360)

      wigNormal = map(nWigs[i], minWig, maxWig, 0, 1)
      ang = angBetween(xPos, yPos, xPosNxt, yPosNxt)+90
      sineFixed = map(sin(iNormal*freq), -1, 1, 0, 1)
      wid = map(pow(sineFixed, widExpo), 0, pow(1, widExpo), 0, wt)
      amt = map(wigNormal, 0, 1, wid, -wid)
      pos = ptFromAng(xPos, yPos, ang, amt*containMod)
      

      check = c2.get(pos.x, pos.y)[0]
    
      if(check == 255 && pos.x > marg*2 && pos.x < w-marg*2 && pos.y > marg*2 && pos.y < h-marg*2 && drawing == false) {
        beginShape()
        drawing = true
        
      } else if(check == 255 && pos.x > marg*2 && pos.x < w-marg*2 && pos.y > marg*2 && pos.y < h-marg*2 && drawing == true) {
        vertex(pos.x, pos.y)
        if(i > 1) {
          c2.line(pos.x, pos.y, lastPos.x, lastPos.y)
        }
        
      } else if(check != 255 && drawing == true) {
        endShape()
        
        drawing = false
      }
      
      lastPos = createVector(pos.x, pos.y)
    
    }
    endShape()
  
  
  
}

function loopNoise(loopDuration, scl, phs) {
  loopDuration = 1000
  fLooped = map(frameCount, 1, loopDuration, 0, 360)
  xOff = map(cos(fLooped), -1, 1, 0, 1)
  yOff = map(sin(fLooped), -1, 1, 0, 1)
  n = noise(xOff*scl, yOff*scl, phs)
  return n
}
