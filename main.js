var canvas=document.getElementById("canvas")
var ctx=canvas.getContext('2d')
canvas.width=innerWidth
canvas.height=0.8*innerHeight
var graphOriginX=Math.floor(canvas.width/2)
var graphOriginY=Math.floor(canvas.height/2)
var count=1
var eqArr=[]
var scale=15
graphs=1
var colors=["red","blue","black", "brown"]

drawaxes()
function mathparse(e){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    var eq=''

    console.log(e)
    e.preventDefault()

    eqinput=document.getElementById(`eq${e.explicitOriginalTarget.id}`)
    eqinput.disabled="true"


    eq=eqinput.value
    eq=eq.split("sin").join("Math.sin");
    eq=eq.split("cos").join("Math.cos");
    eq=eq.split("tan").join("Math.tan");
    eq=eq.split("log").join("Math.log");
    eq=eq.split("^").join("**");
    eq=eq.split("x").join("XX");
    eqArr.push(eq)
    document.getElementById(`submit${e.explicitOriginalTarget.id}`).disabled='true'
    console.log(e.explicitOriginalTarget.id,eqinput.value,`submit${e.explicitOriginalTarget.id}`)
    drawaxes()

    drawGraph()


}
function newEq(e){
    graphs+=1
    console.log(`$(graphs)`)
    newGraph=document.getElementById(`${graphs}`)
    newGraph.style.display="unset"





}
function drawaxes()
{

    ctx.strokeStyle = "black"
    ctx.beginPath()
    ctx.moveTo(0,graphOriginY)
    ctx.lineTo(canvas.width,graphOriginY)
    ctx.stroke()
    ctx.moveTo(graphOriginX,0)
    ctx.lineTo(graphOriginX,canvas.height)
    ctx.stroke()
    for(var x=graphOriginX;x<canvas.width;x=x+scale)
    {   ctx.beginPath()
        ctx.moveTo(x,graphOriginY)
        ctx.lineTo(x,(graphOriginY)+12)
        ctx.stroke()

    }
    for(var y=graphOriginY;y<canvas.height;y=y+scale)
        {
            ctx.beginPath()
            ctx.moveTo(graphOriginX,y)
            ctx.lineTo(graphOriginX+12,y)
            ctx.stroke()

        }



    for(var x=graphOriginX;x>0;x=x-scale)
        {   ctx.beginPath()
            ctx.moveTo(x,graphOriginY)
            ctx.lineTo(x,(graphOriginY)+12)
            ctx.stroke()

        }
    for(var y=graphOriginY;y>0;y=y-scale)
        {
            ctx.beginPath()
            ctx.moveTo(graphOriginX,y)
            ctx.lineTo(graphOriginX+12,y)
            ctx.stroke()

        }





}
function drawGraph(){
    for(var k=0;k<eqArr.length;k++)
    {
        for (var i = 1; i < canvas.width; i = i + 0.1) {

            var XX = (graphOriginX - i)
            var prevXX = (graphOriginX - (i-0.1))


            var YY = (graphOriginY - scale * eval(eqArr[k]))
            var temp=XX
            XX=prevXX
            var prevYY = (graphOriginY - scale * eval(eqArr[k]))
            XX=temp

            ctx.beginPath();


            ctx.strokeStyle = colors[k]

            if(XX-prevXX<canvas.width/2 || YY-prevYY<canvas.height/2) {

                ctx.moveTo(graphOriginX + scale * prevXX, prevYY)
                ctx.lineTo(graphOriginX + scale * XX, YY)
                ctx.stroke()
            }




        }
    }
}

function zoomin()
{
    scale+=5
    ctx.clearRect(0,0,canvas.width,canvas.height)
    drawaxes()
    drawGraph()
}
function zoomout()
{
    if(scale>5) {
        scale -= 5
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        drawaxes()

        drawGraph()
    }

}
function right(){
    if(graphOriginX-=15>0) {
        graphOriginX -= 15
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        drawaxes()

        drawGraph()
    }
}

function left(){
    if(graphOriginX+=15<canvas.width) {
        graphOriginX += 15
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        drawaxes()

        drawGraph()
    }
}



function up(){
    if(graphOriginY+=15<canvas.height) {
        graphOriginY += 15
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        drawaxes()

        drawGraph()
    }
}

function down(){
    if(graphOriginY-=15>0) {
        graphOriginY -= 15
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        drawaxes()

        drawGraph()
    }
}


document.addEventListener('keydown', function(event) {
    if (event.keyCode == '39') {

        right()
    }
});



document.addEventListener('keydown', function(event) {
    if (event.keyCode == '38') {
        up()
    }
});



document.addEventListener('keydown', function(event) {
    if (event.keyCode == '40') {
        down()
    }
});



document.addEventListener('keydown', function(event) {
    if (event.keyCode == '37') {
        left()
    }
});








