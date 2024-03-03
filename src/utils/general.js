export const getScaledSize = (ctx, width, height, scale) => {
    const maxWidth = ctx.canvas.width * scale;
    const maxHeight = ctx.canvas.height * scale;

    const widthRatio = maxWidth / width;
    const heightRatio = maxHeight / height;

    const scaleFactor = Math.min(widthRatio, heightRatio);

    const scaledWidth = width * scaleFactor;
    const scaledHeight = height * scaleFactor;

    const xOffset = (maxWidth - scaledWidth) / 2;
    const yOffset = (maxHeight - scaledHeight) / 2;

    return {
        scaledWidth, scaledHeight, xOffset, yOffset, scaleFactor
    }
}