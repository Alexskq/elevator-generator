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
  const [loading, setLoading] = useState("idle");

  const handleImage = (e) => {
    const file = e.target.files[0];
    const fileName = file.name;

    if (file.type !== "image/png") {
      alert("Please upload a PNG file");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((curr) => ({ ...curr, [name]: Number(value) }));
  };

  const handleDownload = async (isCopy) => {
    setLoading(isCopy ? "copying" : "downloading");
    const { blob } = await renderPNG({
      image,
      settings,
    });
    const url = URL.createObjectURL(blob);

    if (isCopy) {
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
    } else {
      // Fais en sorte de télécharger l'image ici
      const element = document.createElement("a");
      element.download = image.name;
      element.href = url;
      document.body.appendChild(element);
      element.click();
    }
    setLoading("idle");
  };

  return (
    <main className="overflow-hidden">
      <h1 className="text-4xl text-primary text-center mt-20 overflow-y-hidden tracking-widest font-extrabold">
        Elevation Generator
      </h1>
      <div className="text-center mt-5 text-lg font">
        <p> Select our image and add some elevation</p>
      </div>
      <section className="flex justify-center items-center max-lg:flex-col m-auto max-w-4xl mt-5 gap-8 min-h-full py-7">
        <div className="card  bg-base-200 w-96 shadow-xl">
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
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Shadow</span>
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
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Radius</span>
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
          } rounded-md flex-1 max-w-md lg:max-w-none overflow-hidden h-fit w-fit flex`}
        >
          <ImageGenerator settings={settings} image={image} />
        </div>
        <div className="flex gap-4">
          <button
            className="btn btn-primary "
            onClick={() => handleDownload(false)}
            disabled={loading !== "idle"}
          >
            Download
            {loading === "downloading" ? (
              <span className="loading loading-spinner loading-sm "></span>
            ) : null}
          </button>
          <button
            className="btn "
            onClick={() => handleDownload(true)}
            disabled={loading !== "idle"}
          >
            Copy
            {loading === "copying" ? (
              <span className="loading loading-spinner loading-sm "></span>
            ) : null}
          </button>
        </div>
      </section>
    </main>
  );
}
