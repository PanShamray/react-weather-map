export function getWindDirection(windDeg) {
  let value = '';

  if ((windDeg >= 331 && windDeg <= 359) || (windDeg >= 0 && windDeg <= 30)) {
    value = "Північний";
  } else if (windDeg >= 31 && windDeg <= 60) {
    value = "Північно Східний";
  } else if (windDeg >= 61 && windDeg <= 120) {
    value = "Західний";
  } else if (windDeg >= 121 && windDeg <= 150) {
    value = "Південно Східний";
  } else if (windDeg >= 151 && windDeg <= 210) {
    value = "Південний";
  } else if (windDeg >= 211 && windDeg <= 240) {
    value = "Південно Західний";
  } else if (windDeg >= 241 && windDeg <= 300) {
    value = "Східний";
  } else if (windDeg >= 301 && windDeg <= 330) {
    value = "Північно Західний";
  }
  return value;
  };