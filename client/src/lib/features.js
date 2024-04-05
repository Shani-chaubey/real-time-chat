import moment from "moment";

const fileFormat = (url) => {
  const fileExtension = url.split(".").pop();

  if (
    fileExtension === "png" ||
    fileExtension === "jpg" ||
    fileExtension === "jpeg" ||
    fileExtension === "gif"
  ) {
    return "image";
  }
  if (
    fileExtension === "mp4" ||
    fileExtension === "webm" ||
    fileExtension === "egg"
  ) {
    return "video";
  }
  if (fileExtension === "mp3" || fileExtension === "wav") {
    return "mp3";
  }

  return "file";
};

const transformImage = (url = "", width = 100) => url;

const getLast7Days = () => {
  const currentDate = moment();
  const last7Days = [];
  for (let i = 0; i < 7; i++) {
    last7Days.push(currentDate.format('dddd'));
    currentDate.subtract(1, "days");
  }
  return last7Days.reverse();
};

export { fileFormat, transformImage, getLast7Days };
