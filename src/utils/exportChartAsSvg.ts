export const exportChartAsSvg = (svgElementId: string, filename: string) => {
  const svgElement = document.getElementById(
    svgElementId,
  ) as SVGSVGElement | null;

  if (!svgElement) {
    console.error(`SVG element with ID "${svgElementId}" not found.`);
    return;
  }

  const clonedSvgElement = svgElement.cloneNode(true) as SVGSVGElement;

  const foreignObjects = clonedSvgElement.querySelectorAll("foreignObject");
  foreignObjects.forEach((fo) => fo.remove());

  const svgData = new XMLSerializer().serializeToString(clonedSvgElement);
  const svgBlob = new Blob(
    [`<?xml version="1.0" standalone="no"?>\r\n${svgData}`],
    { type: "image/svg+xml;charset=utf-8" },
  );
  const svgUrl = URL.createObjectURL(svgBlob);

  const downloadLink = document.createElement("a");
  downloadLink.href = svgUrl;
  downloadLink.download = `${filename}.svg`;

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);

  URL.revokeObjectURL(svgUrl);
};
