"use client";
import { useState } from "react";
import { ImageGenerator } from "./ImageGenerator";
import { renderPNG } from "./render-png";

export default function Home() {
  const [settings, setSettings] = useState({
    padding: 16,
    shadow: 30,
    radius: 16,
  });
  const [image, setImage] = useState();
  const [disabled, setDisabled] = useState(false);

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
    const { name, value } = e.target;
    setSettings((curr) => ({ ...curr, [name]: Number(value) }));
  };
  console.log(settings);

  return (
    <main className="flex max-lg:flex-col justify-center m-auto max-w-4xl items-center gap-8 min-h-full">
      <div className="card flex-1 bg-base-200 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="font-semibold text-lg">Settings</h2>
          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text">Pick a file</span>
            </div>
            <input
              type="file"
              className="file-input file-input-primary w-full max-w-xs"
              onChange={handleImage}
            />
          </label>
          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text">Padding</span>
            </div>
            <input
              type="range"
              min={0}
              max="99"
              defaultValue={Number(settings.padding)}
              onChange={(e) => handleChange(e)}
              name="padding"
              className="range range-primary"
            />
          </label>
          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text">Shadow</span>
            </div>
            <input
              type="range"
              min={0}
              max="99"
              defaultValue={Number(settings.shadow)}
              onChange={(e) => handleChange(e)}
              name="shadow"
              className="range range-primary"
            />
          </label>
          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text">Radius</span>
            </div>
            <input
              type="range"
              min={0}
              max="99"
              defaultValue={Number(settings.radius)}
              onChange={(e) => handleChange(e)}
              name="radius"
              className="range range-primary"
            />
          </label>
        </div>
      </div>

      <div
        // retirer flex - 1
        style={{ maxWidth: 400 }}
        className={`w-full h-fit ${
          image ? "border" : ""
        } rounded-md  max-w-md lg:max-w-none overflow-hidden h-fit w-fit flex`}
      >
        <ImageGenerator settings={settings} image={image} />
      </div>
      <button
        className="btn btn-active btn-primary mt-2"
        disabled={!image}
        onClick={async () => {
          const { blob } = await renderPNG({
            image,
            settings,
          });
          const url = URL.createObjectURL(blob);

          // Fais en sorte de télécharger l'image ici
          const element = document.createElement("a");
          element.download = image.name;
          element.href = url;
          document.body.appendChild(element);
          element.click();
          setDisabled(true);
        }}
      >
        Download
      </button>
    </main>
  );
}
