"use client";
import { useState } from "react";

export default function Home() {
  const [setting, setSettings] = useState({
    padding: 30,
    shadow: 10,
    radius: 80,
  });
  const [image, setImage] = useState();

  const handleImage = (e) => {
    const file = e.target.files[0];
    const fileName = file.name;

    const reader = new FileReader();
    console.log(reader);

    reader.onloadend = () => {
      const img = new Image();

      // console.log(img.onload);
      img.onload = () => {
        setImage({
          height: img.height,
          width: img.width,
          src: reader.result,
          name: fileName,
        });
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };
  // console.log(reader);
  console.log(image);

  const handleChange = (e) => {
    let updatedValue = {};
    updatedValue = {
      padding: e.target.value,
      shadow: e.target.value,
      radius: e.target.value,
    };
    setSettings(updatedValue);
  };

  return (
    <main className="flex lg:flex-col justify-center items-center gap-8 min-h-full">
      <div className="flex-col justify-center items-center">
        <div className="card bg-base-200 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Settings</h2>
            <div className="card-actions justify-end">
              <input
                type="file"
                className="file-input file-input-primary w-full max-w-xs"
                onChange={handleImage}
              />
              <p>Padding</p>
              <input
                type="range"
                min={0}
                max="99"
                defaultValue={setting.padding}
                // onChange={(e) => setPadding(e.target.value)}
                name="padding"
                className="range range-primary"
              />
              <p>Shadow</p>

              <input
                type="range"
                min={0}
                max="99"
                defaultValue={setting.shadow}
                name="shadow"
                className="range range-primary"
              />
              <p>Radius</p>

              <input
                type="range"
                min={0}
                max="99"
                defaultValue={setting.radius}
                name="radius"
                className="range range-primary"
              />
            </div>
          </div>
        </div>
      </div>
      <div>{image ? <img src={image.src} /> : null}</div>
    </main>
  );
}
