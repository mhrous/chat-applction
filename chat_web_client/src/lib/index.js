export const randomColor = () => {
  return `rgb(${Math.floor(Math.random() * 240)},${Math.floor(
    Math.random() * 240
  )},${Math.floor(Math.random() * 240)})`;
};

export const logInLocal = json => {
  const str = JSON.stringify(json);
  localStorage.setItem("chat", str);
};

export const logOutLocal = () => {
  localStorage.removeItem("chat");
};

export const removeIconTag = text =>
  text.replace(/<i[\s a-z = ' " -]+><\/i>/g, "");

export const isImage = name => /\.(gif|jpg|jpeg|tiff|png)$/i.test(name);
export const isVideo = name => /\.(mp4|webm|ogg)$/i.test(name);
export const isAudio = name => /\.(mp3|oqq|wav)$/i.test(name);

export const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));
