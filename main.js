function setup()
{
    canvas=createCanvas(280,280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth=window.speechSynthesis;
}
function clearCanvas()
{
    background("white");
}
function preload()
{
    classifier=ml5.imageClassifier('DoodleNet');
}
function draw()
{
    strokeWeight(13);
    stroke(0);
    if(mouseIsPressed)
    {
        line(pmouseX,pmouseY,mouseX,mouseY);
    }
}
function classifyCanvas()
{
    classifier.classify(canvas,gotresult);
}
function gotresult(error,result)
{
    if(error)
    {
        console.log(error);
    }
    else
    {
        console.log(result);
        document.getElementById("label").innerHTML="label: "+result[0].label;
        document.getElementById("confidence").innerHTML="confidence: "+result[0].confidence.toFixed(3);
        utterthis=new SpeechSynthesisUtterance(result[0].label);
        synth.speak(utterthis);
    }
}
