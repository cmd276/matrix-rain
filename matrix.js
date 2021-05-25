var c = document.getElementById("matrix");
var ctx = c.getContext("2d");
var font_size;
var columns;    // number of columns for the rain
// an array of drops - one per column
var drops = [];

function setBasicInfo()
{
    var body = document.body,
    html = document.documentElement;

var height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );
    console.log(height);
    // making the canvas full screen
    c.height = window.innerHeight;
    console.log(c.height);
    c.width = window.innerWidth;
    font_size = 12;
    columns = c.width/font_size;    // number of columns for the rain
    // x below is the x coordinate
    // 1 = y-coordinate of the drop (same for every drop initially)
    for (var x = 0; x < columns; x++)
        if (isNaN(drops[x]))
            drops[x] = 1;
}
setBasicInfo();

// the characters
var gurmukhi = "੧੨੩੪੫੬੭੮੯੦ੳਅਰਤਯਪਸਦਗਹਜਕਲਙੜਚਵਬਨਮੲਥਫਸ਼ਧਘਝਖਲ਼ੜ੍ਹਛਭਣ"
var sanskrit = "१२३४५६७८९अरतयपसदगहजकलङषचवबनमआथय़फशधघझखळक्षछभणऒ"
var hanzi = "田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑呂"
var katakana = "゠クタハムヰアケチヒモヲィコッャンイツヤウゥサフュヵテユヶェショワエトヘヨォスラヱオナリカセニホル・ヌレーキソネロヽノマヮミ"
var hex = "ABCDEF01234567890"
var alpha = "qazwsxedcrfvtgbyhnujmikolpQAZWSXEDCRFVTGBYHNUJMIKOLP"
var symbol = "`~!@#$%^&*()_+-={}|[]\:;<,>.?/'\""
// converting the string into an array of single characters
var characters = (hanzi + katakana + sanskrit + gurmukhi + hex + alpha + symbol).split("");

var colours = [ Math.random() * 255, Math.random() * 255, Math.random() * 255 ];
var colourModes = [ -1, -1, -1 ];

function getColor() {
    //0, 5, 140
    return "rgba( 0, 0, 0, 0.05)";
    /*return "rgba(" + moment().format('HH') + ","
                + moment().format('mm') + ","
                + moment().format('ss')  + ", 0.05)";*/
}

function getColor2() {
    return "rgba(" + colours[0] + ","
                + colours[1] + ","
                + colours[2] + ", 1)";
}

function getColor3 ()
{
    var c = [];
    c[0] = Math.abs(colours[0] - 255);
    c[1] = Math.abs(colours[1] - 255);
    c[2] = Math.abs(colours[2] - 255);
    
    return "rgba(" + c[0] + ","
                + c[1] + ","
                + c[2] + ", 0.05)";
}

// drawing the characters
function draw() {
    if ((c.width != window.innerWidth) || (c.height != window.innerHeight))
    {
        setBasicInfo();
    }
    
    
    // Get the BG color based on the current time i.e. rgb(hh, mm, ss)
    // translucent BG to show trail
    ctx.fillStyle = getColor();
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.fillStyle = getColor2(); //"#888"; // grey text
    ctx.font = font_size + "px arial";

    // looping over drops
    for (var i = 0; i < drops.length; i++) {
        // a random character to print
        var text = characters[Math.floor(Math.random() * characters.length)];
        // x = i * font_size, y = value of drops[i] * font_size
        ctx.fillText(text, i * font_size, drops[i] * font_size);

        // sending the drop back to the top randomly after it has crossed the screen
        // adding randomness to the reset to make the drops scattered on the Y axis
        if (drops[i] * font_size > c.height && Math.random() > 0.975)
            drops[i] = 0;

        // Incrementing Y coordinate
        drops[i]++;
    }
}

var timer = 64;
setInterval(draw, timer);

var colours = [ Math.floor(Math.random() * 256|0), Math.floor(Math.random() * 256|0), Math.floor(Math.random() * 256|0) ];
var colourModes = [ false, false, false ];
function AdjustColour()
{
    for(var i = 0; i < colours.length; ++i)
    {
        if (colours[i] >= 255)
        {
            colourModes[i] = false;
        }
        if (colours[i] <= 30)
        {
            colourModes[i] = true;
        }
        
        if ( ! colourModes[i])
        {
            colours[i]--;
        }
        else
        {
            colours[i]++;
        }
    }
}
setInterval(AdjustColour, 16);
