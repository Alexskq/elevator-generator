/* eslint-disable @next/next/no-img-element */
export const ImageGenerator = (props) => {
  if (!props.image) {
    return (
      <div role="alert" class="alert">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="stroke-info h-6 w-6 shrink-0"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span> Upload an image</span>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        padding: props.settings.padding,
      }}
    >
      <img
        alt="Image to be generated"
        src={props.image.src}
        style={{
          // Ajoute le border-radius et le boxShadow
          boxShadow: `0 0 ${props.settings.shadow}px rgba(0,0,0,.${props.settings.shadow})`,
          borderRadius: `${props.settings.radius}px`,
          display: "flex",
        }}
      />
    </div>
  );
};
