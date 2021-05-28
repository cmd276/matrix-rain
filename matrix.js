/* --------------------------------------------------------------- Variables. */
/* -------------------------------------------------------------------------- */

var c = document.getElementById("matrix");
var ctx = c.getContext("2d");
var font_size = 12;
var columns;    // number of columns for the rain
// an array of drops - one per column
var drops = [];

// the characters
var gurmukhi = "੧੨੩੪੫੬੭੮੯੦ੳਅਰਤਯਪਸਦਗਹਜਕਲਙੜਚਵਬਨਮੲਥਫਸ਼ਧਘਝਖਲ਼ੜ੍ਹਛਭਣ";
var sanskrit = "१२३४५६७८९अरतयपसदगहजकलङषचवबनमआथय़फशधघझखळक्षछभणऒ";
var hanzi = "田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑呂";
var katakana = "゠クタハムヰアケチヒモヲィコッャンイツヤウゥサフュヵテユヶェショワエトヘヨォスラヱオナリカセニホル・ヌレーキソネロヽノマヮミ";
var hex = "ABCDEF01234567890";
// I wanted to add in the English characters, and QWERTY keyboard symbols as well.
var alpha = "qazwsxedcrfvtgbyhnujmikolpQAZWSXEDCRFVTGBYHNUJMIKOLP";
var symbol = "`~!@#$%^&*()_+-={}|[]\:;<,>.?/'\"";
// converting the string into an array of single characters
var characters = (hanzi + katakana + sanskrit + gurmukhi + hex + alpha + symbol).split("");

// These arrays are responsible for Colour representation of the font on the page.
var colours = [ Math.floor(Math.random() * 256|0), Math.floor(Math.random() * 256|0), Math.floor(Math.random() * 256|0) ];
var colourModes = [ false, false, false ];

/* -------------------------------------------------- Functions Declarations. */
/* -------------------------------------------------------------------------- */

function setBasicInfo()
{
    // making the canvas full screen
    c.height = getNewHeight();
    c.width = window.innerWidth;
    columns = c.width/font_size;    // number of columns for the rain
    // x below is the x coordinate
    // 1 = y-coordinate of the drop (same for every drop initially)
    for (var x = 0; x < columns; x++)
        if (isNaN(drops[x])) // Added to conpensate for Window resizing. 
            drops[x] = 1;
}

// This was partially pulled from StackOverflow. It returns the largest value of heights of the web page we're loaded on.
// Why? Because it allows for being used as a background to a website.
function getNewHeight()
{
    var body = document.body,
        html = document.documentElement;

    var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
    return height;
}

// Used for grabbing the colour for the font.
function getFontColour() {
    return "rgba(" + colours[0] + ","
                + colours[1] + ","
                + colours[2] + ", 1)";
}

// drawing the characters
function draw() {
    // Check to see if the window size has changed. If it has, re-adjust the canvas size.
    if ((c.width != window.innerWidth) || (c.height != getNewHeight()))
    {
        setBasicInfo();
    }
    
    // Get the BG color based on the current time i.e. rgb(hh, mm, ss)
    // translucent BG to show trail
    ctx.fillStyle = "rgba( 0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, c.width, c.height);
    
    // Was originally coloured to #888. I changed it to a sliding value.
    ctx.fillStyle = getFontColour(); //"#888"; // grey text
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

function AdjustColour()
{
    // For each colour value (should only be 3)
    for(var i = 0; i < colours.length; ++i)
    {
        // If our colour value is at or above 255, set the corresponding mode to false.
        // It being false tells the script to decrement instead of increment.
        if (colours[i] >= 255)
        {
            colourModes[i] = false;
        }
        
        // Since the background is black, a margin of 30 is added to attempt to keep from having black text on black bg.
        // If our colour value is at or below 30, set our corresponding to true.
        // It being true will tell the script to increment the value instead of decrementing it.
        if (colours[i] <= 30)
        {
            colourModes[i] = true;
        }
        
        // Are we increasing or decreasing the colour value?
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
/* ---------------------------------------------------------- Function Calls. */
/* -------------------------------------------------------------------------- */

// Set some basic information about the canvas.
setBasicInfo();
// Run the draw command every so often.
setInterval(draw, 64);
// Change the font colour every so often.
setInterval(AdjustColour, 16);
