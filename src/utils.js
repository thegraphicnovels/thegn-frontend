export const formatDate = date => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${day} ${monthNames[monthIndex]} ${year}`;
};

export const getBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

export const createCloudinary = () => ({
  process: (fieldName, file, metadata, load, error, progress, abort) => {
    // `fieldName` and `meta` are not used for now
    const url = process.env.REACT_APP_CLOUDINARY_UPLOAD_URL;
    const xhr = new XMLHttpRequest();
    const formData = new FormData();

    xhr.open("POST", url, true);
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

    xhr.upload.addEventListener("progress", e => {
      progress(e.lengthComputable, e.loaded, e.total);
    });

    xhr.onreadystatechange = e => {
      if (xhr.readyState !== 4) {
        return;
      }

      if (xhr.status >= 200 && xhr.status < 300) {
        const response = JSON.parse(xhr.responseText);
        load(response.public_id);
        return;
      }

      error("oh no!");
    };

    formData.append(
      "upload_preset",
      process.env.REACT_APP_CLOUDINARY_UPLOAD_POST_PRESET
    );
    formData.append("tags", "browser_upload");
    formData.append("file", file);
    xhr.send(formData);

    return {
      abort: () => {
        xhr.abort();
      }
    };
  },
  revert: null
});
