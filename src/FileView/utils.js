
const PROXY_URL = "http://localhost:5000";
const getEnv = () => process.env.NODE_ENV;
export const getFullURL = (fileURL) => {
  if(getEnv() !== "production")
    return PROXY_URL + fileURL;

  return fileURL;
}

export const getDataFromURL = (url) => new Promise((resolve, reject) => {
  setTimeout(() => {
      fetch(url, { mode: 'no-cors'})
          .then(response => response.text())
          .then(data => {
              resolve(data)
          });
  });
}, 2000);


export const splitItemPath = (path) => {
  if(path.includes("%3D"))
    return path.split("%3D")[1];

  return path;
}
