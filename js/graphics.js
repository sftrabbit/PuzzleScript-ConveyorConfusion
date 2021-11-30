function createSprite(name,spritegrid, colors, padding) {
	if (colors === undefined) {
		colors = ['#00000000', state.fgcolor];
	}

	var sprite = makeSpriteCanvas(name);
	var spritectx = sprite.getContext('2d');

    spritectx.clearRect(0, 0, cellwidth, cellheight);

	var w = spritegrid[0].length;
	var h = spritegrid.length;
	var cw = ~~(cellwidth / (w + (padding|0)));
    var ch = ~~(cellheight / (h + (padding|0)));
    var pixh=ch;
    if ("scanline" in state.metadata) {
        pixh=Math.ceil(ch/2);
    }
    spritectx.fillStyle = state.fgcolor;
    for (var j = 0; j < h; j++) {
        for (var k = 0; k < w; k++) {
            var val = spritegrid[j][k];
            if (val >= 0) {
                var cy = (j * ch)|0;
                var cx = (k * cw)|0;
                spritectx.fillStyle = colors[val];
                spritectx.fillRect(cx, cy, cw, pixh);
            }
        }
    }

    return sprite;
}

function regenText(spritecanvas,spritectx) {
    for (var n in font) {
        if (font.hasOwnProperty(n) && !textImages.hasOwnProperty(n)) {
            fontstr = font[n].split('\n').map(a=>a.trim().split('').map(t=>parseInt(t)));
            fontstr.shift();
            textImages[n] = createSprite('char'+n,fontstr, undefined, 1);
        }
    }
}

var editor_s_grille=[[0,1,1,1,0],[1,0,0,0,0],[0,1,1,1,0],[0,0,0,0,1],[0,1,1,1,0]];

var spriteimages;
function regenSpriteImages() {
	if (textMode) {
        spriteimages = [];
		regenText();
		return;
	} 
    
    if (IDE===true) {
        // console.log('foo')
        // textImages['editor_s'] = createSprite('chars',editor_s_grille,undefined);
    }
    
    if (state.levels.length===0) {
        return;
    }
    spriteimages = [];

    for (var i = 0; i < sprites.length; i++) {
        if (sprites[i] == undefined) {
            continue;
        }
        spriteimages[i] = createSprite(i.toString(),sprites[i].dat, sprites[i].colors);
    }

    if (canOpenEditor) {
    	generateGlyphImages();
    }
}

var glyphImagesCorrespondance;
var glyphImages;
var glyphHighlight;
var glyphHighlightDiff;
var glyphHighlightResize;
var glyphPrintButton;
var glyphMouseOver;
var glyphSelectedIndex=0;
var editorRowCount=1;
var editorGlyphMovements=[];

var canvasdict={};
function makeSpriteCanvas(name) {
    var canvas;
    if (name in canvasdict) {
        canvas = canvasdict[name];
    } else {
        canvas = document.createElement('canvas');
        canvasdict[name]=canvas;
    }
	canvas.width = cellwidth;
	canvas.height = cellheight;
	return canvas;
}


function generateGlyphImages() {
    if (cellwidth===0||cellheight===0) {
        return;
    }
	glyphImagesCorrespondance=[];
	glyphImages=[];
	
    seenobjects = {};
	for (var n in state.glyphDict) {
		if (n.length==1 && state.glyphDict.hasOwnProperty(n)) {            
			var g=state.glyphDict[n];

            /* hide duplicate entries from editor palette*/
            var trace = g.join(",");
            if (seenobjects.hasOwnProperty(trace)){
                continue;
            }
            
			var sprite = makeSpriteCanvas("C"+n)
			var spritectx = sprite.getContext('2d');
			glyphImagesCorrespondance.push(n);
            seenobjects[trace]=true;

			for (var i=0;i<g.length;i++){
				var id = g[i];
				if (id===-1) {
					continue;
				}
				spritectx.drawImage(spriteimages[id], 0, 0);
			}
			glyphImages.push(sprite);
		}
	}

	if (IDE) {
		//make highlight thingy
		glyphHighlight = makeSpriteCanvas("highlight");
		var spritectx = glyphHighlight.getContext('2d');
		spritectx.fillStyle = '#FFFFFF';

		spritectx.fillRect(0,0,cellwidth,1);
		spritectx.fillRect(0,0,1,cellheight);
		
		spritectx.fillRect(0,cellheight-1,cellwidth,1);
		spritectx.fillRect(cellwidth-1,0,1,cellheight);

		glyphPrintButton = textImages['editor_s'];

		//make diff highlighter thingy
		glyphHighlightDiff = makeSpriteCanvas("glyphHighlightDiff");
		var spritectx = glyphHighlightDiff.getContext('2d');
        
		spritectx.fillStyle =  state.bgcolor;

		spritectx.fillRect(0,0,cellwidth,2);
		spritectx.fillRect(0,0,2,cellheight);
		
		spritectx.fillRect(0,cellheight-2,cellwidth,2);
		spritectx.fillRect(cellwidth-2,0,2,cellheight);

		spritectx.fillStyle = state.fgcolor;

		spritectx.fillRect(0,0,cellwidth,1);
		spritectx.fillRect(0,0,1,cellheight);
		
		spritectx.fillRect(0,cellheight-1,cellwidth,1);
		spritectx.fillRect(cellwidth-1,0,1,cellheight);

        

		glyphPrintButton = textImages['editor_s'];


		//make highlight thingy
		glyphHighlightResize = makeSpriteCanvas("highlightresize");
		var spritectx = glyphHighlightResize.getContext('2d');
		spritectx.fillStyle = '#FFFFFF';
		
		var minx=((cellwidth/2)-1)|0;
		var xsize=cellwidth-minx-1-minx;
		var miny=((cellheight/2)-1)|0;
		var ysize=cellheight-miny-1-minx;

		spritectx.fillRect(minx,0,xsize,cellheight);
		spritectx.fillRect(0,miny,cellwidth,ysize);

		//make highlight thingy
		glyphMouseOver = makeSpriteCanvas("glyphMouseOver");
		var spritectx = glyphMouseOver.getContext('2d');
		spritectx.fillStyle = 'yellow';
		
		spritectx.fillRect(0,0,cellwidth,2);
		spritectx.fillRect(0,0,2,cellheight);
		
		spritectx.fillRect(0,cellheight-2,cellwidth,2);
		spritectx.fillRect(cellwidth-2,0,2,cellheight);

        //make movement glyphs

        /* 
        up:1
        down:2
        left:4
        right:8
        action:16

        */
        const coords = [
            //up
            [ [3,2],[5,0],[7,2]],
            //down
            [ [3,8],[5,10],[7,8]],
            //left
            [ [2,3],[0,5],[2,7]],
            //right
            [ [7,3],[10,5],[7,7]],
            //action
            [ [3,5],[5,7],[7,5],[5,3]],
        ];

        for (var i=0;i<coords.length;i++){
            editorGlyphMovements[i]=makeSpriteCanvas("editorGlyphMovements"+i);
            var path = coords[i];

            var spritectx = editorGlyphMovements[i].getContext('2d');
            spritectx.lineWidth=1;
            
            
		    spritectx.fillStyle =  state.bgcolor;
		    spritectx.strokeStyle = state.fgcolor;


            spritectx.beginPath();       // Start a new path
            spritectx.moveTo(path[0][0]*cellwidth/10.0, path[0][1]*cellheight/10.0);    
            for (var j=1;j<path.length;j++){
                spritectx.lineTo(path[j][0]*cellwidth/10.0, path[j][1]*cellheight/10.0);   
            }
            spritectx.closePath();
            spritectx.fill();
            spritectx.stroke();          // Render the path

                

        }
	}
}

var canvas;
var ctx;


var x;
var y;
var cellwidth;
var cellheight;
var xoffset;
var yoffset;

window.addEventListener('resize', canvasResize, false);
canvas = document.getElementById('gameCanvas');
ctx = canvas.getContext('2d');
levelCtx = null;
x = 0;
y = 0;

var levelCanvas = null;

function glyphCount(){
    var count=0;
    for (var n in state.glyphDict) {
        if (n.length==1 && state.glyphDict.hasOwnProperty(n)) {
            count++;
        }
    }    
    return count;
}

function drawLevel(cameraOrigin) {
    if (cellwidth===0||cellheight===0||textMode) {
        return;
    }

    if (spriteimages===undefined || spriteimages.length === 0) {
        regenSpriteImages();
    }

    levelCtx.fillStyle = state.bgcolor;
    levelCtx.fillRect(0, 0, levelCanvas.width, levelCanvas.height);

    // var cameraOrigin = isOpenWorldLevel()
    //     ? {
    //         x: Math.floor(camera.position[0] - (screenwidth / 2)),
    //         y: Math.floor(camera.position[1] - (screenheight / 2))
    //     }
    //     : {
    //         x: 0,
    //         y: 0
    //     };

    for (var i = 0; i < levelCanvasSize.width + 1; i++) {
        for (var j = 0; j < levelCanvasSize.height + 1; j++) {
            var posX = cameraOrigin.x + i;
            var posY = cameraOrigin.y + j;

            if (posX < 0 || posY < 0 || posX >= level.width || posY >= level.height) {
                continue;
            }

            var posIndex = posY + posX * level.height;
            var posMask = level.getCellInto(posIndex,_o12);
            for (var k = 0; k < state.objectCount; k++) {
                if (posMask.get(k) != 0) {
                    var sprite = spriteimages[k];
                    levelCtx.drawImage(sprite, i * cellwidth, j * cellheight);
                }
            }
        }
    }

    var activeRegion = creditsState.creditsRegionIndex == null ? getActiveRegion() : regions[curlevel][creditsState.creditsRegionIndex];
    if (activeRegion != null) {
        var outlinePolygon = activeRegion.outlinePolygon;

        levelCtx.save();
        levelCtx.beginPath();
        levelCtx.moveTo((outlinePolygon[0][0]- cameraOrigin.x) * cellwidth, (outlinePolygon[0][1] - cameraOrigin.y - 0.8) * cellheight);
        for (var i = 0; i < outlinePolygon.length; i++) {
            var nextPoint = outlinePolygon[(i + 1) % outlinePolygon.length];
            levelCtx.lineTo((nextPoint[0] - cameraOrigin.x) * cellwidth, (nextPoint[1] - cameraOrigin.y - 0.8) * cellheight);
        }
        levelCtx.lineWidth = Math.floor(cellwidth * 0.4);
        levelCtx.strokeStyle = 'rgba(128, 128, 128, 0.3)';
        levelCtx.setLineDash([Math.floor(cellwidth * 0.2), Math.floor(cellwidth * 0.4)]);
        levelCtx.clip();
        levelCtx.stroke();
        levelCtx.restore();
    }

    levelNeedsDraw = false;

    // var dataUrl = levelCanvas.toDataURL('image/png')
    // var w = window.open()
    // w.document.write('<img src="' + dataUrl + '" />')
}

var previousCameraOrigin = { x: 0, y: 0 };

function redraw() {
    if (cellwidth===0||cellheight===0) {
        return;
    }

    if (spriteimages===undefined) {
        regenSpriteImages();
    }

    if (textMode) {
        ctx.fillStyle = state.bgcolor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (quittingTitleScreen && timer) {
            ctx.globalAlpha = Math.max(1 - (Math.max(0, Math.min(timer / 1000, 1)) * 1.1), 0);
        }

        for (var i = 0; i < titleWidth; i++) {
            for (var j = 0; j < titleHeight; j++) {
                var ch = titleImage[j].charAt(i);
                if (ch in textImages) {
                    var sprite = textImages[ch];
                    if (state.levels.length !== 0 && titleMode <= 1 && titleScreen) {
                        if (j === 1) {
                            ctx.imageSmoothingEnabled = false;
                            ctx.drawImage(sprite, xoffset + (i - 2.5) * cellwidth * 2, yoffset + (j - 0.7) * cellheight * 2, cellwidth * 2, cellheight * 2);
                            ctx.imageSmoothingEnabled = true;
                        } else if (j === 2) {
                            ctx.imageSmoothingEnabled = false;
                            ctx.drawImage(sprite, xoffset + (i - 1.5) * cellwidth * 2, yoffset + (j - 0.9) * cellheight * 2, cellwidth * 2, cellheight * 2);
                            ctx.imageSmoothingEnabled = true;
                        } else if (j === 0 || j === 3 || j === 4) {
                        } else {
                        ctx.drawImage(sprite, xoffset + i * cellwidth, yoffset + j * cellheight);
                        }
                    } else {
                        ctx.drawImage(sprite, xoffset + i * cellwidth, yoffset + j * cellheight);
                    }
                }
            }
        }

        ctx.globalAlpha = 1;
        return;
    } else {
        var curlevel = level;
        if (diffToVisualize!==null){
            curlevel = new Level(-1,diffToVisualize.width,diffToVisualize.height,diffToVisualize.layerCount,diffToVisualize.objects);
            curlevel.movements = diffToVisualize.movements;
        }
        ctx.fillStyle = state.bgcolor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        var mini=0;
        var maxi=screenwidth;
        var minj=0;
        var maxj=screenheight;

        if (levelEditorOpened) {
            var glyphcount = glyphCount();
            editorRowCount = Math.ceil(glyphcount/(screenwidth-1));
            maxi-=2;
            maxj-=2+editorRowCount;
        } else if (flickscreen) {
            var playerPositions = getPlayerPositions();
            if (playerPositions.length>0) {
                var playerPosition=playerPositions[0];
                var px = (playerPosition/(curlevel.height))|0;
                var py = (playerPosition%curlevel.height)|0;

                var screenx = (px/screenwidth)|0;
                var screeny = (py/screenheight)|0;
                mini=screenx*screenwidth;
                minj=screeny*screenheight;
                maxi=Math.min(mini+screenwidth,curlevel.width);
                maxj=Math.min(minj+screenheight,curlevel.height);

                oldflickscreendat=[mini,minj,maxi,maxj];
            } else if (oldflickscreendat.length>0){
                mini=oldflickscreendat[0];
                minj=oldflickscreendat[1];
                maxi=oldflickscreendat[2];
                maxj=oldflickscreendat[3];
            }
        } else if (zoomscreen) {
            var playerPositions = getPlayerPositions();
            if (playerPositions.length>0) {
                var playerPosition=playerPositions[0];
                var px = (playerPosition/(curlevel.height))|0;
                var py = (playerPosition%curlevel.height)|0;
                mini=Math.max(Math.min(px-((screenwidth/2)|0),curlevel.width-screenwidth),0);
                minj=Math.max(Math.min(py-((screenheight/2)|0),curlevel.height-screenheight),0);
                maxi=Math.min(mini+screenwidth,curlevel.width);
                maxj=Math.min(minj+screenheight,curlevel.height);
                oldflickscreendat=[mini,minj,maxi,maxj];
            }  else if (oldflickscreendat.length>0){
                mini=oldflickscreendat[0];
                minj=oldflickscreendat[1];
                maxi=oldflickscreendat[2];
                maxj=oldflickscreendat[3];
            }
        }

        ctx.save();

        var levelCanvasOffsetX = 0;
        var levelCanvasOffsetY = 0;

        if (isOpenWorldLevel()) {
            ctx.beginPath();
            ctx.moveTo(xoffset, yoffset);
            ctx.lineTo(xoffset + (cellwidth * screenwidth), yoffset);
            ctx.lineTo(xoffset + (cellwidth * screenwidth), yoffset + (cellheight * screenheight));
            ctx.lineTo(xoffset, yoffset + (cellheight * screenheight));
            ctx.clip();

            updateShake();

            if (cameraTransition != null) {
                if (cameraTransition.start != null) {
                    var now = (new Date()).getTime();
                    var transitionProgress = easeOutQuad(Math.min((now - cameraTransition.start) / 1000, 1));

                    var deltaX = cameraTransition.to.position[0] - cameraTransition.from.position[0];
                    camera.position[0] = cameraTransition.from.position[0] + deltaX * transitionProgress;
                    var deltaY = cameraTransition.to.position[1] - cameraTransition.from.position[1];
                    camera.position[1] = cameraTransition.from.position[1] + deltaY * transitionProgress;
                    var deltaZoom = cameraTransition.to.zoom - cameraTransition.from.zoom;
                    camera.zoom = cameraTransition.from.zoom + deltaZoom * transitionProgress;

                    if (transitionProgress >= 1) {
                        camera.position[0] = cameraTransition.to.position[0];
                        camera.position[1] = cameraTransition.to.position[1];
                        camera.zoom = cameraTransition.to.zoom;
                        cameraTransition = null;
                    }
                } else {
                    var transitionHappening = false;
                    var transitionSpeed = (creditsState.creditsRegionIndex == null ? 0.05 : 0.01);

                    var deltaX = cameraTransition.to.position[0] - camera.position[0];
                    if (Math.abs(deltaX) >= 0.005) {
                        camera.position[0] += deltaX * transitionSpeed;
                        transitionHappening = true;
                    } else {
                        camera.position[0] = cameraTransition.to.position[0];
                    }
                    var deltaY = cameraTransition.to.position[1] - camera.position[1];
                    if (Math.abs(deltaY) >= 0.005) {
                        camera.position[1] += deltaY * transitionSpeed;
                        transitionHappening = true;
                    } else {
                        camera.position[1] = cameraTransition.to.position[1];
                    }
                    var deltaZoom = cameraTransition.to.zoom - camera.zoom;
                    if (Math.abs(deltaZoom) >= 0.0001) {
                        camera.zoom += deltaZoom * transitionSpeed;
                        transitionHappening = true;
                    } else {
                        camera.zoom = cameraTransition.to.zoom;
                    }

                    if (!transitionHappening) {
                        cameraTransition = null;
                    }
                }
            }

            var cameraOrigin = {
                x: Math.floor(camera.position[0] - (levelCanvasSize.width / 2)),
                y: Math.floor(camera.position[1] - (levelCanvasSize.height / 2))
            };
            if (levelNeedsDraw || cameraOrigin.x !== previousCameraOrigin.x || cameraOrigin.y !== previousCameraOrigin.y) {
                drawLevel(cameraOrigin);
                previousCameraOrigin = cameraOrigin;
            }

            var cameraOriginX = camera.position[0] - (levelCanvasSize.width / 2);
            var cameraOriginY = camera.position[1] - (levelCanvasSize.height / 2);

            levelCanvasOffsetX = Math.floor(((cameraOriginX - Math.floor(cameraOriginX)) % 1) * cellwidth);
            levelCanvasOffsetY = Math.floor(((cameraOriginY - Math.floor(cameraOriginY)) % 1) * cellheight);
        }

        var cameraShakeOffset = getShakeOffset();

        ctx.drawImage(
            levelCanvas,
            cameraShakeOffset.x * 4 * camera.zoom * (cellwidth / 40), cameraShakeOffset.y * 4 * camera.zoom * (cellwidth / 40),
            levelCanvas.width, levelCanvas.height,
            (canvas.width / 2) - ((levelCanvasSize.width * cellwidth / 2) + levelCanvasOffsetX) * camera.zoom,
            (canvas.height / 2) - ((levelCanvasSize.height * cellheight / 2) + levelCanvasOffsetY) * camera.zoom,
            levelCanvas.width * camera.zoom, levelCanvas.height * camera.zoom
        );

        if (creditsState.stage != null) {
            if (creditsState.stage === 'levels') {
                var creditsRegion = regions[0][creditsState.creditsRegionIndex];
                var creditText = creditsRegion.credit

                var textSize = Math.max(~~(cellwidth / 12),1);
                var textCellwidth = 6 * textSize;
                var textCellheight = 13 * textSize;

                var creditOffset = Math.floor(((screenwidth * cellwidth) / 2) - ((textCellwidth * creditText.length) / 2));

                ctx.fillStyle = '#000';
                ctx.fillRect(xoffset, yoffset + (screenheight * cellheight) - textCellheight, screenwidth * cellwidth, textCellheight);
                for (var i = 0; i < creditText.length; i++) {
                    ctx.imageSmoothingEnabled = false;
                    ctx.drawImage(textImages[creditText.charAt(i)], xoffset + creditOffset + textCellwidth * i, yoffset + (screenheight * cellheight) - textCellheight, textCellwidth, textCellheight);
                    ctx.imageSmoothingEnabled = true;
                }
            } else if (creditsState.stage === 'list') { 
                ctx.fillStyle = '#000';
                ctx.globalAlpha = Math.min(creditsState.listScrollProgress / 180, 1);
                ctx.fillRect(xoffset, yoffset, screenwidth * cellwidth, screenheight * cellheight);
                ctx.globalAlpha = 1;

                var textSize = Math.max(~~(cellwidth / 18),1);
                var textCellwidth = 6 * textSize;
                var textCellheight = 13 * textSize;

                var doneScrolling = false;

                ctx.imageSmoothingEnabled = false;
                var listCreditsOffset = ((screenheight - (creditsState.listScrollProgress / 60)) * cellheight);
                for (var i = 0; i < listCredits.length; i++) {
                    var creditLine = listCredits[i];

                    if (Array.isArray(creditLine)) {
                        var lineOffsetA = Math.floor(((screenwidth * cellwidth) * (3/10)) - ((textCellwidth * creditLine[0].length) / 2));
                        var lineOffsetB = Math.floor(((screenwidth * cellwidth) * (7/10)) - ((textCellwidth * creditLine[1].length) / 2));
                        for (var j = 0; j < creditLine[0].length; j++) {
                            ctx.drawImage(textImages[creditLine[0].charAt(j)], xoffset + lineOffsetA + textCellwidth * j, yoffset + listCreditsOffset + i * textCellheight, textCellwidth, textCellheight);
                        }
                        for (var j = 0; j < creditLine[1].length; j++) {
                            ctx.drawImage(textImages[creditLine[1].charAt(j)], xoffset + lineOffsetB + textCellwidth * j, yoffset + listCreditsOffset + i * textCellheight, textCellwidth, textCellheight);
                        }
                    } else {
                        var lineOffset = Math.floor(((screenwidth * cellwidth) / 2) - ((textCellwidth * creditLine.length) / 2));
                        for (var j = 0; j < creditLine.length; j++) {
                            ctx.drawImage(textImages[creditLine.charAt(j)], xoffset + lineOffset + textCellwidth * j, yoffset + listCreditsOffset + i * textCellheight, textCellwidth, textCellheight);
                        }

                        if (i === (listCredits.length - 1) && (yoffset + listCreditsOffset + i * textCellheight) < -textCellheight) {
                            doneScrolling = true;
                        }
                    }
                }
                ctx.imageSmoothingEnabled = true;

                if (doneScrolling) {
                    creditsState.stage = 'thanks';
                    creditsState.listScrollProgress = 0;
                } else {
                    creditsState.listScrollProgress++;
                }
            } else if (creditsState.stage === 'thanks') {
                ctx.fillStyle = '#000';
                ctx.fillRect(xoffset, yoffset, screenwidth * cellwidth, screenheight * cellheight);
                ctx.globalAlpha = 1;

                var textSize = Math.max(~~(cellwidth / 18),1);
                var textCellwidth = 6 * textSize;
                var textCellheight = 13 * textSize;

                ctx.globalAlpha = Math.min(creditsState.listScrollProgress / 180, 1);
                var thanksText = 'Thank you for playing!';

                ctx.imageSmoothingEnabled = false;
                var lineOffsetX = Math.floor(((screenwidth * cellwidth) / 2) - ((textCellwidth * thanksText.length) / 2));
                var lineOffsetY = Math.floor(((screenheight * cellheight) / 2) - (textCellheight / 2));
                for (var j = 0; j < thanksText.length; j++) {
                    ctx.drawImage(textImages[thanksText.charAt(j)], xoffset + lineOffsetX + textCellwidth * j, yoffset + lineOffsetY, textCellwidth, textCellheight);
                }
                ctx.imageSmoothingEnabled = true;

                ctx.globalAlpha = 1;

                creditsState.listScrollProgress++;
            }
        }

        ctx.restore()

	    if (levelEditorOpened) {
	    	drawEditorIcons(mini,minj);
	    }
    }
}

function drawEditorIcons(mini,minj) {
	var glyphCount = glyphImages.length;
	var glyphStartIndex=0;
	var glyphEndIndex = glyphImages.length;/*Math.min(
							glyphStartIndex+10,
							screenwidth-2,
							glyphStartIndex+Math.max(glyphCount-glyphStartIndex,0)
							);*/
	var glyphsToDisplay = glyphEndIndex-glyphStartIndex;

	ctx.drawImage(glyphPrintButton,xoffset-cellwidth,yoffset-cellheight*(1+editorRowCount));
	if (mouseCoordY===(-1-editorRowCount)&&mouseCoordX===-1) {
			ctx.drawImage(glyphMouseOver,xoffset-cellwidth,yoffset-cellheight*(1+editorRowCount));								
	}

	var ypos = editorRowCount-(-mouseCoordY-2)-1;
	var mouseIndex=mouseCoordX+(screenwidth-1)*ypos;

	for (var i=0;i<glyphsToDisplay;i++) {
		var glyphIndex = glyphStartIndex+i;
		var sprite = glyphImages[glyphIndex];
        var xpos=i%(screenwidth-1);
        var ypos=(i/(screenwidth-1))|0;
		ctx.drawImage(sprite,xoffset+(xpos)*cellwidth,yoffset+ypos*cellheight-cellheight*(1+editorRowCount));
		if (mouseCoordX>=0&&mouseCoordX<(screenwidth-1)&&mouseIndex===i) {
			ctx.drawImage(glyphMouseOver,xoffset+xpos*cellwidth,yoffset+ypos*cellheight-cellheight*(1+editorRowCount));						
		}
		if (i===glyphSelectedIndex) {
			ctx.drawImage(glyphHighlight,xoffset+xpos*cellwidth,yoffset+ypos*cellheight-cellheight*(1+editorRowCount));
		} 		
	}

    //filched from https://raw.githubusercontent.com/ClementSparrow/Pattern-Script/master/src/js/graphics.js
    var tooltip_string = ''
    var tooltip_objects = null
    // prepare tooltip: legend for highlighted editor icon
    if ( (mouseCoordX >= 0) && (mouseCoordX < screenwidth) && (mouseIndex >= 0) && (mouseIndex < glyphsToDisplay) )
    {
        const glyphIndex = glyphStartIndex + mouseIndex
        const identifier_index = glyphImagesCorrespondance[glyphIndex]
        tooltip_string = identifier_index 
        if (identifier_index in state.synonymsDict){
            tooltip_string += " = " + state.synonymsDict[identifier_index];
        } else if (identifier_index in state.aggregatesDict){
            tooltip_string += " = " + state.aggregatesDict[identifier_index].join(" and ");
            
        }
    }
    // prepare tooltip: content of a level's cell
    else if ( (mouseCoordX >= 0) && (mouseCoordY >= 0) && (mouseCoordX < screenwidth) && (mouseCoordY < screenheight-editorRowCount) )
    {
        const posMask = level.getCellInto((mouseCoordY+minj) + (mouseCoordX+mini)*level.height, _o12);
        tooltip_objects = state.idDict.filter( (x,k) => (posMask.get(k) != 0) )
            // prepare tooltip: object names
        if (tooltip_objects !== null)
        {
            tooltip_string = tooltip_objects.join(', ')
        }
    }

    // show tooltip
    if (tooltip_string.length > 0)
    {
        ctx.fillStyle = state.fgcolor;
        ctx.font = `16px "Source Sans Pro", Helvetica, Arial, sans-serif`;
        ctx.fillText(tooltip_string, xoffset, yoffset-0.4*cellheight);
    }

	if (mouseCoordX>=-1&&mouseCoordY>=-1&&mouseCoordX<screenwidth-1&&mouseCoordY<screenheight-1-editorRowCount) {
		if (mouseCoordX==-1||mouseCoordY==-1||mouseCoordX==screenwidth-2||mouseCoordY===screenheight-2-editorRowCount) {
			ctx.drawImage(glyphHighlightResize,
				xoffset+mouseCoordX*cellwidth,
				yoffset+mouseCoordY*cellheight
				);								
		} else {
			ctx.drawImage(glyphHighlight,
				xoffset+mouseCoordX*cellwidth,
				yoffset+mouseCoordY*cellheight
				);				
		}
	}

}

var lastDownTarget;

var oldcellwidth=0;
var oldcellheight=0;
var oldtextmode=-1;
var oldfgcolor=-1;
var forceRegenImages=false;

var levelCanvasSize = null;

function canvasResize() {
    canvas.width = canvas.parentNode.clientWidth;
    canvas.height = canvas.parentNode.clientHeight;

    screenwidth=level.width;
    screenheight=level.height;
    if (state!==undefined){
        flickscreen=state.metadata.flickscreen!==undefined;
        zoomscreen=state.metadata.zoomscreen!==undefined;
	    if (levelEditorOpened) {
            screenwidth+=2;
            var glyphcount = glyphCount();
            editorRowCount = Math.ceil(glyphcount/(screenwidth-1));
            screenheight+=2+editorRowCount;
        } else if (flickscreen) {
	        screenwidth=state.metadata.flickscreen[0];
	        screenheight=state.metadata.flickscreen[1];
	    } else if (zoomscreen) {
	        screenwidth=state.metadata.zoomscreen[0];
	        screenheight=state.metadata.zoomscreen[1];
	    }
	}

    levelCanvasSize = {
        width: screenwidth,
        height: screenheight
    };

    if (textMode) {
        screenwidth=titleWidth;
        screenheight=titleHeight;
    } else {
        if (isOpenWorldLevel()) {
            // This needs to be about the size of the smallest space we'd want to view at once
            screenwidth = 16;
            screenheight = 9;

            var maxRegionSize = getMaxRegionSize();
            levelCanvasSize = {
                width: maxRegionSize.width + 3,
                height: maxRegionSize.height + 3
            };
        }
    }
    cellwidth = canvas.width / screenwidth;
    cellheight = canvas.height / screenheight;

    var w = 5;//sprites[1].dat.length;
    var h = 5;//sprites[1].dat[0].length;


    if (textMode) {
        w=5 + 1;
        h=font['X'].length/(w) + 1;
    }


    cellwidth =w * Math.max( ~~(cellwidth / w),1);
    cellheight = h * Math.max(~~(cellheight / h),1);

    xoffset = 0;
    yoffset = 0;

    if (cellwidth / w > cellheight / h) {
        cellwidth = cellheight * w / h;
        xoffset = (canvas.width - cellwidth * screenwidth) / 2;
        yoffset = (canvas.height - cellheight * screenheight) / 2;
    }
    else { //if (cellheight > cellwidth) {
        cellheight = cellwidth * h / w;
        yoffset = (canvas.height - cellheight * screenheight) / 2;
        xoffset = (canvas.width - cellwidth * screenwidth) / 2;
    }

    if (levelEditorOpened && !textMode) {
    	xoffset+=cellwidth;
    	yoffset+=cellheight*(1+editorRowCount);
    }

    cellwidth = cellwidth|0;
    cellheight = cellheight|0;
    xoffset = xoffset|0;
    yoffset = yoffset|0;

    if (oldcellwidth!=cellwidth||oldcellheight!=cellheight||oldtextmode!=textMode||textMode||oldfgcolor!=state.fgcolor||forceRegenImages){
    	forceRegenImages=false;
    	regenSpriteImages();
    }

    oldcellheight=cellheight;
    oldcellwidth=cellwidth;
    oldtextmode=textMode;
    oldfgcolor=state.fgcolor;

    levelCanvas = document.createElement('canvas');
    levelCanvas.width = cellwidth * (levelCanvasSize.width + 1);
    levelCanvas.height = cellheight * (levelCanvasSize.height + 1);

    levelCtx = levelCanvas.getContext('2d');
    levelNeedsDraw = true;

    if (!isOpenWorldLevel()) {
        redraw();
    }
}
