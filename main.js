function hexToLuminance(hex) {
  // takes in a hex string of the format "00ff00" and outputs its luminance (a number from 0 to 1)
  var parsedHex = parseInt(hex, 16);
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

function contrastRatio(l1, l2) {
  // takes in two luminance values and returns their contrast ratio.
  if (l2 < l1) {
    return (l1 + 0.05)/(l2 + 0.05);
  } else {
    return (l2 + 0.05) / (l1 + 0.05);
  }
}
