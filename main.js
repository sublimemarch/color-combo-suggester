// takes in a hex string of the format "00ff00" and outputs its luminance (a number from 0 to 1)
function hexToLuminance(hex) {
  var withoutHash = hex.replace(/#/g, '');
  var parsedHex = parseInt(withoutHash, 16);
  var r = (parsedHex >> 16) & 255;
  var g = (parsedHex >> 8) & 255;
  var b = parsedHex & 255;

  r /= 255, g /= 255, b /= 255;

  if (r <= 0.03928) {
    r = (r/12.92);
  } else {
    r = Math.pow(((r + 0.055) / 1.055), 2.4);
  }

  if (g <= 0.03928) {
    g = (g / 12.92);
  } else {
    g = Math.pow(((g + 0.055) / 1.055), 2.4);
  }

  if (b <= 0.03928) {
    b = (b / 12.92);
  } else {
    b = Math.pow(((b + 0.055) / 1.055), 2.4);
  }

  var l = (0.2126*r) + (0.7182*g) + (0.0722*b);

  return l;
}

// takes in two luminance values and returns their contrast ratio.
function contrastRatio(l1, l2) {
  if (l2 < l1) {
    return (l1 + 0.05)/(l2 + 0.05);
  } else {
    return (l2 + 0.05) / (l1 + 0.05);
  }
}

// takes in an rgb value and returns the value in hex
function rgbToHex(rgb) {

}

function hexToContrast(h1, h2) {
  return contrastRatio(hexToLuminance(h1), hexToLuminance(h2));
}

function passesAANormal(ratio) {
  if (ratio >= 4.5) {
    return true;
  } else {
    return false;
  }
}

function hexToPassing(h1, h2) {
  return passesAANormal(hexToContrast(h1, h2));
}

// when either input changes, recalculate if it passes

$('input').on('input', function() {
  updateExample(backgroundHex(), foregroundHex());

  var ratio = hexToContrast(backgroundHex(), foregroundHex());
  var passBool = hexToPassing(backgroundHex(), foregroundHex());

  updateResult(ratio, passBool);
});

function updateExample(background, textColor) {
  $(".example").css({"background-color": background, "color": textColor});
}

function updateResult(contrastValue, passBool) {
  $(".ratio").text("Ratio is " + contrastValue);
  $('.pass-bool').text(passBool);
}

function backgroundHex() {
  return $("input[name='background-color']").val();
}

function foregroundHex() {
  return $("input[name='foreground-color']").val();
}

// suggesting a new color combo

// get input about which color to change

// figure out goal luminance for this color using luminance of other color and the contrast equation

// for that color, generate 3 suggested colors

// first one, hold red constant and get new color
// get the goal red value, then plug it in with the existing B and G to get a new color
// then we do the same thing with holding G and B constant

// then, we have 3 new suggested colors! show them to the user visually and give the hex code

