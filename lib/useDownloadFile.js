export default function useDownloadFile(url, filename) {
  fetch(url)
    .then(async (t) => {
      return t.blob().then((b) => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(b);
        a.setAttribute("download", filename);
        a.click();
      });
    })
    .catch((error) => console.error(error));
}
