export function estimatedTTC(queryCount: number, service: string) {
  switch (service) {
    case "Email Validator":
      {
        return calculateTTC("00:00:02", queryCount);
      }
      break;
    case "Phone Number Validator":
      {
        return calculateTTC("00:00:03", queryCount);
      }
      break;
    case "WhatsApp Validator":
      {
        return calculateTTC("00:00:03", queryCount);
      }
      break;
    case "Google Maps Scraper":
      {
        return calculateTTC("00:00:03", queryCount);
      }
      break;
    case "Emails And Contacts Scraper":
      {
        return calculateTTC("00:00:03", queryCount);
      }
      break;
    default:
      break;
  }
}
function calculateTTC(hms: string, queryCount: number) {
  var a = hms.split(":"); // split it at the colons

  // minutes are worth 60 seconds. Hours are worth 60 minutes.
  var seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
  var newSeconds = queryCount * seconds;

  // multiply by 1000 because Date() requires miliseconds
  var date = new Date(newSeconds * 1000);
  var hh: string | number = date.getUTCHours();
  var mm: string | number = date.getUTCMinutes();
  var ss: string | number = date.getSeconds();

  if (hh < 10) {
    hh = "0" + hh;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  if (ss < 10) {
    ss = "0" + ss;
  }
  var t = hh + ":" + mm + ":" + ss;
  return t;
}
