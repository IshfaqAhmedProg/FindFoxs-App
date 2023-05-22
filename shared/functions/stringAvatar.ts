export function stringAvatar(name: string) {
  var words = name.split(" ");
  var initials = "";
  for (var i = 0; i < words.length; i++) {
    initials += words[i][0].toUpperCase();
  }
  return {
    sx: {
      bgcolor: "var(--primarylight)",
    },
    children: initials,
  };
}
